import { Commet } from "../types/commet";

export default function show(commet : any) {
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
    commetTitle.innerText = commet.obj_name;
    
    const solar_orbit = document.createElement("p")
    solar_orbit.innerText = `Órbita solar em = ${commet.p_ir} anos`
    const earth_distance = document.createElement("p")
    earth_distance.innerText = `Distancia da Terra = ${commet.moid_au} U.A`
    const sun_dinstance = document.createElement("p")
    sun_dinstance.innerText = `Graus: = ${commet.w_deg}`
    const ref = document.createElement("p")
    ref.innerText = `Ref: = ${commet.ref}`

    modal.appendChild(commetTitle);
    modal.appendChild(solar_orbit)
    modal.append(earth_distance)
    modal.append(sun_dinstance)
    document.body.appendChild(modal);
}
