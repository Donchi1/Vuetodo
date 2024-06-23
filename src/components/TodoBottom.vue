<script setup >
//emit definition
const emit = defineEmits(["clearCompletedTodos", "clearAllTodos"]);

//prop definition
const { incompleteTodos } = defineProps(["incompleteTodos"]);
</script>

<template lang="">
<!-- Action / clear buttons -->
  <div class="flex justify-between mb-[20px]">
    <button class="btn" @click="emit('clearCompletedTodos')">
      Clear completed
    </button>
    <button class="btn" @click="emit('clearAllTodos')">Clear all</button>
  </div>
  <!-- Incomplete todos -->
  <div class="py-0 px-[6px]">
    <span>Incomplete Todos: {{ incompleteTodos }}</span>
  </div>
</template>
