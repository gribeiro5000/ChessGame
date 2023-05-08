import fen from "../objects/fen.js"
import boardVector from "../objects/boardVector.js"
import move from "./move.js"
import { PiecesAllowedMoves } from "../class/PiecesAllowedMoves.js"
import get from "./get.js"
import allowedHouses from "../objects/allowedHouses.js"
import attackedHouses from "../objects/attackedHouses.js"
import set from "./set.js"

function columnValidator(columnIndex){
    if(columnIndex == 0)
        return `a`

    if(columnIndex == 1)
        return `b`
    
    if(columnIndex == 2)
        return `c`

    if(columnIndex == 3)
        return `d`

    if(columnIndex == 4)
        return `e`

    if(columnIndex == 5)
        return `f`

    if(columnIndex == 6)
        return `g`

    if(columnIndex == 7)
        return `h`
}

function columnToVectorValidator(columnNumber){
    if(columnNumber == `a`)
        return 0

    if(columnNumber == `b`)
        return 1
    
    if(columnNumber == `c`)
        return 2

    if(columnNumber == `d`)
        return 3

    if(columnNumber == `e`)
        return 4

    if(columnNumber == `f`)
        return 5

    if(columnNumber == `g`)
        return 6

    if(columnNumber == `h`)
        return 7
}

function lineValidator(lineIndex){
    if(lineIndex == 0)
        return 8

    if(lineIndex == 1)
        return 7
    
    if(lineIndex == 2)
        return 6

    if(lineIndex == 3)
        return 5

    if(lineIndex == 4)
        return 4

    if(lineIndex == 5)
        return 3

    if(lineIndex == 6)
        return 2

    if(lineIndex == 7)
        return 1
}

function lineToVectorValidator(lineNumber){
    if(lineNumber == 8)
        return 0

    if(lineNumber == 7)
        return 1
    
    if(lineNumber == 6)
        return 2

    if(lineNumber == 5)
        return 3

    if(lineNumber == 4)
        return 4

    if(lineNumber == 3)
        return 5

    if(lineNumber == 2)
        return 6

    if(lineNumber == 1)
        return 7
}

function activeColor(color){
    if(color == `w`)
        return true
    if(color == `b`)
        return false
}

function pieceColor(notation){
    if(notation == `p`)
        return false
    if(notation == `r`)
        return false
    if(notation == `n`)
        return false
    if(notation == `b`)
        return false
    if(notation == `q`)
        return false
    if(notation == `k`)
        return false
    if(notation == `P`)
        return true
    if(notation == `R`)
        return true
    if(notation == `N`)
        return true
    if(notation == `B`)
        return true
    if(notation == `Q`)
        return true
    if(notation == `K`)
        return true
}

function fullmoveValidator(pieceMovedId){
    if(pieceColor(pieceMovedId[0]) == false)
        return true
}

