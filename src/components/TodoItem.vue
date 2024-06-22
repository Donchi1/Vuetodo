
<script setup>
import { computed, ref } from "vue";
const { todo } = defineProps(["todo"]);

const checked = ref(false);
</script>


<template>
  <li class="flex justify-between mt-0 mr-0 mb-[20px] *:bg-none *:border-none">
    <button
      class="hover:text-primary"
      @click="checked = !checked"
      @click.self="$emit('complete')"
      :class="{ 'line-through': todo.completed }"
    >
      <input type="checkbox" v-model="checked" />
      {{ todo.label }}
    </button>
    <button @click="$emit('remove')">
      <v-icon name="fa-trash-alt"></v-icon>
    </button>
  </li>
</template>
