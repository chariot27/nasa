import { Commet } from "../types/commet";
import show from "./showObject";

export default function createMenu(commet: Commet[]) {
    const menuContainer = document.createElement("div");
    menuContainer.classList.add("menu");

    const menuButton = document.createElement("button");

    const cometImage = document.createElement("img");
    cometImage.src = "../images/cometa.png";
    cometImage.classList.add("comet-icon");
    
    cometImage.style.width = "30px"; 
    cometImage.style.height = "30px"; 
    
    menuButton.appendChild(cometImage);
    menuButton.classList.add("menu-button");
    menuContainer.appendChild(menuButton);

    const menuOptions = document.createElement("div");
    menuOptions.classList.add("menu-options");
    menuOptions.style.display = "none";

    // Criação do campo de texto para pesquisa
    const searchBox = document.createElement("input");
    searchBox.type = "text";
    searchBox.placeholder = "Pesquisar cometas...";
    searchBox.classList.add("search-box");
    
    searchBox.style.backgroundColor = "rgba(168, 154, 154, 0.5)";
    searchBox.style.color = "white";
    searchBox.style.border = "none";
    searchBox.style.padding = "5px"; 
    searchBox.style.marginBottom = "5px";
    searchBox.style.width = "100%"; 

    menuOptions.appendChild(searchBox);

    menuButton.addEventListener("click", (event) => {
        event.stopPropagation();
        menuOptions.style.display = menuOptions.style.display === "none" ? "block" : "none";
    });

    let visibleIndex = 0;
    const visibleItemsCount = 5;

    const updateMenuVisibility = (filter = "") => {
        const items = Array.from(menuOptions.getElementsByClassName("comet-item"));
        items.forEach((child, index) => {
            const element = child as HTMLElement;
            const matchesFilter = filter === "" || element.textContent?.toLowerCase().includes(filter.toLowerCase());
            element.style.display = matchesFilter && index >= visibleIndex && index < visibleIndex + visibleItemsCount ? 'block' : 'none';
        });
    };

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
        updateMenuVisibility(searchBox.value); // Atualiza com o filtro atual
    });

    // Evento de entrada no campo de pesquisa
    searchBox.addEventListener("input", () => {
        visibleIndex = 0; // Reseta o índice visível ao filtrar
        updateMenuVisibility(searchBox.value); // Atualiza a visibilidade com base no filtro
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
                searchBox.value = ""; // Limpa o campo de pesquisa
                updateMenuVisibility(); // Atualiza a visibilidade sem filtro
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