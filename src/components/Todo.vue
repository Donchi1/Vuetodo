<script setup>
import { computed, onMounted, ref, watchEffect } from "vue";

import TodoItem from "./TodoItem.vue";
import {tempTodos} from "../helpers/tempData"
import {getFromStorage, addToStorage,updateInStorage, deleteFromStorage, clearStorage} from "../helpers/methods"

const storedTodos = getFromStorage("todos") || null

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
      id: Math.round(Math.random() + Date.now()).toString()
    });
    newTodo.value = "";
    addToStorage("todos", todos.value)
  }
};

//clear all completed todos
const clearCompletedTodos = () => {
   todos.value = todos.value.filter((each) => !each.completed)
   updateInStorage("todos", todos.value)
}
 


//clear all .value
const clearAllTodos = () => {
  todos.value = []
  clearStorage()
  }

//handle completed todos
const completedTodo = (todo) =>{
  todos.value = todos.value.map((each) => {
    if (each.id === todo.id) each.completed = !each.completed;
    return each;
  });
  updateInStorage("todos", todos.value)
}


//remove all todos
const removeTodo = (index) => {
  todos.value.splice(index, 1)
  if(todos.length > 0) return updateInStorage("todos", todos.value)
  clearStorage()
  }
</script>

<template>
  <div class="max-w-[500px] my-0 mx-auto pb-0 pt-[60px] px-[15px]">
    <div class="bg-white rounded-[25px] p-[30px] shadow-xl">
      <!-- title -->
      <div class="text-center mt-0 mr-0 mb-[20px]">
        <h1>To Do List</h1>
      </div>
      <!-- form -->
      <div class="relative mt-0 mr-0 mb-[30px]">
        <input
          class="w-full h-[50px] text-[15px] font-medium font-sans p-[15px] bg-[#f3f3f3] text-secondary-color border border-transparent rounded-[10px] transition-colors duration-300 ease-linear focus:outline-none focus:border-primary-color"
          type="text"
          placeholder="New Todo"
          v-model="newTodo"
          @keyup.enter="addTodo"
        />
        <button
          class="bg-none border-none text-primary text-[18px] absolute top-[50%] right-[20px] translate-y-[-50%]"
          @click="addTodo"
        >
          <v-icon name="fa-plus"></v-icon>
        </button>
      </div>
      <!-- task lists -->
      <div class="py-0 px-[10px]">
        <ul>
          <todo-item
            v-for="(todo, index) in todos"
            :todo="todo"
            :key="todo.id"
            @remove="removeTodo(index)"
            @complete="completedTodo(todo)"
          ></todo-item>
        </ul>
      </div>
      <!-- buttons -->
      <div class="flex justify-between mb-[20px]">
        <button class="btn" @click="clearCompletedTodos">
          Clear completed
        </button>
        <button class="btn" @click="clearAllTodos">Clear all</button>
      </div>
      <!-- pending task -->
      <div class="py-0 px-[6px]">
        <span>Pending Tasks: {{ incompleteTodos }}</span>
      </div>
    </div>
  </div>
</template>



