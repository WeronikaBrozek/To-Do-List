{
    const welcome = () => {
        console.log("Cześć! 😎");
    };

    const tasks = [
        {
            content: "pozmywać naczynia",
            done: false,
        },
        {
            content: "przerobić moduł kursu",
            done: true,
        },
    ];

    const addNewTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent,
        });

        render();
    };

    const removeTask = (index) => {
        tasks.splice(index, 1);

        render();
    };

    const toggleTaskDone = (index) => {
        tasks[index].done = !tasks[index].done;

        render();
    };

    const bindEvenets = () => {
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


    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
                <li class="internalContainer__listItem">
                    <button class="container__buttons container__buttons--green js-done">${task.done ? "✔" : ""}</button>
                    <span class="container__item ${task.done ? "container__item--done" : "" }">${task.content}</span>
                    <button class="container__buttons js-remove">🗑</button>
                </li>
            `;
        };

        

        document.querySelector(".js-tasks").innerHTML = htmlString;

        bindEvenets();
    };


    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskContent = document.querySelector(".js-newTask").value.trim();

        if (newTaskContent === "") {
            return;
        }

        addNewTask(newTaskContent);
    };

    const init = () => {

        render();
        welcome();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();
};