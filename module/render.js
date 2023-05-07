import create from "./create.js"
import convert from "./convert.js"
import main from "../main.js"
import _delete from "./delete.js"
import dragAndDrop from "./dragAndDrop.js"
import fen from "../objects/fen.js"
import piecesAllowedMoves from "../objects/allowedHouses.js"

function boardRender(board){
    for(var posX in board){
        for(var posY in board[posX]){
            var housePosition = board[posX][posY].house
            create.createDivHouse(housePosition)
            create.createColorHouse(posX, posY, housePosition)
        }
    }
}

function load(vectorBoard){
    for(let posX = 0; posX < vectorBoard.length; posX++){
        for(let posY = 0; posY < vectorBoard[posX].length; posY++){
            create.createPiece(vectorBoard[posX][posY].notation, vectorBoard[posX][posY].house)
        }
    }
}

function refresh(){
    for(var pos = piecesAllowedMoves.length - 1; piecesAllowedMoves.length > 0; pos--){
        piecesAllowedMoves.pop();
    }
    var vector = convert.ConvertboardToVector()
    fen.position = convert.ConvertVectorToFen(vector)
    _delete.deleteAllPieces()
    _delete.deleteAllHouses()
    main.update()
}



export default {
    boardRender: boardRender,
    refresh: refresh,
    load: load
}