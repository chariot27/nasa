import { Commet } from "../types/commet";
import show from "./showObject";

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

    menuButton.addEventListener("click", (event) => {
        event.stopPropagation();
        menuOptions.style.display = menuOptions.style.display === "none" ? "block" : "none";
    });

    let visibleIndex = 0; // Índice do primeiro item visível
    const visibleItemsCount = 5; // Quantidade de itens visíveis por vez

    const updateMenuVisibility = () => {
        menuOptions.childNodes.forEach((child, index) => {
            const element = child as HTMLElement;
            element.style.display = index >= visibleIndex && index < visibleIndex + visibleItemsCount ? 'block' : 'none';
        });
    };

    // Adiciona cada cometa à lista de opções
    commet.comets.forEach((cometItem) => {
        const optionDiv = document.createElement("div");
        optionDiv.classList.add("comet-item");

        const optionElement = document.createElement("div");
        optionElement.textContent = cometItem.obj_name; 
        optionElement.classList.add("menu-option");

        optionElement.addEventListener("click",()=>{
            show(cometItem)
        })

        optionDiv.appendChild(optionElement);
        menuOptions.appendChild(optionDiv);
    });

    menuContainer.appendChild(menuOptions);
    document.body.appendChild(menuContainer);

    updateMenuVisibility(); // Atualiza a visibilidade dos primeiros itens ao iniciar

    menuOptions.addEventListener("wheel", (event) => {
        event.preventDefault();
        const direction = Math.sign(event.deltaY);
        const maxIndex = commet.comets.length - visibleItemsCount;

        visibleIndex = Math.min(Math.max(visibleIndex + direction, 0), maxIndex);
        updateMenuVisibility();
    });

    // Manter o menu visível ao passar o mouse sobre o botão ou as opções
    menuButton.addEventListener("mouseenter", () => {
        menuOptions.style.display = "block";
    });

    menuOptions.addEventListener("mouseenter", () => {
        menuOptions.style.display = "block";
    });

    // Ocultar o menu quando o mouse sai do botão ou do menu
    menuButton.addEventListener("mouseleave", () => {
        hideOptions();
    });

    menuOptions.addEventListener("mouseleave", () => {
        hideOptions();
    });

    // Função para ocultar opções
    function hideOptions() {
        setTimeout(() => {
            if (!menuContainer.matches(':hover')) {
                menuOptions.style.display = "none"; // Oculta o menu se o mouse não estiver sobre ele
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