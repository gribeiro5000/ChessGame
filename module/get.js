import validators from "./validators.js"
import boardVector from "../objects/boardVector.js"
import move from "./move.js"

function getImgPieceByNotation(notation){
    if(notation == `p`)
        return `../pieces/pawn_black.png`
    
    if(notation == `r`)
        return `../pieces/rook_black.png`
    
    if(notation == `n`)
        return `../pieces/knightLeft_black.png`
    
    if(notation == `b`)
        return `../pieces/bishop_black.png`

    if(notation == `q`)
        return `../pieces/queen_black.png`
    
    if(notation == `k`)
        return `../pieces/king_black.png`
    
    if(notation == `P`)
        return `../pieces/pawn_white.png`
    
    if(notation == `R`)
        return `../pieces/rook_white.png`
    
    if(notation == `N`)
        return `../pieces/knightLeft_white.png`
    
    if(notation == `B`)
        return `../pieces/bishop_white.png`

    if(notation == `Q`)
        return `../pieces/queen_white.png`
    
    if(notation == `K`)
        return `../pieces/king_white.png`
}

function getDropHouses(vector, activeColor){
    var dropHousesId = []
    for(var posX = 0; posX < vector.length; posX++){
        for(var posY = 0; posY < vector[posX].length; posY++){
            if(vector[posX][posY].notation != `1`){
                if(validators.activeColor(activeColor) != validators.pieceColor(vector[posX][posY].notation)){
                    dropHousesId.push(vector[posX][posY].house)
                }
            } else {
                dropHousesId.push(vector[posX][posY].house)
            }
        }
    }
    return dropHousesId
}

function getHousesId(){
    var houses = [[]]
    for(var posX = 0; posX < 8; posX++){
        for(var posY = 0; posY < 8; posY++){
            houses[posX].push(document.getElementById(validators.columnValidator(posY) + validators.lineValidator(posX)))
        }
        if(posX < 7){
            houses.push([])
        }
    }
    return houses
}

function getNotationByHouseId(houseDiv){
    if(houseDiv.firstChild != null){
        return houseDiv.firstChild.id[0]
    } else {
        return `1`
    }
}

function getHousesIdActiveColor(activeColor){
    var houses = [[]]
    for(var posX = 0; posX < 8; posX++){
        for(var posY = 0; posY < 8; posY++){
            var id = validators.columnValidator(posY) + validators.lineValidator(posX)
            if(validators.pieceColor(document.getElementById(id).firstChild != null)){
                if(validators.activeColor(activeColor) != validators.pieceColor(document.getElementById(id).firstChild.id)){
                    houses[posX].push(document.getElementById(id))
                }
            } else {
                houses[posX].push(document.getElementById(id))
            }
        }
        if(posX < 7){
            houses.push([])
        }
    }
    return houses
}

function getHousesAttackedByBlack(){
    var boardV = boardVector.board
    var houses = []
    for(var posX = 0; posX < boardV.length; posX++){
        for(var posY = 0; posY < boardV[posX].length; posY++){
            if(boardV[posX][posY].notation != `1` && boardV[posX][posY].color == `black`){
                var pieceId = boardV[posX][posY].notation + boardV[posX][posY].house
                houses.push(...move.predictHousesAttack(pieceId))
            }
        }
    }
    return houses
}

function getHousesAttackedByWhite(){
    var boardV = boardVector.board
    var houses = []
    for(var posX = 0; posX < boardV.length; posX++){
        for(var posY = 0; posY < boardV[posX].length; posY++){
            if(boardV[posX][posY].notation != `1` && boardV[posX][posY].color == `white`){
                var pieceId = boardV[posX][posY].notation + boardV[posX][posY].house 
                houses.push(...move.predictHousesAttack(pieceId))
            }
        }
    }
    return houses
}

function getLineVectorByHouse(house){
    if(house[1] == 1)
        return 7
    if(house[1] == 2)
        return 6
    if(house[1] == 3)
        return 5
    if(house[1] == 4)
        return 4
    if(house[1] == 5)
        return 3
    if(house[1] == 6)
        return 2
    if(house[1] == 7)
        return 1
    if(house[1] == 8)
        return 0

}

function getColumnVectorByHouse(house){
    if(house[0] == `a`)
        return 0
    if(house[0] == `b`)
        return 1
    if(house[0] == `c`)
        return 2
    if(house[0] == `d`)
        return 3
    if(house[0] == `e`)
        return 4
    if(house[0] == `f`)
        return 5
    if(house[0] == `g`)
        return 6
    if(house[0] == `h`)
        return 7
}

function getHousePieceOnBoard(pieceNotation){
    for(var posX = 0; posX < boardVector.board.length; posX++){
        for(var posY = 0; posY < boardVector.board.length; posY++){
            if(pieceNotation == boardVector.board[posX][posY].notation){
                return boardVector.board[posX][posY].house
            }
        }   
    }
}

function getBlackKingHouse(){
    var notationKing = `k`
    for(var posX = 0; posX < boardVector.board.length; posX++){
        for(var posY = 0; posY < boardVector.board[posX].length; posY++){
            if(boardVector.board[posX][posY].notation == notationKing)
            return boardVector.board[posX][posY].house
        }   
    }
}

function getWhiteKingHouse(){
    var notationKing = `K`
    for(var posX = 0; posX < boardVector.board.length; posX++){
        for(var posY = 0; posY < boardVector.board[posX].length; posY++){
            if(boardVector.board[posX][posY].notation == notationKing)
            return boardVector.board[posX][posY].house
        }   
    }
}

export default {
    getImgPieceByNotation: getImgPieceByNotation,
    getDropHouses: getDropHouses,
    getHousesId: getHousesId,
    getNotationByHouseId: getNotationByHouseId,
    getHousesIdActiveColor: getHousesIdActiveColor,
    getLineVectorByHouse: getLineVectorByHouse,
    getColumnVectorByHouse: getColumnVectorByHouse,
    getHousesAttackedByBlack, getHousesAttackedByBlack,
    getHousesAttackedByWhite, getHousesAttackedByWhite,
    getHousePieceOnBoard: getHousePieceOnBoard,
    getBlackKingHouse: getBlackKingHouse,
    getWhiteKingHouse: getWhiteKingHouse
}