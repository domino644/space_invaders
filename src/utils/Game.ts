import Enemy from "../objects/Enemy";
import AudioManager from "./AudioManager";
import CanvasManager from "./CanvasManager";
import Player from "../objects/Player";
import Bullet from "../objects/Bullet";
// import SpecialEnemy from "../objects/SpecialEnemy";

export default class Game {
    private canvasManager: CanvasManager;
    private audioManager: AudioManager;
    private highestScore: number = 0;
    private score: number = 0;
    private lives: number = 3;
    public enemiesList: Enemy[] = [];
    public bulletList: Bullet[] = [];
    private player: Player;
    public isPlaying: boolean = false;
    private displayCounter: number = 0;
    private RAF: number;
    public isDefeat: boolean = false;
    private counter: number = 0;
    private audioPlayer1: HTMLAudioElement;
    private audioPlayer2: HTMLAudioElement;
    private enemyVecSetter: number = 1;
    private readonly ENEMY_BOOST: number = 0.05;
    constructor(canvasManager: CanvasManager, audioManager: AudioManager) {
        this.audioPlayer1 = document.getElementById(
            "audio2"
        ) as HTMLAudioElement;
        this.audioPlayer2 = document.getElementById(
            "audio3"
        ) as HTMLAudioElement;
        this.audioManager = audioManager;
        this.audioManager.load("explosion", this.audioPlayer1);
        this.audioManager.load("coolMusic", this.audioPlayer2);
        this.start(canvasManager);
    }
    displayEnemies(): void {
        for (const element of this.enemiesList) {
            this.canvasManager.displayObject(
                element.graphic,
                element.x,
                element.y
            );
        }
    }
    displayEnemiesDefault(): void {
        this.enemiesList.forEach((element, i) => {
            setTimeout(() => {
                this.canvasManager.displayObject(
                    element.graphic,
                    element.x,
                    element.y
                );
                this.displayCounter++;
            }, 50 * i);
        });
    }
    setEnemiesList(): void {
        let x: number;
        let y: number;
        let graphic: number;
        Array(50)
            .fill(0)
            .forEach((_element, i) => {
                if (i < 10) {
                    graphic = 3;
                    y =
                        this.canvasManager.getTextHeight("score<1>") +
                        this.canvasManager.getTextHeight("000") +
                        this.canvasManager.STANDARD_ENEMY_SIZE * 2;
                    x =
                        this.canvasManager.getCanvasWidth() / 2 +
                        i * this.canvasManager.STANDARD_ENEMY_SIZE * 2.5 -
                        5 * this.canvasManager.STANDARD_ENEMY_SIZE * 2.5 +
                        this.canvasManager.STANDARD_ENEMY_SIZE;
                } else if (i < 20) {
                    graphic = 1;
                    y =
                        this.canvasManager.getTextHeight("score<1>") +
                        this.canvasManager.getTextHeight("000") +
                        this.canvasManager.STANDARD_ENEMY_SIZE * 4;
                    x =
                        this.canvasManager.getCanvasWidth() / 2 +
                        (i - 10) *
                            this.canvasManager.STANDARD_ENEMY_SIZE *
                            2.5 -
                        5 * this.canvasManager.STANDARD_ENEMY_SIZE * 2.5 +
                        this.canvasManager.STANDARD_ENEMY_SIZE;
                } else if (i < 30) {
                    graphic = 1;
                    y =
                        this.canvasManager.getTextHeight("score<1>") +
                        this.canvasManager.getTextHeight("000") +
                        this.canvasManager.STANDARD_ENEMY_SIZE * 6;
                    x =
                        this.canvasManager.getCanvasWidth() / 2 +
                        (i - 20) *
                            this.canvasManager.STANDARD_ENEMY_SIZE *
                            2.5 -
                        5 * this.canvasManager.STANDARD_ENEMY_SIZE * 2.5 +
                        this.canvasManager.STANDARD_ENEMY_SIZE;
                } else if (i < 40) {
                    graphic = 2;
                    y =
                        this.canvasManager.getTextHeight("score<1>") +
                        this.canvasManager.getTextHeight("000") +
                        this.canvasManager.STANDARD_ENEMY_SIZE * 8;
                    x =
                        this.canvasManager.getCanvasWidth() / 2 +
                        (i - 30) *
                            this.canvasManager.STANDARD_ENEMY_SIZE *
                            2.5 -
                        5 * this.canvasManager.STANDARD_ENEMY_SIZE * 2.5 +
                        this.canvasManager.STANDARD_ENEMY_SIZE;
                } else {
                    graphic = 2;
                    y =
                        this.canvasManager.getTextHeight("score<1>") +
                        this.canvasManager.getTextHeight("000") +
                        this.canvasManager.STANDARD_ENEMY_SIZE * 10;
                    x =
                        this.canvasManager.getCanvasWidth() / 2 +
                        (i - 40) *
                            this.canvasManager.STANDARD_ENEMY_SIZE *
                            2.5 -
                        5 * this.canvasManager.STANDARD_ENEMY_SIZE * 2.5 +
                        this.canvasManager.STANDARD_ENEMY_SIZE;
                }
                let enemy = new Enemy(
                    graphic,
                    x,
                    y,
                    i,
                    this.enemyVecSetter,
                    this
                );
                this.enemiesList.push(enemy);
            });
    }
    displayPlayerDefault(): void {
        this.canvasManager.displayObject(
            this.player.PLAYER_GRAPHIC,
            (this.canvasManager.getCanvasWidth() - this.player.PLAYER_WIDTH) /
                2,
            this.canvasManager.getCanvasHeight() -
                2.75 * this.canvasManager.FONTSIZE -
                this.player.PLAYER_HEIGHT,
            this.player.PLAYER_HEIGHT,
            this.player.PLAYER_WIDTH
        );
        this.player.x =
            (this.canvasManager.getCanvasWidth() - this.player.PLAYER_WIDTH) /
            2;
    }
    displayPlayer(): void {
        this.canvasManager.displayObject(
            this.player.PLAYER_GRAPHIC,
            this.player.x,
            this.canvasManager.getCanvasHeight() -
                2.75 * this.canvasManager.FONTSIZE -
                this.player.PLAYER_HEIGHT,
            this.player.PLAYER_HEIGHT,
            this.player.PLAYER_WIDTH
        );
    }
    displayShields(): void {
        this.canvasManager.displayObject(
            5,
            this.canvasManager.getCanvasWidth() * 0.2 - 50,
            this.canvasManager.getCanvasHeight() * 0.75,
            this.canvasManager.getCanvasHeight() * 0.1,
            this.canvasManager.getCanvasWidth() * 0.075
        );
        this.canvasManager.displayObject(
            5,
            this.canvasManager.getCanvasWidth() * 0.4 - 50,
            this.canvasManager.getCanvasHeight() * 0.75,
            this.canvasManager.getCanvasHeight() * 0.1,
            this.canvasManager.getCanvasWidth() * 0.075
        );
        this.canvasManager.displayObject(
            5,
            this.canvasManager.getCanvasWidth() * 0.6 - 50,
            this.canvasManager.getCanvasHeight() * 0.75,
            this.canvasManager.getCanvasHeight() * 0.1,
            this.canvasManager.getCanvasWidth() * 0.075
        );
        this.canvasManager.displayObject(
            5,
            this.canvasManager.getCanvasWidth() * 0.8 - 50,
            this.canvasManager.getCanvasHeight() * 0.75,
            this.canvasManager.getCanvasHeight() * 0.1,
            this.canvasManager.getCanvasWidth() * 0.075
        );
    }
    updateEnemies(): void {
        for (const element of this.enemiesList) {
            element.updatePosition();
            element.shoot();
        }
    }
    updateBullets(): void {
        for (const element of this.bulletList) {
            this.canvasManager.clearZone(
                element.x,
                element.y,
                element.BULLET_WIDTH,
                element.BULLET_HEIGHT
            );
            element.updatePosition();
            this.canvasManager.displayObject(
                element.graphic,
                element.x,
                element.y,
                element.BULLET_HEIGHT,
                element.BULLET_WIDTH
            );
        }
    }
    updatePlayer(): void {
        if (
            this.player.moveLeft &&
            this.player.x - this.player.MOVE_VELOCITY >= 0
        ) {
            this.player.x -= this.player.MOVE_VELOCITY;
        } else if (
            this.player.moveRight &&
            this.player.x +
                this.player.MOVE_VELOCITY +
                this.player.PLAYER_WIDTH <=
                this.canvasManager.getCanvasWidth()
        ) {
            this.player.x += this.player.MOVE_VELOCITY;
        }
        // console.log(this.player.x);
    }
    async start(canvasManager: CanvasManager) {
        this.enemiesList = [];
        this.bulletList = [];
        this.canvasManager = canvasManager;
        if (this.counter == 0) {
            await this.canvasManager.loadAll();
        }
        this.canvasManager.clearAlienZone();
        this.canvasManager.displayScore(this.score, this.highestScore);
        this.canvasManager.displayBottom(this.lives, true);
        this.setEnemiesList();
        this.displayEnemiesDefault();
        if (this.counter == 0) {
            this.player = new Player(
                this.canvasManager,
                this.audioManager,
                this
            );
        }
        this.displayPlayerDefault();
        this.displayShields();
        if (this.counter == 0) {
            document.addEventListener("keydown", (e) => {
                if (
                    this.displayCounter == 50 &&
                    e.key == "Enter" &&
                    this.isPlaying === false
                ) {
                    this.audioManager.restart(this.audioPlayer2);
                    this.audioManager.play(this.audioPlayer2);
                    this.isPlaying = true;
                    this.RAF = requestAnimationFrame(() => this.play());
                } else if (
                    e.key == "Backspace" &&
                    this.enemiesList.length == 0
                ) {
                    this.start(this.canvasManager);
                }
            });
        }
    }
    play(): void {
        this.updateEnemies();
        this.updatePlayer();
        this.canvasManager.clearAlienZone();
        this.canvasManager.clearPlayerZone();
        this.checkForWallCollision();
        this.checkForEnemyCollision();
        this.checkForRemoveableBulletsAndShieldCollision();
        this.displayEnemies();
        this.displayPlayer();
        this.updateBullets();
        this.checkForWin();
        this.checkForDefeat();
        if (this.isDefeat) {
            cancelAnimationFrame(this.RAF);
            if (this.score >= this.highestScore) {
                this.highestScore = this.score;
            }
            this.canvasManager.displayDefeatScreen();
            this.isDefeat = false;
            this.isPlaying = false;
            this.displayCounter = 0;
            this.score = 0;
            this.canvasManager.displayScore(this.score, this.highestScore);
            this.lives = 3;
            this.bulletList = [];
            this.enemiesList = [];
            this.counter++;
            this.audioManager.pause(this.audioPlayer2);
        } else {
            requestAnimationFrame(() => this.play());
        }
    }
    checkForWallCollision(): void {
        if (
            this.enemiesList.some(
                (element) =>
                    element.x + this.canvasManager.STANDARD_ENEMY_SIZE >=
                    this.canvasManager.getCanvasWidth()
            )
        ) {
            this.enemiesList.forEach((element) => {
                (element.vector = -element.vector), element.pushDown();
            });
        } else if (this.enemiesList.some((element) => element.x <= 0)) {
            this.enemiesList.forEach((element) => {
                (element.vector = -element.vector), element.pushDown();
            });
        }
    }
    checkForRemoveableBulletsAndShieldCollision(): void {
        for (const element of this.bulletList) {
            if (
                element.y - element.BULLET_HEIGHT / 2 <=
                    this.canvasManager.getTextHeight("hi-score") +
                        this.canvasManager.getTextHeight("000") ||
                element.y >=
                    this.canvasManager.getCanvasHeight() -
                        this.canvasManager.FONTSIZE
            ) {
                this.canvasManager.clearZone(
                    element.x,
                    element.y,
                    element.BULLET_WIDTH,
                    element.BULLET_HEIGHT
                );
                this.bulletList.splice(this.bulletList.indexOf(element), 1);
            } else if (
                element.y + element.BULLET_HEIGHT >=
                this.canvasManager.getCanvasHeight() -
                    2.75 * this.canvasManager.FONTSIZE
            ) {
                this.canvasManager.clearZone(
                    element.x,
                    element.y,
                    element.BULLET_WIDTH,
                    element.BULLET_HEIGHT
                );
                this.bulletList.splice(this.bulletList.indexOf(element), 1);
            } else if (element.type === "player") {
                const imageData: Uint8ClampedArray =
                    this.canvasManager.getImageData(
                        element.x,
                        element.y + element.vector - 1,
                        element.BULLET_WIDTH,
                        1 - element.vector
                    ).data;
                for (let i = 0; i < imageData.length; i += 4) {
                    if (imageData[i + 1] == 252) {
                        this.canvasManager.clearZone(
                            element.x,
                            element.y,
                            element.BULLET_WIDTH,
                            element.BULLET_HEIGHT
                        );
                        this.bulletList.splice(
                            this.bulletList.indexOf(element),
                            1
                        );
                        const destroyableImageData: ImageData =
                            this.canvasManager.getImageData(
                                element.x - 10,
                                element.y + element.vector,
                                20,
                                -3 * element.vector
                            );
                        for (
                            let i = 0;
                            i < destroyableImageData.data.length;
                            i += 4
                        ) {
                            destroyableImageData.data[i] = 0;
                            destroyableImageData.data[i + 1] = 0;
                            destroyableImageData.data[i + 2] = 0;
                            destroyableImageData.data[i + 3] = 255;
                        }
                        this.canvasManager.putImageData(
                            destroyableImageData,
                            element.x - 10,
                            element.y + element.vector * 3
                        );
                        break;
                    }
                }
            } else if (element.type === "enemy") {
                let imageData: Uint8ClampedArray =
                    this.canvasManager.getImageData(
                        element.x,
                        element.y + element.BULLET_HEIGHT + element.vector,
                        element.BULLET_WIDTH,
                        1
                    ).data;
                console.log(imageData.length / 4);
                for (let i = 0; i < imageData.length; i += 4) {
                    if (imageData[i + 1] == 252) {
                        this.canvasManager.clearZone(
                            element.x,
                            element.y,
                            element.BULLET_WIDTH,
                            element.BULLET_HEIGHT
                        );
                        this.bulletList.splice(
                            this.bulletList.indexOf(element),
                            1
                        );
                        const destroyableImageData: ImageData =
                            this.canvasManager.getImageData(
                                element.x - 10,
                                element.y +
                                    element.BULLET_HEIGHT +
                                    element.vector,
                                30,
                                -3 * element.vector
                            );
                        for (
                            let i = 0;
                            i < destroyableImageData.data.length;
                            i += 4
                        ) {
                            destroyableImageData.data[i] = 0;
                            destroyableImageData.data[i + 1] = 0;
                            destroyableImageData.data[i + 2] = 0;
                            destroyableImageData.data[i + 3] = 255;
                        }
                        this.canvasManager.putImageData(
                            destroyableImageData,
                            element.x - 10,
                            element.y + element.vector * 3
                        );
                        break;
                    }
                }
            }
        }
    }
    checkForEnemyCollision(): void {
        for (const bullet of this.bulletList) {
            if (bullet.type === "player") {
                for (const enemy of this.enemiesList) {
                    if (
                        bullet.x >= enemy.x &&
                        bullet.x <=
                            enemy.x + this.canvasManager.STANDARD_ENEMY_SIZE &&
                        bullet.y - bullet.vector >= enemy.y &&
                        bullet.y <=
                            enemy.y + this.canvasManager.STANDARD_ENEMY_SIZE
                    ) {
                        this.enemiesList.forEach((enemy) => {
                            if (enemy.vector < 0)
                                enemy.vector -= this.ENEMY_BOOST;
                            else enemy.vector += this.ENEMY_BOOST;
                            enemy.shootProbabilty += 1;
                            console.log(this.enemyVecSetter);
                        });
                        this.enemiesList.splice(
                            this.enemiesList.indexOf(enemy),
                            1
                        );
                        this.canvasManager.clearZone(
                            enemy.x,
                            enemy.y,
                            this.canvasManager.STANDARD_ENEMY_SIZE,
                            this.canvasManager.STANDARD_ENEMY_SIZE
                        );
                        this.canvasManager.displayObject(
                            6,
                            enemy.x,
                            enemy.y,
                            this.canvasManager.STANDARD_ENEMY_SIZE,
                            this.canvasManager.STANDARD_ENEMY_SIZE
                        );
                        this.audioManager.play(this.audioPlayer1);
                        this.bulletList.splice(
                            this.bulletList.indexOf(bullet),
                            1
                        );
                        this.canvasManager.clearZone(
                            bullet.x,
                            bullet.y,
                            bullet.BULLET_WIDTH,
                            bullet.BULLET_HEIGHT
                        );
                        switch (enemy.graphic) {
                            case 3:
                                this.score += 30;
                                break;
                            case 2:
                                this.score += 10;
                                break;
                            case 1:
                                this.score += 20;
                                break;
                            case 0:
                                this.score += 100;
                                break;
                        }
                        this.canvasManager.displayScore(
                            this.score,
                            this.highestScore
                        );
                        this.enemyVecSetter += this.ENEMY_BOOST;
                        break;
                    }
                }
            } else if (bullet.type === "enemy") {
                if (
                    bullet.x >= this.player.x &&
                    bullet.x <= this.player.x + this.player.PLAYER_WIDTH &&
                    bullet.y >=
                        this.canvasManager.getCanvasHeight() -
                            2.75 * this.canvasManager.FONTSIZE -
                            this.player.PLAYER_HEIGHT &&
                    bullet.y <=
                        this.canvasManager.getCanvasHeight() -
                            2.75 * this.canvasManager.FONTSIZE
                ) {
                    this.lives--;
                    if (this.lives <= 0) {
                        this.isDefeat = true;
                    }
                    this.bulletList.splice(this.bulletList.indexOf(bullet), 1);
                    this.canvasManager.clearZone(
                        bullet.x,
                        bullet.y,
                        bullet.BULLET_WIDTH,
                        bullet.BULLET_HEIGHT
                    );
                    this.canvasManager.displayBottom(this.lives);
                }
            }
        }
    }
    checkForDefeat(): void {
        for (const enemy of this.enemiesList) {
            if (enemy.y + 25 >= this.canvasManager.getCanvasHeight() * 0.75) {
                this.isPlaying = false;
                this.isDefeat = true;
            }
        }
    }
    checkForWin(): void {
        if (this.enemiesList.length == 0) {
            this.bulletList = [];
            this.canvasManager.clearAlienZone();
            this.setEnemiesList();
            this.displayEnemiesDefault();
        }
    }
}
