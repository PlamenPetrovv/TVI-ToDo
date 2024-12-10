<script setup lang="ts">
import { ref } from 'vue'

const tasks = ref<{ id: number; text: string; completed: boolean }[]>([])
const newTask = ref('')

function addTask() {
  if (newTask.value.trim()) {
    tasks.value.push({ id: Date.now(), text: newTask.value, completed: false })
    newTask.value = ''
  }
}

function toggleTask(id: number) {
  const task = tasks.value.find((task) => task.id === id)
  if (task) task.completed = !task.completed
}

function deleteTask(id: number) {
  tasks.value = tasks.value.filter((task) => task.id !== id)
}
</script>

<template>
  <div>
    <h1>ToDo List</h1>
    <input v-model="newTask" placeholder="Enter a new task" @keyup.enter="addTask" />
    <button @click="addTask">Add</button>
    <ul>
      <li v-for="task in tasks" :key="task.id" :class="{ completed: task.completed }">
        <span @click="toggleTask(task.id)">{{ task.text }}</span>
        <button @click="deleteTask(task.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.completed {
  text-decoration: line-through;
  color: grey;
}
</style>
