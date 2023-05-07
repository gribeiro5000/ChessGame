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
    if(notationP != `1`){
        var img = document.createElement("img")
        img.className = `piece`
        img.id=notationP + house
        img.src=get.getImgPieceByNotation(notationP)
        //img.draggable=`true`
        //img.addEventListener(`dragstart`, dragAndDrop.dragStart)
        //img.addEventListener(`dragend`, dragAndDrop.dragEnd)
        document.getElementById(house).appendChild(img)
    }
    //if(fen.mate != `+`){
    //    if(validators.activeColor(fen.activeColor) == validators.pieceColor(notationP) && notationP != `1`){
    //        var img = document.createElement("img")
    //        img.className = `piece`
    //        img.id=notationP + house
    //        img.src=get.getImgPieceByNotation(notationP)
    //        img.draggable=`true`
    //        img.addEventListener(`dragstart`, dragAndDrop.dragStart)
    //        img.addEventListener(`dragend`, dragAndDrop.dragEnd)
    //        document.getElementById(house).appendChild(img)
    //    } else if (notationP != `1`){
    //        var img = document.createElement("img")
    //        img.className = `piece`
    //        img.id=notationP + house
    //        img.src=get.getImgPieceByNotation(notationP)
    //        img.addEventListener(`click`, function(){
    //            alert(main.colorAlert())
    //        })
    //        img.addEventListener(`dragstart`, function(){
    //            alert(main.colorAlert())
    //        })
    //        document.getElementById(house).appendChild(img)
    //    }
    //} else {
    //    if(validators.activeColor(fen.activeColor) == validators.pieceColor(notationP) && notationP != `1`){
    //        validators.pieceCheckMoveValidator(notationP, house)
    //    }
    //    if(piecesProtectCheckMovements.length > 0 && piecesProtectCheckMovements[piecesProtectCheckMovements.length - 1].notation == notationP && piecesProtectCheckMovements[piecesProtectCheckMovements.length - 1].house == house){
    //        if(notationP == `K` || notationP == `k`){
    //            var img = document.createElement("img")
    //            img.className = `piece check`
    //            img.id=notationP + house
    //            img.src=get.getImgPieceByNotation(notationP)
    //            img.draggable=`true`
    //            img.addEventListener(`dragstart`, dragAndDrop.dragStart)
    //            img.addEventListener(`dragend`, dragAndDrop.dragEnd)
    //            document.getElementById(house).appendChild(img)
    //        } else {
    //            var img = document.createElement("img")
    //            img.className = `piece`
    //            img.id=notationP + house
    //            img.src=get.getImgPieceByNotation(notationP)
    //            img.draggable=`true`
    //            img.addEventListener(`dragstart`, dragAndDrop.dragStart)
    //            img.addEventListener(`dragend`, dragAndDrop.dragEnd)
    //            document.getElementById(house).appendChild(img)
    //        }
    //    } else if(notationP != `1`){
    //        var img = document.createElement("img")
    //        img.className = `piece`
    //        img.id=notationP + house
    //        img.src=get.getImgPieceByNotation(notationP)
    //        img.addEventListener(`click`, function(){
    //            alert(main.colorAlertCheck())
    //        })
    //        img.addEventListener(`dragstart`, function(){
    //            alert(main.colorAlertCheck())
    //        })
    //        document.getElementById(house).appendChild(img)
    //    }
    //} 
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