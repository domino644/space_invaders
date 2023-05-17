export default class Bullet {
    public x: number;
    public y: number;
    public type: string;
    public vector: number;
    readonly graphic: number;
    public BULLET_WIDTH: number = 2;
    public BULLET_HEIGHT: number = 15;
    constructor(graphic: number, vector: number, type: string, x: number, y: number) {
        this.graphic = graphic
        this.vector = vector
        this.type = type
        this.x = x
        this.y = y
        if (this.graphic != 7) this.BULLET_WIDTH = 10
    }
    updatePosition(): void {
        this.y += this.vector
    }
}