function AllowedMoves(){
    var allowedHouse = []
     //se a partida estiver em check
    if(fen.mate == `+`){
        for(var posX = 0; posX < boardVector.board.length; posX++){
            for(var posY = 0; posY < boardVector.board[posX].length; posY++){
                var notationP = boardVector.board[posX][posY].notation
                var houseP = boardVector.board[posX][posY].house
                    if(notationP != `1` && activeColor(fen.activeColor) == pieceColor(notationP)){
                    var houses = []
                    houses.push(...move.predictPieceMove(notationP + houseP))
                    houses.push(...move.predictPieceAttack(notationP + houseP))
                    if(houses.length > 0){
                        for(var pos = 0; pos < houses.length; pos++){
                            //atualiza vetor para próxima posição
                            var Lastnotation = boardVector.board[lineToVectorValidator(houses[pos][1])][columnToVectorValidator(houses[pos][0])].notation
                            var LastColor = boardVector.board[lineToVectorValidator(houses[pos][1])][columnToVectorValidator(houses[pos][0])].color
                            boardVector.board[lineToVectorValidator(houseP[1])][columnToVectorValidator(houseP[0])].notation = `1`
                            boardVector.board[lineToVectorValidator(houseP[1])][columnToVectorValidator(houseP[0])].color = ``
                            boardVector.board[lineToVectorValidator(houses[pos][1])][columnToVectorValidator(houses[pos][0])].notation = notationP
                            if(pieceColor(notationP)){
                                boardVector.board[lineToVectorValidator(houses[pos][1])][columnToVectorValidator(houses[pos][0])].color = `white`
                            } else if(pieceColor(notationP) == false){
                                boardVector.board[lineToVectorValidator(houses[pos][1])][columnToVectorValidator(houses[pos][0])].color = `black`
                            }

                            //verifica se o novo vetor contém o rei sendo atacado
                            var housesAttacked = []
                            if(fen.activeColor == `w`){
                                housesAttacked = get.getHousesAttackedByBlack()
                                if(housesAttacked.indexOf(get.getWhiteKingHouse()) == -1){
                                    allowedHouse.push(boardVector.board[lineToVectorValidator(houses[pos][1])][columnToVectorValidator(houses[pos][0])].house)
                                }
                            } else if(fen.activeColor == `b`){
                                housesAttacked = get.getHousesAttackedByWhite()
                                if(housesAttacked.indexOf(get.getBlackKingHouse()) == -1){
                                    allowedHouse.push(boardVector.board[lineToVectorValidator(houses[pos][1])][columnToVectorValidator(houses[pos][0])].house)
                                }
                            }

                            //Volta a vetor para posição anterior
                            boardVector.board[lineToVectorValidator(houseP[1])][columnToVectorValidator(houseP[0])].notation = notationP
                            if(pieceColor(notationP)){
                                boardVector.board[lineToVectorValidator(houseP[1])][columnToVectorValidator(houseP[0])].color = `white`
                            } else if(pieceColor(notationP) == false){
                                boardVector.board[lineToVectorValidator(houseP[1])][columnToVectorValidator(houseP[0])].color = `black`
                            }
                            boardVector.board[lineToVectorValidator(houses[pos][1])][columnToVectorValidator(houses[pos][0])].notation = Lastnotation
                            boardVector.board[lineToVectorValidator(houses[pos][1])][columnToVectorValidator(houses[pos][0])].color = LastColor
                        }  
                    }
                }
                //insere objeto na lista de movimento de casas permitidas
                if(allowedHouse.length > 0){
                    var piecesAllowedMoves = new PiecesAllowedMoves(notationP, houseP, allowedHouse)
                    allowedHouses.push(piecesAllowedMoves)
                    allowedHouse = []
                }
            }
        }

        //se a partida não estiver em check
    } else if(fen.mate == `-`){
        for(var posX = 0; posX < boardVector.board.length; posX++){
            for(var posY = 0; posY < boardVector.board[posX].length; posY++){
                var notationP = boardVector.board[posX][posY].notation
                var houseP = boardVector.board[posX][posY].house
                if(notationP != `1` && activeColor(fen.activeColor) == pieceColor(notationP)){
                    var houses = []
                    houses.push(...move.predictPieceMove(notationP + houseP))
                    houses.push(...move.predictPieceAttack(notationP + houseP))

                    //valida se o próximo movimento irá colocar o rei em xeque
                    if(houses.length > 0){
                        for(var pos = 0; pos < houses.length; pos++){
                            //atualiza vetor para próxima posição
                            var Lastnotation = boardVector.board[lineToVectorValidator(houses[pos][1])][columnToVectorValidator(houses[pos][0])].notation
                            var LastColor = boardVector.board[lineToVectorValidator(houses[pos][1])][columnToVectorValidator(houses[pos][0])].color
                            boardVector.board[lineToVectorValidator(houseP[1])][columnToVectorValidator(houseP[0])].notation = `1`
                            boardVector.board[lineToVectorValidator(houseP[1])][columnToVectorValidator(houseP[0])].color = ``
                            boardVector.board[lineToVectorValidator(houses[pos][1])][columnToVectorValidator(houses[pos][0])].notation = notationP
                            if(pieceColor(notationP)){
                                boardVector.board[lineToVectorValidator(houses[pos][1])][columnToVectorValidator(houses[pos][0])].color = `white`
                            } else if(pieceColor(notationP) == false){
                                boardVector.board[lineToVectorValidator(houses[pos][1])][columnToVectorValidator(houses[pos][0])].color = `black`
                            }
                            //verifica se o novo vetor contém o rei sendo atacado
                            var housesAttacked = []
                            if(fen.activeColor == `w`){
                                housesAttacked = get.getHousesAttackedByBlack()
                                if(housesAttacked.indexOf(get.getWhiteKingHouse()) == -1){
                                    allowedHouse.push(boardVector.board[lineToVectorValidator(houses[pos][1])][columnToVectorValidator(houses[pos][0])].house)
                                }
                            } else if(fen.activeColor == `b`){
                                housesAttacked = get.getHousesAttackedByWhite()
                                if(housesAttacked.indexOf(get.getBlackKingHouse()) == -1){
                                    allowedHouse.push(boardVector.board[lineToVectorValidator(houses[pos][1])][columnToVectorValidator(houses[pos][0])].house)
                                }
                            }
                            //Volta a vetor para posição anterior
                            boardVector.board[lineToVectorValidator(houseP[1])][columnToVectorValidator(houseP[0])].notation = notationP
                            if(pieceColor(notationP)){
                                boardVector.board[lineToVectorValidator(houseP[1])][columnToVectorValidator(houseP[0])].color = `white`
                            } else if(pieceColor(notationP) == false){
                                boardVector.board[lineToVectorValidator(houseP[1])][columnToVectorValidator(houseP[0])].color = `black`
                            }
                            boardVector.board[lineToVectorValidator(houses[pos][1])][columnToVectorValidator(houses[pos][0])].notation = Lastnotation
                            boardVector.board[lineToVectorValidator(houses[pos][1])][columnToVectorValidator(houses[pos][0])].color = LastColor
                        }  
                    }
                } 
                //insere objeto na lista de movimento de casas permitidas
                if(allowedHouse.length > 0){
                    var piecesAllowedMoves = new PiecesAllowedMoves(notationP, houseP, allowedHouse)
                    allowedHouses.push(piecesAllowedMoves)
                    allowedHouse = []
                }
            }
        }
    }
}

