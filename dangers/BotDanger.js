class BotDanger extends Danger {
    constructor() {
        super('bot_');
        this.direction = [0, 1];
        this.delay = 1000;
        this.t = Date.now();
    }

    tickDanger(cell, t){
       if (t-this.t>this.delay){
           delete cell.danger[this.id]:
           cell.neighbors[0].addDanger(new BotDanger());
       }
    }

    renderDanger(renderer, context,x,y) {
        renderer.drawRect(x, y, 0.2, 'red', context);
    }
}
