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

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
                <li
                ${task.done ? " style=\"tekst-decoration: line-through\"" : ""}
            >
                ${task.content}
                </li>
            `;
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;
    };

    const init = () => {

        render();
        welcome();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", (event) => {
            event.preventDefault();

            const newTaskContent = document.querySelector(".js-newTask").value.trim();
           
            if(newTaskContent === "") {
                return;
            }

            tasks.push({
                content: newTaskContent,
            });

            render();
        });
    };

    init();
}