function kingIsInCheckValidator(){
    if(fen.activeColor == `w`){
        var kingHouse = get.getHousePieceOnBoard(`K`)
        if(attackedHouses[0].indexOf(kingHouse) != -1){
            return `+`
        } else {
            return `-`
        }
    } else if(fen.activeColor == `b`){
        var kingHouse = get.getHousePieceOnBoard(`k`)
        if(attackedHouses[1].indexOf(kingHouse) != -1){
            return `+`
        } else {
            return `-`
        }
    }
}

function promotion(piece, houseId){
    if(piece.id[0] == `P` && houseId[1] == `8`){
                
        var popup = document.querySelector(`dialog`)
        
        var queen = document.createElement(`img`)
        queen.src = `../pieces/queen_white.png`
        queen.id = `Q` + houseId
        queen.addEventListener(`click`, set.promotionPawn)

        var rook = document.createElement(`img`)
        rook.src = `../pieces/rook_white.png`
        rook.id = `R` + houseId
        rook.addEventListener(`click`, set.promotionPawn)

        var bishop = document.createElement(`img`)
        bishop.src = `../pieces/bishop_white.png`
        bishop.id = `B` + houseId
        bishop.addEventListener(`click`, set.promotionPawn)

        var knight = document.createElement(`img`)
        knight.src = `../pieces/knightLeft_white.png`
        knight.id = `N` + houseId
        knight.addEventListener(`click`, set.promotionPawn)
    
        popup.style.width = `260px`
        popup.style.height = `63px`
        popup.appendChild(queen)
        popup.appendChild(rook)
        popup.appendChild(bishop)
        popup.appendChild(knight)
        popup.classList.remove(`hide`)
        popup.showModal()
    } else if(piece.id[0] == `p` && houseId[1] == `1`){
        
        var popup = document.querySelector(`dialog`)

        var queen = document.createElement(`img`)
        queen.src = `https://raw.githubusercontent.com/gribeiro5000/ChessGame/master/images/queenblack.png`
        queen.id = `q` + houseId
        queen.addEventListener(`click`, set.promotionPawn)

        var rook = document.createElement(`img`)
        rook.src = `https://raw.githubusercontent.com/gribeiro5000/ChessGame/master/images/rookblack.png`
        rook.id = `r` + houseId
        rook.addEventListener(`click`, set.promotionPawn)

        var bishop = document.createElement(`img`)
        bishop.src = `https://raw.githubusercontent.com/gribeiro5000/ChessGame/master/images/bishopblack.png`
        bishop.id = `b` + houseId
        bishop.addEventListener(`click`, set.promotionPawn)

        var knight = document.createElement(`img`)
        knight.src = `https://raw.githubusercontent.com/gribeiro5000/ChessGame/master/images/knightLeftblack.png`
        knight.id = `n` + houseId
        knight.addEventListener(`click`, set.promotionPawn)
        
        popup.style.width = `260px`
        popup.style.height = `63px`
        popup.appendChild(queen)
        popup.appendChild(rook)
        popup.appendChild(bishop)
        popup.appendChild(knight)
        popup.classList.remove(`hide`)
        popup.showModal()
    }
}

