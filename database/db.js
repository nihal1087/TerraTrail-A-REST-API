import { data } from "../data/data.js"

export async function getDataFromDB(){
    return structuredClone(data)
}

export async function addPlace(newPlace) {
    data.push(newPlace)
    return newPlace
}
