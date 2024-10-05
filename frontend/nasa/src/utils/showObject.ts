import { Commet } from "../types/commet";

export default function show(commet: Commet) {
    const existingModal: HTMLElement | null = document.getElementById('detail-modal');
    if (existingModal) {
        // Remove o modal existente do body
        document.body.removeChild(existingModal);
    }
    createModal(commet);
}

function createModal(commet: Commet) {
    const modal = document.createElement("div");
    modal.id = 'detail-modal';
    
    const commetTitle = document.createElement("h2");
    commetTitle.innerText = commet.obj_name;
    
    const solar_orbit = document.createElement("p");
    solar_orbit.innerText = `Órbita solar em: ${commet.p_ir} anos`;
    
    const earth_distance = document.createElement("p");
    earth_distance.innerText = `Distância da Terra: ${commet.moid_au} U.A`;
    
    const sun_distance = document.createElement("p");
    sun_distance.innerText = `Graus: ${commet.w_deg}`;
    
    const ref = document.createElement("p");
    ref.innerText = `Ref: ${commet.ref}`;
    
    // Adiciona os elementos ao modal
    modal.appendChild(commetTitle);
    modal.appendChild(solar_orbit);
    modal.appendChild(earth_distance);
    modal.appendChild(sun_distance);
    modal.appendChild(ref);
    
    // Adiciona o modal ao body
    document.body.appendChild(modal);
}
