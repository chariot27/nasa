import { Commet } from "../types/commet";

export default function show(commet: Commet) {
    const modal: HTMLElement | null = document.querySelector('.modal');
    if (modal) {
        modal.remove();
    }
    createModal(commet);
}

function createModal(commet: Commet) {
    const modal = document.createElement("div");
    modal.classList.add("detail-modal"); 
    const commetTitle = document.createElement("h2");
    commetTitle.innerText = commet.name;

    const solar_orbit = document.createElement("p")
    solar_orbit.innerText = `Órbita solar = ${commet.solar_orbit}`
    const earth_distance = document.createElement("p")
    earth_distance.innerText = `Distancia da Terra = ${commet.earth_distance}`
    const sun_dinstance = document.createElement("p")
    sun_dinstance.innerText = `Órbita solar = ${commet.sun_dinstance}`
    const ref = document.createElement("p")
    ref.innerText = `Ref (dado não oculto) = ${commet.ref}`

    modal.appendChild(commetTitle);
    modal.appendChild(solar_orbit)
    modal.append(earth_distance)
    modal.append(sun_dinstance)
    document.body.appendChild(modal);
}
