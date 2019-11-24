class CanvasRenderer {
    constructor() {
        this.createRendererComponent();
        document.body.append(this.canvas);
        document.body.style.margin=0;
        document.body.style.background = "#000";
        document.body.style.overflow = "hidden";
        this.resizeRenderer();
        this.cx = 0;
        this.cy = 0;
    }

    renderGui(coins, keys) {
        this.ctx.font = 'bold 28px Arial';
        this.ctx.fillStyle = 'gold';
        this.ctx.textAlign = 'left'
        this.ctx.fillText(coins, 35, 20)
        this.ctx.fillRect(15, 5, 10, 10)
        Object.entries(keys).forEach((entry, i) => {
            if (!entry[1]) return;
            this.ctx.fillStyle = entry[0];
            this.ctx.fillRect(100+i*70, 5, 10, 10)
            this.ctx.fillText(entry[1], 125+i*70, 20)
        })
    }

    createRendererComponent() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
    }

    resizeRenderer() {
        this.canvas.width = innerWidth;
        this.canvas.height = innerHeight;
        this.size = Math.round(Math.min(innerWidth, innerHeight)/20);
    }

    updateStaticImage(level) {
        level.staticImage.width = level.width*this.size;
        level.staticImage.height = level.height*this.size;
        let ctx = level.staticImage.getContext("2d");
        level.iterateCells(c => c.isStatic && c.renderCell(this, ctx));
    }

    drawRect(x, y, s, color, context) {
        context = context || this.ctx;
        s = s * this.size;
        let shift = (this.size-s)/2;
        x = x*this.size + shift;
        y = y*this.size + shift;

        context.fillStyle = color;
        context.fillRect(x, y, s, s);
    }

    drawFrame(player, level) {
        this.ctx.clearRect(-1e9,-1e9,2e9,2e9);
        this.ctx.save();
        this.scroll(player)

        this.ctx.drawImage(level.staticImage, 0, 0);
        level.iterateCells(c => !c.isStatic && c.renderCell(this, this.ctx));
        player.renderCell(this, this.ctx);
        this.ctx.restore();
    }

    scroll(player){
        let cx = player.renderPosition[0]*this.size;
        let cy = player.renderPosition[1]*this.size;
        let maxStep = this.size*0.7
        if (Math.abs(cx-this.cx) > maxStep)
            this.cx += Math.sign(cx-this.cx)*maxStep;
        else
            this.cx = cx;

        if (Math.abs(cy-this.cy) > this.size)
            this.cy += Math.sign(cy-this.cy)*maxStep;
        else
            this.cy = cy;

        this.ctx.translate(innerWidth/2 - this.cx, innerHeight/2 - this.cy);
    }

    elastic(t){
        let k = 0.25;
        return Math.pow(2,-10*t) *
            Math.sin((t-k/4)*(2*Math.PI)/k) + 1
    }

    renderLevelGui(levelIndex){
        let t = Date.now();
        if (!this.menuDrawStartTimestamp){
            this.menuDrawStartTimestamp = t;
            return;
        }
        t = (Math.min(1, (t-this.menuDrawStartTimestamp)/1000))
        t = this.elastic(t);
        let h = 200 * t;
        let w = innerWidth*(1 - t) + 200*t
        this.ctx.fillStyle = '#000f';
        this.ctx.fillRect(0,0,innerWidth,innerHeight);

        this.ctx.fillStyle = 'wheat';
        this.ctx.fillRect((innerWidth-w)/2,(innerHeight-h)/2,w,h);
        this.ctx.fillStyle = 'black'
        this.ctx.textAlign = 'center'
        this.ctx.font = '90px Arial'
        this.ctx.fillText(levelIndex+1, innerWidth/2, innerHeight/2+20);
        this.ctx.font = '15px Arial'
        this.ctx.fillText('START: any key or tap', innerWidth/2, innerHeight/2+60);
        this.ctx.fillText('MOVE: swipe or WSAD', innerWidth/2, innerHeight/2+80);
    }
}