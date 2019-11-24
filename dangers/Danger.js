class Danger {
    constructor(id) {
        this.id = id;
    }

    tick(t){}

    renderDanger(renderer, context, x, y){}

    checkDeath() {
        return true;
    }

}