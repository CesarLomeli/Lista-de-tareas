document.addEventListener('DOMContentLoaded', function () {
    //Formulario para agregar tareas
    const taskForm = document.getElementById('task-form');
    //Lista de tareas
    const taskList = document.getElementById('task-list');
    //Input de nueva tarea
    const newTaskInput = document.getElementById('new-task');

    // Función para cargar las tareas desde localStorage
    function loadTasks() {
        //Creación de json para guardar en localstorage
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        //Iterar JSON
        tasks.forEach(task => {
            //Entramos a cada una de las tareas y creamos elemento
            const newTask = document.createElement('li');
            newTask.textContent = task.text;
            if (task.completed) {
                newTask.classList.add('completed'); // Si la tarea estaba completada, agregar la clase
            }

            // Agregar botón de eliminar
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Eliminar';
            deleteBtn.classList.add('delete-btn');
            newTask.appendChild(deleteBtn);
            taskList.appendChild(newTask);
        });
    }

    // Función para guardar las tareas en localStorage
    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('li').forEach(task => {
            tasks.push({
                text: task.firstChild.textContent,
                completed: task.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Escuchar el evento submit del formulario
    taskForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Evitar que el formulario recargue la página
        // Obtener el valor de la nueva tarea
        const taskText = newTaskInput.value.trim();
        // Solo agregar si hay texto en el campo de entrada
        if (taskText !== '') {
            // Crear un nuevo elemento <li> para la tarea
            const newTask = document.createElement('li');
            newTask.textContent = taskText;
            // Agregar un botón de eliminar para la tarea
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Eliminar';
            deleteBtn.classList.add('delete-btn');
            // Agregar la tarea y el botón a la lista
            newTask.appendChild(deleteBtn);
            taskList.appendChild(newTask);
            // Guardar la lista actualizada en localStorage
            saveTasks();
            // Limpiar el campo de texto
            newTaskInput.value = '';
        }
    });

    // Escuchar eventos de click en los botones de eliminar
    taskList.addEventListener('click', function (e) {
        if (e.target.classList.contains('delete-btn')) {
            const taskToRemove = e.target.parentElement;
            taskList.removeChild(taskToRemove); // Eliminar la tarea de la lista
            // Guardar la lista actualizada en localStorage
            saveTasks();
        }
        // Si la tarea es clicada, marcarla como completada
        if (e.target.tagName === 'LI') {
            e.target.classList.toggle('completed'); // Alternar la clase 'completed'
            // Guardar la lista actualizada en localStorage
            saveTasks();
        }
    });
    // Cargar las tareas desde localStorage cuando la página se carga
    loadTasks();
});
