class Player {
    constructor() {
        this.logicPosition = null;
        this.keys = {};
    }

    lerp(a, b, t) {
        return a + t*(b-a);
    }

    renderCell(renderer){
        let s = this.renderSize, rs = renderer.size;
        s = this.entering? 1-this.entering/30: s;
        let w = s, h = s;
        let t = Date.now()
        if (this.death && this.death < t){
            t = (t - this.death)/1000;
            t = renderer.elastic(t);
            w = t*4
            h = (1 - t)*0.7
        }
        w *= rs;
        h *= rs
        renderer.ctx.fillStyle = 'wheat'
        renderer.ctx.fillRect(
            this.renderPosition[0]*rs + rs/2 - w/2,
            this.renderPosition[1]*rs + rs/2 - h/2,w,h);



        if (this.moveToPosition){
            let x0 = this.renderPosition[0]
            let x1 = this.logicPosition[0]
            let y0 = this.renderPosition[1]
            let y1 = this.logicPosition[1]
            let d = rs/7;

            renderer.ctx.fillRect(
                Math.min(x0,x1)*rs+1*d,
                Math.min(y0,y1)*rs+1*d,
                Math.abs(x0-x1)*rs||d*0.7,
                Math.abs(y0-y1)*rs||d*0.7)

            renderer.ctx.fillRect(
                Math.min(x0,x1)*rs+3*d,
                Math.min(y0,y1)*rs+3*d,
                Math.abs(x0-x1)*rs||d*0.7,
                Math.abs(y0-y1)*rs||d*0.7)

            renderer.ctx.fillRect(
                Math.min(x0,x1)*rs+5*d,
                Math.min(y0,y1)*rs+5*d,
                Math.abs(x0-x1)*rs||d*0.7,
                Math.abs(y0-y1)*rs||d*0.7)
        }
    }

    calcPlayerPosition(t) {
        if(this.entering){
            this.entering-=1;
            if (this.entering <= 0)
                this.entering= null
        }
        this.renderPosition = [...this.logicPosition];
        this.renderSize = 0.9;

        if (!this.moveToPosition)
            return;

        if (!this.moveStartTime) {
            this.moveStartTime = t;
            this.moveDuration = Math.abs(
                this.logicPosition[0] + this.logicPosition[1] -
                this.moveToPosition[0] - this.moveToPosition[1]
            )*15;
        }

        let dt = (t - this.moveStartTime)/this.moveDuration;

        if (dt > 1) {
            this.logicPosition = [...this.moveToPosition];
            this.renderPosition = [...this.moveToPosition];
            this.moveToPosition = null;
            this.moveDuration = this.moveStartTime = 0;
        } else if (dt) {

            this.renderPosition[0] = this.lerp(
                this.logicPosition[0], this.moveToPosition[0], dt);
            this.renderPosition[1] = this.lerp(
                this.logicPosition[1], this.moveToPosition[1], dt);
            this.renderSize = 0.7;
        }
    }

    move(dirx, diry){
        if (this.moveToPosition || this.death)
            return;
        let mt = this.moveToPosition = [...this.logicPosition];
        let t = Date.now();
        for (let i=0; i<99; i++) {
            let next = this.levelMap[mt[1]+dirx][mt[0]+diry];
            if (next.isWall) {
                if (next instanceof Door){
                    if (this.keys[next.color]){
                        this.keys[next.color]--;
                        next.isWall = false;
                        next.renderSize = 0;
                    } else break

                } else {
                    break;
                }
            }

            next.activate(t+i*15)

            mt[1] += dirx;
            mt[0] += diry;

            if (this.death)
                break;

        }
    }

    enterToLevel(level) {
        this.moveToPosition = this.logicPosition = level.playerEnter;
        this.levelMap = level.map;
        this.entering = 30;
        this.death = 0;
        level.iterateCells(c => c.initCell())
    }
}