<script setup>
import { computed, ref, watchEffect } from "vue";
import { addToStorage, getFromStorage } from "../helpers/methods";


//prop definition
const { todo } = defineProps(["todo"]);

//reactives
const checked = ref(todo.completed);
const edit = ref(todo.label);
const isEdit = ref(false);
const editRef = ref(null);

//watch the updates on isEdit reactive and focus on the edit input
watchEffect(() => {
  if (isEdit.value) {
    editRef.value?.focus();
  }
});

//edit a todo if is not completed
const handleEdit = () => {
  if (!todo.completed) return (isEdit.value = true);
};

//update edited todo
const handleUpdateTodo = () => {
  //check if the edited todo is empty
  if (edit.value) {
    todo.label = edit.value;
    //get todos from the storge and update the matched label
    const todos = getFromStorage("todos")?.map((each) => {
      if (each.id === todo.id) each.label = edit.value;
      return each;
    });

    isEdit.value = false;
    //update the local storage
    addToStorage("todos", todos);
  }
};
</script>

<template>
<!--Todo items -->
  <li class="flex justify-between  mb-[20px] *:bg-none *:border-none">
    <!--info-->
    <button
      type="button"
      class="hover:text-primary-color  gap-x-3 flex items-center has-[:checked]:line-through has-[:checked]:text-primary-color"
      @click="checked = !checked"
      @click.capture="!isEdit && $emit('complete')"
    >
      <input
        type="checkbox"
        :checked="!isEdit && todo.completed"
        class="ring-primary-color relative appearance-none ring-1 checked:bg-primary-color rounded-full size-[15px] after:size-[5px] after:bg-primary-color after:absolute after:rounded-full checked:after:bg-white flex justify-center items-center"
      />
      <input
        ref="editRef"
        v-if="isEdit"
        type="text"
        v-model="edit"
        class="rounded-[10px] !w-full transition-colors duration-300 ease-linear focus:outline-none focus:border-primary-color"
      />
      <p class="text-left first-letter:uppercase" v-if="!isEdit">{{ todo.label }}</p>
    </button>
    <!-- action button -->
    <button type="button" class="shrink-0 space-x-3">
      <v-icon
        class="transition text-secondary-color/70"
        @click="$emit('remove')"
        name="fa-trash-alt"
      ></v-icon>
      <v-icon
        class="transition text-secondary-color/70"
        v-if="!isEdit"
        @click="handleEdit"
        name="fa-edit"
      ></v-icon>
      <v-icon
        class="transition text-primary-color"
        v-if="isEdit"
        @click="handleUpdateTodo"
        name="fa-check"
      ></v-icon>
    </button>
  </li>

</template>



