<script setup >

//prop definition
const newTodo = defineModel("newTodo");

//emit definition
const emit = defineEmits(["addTodo"]);

</script>

<template lang="">
  <div class="relative mt-0 mr-0 mb-[30px]">
    <!-- Todo Input -->
    <input
      class="w-full h-[50px] text-[15px] font-medium font-sans p-[15px] bg-[#f3f3f3] text-secondary-color border border-transparent rounded-[10px] transition-colors duration-300 ease-linear focus:outline-none focus:border-primary-color"
      type="text"
      placeholder="New Todo"
      v-model="newTodo"
      @keyup.enter="emit('addTodo')"
    />
    <!-- Todo add button -->
    <button
      class="bg-none border-none text-primary transition text-[18px] absolute top-[50%] right-[20px] translate-y-[-50%]"
      @click="emit('addTodo')"
    >
      <v-icon name="fa-plus"></v-icon>
    </button>
  </div>
</template>

