<template>
    <Card style="width: 25em" class="glass bg-emerald-400 bg-opacity-25">
        <template #title > New Todo </template>
        <template #subtitle>
            <p class=" text-gray-800">
                {{ todoName || "Name of the Todo" }} 
            </p>
        </template>
        <template #content>
            <div class="card flex justify-content-center">
                <form @submit.prevent="onSubmit" class="flex flex-column gap-2">
                    <label for="todoName">Card Title?</label>
                    <span class="p-float-label">
                        <InputText id="todoName" v-model="todoName" :class="{ 'p-invalid': todoNameError }" size="small" aria-describedby="todoName-error" class="w-full"/>
                        <small id="todoName-error" class="p-error">{{ todoNameError || '&nbsp;' }}</small>
                    </span>
                    <label for="todoValue">What do you want to do?</label>
                    <span class="p-float-label">
                        <InputText id="todoValue" v-model="todoValue" :class="{ 'p-invalid': todoValueError }" size="small" aria-describedby="todoValue-error" class="w-full"/>
                        <small id="todoValue-error" class="p-error">{{ todoValueError || '&nbsp;' }}</small>
                    </span>
                    <Button type="submit" label="Submit" class=" text-gray-800"/>
                </form>
                <Toast />
            </div>
        </template>
    
    </Card>
</template>

<script setup>
import { useField, useForm } from 'vee-validate';
import { useToast } from 'primevue/usetoast';
import { computed, defineEmits } from 'vue';
const emit  = defineEmits(['todoAdded']);


const { handleSubmit, resetForm } = useForm();
const toast = useToast();

const validateTodoName = (todoName) => {
    if (!todoName) {
        console.log('todoName', todoName);  // Debug: Check what todoName is being received
        return 'Title is required.';
    }
    return true;
};

const validateTodoValue = (todoValue) => {
    if (!todoValue) {
        return 'Description is required.';
    }
    return true;
};

// Use useField to create reactive state for todoName and value
const { value: todoName, errorMessage: todoNameError } = useField('todoName', validateTodoName);
const { value: todoValue, errorMessage: todoValueError } = useField('todoValue', validateTodoValue);

// Define a computed property for todoName to be used with v-model
// const todoNameComputed = computed({
//   get() { return todoName.value; },
//   set(val) {
//     todoName.value = val;
//   }
// });
const createTodo = () => {
    fetch('http://localhost:8080/api/products/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: todoName.value,
            description: todoValue.value,
        }),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success:', data);
            // emit('todoAdded');
        })
        .catch((error) => {
            console.error('Error:', error);
        });
};

const onSubmit = handleSubmit((values) => {
    if (values.todoName && values.todoValue) {
        toast.add({ severity: 'info', summary: 'Form Submitted', detail: `Title: ${values.todoName}, Description: ${values.todoValue}`, life: 3000 });
        createTodo();
        resetForm();
        // After successfully adding the todo to your backend
emit('todoAdded'); // Notify the parent component that a todo was added

    } else {
        toast.add({ severity: 'error', summary: 'Form Invalid', detail: 'Please fill in all required fields.', life: 3000 });
    }
});
</script>


<style scoped>
/* Your styles here */
</style>
