class BotDanger extends Danger {
    constructor(direction) {
        super('bot_');
        this.direction = direction;
        this.delay = 1000;
        this.t = Date.now();
    }

    tickDanger(cell, t){
       if (t-this.t > this.delay) {
           let next = cell.neighbors.find( n => !n.isWall
                   && n.y === cell.y + this.direction[1]
                   && n.x === cell.x + this.direction[0]);
           if (next) {
               delete cell.danger[this.id];
               next.addDanger(new BotDanger(this.direction));
           } else {
               this.direction[0] *= -1;
               this.direction[1] *= -1;
           }
       }
    }

    renderDanger(renderer, context,x,y) {
        renderer.drawRect(x, y, 0.2, 'red', context);
    }
}
