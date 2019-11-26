class BotDanger extends Danger {
    constructor(direction) {
        super('bot_');
        this.direction = direction;
        this.delay = 300
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

        //renderer.drawRect(x, y, 0.4, 'red', context);

        let s = renderer.size;
        x *= s
        y *= s;
        s *= 0.5;
        x += (renderer.size-s)/2
        y += (renderer.size-s)/2

        let t = (Date.now() - this.t)/this.delay
            -1


        x += renderer.size*t*this.direction[0]
        y += renderer.size*t*this.direction[1]


        renderer.ctx.fillStyle='cyan'
        renderer.ctx.fillRect(x,y,s,s)


    }
}