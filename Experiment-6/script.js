let taskInput = document.getElementById("taskInput");
let addBtn = document.getElementById("addBtn");
let taskList = document.getElementById("taskList");

let tasks = [];

window.onload = function () {
    if (localStorage.getItem("tasks")) {
        tasks = JSON.parse(localStorage.getItem("tasks"));
        displayTasks();
    }
};

addBtn.addEventListener("click", function () {
    if (taskInput.value.trim() === "") return;

    tasks.push({
        text: taskInput.value,
        completed: false
    });

    taskInput.value = "";
    saveTasks();
    displayTasks();
});

function displayTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        let li = document.createElement("li");

        li.innerHTML = `
            <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
            <div>
                <button onclick="toggleComplete(${index})">✔</button>
                <button onclick="deleteTask(${index})">✖</button>
            </div>
        `;

        taskList.appendChild(li);
    });
}

function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    displayTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    displayTasks();
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