function enPassant(piece, houseId){

    //captura a peça do enPassant
    if(piece.id[0] == `P` && houseId == fen.enPassant){
        document.getElementById(houseId[0] + `5`).removeChild(document.getElementById(houseId[0] + `5`).firstChild)   
    } else if(piece.id[0] == `p` && houseId == fen.enPassant){
        document.getElementById(houseId[0] + `4`).removeChild(document.getElementById(houseId[0] + `4`).firstChild)
    }

    //gera o enPassant
    if(piece.id[0] == `P` && piece.id[2] == `2` && houseId[1] == `4`){
        fen.enPassant = houseId[0] + `3`
    } else if(piece.id[0] == `p` && piece.id[2] == `7` && houseId[1] == `5`){
        fen.enPassant = houseId[0] + `6`
    } else {
        fen.enPassant = ``
    }
}

function castle(piece, houseId){
    if(fen.castle != ``){
        if(piece.id[0] == `k` || piece.id[0] == `K`){
            (set.setCastle(piece.id.substr(1, 2), houseId))
            if(piece.id[0] == `K`){
                fen.castle = fen.castle.replace(`K`, ``)
                fen.castle = fen.castle.replace(`Q`, ``)
            } else if(piece.id[0] == `k`){
                fen.castle = fen.castle.replace(`k`, ``)
                fen.castle = fen.castle.replace(`q`, ``)
            }
        }
        if(piece.id[0] == `R`){
            if(piece.id.substr(1, 2) == `h1`){
                fen.castle = fen.castle.replace(`K`, ``)
            } else if(piece.id.substr(1, 2) == `a1`){
                fen.castle = fen.castle.replace(`Q`, ``)
            }
        } else if(piece.id[0] == `r`){
            if(piece.id.substr(1, 2) == `h8`){
                fen.castle = fen.castle.replace(`k`, ``)
            } else if(piece.id.substr(1, 2) == `a8`){
                fen.castle = fen.castle.replace(`q`, ``)
            }
        }
    }
}

export default {
    columnValidator: columnValidator,
    lineValidator: lineValidator,
    activeColor: activeColor,
    pieceColor: pieceColor,
    fullmoveValidator: fullmoveValidator,
    kingIsInCheckValidator: kingIsInCheckValidator,
    allowedMoves: AllowedMoves,
    promotion: promotion,
    enPassant: enPassant,
    castle: castle
}