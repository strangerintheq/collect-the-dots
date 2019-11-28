class Key extends Cell {
    constructor(x, y, type, game, color) {
        super(x, y, type, game);
        this.color = type === 'r' ? 'red' : 'white'
        this.active = true;
    }

    activate(t){
        super.activate(t)
        if (!this.active)
            return
        this.active = false;
        this.game.player.keys[this.color] = (this.game.player.keys[this.color]||0)+1;
    }

    renderCell(renderer, context) {
        if (!this.active)
            return
        context.fillStyle = this.color;
        let s = renderer.size;
        let y = this.y;
        let x = this.x;
        context.fillRect(x*s, y*s + s/3, s/3, s/3)
        context.fillRect(x*s+s/3, y*s + s/9*4, s/2, s/9)
        context.fillRect(x*s+s/1.6, y*s + s/2.7, s/7, s/7)
    }
}
