{
    let hideDoneTasks = false;

    let tasks = [
        {
            content: "pozmywać naczynia",
            done: false,
        },
        {
            content: "przerobić moduł kursu",
            done: true,
        },
    ];

    const toggleHideDoneTasks = () => {
        hideDoneTasks = !hideDoneTasks;
        render();

    };

    const toggleMarkAllTasksDone = () => {
        tasks = tasks.map(tasks => ({...tasks, done: true}));
        render();
    };

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            {content: newTaskContent},
        ];
    
        render();
    };

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.filter(task => tasks.indexOf(task) !== taskIndex)
        ];

        render();
    };

    const toggleTaskDone = (index) => {
        tasks[index].done = !tasks[index].done;

        render();
    };

    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            })
        });

        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            })
        });

        

    };

    const bindButtonsEvents = () => {

        const hideDoneTasksButton = document.querySelector(".js-hideDoneTasks");
        const markAllTasksDoneButton = document.querySelector(".js-markAllTasksDone");

        if (hideDoneTasksButton && markAllTasksDoneButton) {
            hideDoneTasksButton.addEventListener("click", toggleHideDoneTasks);
            markAllTasksDoneButton.addEventListener("click", toggleMarkAllTasksDone);
        };

    };

    const renderTasks = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
                <li class="section__listItem${(task.done && hideDoneTasks) ? " section__listItem--hidden" : ""}">
                    <button class="section__buttons section__buttons--green js-done">${task.done ? "✔" : ""}</button>
                    <span class="section__item ${task.done ? "section__item--done" : ""}">${task.content}</span>
                    <button class="section__buttons js-remove">🗑</button>
                </li>
            `;
        };

        document.querySelector(".js-tasks").innerHTML = htmlString;

        
    };

    const render = () => {
        renderTasks();
        renderButtons();

        bindEvents();
        bindButtonsEvents();
    };


    const renderButtons = () => {
        const buttonElement = document.querySelector(".js-formButtons");

        if (!tasks.length) {
            buttonElement.innerHTML = "";
            return;
        }


        buttonElement.innerHTML = `
                <button class="form__button js-hideDoneTasks">${ hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone</button>
                <button class="form__button js-markAllTasksDone"${(tasks.every(({done}) => done)) ? " disabled" : ""}>Ukończ wszystkie</button>
            `;

    };


    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskContent = document.querySelector(".js-newTask").value.trim();

        if (newTaskContent === "") {
            return;
        }

        addNewTask(newTaskContent);
        document.querySelector(".js-newTask").value = "";
        document.querySelector(".js-newTask").focus();
    };

    const init = () => {

        render();
       
        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();
};