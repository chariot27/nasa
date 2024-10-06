export default function getRandomCoordinate(MaxDistance: number) {
    const radius = MaxDistance * 40; // Fator de escala, se necessário
    const minDistance = 1.3; // Distância mínima
    const adjustedRadius = Math.max(radius, minDistance);

    const value = Math.random() * (adjustedRadius - minDistance) + minDistance; // Distância aleatória ajustada
    const chosen = getRandomNumber()

    if(chosen == 1){
        return{
            x:value,
            y:0,
            z:0
        }
    }else if(chosen == 2){
        return{
            x:0,
            y:value,
            z:0
        }
    }else{
        return{
            x:0,
            y:0,
            z:value
        }
    }
}
function getRandomNumber() {
    return Math.floor(Math.random() * 3) + 1; // Gera 1, 2 ou 3
}
