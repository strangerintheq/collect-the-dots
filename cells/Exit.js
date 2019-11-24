class Exit extends Cell {
    constructor(x, y, type, game) {
        super(x, y, type, game, 0, 0.6);
        this.tick();
        this.r = 0;
        this.i = 0;
    }

    tick(t) {
        this.r += 0.01;
        this.color = 'hsl(' + this.i++ + ',55%,55%)'
        this.renderSize = 0.6 + Math.sin(this.i/77)*0.1;

        if (t - this.activatedAt >0) {
            this.game.nextLevel();
            this.game.gameInProgress = false
        }

    }

    renderCell(renderer, context) {
        context.save()
        context.translate(this.x*renderer.size+renderer.size/2, this.y*renderer.size+renderer.size/2)
        context.rotate(this.r)
        context.translate(-renderer.size/2,-renderer.size/2)
        renderer.drawRect(0, 0,
            this.renderSize, this.color, context);
        context.restore()
    }

    activate(t) {
        this.activatedAt = t || Date.now();
    }
}