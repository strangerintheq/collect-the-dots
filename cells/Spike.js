class Spike extends Wall {
    constructor(x, y, type, game) {
        super(x, y, type, game);
        this.color = '#61c0ff'
    }

    activateByNeighbor(cell, t) {
        cell.addDanger(new SpikeDanger(cell.x-this.x, cell.y-this.y, t))
    }
}