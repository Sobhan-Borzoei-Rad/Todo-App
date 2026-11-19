
const input = document.getElementById('input');

const addTask = document.getElementById('add-task');

const tasks = document.getElementById('tasks');

const counter = document.getElementById('counter');

const allBtn = document.getElementById('all');

const activeBtn = document.getElementById('active');

const copmeletedBtn = document.getElementById('completed');

const taskData = JSON.parse(localStorage.getItem('task')) || [];



function renderTask(task) {
    const taskItem = document.createElement('li');
    const taskTitle = document.createElement('span')
    taskItem.append(taskTitle)
    taskTitle.textContent = task.title;

    if (task.completed) {
        taskItem.classList.add('completed');
    }

    taskItem.addEventListener('click', () => {
        task.completed = !task.completed;
        taskItem.classList.toggle('completed');

        localStorage.setItem('task', JSON.stringify(taskData));
    });

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove Task';
    removeButton.classList.add('remove-btn');

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit Task';

    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save Task';

    removeButton.addEventListener('click', (event) => {
        event.stopPropagation();

        const index = taskData.indexOf(task);
        taskData.splice(index, 1);

        taskItem.remove();

        localStorage.setItem('task', JSON.stringify(taskData));

        totalTask();
    });

    taskItem.append(removeButton);

    editButton.addEventListener('click', (event) => {
        event.stopPropagation();
        input.value = task.title
        editButton.remove()
        taskItem.append(saveButton);
    })

    taskItem.append(editButton);

    saveButton.addEventListener('click', (event) => {
        event.stopPropagation();

        if (input.value.trim() === '') {
            return;
        }

        task.title = input.value.trim();

        taskTitle.textContent = task.title;

        localStorage.setItem('task', JSON.stringify(taskData));

        input.value = '';

        saveButton.remove();

        taskItem.append(editButton);
    })

    tasks.append(taskItem);
}

taskData.forEach((task) => {
    renderTask(task);
});

addTask.addEventListener('click', (event) => {
    event.preventDefault();

    if (input.value.trim() === '') {
        return;
    }

    const newTask = {
        title: input.value.trim(),
        completed: false
    };

    taskData.push(newTask);

    localStorage.setItem('task', JSON.stringify(taskData));

    renderTask(newTask);

    totalTask();

    input.value = '';
});

function totalTask() {
    const totalTasks = document.querySelectorAll('#tasks li');
    counter.textContent = totalTasks.length;
}

totalTask();


allBtn.addEventListener('click', (event) => {
    event.preventDefault();

    tasks.innerHTML = '';
    taskData.forEach((task) => {
        renderTask(task);
    });

    totalTask();
})


activeBtn.addEventListener('click', (event) => {
    tasks.innerHTML = '';
    const activeTask = taskData.filter((task) => {
        return task.completed === false;
    })
    activeTask.forEach((task) => {
        renderTask(task);
    })

    totalTask()
})

copmeletedBtn.addEventListener('click', (event) => {
    tasks.innerHTML = '';
    const completedTask = taskData.filter((task) => {
        return task.completed === true;
    })
    completedTask.forEach((task) => {
        renderTask(task)
    })

    totalTask()
})