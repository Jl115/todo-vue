<template>
  <main class=" w-5/6 h-full pt-5">


    <div class="w-full h-full grid grid-cols-4 gap-5 justify-center ">
      <div v-for="todoItem in todo" class="card bg-slate-500 p-3 h-32 ">
        {{ todoItem.name }} <br> {{ todoItem.description }} <br> {{ todoItem.done }} <br> {{ todoItem.createdAt }} 
      </div>
    </div>
    
    <div v-if="!isTodo" class="todoDiv w-5/6 h-full top-6 fixed flex items-center justify-center ">

    
      <Todo @todoAdded="fetchTodos" class="card"></Todo>

  </div>
  </main>
  <Button icon="pi pi-plus" label="Add Todo" @click="addTodo"
    class="bg-emerald-500 p-2 text-gray-800 fixed right-3 bottom-3" />
</template>


<script setup>
import { onMounted, ref } from 'vue';
import Todo from '../components/Todo.vue';


const todo = ref([]);
const isTodo = ref(true);

onMounted(() => {
  fetchTodos();
});
const fetchTodos = () => {
  fetch('http://localhost:8080/api/products/')
    .then((response) => response.json())
    .then((json) => {
      todo.value = json;
      console.log(todo.value);
      isTodo.value = true;
    })
    .catch((error) => console.error('Error fetching todos:', error));
};
const addTodo = async () => {
  isTodo.value = !isTodo.value;
  if (isTodo.value) {
    fetchTodos();
   
  }
};

</script>

<style scoped>
.todoDiv{
  height: 70vh;
}
</style>