class Key extends Cell {
    constructor(x, y, type, game, color) {
        super(x, y, type, game, 'red', 0.4);
        this.active = true;
    }

    activate(t){
        super.activate(t)
        if (!this.active)
            return
        this.active = false;
        this.game.player.keys[this.color] = (this.game.player.keys[this.color]||0)+1;
        this.renderSize = 0;
    }
}
