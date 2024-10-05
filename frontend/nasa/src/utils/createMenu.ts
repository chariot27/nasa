import { Commet } from "../types/commet";

export default function createMenu(commet: Commet[]) {

    const menuContainer = document.createElement("div");
    menuContainer.classList.add("menu");

    const menuButton = document.createElement("button");
    menuButton.textContent = "☰";
    menuButton.classList.add("menu-button");
    menuContainer.appendChild(menuButton);

    const menuOptions = document.createElement("div");
    menuOptions.classList.add("menu-options");
    menuOptions.style.display = "none";

    const options: string[] = [];

    for (let i = 0; i < commet.comets.length; i++) {
        options.push(commet.comets[i].obj_name);
        console.log(commet.comets[i].obj_name);
    }

    menuButton.addEventListener("click", (event) => {
        event.stopPropagation();
        menuOptions.style.display = menuOptions.style.display === "none" ? "block" : "none";
        alert("sucesso");
    });

    menuContainer.appendChild(menuOptions);
    document.body.appendChild(menuContainer);

    menuButton.addEventListener("mouseenter", () => {
        menuOptions.style.display = "block";
        addOptionsToMenu();
    });

    menuOptions.addEventListener("mouseenter", () => {
        menuOptions.style.display = "block";
    });

    menuButton.addEventListener("mouseleave", () => {
        hideOptions();
    });

    menuOptions.addEventListener("mouseleave", () => {
        hideOptions();
    });

    function addOptionsToMenu() {
        options.forEach(option => {
            const optionElement = document.createElement("div");
            optionElement.textContent = option;
            optionElement.classList.add("menu-option");
            menuOptions.appendChild(optionElement);
        });
    }

    function hideOptions() {
        setTimeout(() => {
            if (!menuContainer.matches(':hover')) {
                menuOptions.style.display = "none";
                menuOptions.innerHTML = '';
            }
        }, 100);
    }

    document.addEventListener("click", (event) => {
        if (menuOptions.style.display === "block") {
            const target = event.target as Node;
            const isClickInsideMenu = menuContainer.contains(target);
            if (!isClickInsideMenu) {
                hideOptions();
            }
        }
    });
}

