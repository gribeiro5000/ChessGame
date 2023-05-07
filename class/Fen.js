export class Fen {
    constructor(position, activeColor, castle, enPassant, halfmoveClock, fullmoveClock, mate, fenString){
        this.position = position
        this.activeColor = activeColor
        this.castle = castle
        this.enPassant = enPassant
        this.halfmoveClock = halfmoveClock
        this.fullmoveClock = fullmoveClock
        this.mate = mate
        this.fenString = fenString
    }
}