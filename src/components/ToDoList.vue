<script setup lang="ts">
import { ref, onMounted } from 'vue'

const tasks = ref<{ id: number; text: string; completed: boolean; onHold: string }[]>([])
const newTask = ref('')
const editTaskId = ref<number | null>(null)
const editTaskText = ref('')

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
    task.onHold = task.onHold ? '' : 'on hold'
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

function startEditingTask(id: number, currentText: string) {
  editTaskId.value = id
  editTaskText.value = currentText
}

function saveEdit() {
  if (editTaskId.value !== null) {
    const task = tasks.value.find((task) => task.id === editTaskId.value)
    if (task) {
      task.text = editTaskText.value
      localStorage.setItem('tasks', JSON.stringify(tasks.value))
      editTaskId.value = null
      editTaskText.value = ''
    }
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
      <div class="task-item" v-for="task in tasks" :key="task.id">
        <span @click="toggleTask(task.id)" :class="{ completed: task.completed }">
          {{ task.text }}
        </span>

        <div class="buttons">
          <button class="btn-style-blue" @click="startEditingTask(task.id, task.text)">
            Edit task
          </button>
          <button class="btn-style" @click="deleteTask(task.id)">Delete</button>
          <button class="btn-style" @click="toggleOnHold(task.id)">
            {{ task.onHold ? 'Remove On Hold' : 'On Hold' }}
          </button>
        </div>

        <div v-if="editTaskId === task.id">
          <input v-model="editTaskText" />
          <button @click="saveEdit">Save</button>
        </div>

        <!-- Показване на текстово поле за задачите в режим "on hold" -->
        <textarea
          v-if="task.onHold"
          v-model="task.onHold"
          placeholder="Enter reason for OnHold"
          @input="updateOnHold(task.id, task.onHold)"
        ></textarea>
      </div>
    </div>
  </div>
</template>

<style scoped>
.todo-container {
  width: 100%;
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
  gap: 15px;
}

.task-item span {
  flex: 1;
  cursor: pointer;
}

.buttons {
  display: flex;
  gap: 20px;
  justify-content: center;
}

.btn-style-blue {
  background-color: rgb(3, 153, 253);
  padding: 0.5rem 1rem;
  margin-right: 1rem;
  border-radius: 4px;
}
.btn-style {
  background-color: rgb(187, 4, 4);
  padding: 0.5rem 1rem;
  margin-right: 1rem;
  border-radius: 4px;
}

.task-item .buttons {
  display: flex;
  gap: 5px;
  justify-content: center;
}

.task-item button:hover {
  background-color: #c15151;
}

.completed {
  text-decoration: line-through;
  color: grey;
}

.task-item input {
  flex: 1;
  padding: 5px;
  font-size: 14px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.task-item textarea {
  flex: 2;
  padding: 5px;
  font-size: 14px;
  height: 60px;
  border-radius: 4px;
  border: 1px solid #ccc;
  max-width: 500px;
}
</style>
