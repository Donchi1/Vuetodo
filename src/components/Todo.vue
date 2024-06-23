<script setup >
import { computed, onMounted, ref, watchEffect } from "vue";

import TodoItem from "./TodoItem.vue";
import TodoInput from "./TodoInput.vue";
import TodoBottom from "./TodoBottom.vue";
import { tempTodos } from "../helpers/tempData";
import {
  getFromStorage,
  addToStorage,
  updateInStorage,
  deleteFromStorage,
  clearStorage,
} from "../helpers/methods";

//stored todo from the local storage
const storedTodos = getFromStorage("todos");

//new Todo reactive
const newTodo = ref("");


//new all todo reactive
const todos = ref(storedTodos || tempTodos);

//get the number of uncompleted todos
const incompleteTodos = computed(
  () => todos.value.filter((each) => !each.completed).length
);

//add a single todo
const addTodo = () => {
  if (newTodo.value) {
    todos.value.push({
      label: newTodo.value,
      completed: false,
      id: Math.round(Math.random() + Date.now()).toString(),
    });
    newTodo.value = "";
    addToStorage("todos", todos.value);
  }
};

//clear all completed todos
const clearCompletedTodos = () => {
  todos.value = todos.value.filter((each) => !each.completed);
  updateInStorage("todos", todos.value);
};

//clear all .value
const clearAllTodos = () => {
  todos.value = [];
  clearStorage();
};

//handle completed todos
const completedTodo = (todo) => {
  todos.value = todos.value.map((each) => {
    if (each.id === todo.id) each.completed = !each.completed;
    return each;
  });
  updateInStorage("todos", todos.value);
};

//remove all todos
const removeTodo = (index) => {
  todos.value.splice(index, 1);
  if (todos.value.length > 0) return updateInStorage("todos", todos.value);
 return clearStorage();
};
</script>

<template>
  <div class="max-w-[500px] mx-auto  pt-[60px] px-[15px]">
    <div class="bg-white rounded-[25px] p-[30px] shadow-xl">
      <!-- title -->
      <div class="text-center  mb-[20px]">
        <h1 class="text-2xl uppercase font-medium text-secondary-color/80">
          Perfect To Do List
        </h1>
      </div>
      <!-- Todo Input -->
      <todo-input @addTodo="addTodo" v-model:newTodo="newTodo"></todo-input>
      <!-- todo lists -->
      <div class="px-[3px]">
        <transition-group name="fade" tag="ul">
          <todo-item
            v-for="(todo, index) in todos"
            :todo="todo"
            :key="todo.id"
            @remove="removeTodo(index)"
            @complete="completedTodo(todo)"
          ></todo-item>
        </transition-group>
      </div>
      <!-- todo bottom -->
      <todo-bottom
        @clearAllTodos="clearAllTodos"
        @clearCompletedTodos="clearCompletedTodos"
        :incompleteTodos="incompleteTodos"
      ></todo-bottom>
    </div>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s linear;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform:  translateX(-30px);
}


</style>


