import validators from "./validators.js"
import get from "./get.js"
import dragAndDrop from "./dragAndDrop.js"
import main from "../main.js"
import fen from "../objects/fen.js"
import piecesProtectCheckMovements from "../objects/allowedHouses.js"

function createDivHouse(housePosition){
    var house = document.createElement("div")
    house.className = `house`
    house.id = housePosition
    document.getElementById(`board`).appendChild(house) 
}

function createColorHouse(positionX, positionY, housePosition){
    if(positionX%2 != 0){
        if(positionY%2 != 0){
            document.getElementById(housePosition).style.backgroundColor = `#ffce9e`//branco
        } else if(positionY%2 == 0){
            document.getElementById(housePosition).style.backgroundColor = `#d18b47`//preto
        }
    } else if(positionX%2 == 0){
        if(positionY%2 == 0){
            document.getElementById(housePosition).style.backgroundColor = `#ffce9e`//branco
        }else if(positionY%2 != 0){
            document.getElementById(housePosition).style.backgroundColor = `#d18b47`//preto
        }
    }
}

function createPiece(notationP, house){
    if(fen.mate == `+` && notationP == `k` && fen.activeColor == `b` || fen.mate == `+` && notationP == `K` && fen.activeColor == `w`){
        var img = document.createElement("img")
        img.className = `piece check`
        img.id=notationP + house
        img.src=get.getImgPieceByNotation(notationP)
        document.getElementById(house).appendChild(img)
    }
    else if(notationP != `1`){
        var img = document.createElement("img")
        img.className = `piece`
        img.id=notationP + house
        img.src=get.getImgPieceByNotation(notationP)
        document.getElementById(house).appendChild(img)
    }
}

function createDragPieces(){
    for(var pos = 0; pos < piecesProtectCheckMovements.length; pos++){
        var piece = piecesProtectCheckMovements[pos]
        var img = document.getElementById(piece.house).firstChild
        img.addEventListener(`dragstart`, dragAndDrop.dragStart)
        img.addEventListener(`dragend`, dragAndDrop.dragEnd)
    }
}

export default {
    createDivHouse: createDivHouse,
    createColorHouse: createColorHouse,
    createPiece: createPiece,
    createDragPieces: createDragPieces
}