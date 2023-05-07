function deleteAllPieces(){
    var pieces = document.getElementsByClassName(`piece`)
    for(var pos = pieces.length - 1; pieces.length >= 1; pos--){
        pieces[pos].remove()
    }
}

function deleteAllHouses(){
    var houses = document.getElementsByClassName(`house`)
    for(var pos = houses.length - 1; houses.length >= 1; pos--){
        houses[pos].remove()
    }
}

export default {
    deleteAllPieces: deleteAllPieces,
    deleteAllHouses: deleteAllHouses
}