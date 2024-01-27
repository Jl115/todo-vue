<template>
  <main class=" w-5/6 h-full pt-5">
    <div class="todo-container w-full h-5/6 grid grid-cols-4 gap-5 justify-center content-around flex-wrap overflow-scroll ">
      <div v-for="todoItem in todo" class="card bg-slate-500 p-3 max-h-48 ">
        <form @submit.prevent="updateTodoContent(todoItem.id)" class="h-full flex flex-col justify-between">
          <InputText v-model="todoItem.name" type="text" size="large" class=" bg-opacity-15 bg-slate-900 text-center text-emerald-500  text-2xl" />
          <br>
          <InputText v-model="todoItem.description" type="text"  class=" bg-opacity-15 p-1 bg-slate-900 " />
          <br > <p class="text-center">{{ todoItem.createdAt }} </p> <br>
          <div v-if="!todoItem.done"><i class="pi pi-stop absolute bottom-2 left-2 link-hover cursor-pointer dropdown-hover" style="font-size: 1.5rem" @click="updateTodoDone(todoItem.id, true)"></i></div>
          <div v-else><i class="pi pi-check-square absolute bottom-2 left-2 link-hover cursor-pointer dropdown-hover" style="font-size: 1.5rem" @click="updateTodoDone(todoItem.id, false)"></i>
          </div>
          <i class="pi pi-trash absolute bottom-2 right-2 link-hover cursor-pointer dropdown-hover" style="font-size: 1.5rem" @click="deleteTodo(todoItem.id)"></i>
          <button type="submit" class="absolute bottom-2 left-auto right-1/3 link-hover cursor-pointer dropdown-hover">Update Todo</button>
        </form>
      </div>
    </div>
    <div v-if="!isTodo" class="todoDiv w-5/6 h-full top-6  flex items-center justify-center fixed">
      <Todo @todoAdded="fetchTodos" class="card"></Todo>
    </div>
  </main>
  <Button icon="pi pi-plus" label="Add Todo" @click="addTodo"
    class="bg-emerald-500 p-2 text-gray-800 fixed right-3 bottom-3" />
</template>


<script setup>
import { onMounted, ref } from 'vue';
import Todo from '../components/Todo.vue';
import axios from 'axios';


const todo = ref([]);
const isTodo = ref(true);
const isDone = ref(false);


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

    /*!Equivalent to the above fetch with axios!*/
    // axios.get('http://localhost:8080/api/products/')
    //   .then((response) => {
    //     todo.value = response.data;
    //     console.log(todo.value);
    //     isTodo.value = true;
    //   })
    //   .catch((error) => console.error('Error fetching todos:', error));
};
const addTodo = async () => {
  isTodo.value = !isTodo.value;
  if (isTodo.value) {
    fetchTodos();

  }
};
const updateTodoContent = async (id) => {
  const todoItem = todo.value.find(item => item.id === id);
  const updatedTodo = { ...todoItem, name: todoItem.name, description: todoItem.description };

  axios.put(`http://localhost:8080/api/products/${id}`, updatedTodo)
    .then((response) => {
      console.log(response);
      fetchTodos();
    });
}
const updateTodoDone = async (id, done) => {
  const todoItem = todo.value.find(item => item.id === id);
  const updatedTodo = { ...todoItem, done: done };

  axios.put(`http://localhost:8080/api/products/${id}`, updatedTodo)
    .then((response) => {
      console.log(response);
      fetchTodos();
    });
}

 const deleteTodo= async (id) =>{
  axios.delete('http://localhost:8080/api/products/'+id)
  .then((response) => {
    console.log(response);
    fetchTodos();
  })
 }

</script>

<style scoped>
.todoDiv {
  height: 70vh;
}
.todo-container {
  height: 90vh;
  overflow: scroll;
  overflow-x: hidden;
  overflow-y: hidden;
  scrollbar-width: none;
  -ms-overflow-style: none;
  
}
.todo-container::-webkit-scrollbar {
  display: none;
}
</style>