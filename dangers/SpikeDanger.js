class SpikeDanger extends Danger {
    constructor(x,y,t) {
        super('spike_' +x + '_' + y);
        this.t = t;
        this.x = x;
        this.y = y;
        this.color = 'steelblue';
        this.delay = 1000;
        this.active = 2000;
    }

    tick(t){
        let dt = t-this.t;
        if (this.delay && dt > this.delay)
            this.delay = 0;
        return !this.delay && dt > this.active
    }

    checkDeath(){
        return this.active && !this.delay;
    }

    renderDanger(renderer, context, x, y) {
        if (this.delay)
            renderer.drawRect(x-this.x*0.5, y-this.y*0.5, 0.2, 'red', context);
         else if (this.active)
            renderer.drawRect(x-this.x*0.5, y-this.y*0.5, 0.7, this.color, context);
    }
}