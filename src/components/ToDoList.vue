<script setup lang="ts">
import { ref, onMounted } from 'vue'

const tasks = ref<{ id: number; text: string; completed: boolean; onHold: string }[]>([])
const newTask = ref('')

onMounted(() => {
  const savedTasks = localStorage.getItem('tasks')
  if (savedTasks) {
    tasks.value = JSON.parse(savedTasks)
  }
})

function addTask() {
  if (newTask.value.trim()) {
    const newTaskItem = { id: Date.now(), text: newTask.value, completed: false, onHold: '' }
    tasks.value.push(newTaskItem)
    localStorage.setItem('tasks', JSON.stringify(tasks.value))
    newTask.value = ''
  }
}

function toggleTask(id: number) {
  const task = tasks.value.find((task) => task.id === id)
  if (task) {
    task.completed = !task.completed
    localStorage.setItem('tasks', JSON.stringify(tasks.value))
  }
}

function deleteTask(id: number) {
  tasks.value = tasks.value.filter((task) => task.id !== id)
  localStorage.setItem('tasks', JSON.stringify(tasks.value))
}

function toggleOnHold(id: number) {
  const task = tasks.value.find((task) => task.id === id)
  if (task) {
    task.onHold = task.onHold ? '' : 'On Hold because'
    localStorage.setItem('tasks', JSON.stringify(tasks.value))
  }
}

function updateOnHold(id: number, value: string) {
  const task = tasks.value.find((task) => task.id === id)
  if (task) {
    task.onHold = value
    localStorage.setItem('tasks', JSON.stringify(tasks.value))
  }
}
</script>

<template>
  <div class="todo-container">
    <h1>ToDo List</h1>
    <div class="input-container">
      <input v-model="newTask" placeholder="Enter a new task" @keyup.enter="addTask" />
      <button @click="addTask">Add</button>
    </div>
    <div class="tasks-container">
      <div v-for="task in tasks" :key="task.id" class="task-item">
        <span @click="toggleTask(task.id)" :class="{ completed: task.completed }">{{
          task.text
        }}</span>
        <button @click="deleteTask(task.id)">Delete</button>

        <button @click="toggleOnHold(task.id)">
          {{ task.onHold ? 'Remove On Hold' : 'On Hold' }}
        </button>

        <div v-if="task.onHold">
          <textarea
            v-model="task.onHold"
            placeholder="Enter reason for OnHold"
            @blur="updateOnHold(task.id, task.onHold)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.todo-container {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  background-color: #f4f4f4;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-top: 2rem;
}

h1 {
  text-align: center;
  color: #333;
}

.input-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.input-container input {
  width: 80%;
  padding: 10px;
  font-size: 16px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.input-container button {
  width: 15%;
  padding: 10px;
  font-size: 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.input-container button:hover {
  background-color: #45a049;
}

.tasks-container {
  display: flex;
  flex-direction: column;
}

.task-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin-bottom: 10px;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.task-item span {
  flex-grow: 1;
  cursor: pointer;
}

.task-item button {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 1rem;
}

.task-item button:hover {
  background-color: #d32f2f;
}

.completed {
  text-decoration: line-through;
  color: grey;
}

.task-item textarea {
  width: 100%;
  padding: 5px;
  font-size: 14px;
  height: 60px;
  border-radius: 4px;
  border: 1px solid #ccc;
}
</style>
