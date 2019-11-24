class Cell {
    constructor(x, y, type, game, color, size) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.renderSize = size;
        this.neighbors = [];
        this.neighborsX = [];
        this.game = game;
        this.danger = {};
    }

    addDanger(danger){
        if (!this.danger[danger.id])
            this.danger[danger.id] = danger
    }

    tick(t) {
        Object.entries(this.danger).forEach(entry => {
            if (entry[1].tick(t))
                delete this.danger[entry[0]]
        });
    }

    activate(t) {

        this.neighbors.forEach(c =>
            c.activateByNeighbor(this, t));

        Object.values(this.danger).forEach(d => {
            if (d.checkDeath() && !this.game.player.death)
                this.game.player.death = t;
        })
    }

    activateByNeighbor(){}

    renderCell(renderer, context) {

        if(this.renderSize)
            renderer.drawRect(this.x, this.y,
                this.renderSize, this.color, context);

        Object.values(this.danger).forEach(d =>
            d.renderDanger(renderer, context, this.x, this.y))
    }
}