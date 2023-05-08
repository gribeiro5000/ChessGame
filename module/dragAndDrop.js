import get from "./get.js"
import render from "./render.js"
import main from "../main.js"
import boardVector from "../objects/boardVector.js"
import move from "./move.js"
import validators from "./validators.js"
import fen from "../objects/fen.js"
import convert from "./convert.js"
import set from "./set.js"
import piecesProtectCheckMovements from "../objects/allowedHouses.js"

function createDropHouses(houses){
    for(var pos = 0; pos < houses.length; pos++){
        var house = document.getElementById(houses[pos])
        house.addEventListener(`dragenter`, dragEnter)
        house.addEventListener(`dragover`, dragOver)
        house.addEventListener(`dragleave`, dragLeave)
        house.addEventListener(`drop`, drop)
    }
}

function dragStart(){
    //this = piece
    this.classList.add(`PieceDragging`)
    var listId = []
    for(var pos = 0; pos < piecesProtectCheckMovements.length; pos++){
        if(this.id.substr(1, 2) == piecesProtectCheckMovements[pos].house){
            for(var posH = 0; posH < piecesProtectCheckMovements[pos].housesProtect.length; posH++){
                listId.push(piecesProtectCheckMovements[pos].housesProtect[posH])
            }
        }
    }
    createDropHouses(listId)
    for(var pos = 0; pos < listId.length; pos++){
        document.getElementById(listId[pos]).classList.add(`predict`)
    }
}

function dragEnd(){
    this.classList.remove(`PieceDragging`)
    var listId = document.getElementsByClassName(`predict`)
    for(var pos = listId.length - 1; listId.length > 0; pos--){
        listId[pos].classList.remove(`predict`)

    }
    render.refresh()
}

function dragEnter(e){
    //this = house
    e.preventDefault()
    this.classList.add(`drag-over`)
}

function dragOver(e){
    //this = house
    e.preventDefault()
    this.classList.add(`drag-over`)
}

function dragLeave(){
    //this = house
    this.classList.remove(`drag-over`)
}

function drop(e){
    //this = house
    this.classList.remove(`drag-over`)
    var pieceDragging = document.querySelector(`.PieceDragging`)
    var houseId = this.id

    if(this.childNodes.length == 0){
        //movePiece
        this.appendChild(pieceDragging)

        //validadores de movimentos especiais
        validators.castle(pieceDragging, houseId)
        validators.enPassant(pieceDragging, houseId)
        validators.promotion(pieceDragging, houseId)


        fen.halfmoveClock++
        fen.activeColor = convert.convertActiveColor(fen.activeColor)
    } else {
        var childId = this.firstChild.id
        document.getElementById(childId).remove()
        this.appendChild(pieceDragging)

        validators.enPassant(pieceDragging, houseId)
        validators.promotion(pieceDragging, houseId)

        fen.activeColor = convert.convertActiveColor(fen.activeColor)
        fen.halfmoveClock = 0
    }

    if(validators.fullmoveValidator(pieceDragging.id)){
        fen.fullmoveClock++
    }

    pieceDragging.classList.remove(`PieceDragging`)
    render.refresh()
}

export default {
    createDropHouses: createDropHouses,
    dragStart: dragStart,
    dragEnter: dragEnter,
    dragOver: dragOver,
    dragLeave: dragLeave,
    drop: drop,
    dragEnd: dragEnd
}