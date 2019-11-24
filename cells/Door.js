class Door extends Cell {
    constructor(x, y, type, game, color) {
        super(x, y, type, game, 'red', 1);
        this.isWall = true;
    }
}