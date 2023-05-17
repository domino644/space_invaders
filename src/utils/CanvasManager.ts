export default class CanvasManager {
    private canvas = <HTMLCanvasElement>document.getElementById("canvas");
    private ctx: CanvasRenderingContext2D = this.canvas.getContext('2d')
    readonly FONTSIZE: number = 20;
    readonly STANDARD_ENEMY_SIZE: number = 25;
    private imageList: string[] = [
        '../src/sounds_and_visuals/graphics/space-invaders-characters/enemy_red.png',
        '../src/sounds_and_visuals/graphics/space-invaders-characters/enemy_pink.png',
        '../src/sounds_and_visuals/graphics/space-invaders-characters/enemy_green.png',
        '../src/sounds_and_visuals/graphics/space-invaders-characters/enemy_blue.png',
        '../src/sounds_and_visuals/graphics/space-invaders-characters/player.png',
        '../src/sounds_and_visuals/graphics/space-invaders-shield/shield.png',
        '../src/sounds_and_visuals/graphics/space-invaders-animation/animation.png',
        '../src/sounds_and_visuals/graphics/space-invaders-characters/player_bullet.png',
        '../src/sounds_and_visuals/graphics/space-invaders-characters/enemy_red_bullet.png',
        '../src/sounds_and_visuals/graphics/space-invaders-characters/enemy_pink_bullet.png',
        '../src/sounds_and_visuals/graphics/space-invaders-characters/enemy_green_bullet.png',
        '../src/sounds_and_visuals/graphics/space-invaders-characters/enemy_blue_bullet.png',
    ]
    public texturesList: HTMLImageElement[] = []
    constructor() {
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight
        this.ctx.fillStyle = 'black'
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
        this.ctx.fillStyle = 'white'
        this.ctx.font = `${this.FONTSIZE}px Space Invaders`
        this.ctx.strokeStyle = '#00fc00'
        this.canvas.setAttribute('crossOrigin', '')
        this.ctx.imageSmoothingEnabled = false

    }
    displayScore(score: number, highestScore: number): void {
        this.ctx.fillStyle = 'black'
        this.ctx.fillRect(0, this.FONTSIZE, this.canvas.width, this.FONTSIZE)
        this.ctx.fillStyle = 'white'
        this.ctx.fillText("score<1>", this.FONTSIZE / 2, this.FONTSIZE)
        this.ctx.fillText("hi-score", this.canvas.width / 2 - (this.ctx.measureText("hi-score").width) / 2, this.FONTSIZE)
        this.ctx.fillText("score<2>", this.canvas.width - (this.FONTSIZE / 2) - this.ctx.measureText("score<2>").width, this.FONTSIZE)
        switch (score.toString().length) {
            case 1:
                this.ctx.fillText(`00${score.toString()} `, this.FONTSIZE / 2, this.FONTSIZE * 2)
                break
            case 2:
                this.ctx.fillText(`0${score.toString()} `, this.FONTSIZE / 2, this.FONTSIZE * 2)
                break
            default:
                this.ctx.fillText(`${score.toString()} `, this.FONTSIZE / 2, this.FONTSIZE * 2)
                break
        }
        switch (highestScore.toString().length) {
            case 1:
                this.ctx.fillText(`00${highestScore.toString()} `, this.canvas.width / 2 - (this.ctx.measureText(`00${highestScore.toString()} `).width) / 2, this.FONTSIZE * 2)
                break
            case 2:
                this.ctx.fillText(`0${highestScore.toString()} `, this.canvas.width / 2 - (this.ctx.measureText(`0${highestScore.toString()} `).width) / 2, this.FONTSIZE * 2)
                break
            default:
                this.ctx.fillText(`${highestScore.toString()} `, this.canvas.width / 2 - (this.ctx.measureText(highestScore.toString()).width) / 2, this.FONTSIZE * 2)
                break
        }
        this.ctx.fillText("000", this.canvas.width - this.FONTSIZE / 2 - this.ctx.measureText("000").width, this.FONTSIZE * 2)
    }
    displayBottom(lives: number, reset: boolean = false) {
        let image: HTMLImageElement;
        this.ctx.fillStyle = 'black'
        this.ctx.fillRect(0, this.canvas.height - this.FONTSIZE * 2.75 + 2, this.canvas.width, this.canvas.height)
        this.ctx.fillStyle = 'white'


        this.ctx.fillText(lives.toString(), this.FONTSIZE / 2, this.canvas.height - this.FONTSIZE)
        for (let i = 0; i < lives; i++) {
            image = new Image()
            image.width = 3 * this.FONTSIZE
            image.height = 2 * this.FONTSIZE
            image.onload = () => {
                this.ctx.drawImage(image, this.FONTSIZE + 10 + i * (image.width + 10), this.canvas.height - image.height - 10, image.width, image.height)
            }
            image.src = '../src/sounds_and_visuals/graphics/space-invaders-characters/player.png'

        }


        this.ctx.fillText("credit 00", this.canvas.width - this.FONTSIZE - this.ctx.measureText("credit 00").width, this.canvas.height - this.FONTSIZE)
        if (reset) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, this.canvas.height - 2.75 * this.FONTSIZE)
            this.ctx.lineTo(this.canvas.width, this.canvas.height - 2.75 * this.FONTSIZE)
            this.ctx.lineWidth = 2
            this.ctx.stroke()
        }
    }
    displayObject(id: number, posX: number, posY: number, height: number = this.STANDARD_ENEMY_SIZE, width: number = this.STANDARD_ENEMY_SIZE): void {
        this.ctx.drawImage(this.texturesList[id], posX, posY, width, height)
    }
    displayDefeatScreen() {
        this.clearZone(0, this.FONTSIZE * 2, this.getCanvasWidth(), this.getCanvasHeight() - (4 * this.FONTSIZE))
        this.ctx.fillStyle = 'white'
        this.ctx.font = '40px Space Invaders'
        this.ctx.fillText('Game Over', (this.getCanvasWidth() - this.getTextWidth('Game Over')) / 2, this.getCanvasHeight() / 2 - this.getTextHeight('Game Over'))
        this.ctx.font = `${this.FONTSIZE}px Space Invaders`
        this.ctx.fillText('Press <backspace> to restart', (this.getCanvasWidth() - this.getTextWidth('Press <backspace> to restart')) / 2, this.getCanvasHeight() / 2 + (this.getTextHeight('Game Over') * 2))
    }

    clearAlienZone(): void {
        this.ctx.fillStyle = 'black'
        this.ctx.fillRect(0, this.FONTSIZE * 2, this.getCanvasWidth(), this.getCanvasHeight() * 0.75 - this.getTextHeight('hi-score') - this.getTextHeight('000'))

    }
    clearPlayerZone(): void {
        this.ctx.fillStyle = 'black'
        this.ctx.fillRect(0, this.canvas.height - 2.75 * this.FONTSIZE - this.getCanvasWidth() * 0.0375, this.getCanvasWidth(), this.getCanvasWidth() * 0.0375)
    }
    clearZone(x: number, y: number, width: number, height: number): void {
        this.ctx.fillStyle = 'black'
        this.ctx.fillRect(x, y, width, height)
    }
    async loadTexture(src: string): Promise<void> {
        return new Promise((resolve, reject) => {
            let image: HTMLImageElement = new Image()
            image.onload = () => {
                image.crossOrigin = null
                this.texturesList.push(image)
                resolve()
            }
            image.src = src

        })
    }
    async loadAll() {
        for (const element of this.imageList) {
            await this.loadTexture(element)
        }
    }
    getCanvasHeight(): number {
        return this.canvas.height;
    }
    getCanvasWidth(): number {
        return this.canvas.width;
    }
    getTextHeight(text: string): number {
        return Math.abs(this.ctx.measureText(text).actualBoundingBoxAscent) + Math.abs(this.ctx.measureText(text).actualBoundingBoxDescent);
    }
    getTextWidth(text: string): number {
        return this.ctx.measureText(text).width
    }
    getImageData(x: number, y: number, width: number, height: number): ImageData {
        return this.ctx.getImageData(x, y, width, height)
    }
    putImageData(imageData: ImageData, x: number, y: number): void {
        this.ctx.putImageData(imageData, x, y)
    }
}