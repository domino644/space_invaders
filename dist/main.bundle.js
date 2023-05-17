/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/objects/Bullet.ts":
/*!*******************************!*\
  !*** ./src/objects/Bullet.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var Bullet = /** @class */ (function () {
    function Bullet(graphic, vector, type, x, y) {
        this.BULLET_WIDTH = 2;
        this.BULLET_HEIGHT = 15;
        this.graphic = graphic;
        this.vector = vector;
        this.type = type;
        this.x = x;
        this.y = y;
        if (this.graphic != 7)
            this.BULLET_WIDTH = 10;
    }
    Bullet.prototype.updatePosition = function () {
        this.y += this.vector;
    };
    return Bullet;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Bullet);


/***/ }),

/***/ "./src/objects/Enemy.ts":
/*!******************************!*\
  !*** ./src/objects/Enemy.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Bullet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Bullet */ "./src/objects/Bullet.ts");

var Enemy = /** @class */ (function () {
    function Enemy(graphic, x, y, id, vector, game) {
        this.shootProbabilty = 1;
        this.graphic = graphic;
        this.x = x;
        this.y = y;
        this.id = id;
        this.game = game;
        this.vector = vector;
        if (this.graphic == 0)
            this.vector = 10;
    }
    Enemy.prototype.updatePosition = function () {
        this.x += this.vector;
    };
    Enemy.prototype.pushDown = function () {
        this.y += 10;
    };
    Enemy.prototype.shoot = function () {
        var x = Math.floor(Math.random() * 100000);
        if (this.shootProbabilty >= x)
            this.game.bulletList.push(new _Bullet__WEBPACK_IMPORTED_MODULE_0__["default"](this.graphic + 8, 5, "enemy", this.x + 12.5, this.y + 25));
    };
    return Enemy;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Enemy);


/***/ }),

/***/ "./src/objects/Player.ts":
/*!*******************************!*\
  !*** ./src/objects/Player.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Bullet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Bullet */ "./src/objects/Bullet.ts");

var Player = /** @class */ (function () {
    function Player(canvasManager, audioManager, game) {
        var _this = this;
        this.PLAYER_GRAPHIC = 4;
        this.MOVE_VELOCITY = 3;
        this.moveLeft = false;
        this.moveRight = false;
        this.canvasManager = canvasManager;
        this.audioManager = audioManager;
        this.audioPlayer = document.getElementById("audio1");
        this.audioManager.load("shoot", this.audioPlayer);
        this.game = game;
        this.PLAYER_HEIGHT = this.canvasManager.getCanvasHeight() * 0.05;
        this.PLAYER_WIDTH = this.canvasManager.getCanvasWidth() * 0.0375;
        var keyPressed = [false, false, false];
        document.addEventListener("keydown", function (e) {
            // const keyName: string = e.key
            // switch (keyName) {
            //     case "ArrowLeft":
            //         keyPressed[0] = true;
            //         break
            //     case "ArrowRight":
            //         keyPressed[1] = true
            //         break
            //     case " ":
            //         keyPressed[2] = true
            //         break
            // }
            // if (keyPressed[0] && keyPressed[2]) {
            //     if (this.x - this.MOVE_VELOCITY >= 0) this.move(-this.MOVE_VELOCITY)
            //     this.shoot()
            // } else if (keyPressed[1] && keyPressed[2]) {
            //     if (this.x + this.MOVE_VELOCITY + this.PLAYER_WIDTH <= this.canvasManager.getCanvasWidth()) this.move(this.MOVE_VELOCITY)
            //     this.shoot()
            // } else if (keyPressed[0]) {
            //     if (this.x - this.MOVE_VELOCITY >= 0) this.move(-this.MOVE_VELOCITY)
            // } else if (keyPressed[1]) {
            //     if (this.x + this.MOVE_VELOCITY + this.PLAYER_WIDTH <= this.canvasManager.getCanvasWidth()) this.move(this.MOVE_VELOCITY)
            // } else if (keyPressed[2]) {
            //     this.shoot()
            // }
            if (e.key == " ") {
                _this.shoot();
            }
            else if (e.key == "ArrowLeft") {
                if (_this.x - _this.MOVE_VELOCITY >= 0)
                    _this.moveLeft = true;
                else
                    _this.moveLeft = false;
            }
            else if (e.key == "ArrowRight") {
                if (_this.x + _this.MOVE_VELOCITY + _this.PLAYER_WIDTH <=
                    _this.canvasManager.getCanvasWidth())
                    _this.moveRight = true;
                else
                    _this.moveRight = false;
            }
        });
        document.addEventListener("keyup", function (e) {
            if (e.key == "ArrowLeft")
                _this.moveLeft = false;
            else if (e.key == "ArrowRight")
                _this.moveRight = false;
        });
        document.addEventListener("keyup", function (e) {
            var keyName = e.key;
            switch (keyName) {
                case "ArrowLeft":
                    keyPressed[0] = false;
                    break;
                case "ArrowRight":
                    keyPressed[1] = false;
                    break;
                case " ":
                    keyPressed[2] = false;
                    break;
            }
        });
    }
    Player.prototype.shoot = function () {
        if (!this.game.bulletList.some(function (element) { return element.type === "player"; }) &&
            this.game.isPlaying) {
            var bullet = new _Bullet__WEBPACK_IMPORTED_MODULE_0__["default"](7, -10, "player", this.x + 0.5 * this.PLAYER_WIDTH, this.canvasManager.getCanvasHeight() -
                2.75 * this.canvasManager.FONTSIZE -
                this.PLAYER_HEIGHT);
            this.game.bulletList.push(bullet);
            this.audioManager.play(this.audioPlayer);
        }
    };
    Player.prototype.move = function (x) {
        this.x += x;
    };
    return Player;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Player);


/***/ }),

/***/ "./src/utils/AudioManager.ts":
/*!***********************************!*\
  !*** ./src/utils/AudioManager.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var AudioManager = /** @class */ (function () {
    function AudioManager() {
        this.soundList = [
            {
                shortName: "explosion",
                url: "../src/sounds_and_visuals/sounds/explosion/explosion.wav",
            },
            {
                shortName: "fastInvader1",
                url: "../src/sounds_and_visuals/sounds/fastinvader1/fastinvader1.wav",
            },
            {
                shortName: "fastInvader2",
                url: "../src/sounds_and_visuals/sounds/fastinvader2/fastinvader2.wav",
            },
            {
                shortName: "fastInvader3",
                url: "../src/sounds_and_visuals/sounds/fastinvader3/fastinvader3.wav",
            },
            {
                shortName: "fastInvader4",
                url: "../src/sounds_and_visuals/sounds/fastinvader4/fastinvader4.wav",
            },
            {
                shortName: "invaderKilled",
                url: "../src/sounds_and_visuals/sounds/invaderkilled/invaderkilled.wav",
            },
            {
                shortName: "shoot",
                url: "../src/sounds_and_visuals/sounds/shoot/shoot.wav",
            },
            {
                shortName: "coolMusic",
                url: "../src/sounds_and_visuals/sounds/spaceinvaders1_mpeg/spaceinvaders1.mpeg",
            },
            {
                shortName: "ufoHighPitch",
                url: "../src/sounds_and_visuals/sounds/ufo_highpitch/ufo_highpitch.wav",
            },
            {
                shortName: "ufoLowPitch",
                url: "../src/sounds_and_visuals/sounds/ufo_lowpitch/ufo_lowpitch.wav",
            },
        ];
    }
    AudioManager.prototype.play = function (audio) {
        audio.play();
    };
    AudioManager.prototype.pause = function (audio) {
        audio.pause();
    };
    AudioManager.prototype.load = function (name, audio) {
        var currentSong = this.soundList.filter(function (elem) { return elem.shortName == name; });
        audio.src = currentSong[0].url;
    };
    AudioManager.prototype.restart = function (audio) {
        audio.currentTime = 0;
    };
    return AudioManager;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AudioManager);


/***/ }),

/***/ "./src/utils/CanvasManager.ts":
/*!************************************!*\
  !*** ./src/utils/CanvasManager.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var CanvasManager = /** @class */ (function () {
    function CanvasManager() {
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext('2d');
        this.FONTSIZE = 20;
        this.STANDARD_ENEMY_SIZE = 25;
        this.imageList = [
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
        ];
        this.texturesList = [];
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = 'white';
        this.ctx.font = this.FONTSIZE + "px Space Invaders";
        this.ctx.strokeStyle = '#00fc00';
        this.canvas.setAttribute('crossOrigin', '');
        this.ctx.imageSmoothingEnabled = false;
    }
    CanvasManager.prototype.displayScore = function (score, highestScore) {
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, this.FONTSIZE, this.canvas.width, this.FONTSIZE);
        this.ctx.fillStyle = 'white';
        this.ctx.fillText("score<1>", this.FONTSIZE / 2, this.FONTSIZE);
        this.ctx.fillText("hi-score", this.canvas.width / 2 - (this.ctx.measureText("hi-score").width) / 2, this.FONTSIZE);
        this.ctx.fillText("score<2>", this.canvas.width - (this.FONTSIZE / 2) - this.ctx.measureText("score<2>").width, this.FONTSIZE);
        switch (score.toString().length) {
            case 1:
                this.ctx.fillText("00" + score.toString() + " ", this.FONTSIZE / 2, this.FONTSIZE * 2);
                break;
            case 2:
                this.ctx.fillText("0" + score.toString() + " ", this.FONTSIZE / 2, this.FONTSIZE * 2);
                break;
            default:
                this.ctx.fillText(score.toString() + " ", this.FONTSIZE / 2, this.FONTSIZE * 2);
                break;
        }
        switch (highestScore.toString().length) {
            case 1:
                this.ctx.fillText("00" + highestScore.toString() + " ", this.canvas.width / 2 - (this.ctx.measureText("00" + highestScore.toString() + " ").width) / 2, this.FONTSIZE * 2);
                break;
            case 2:
                this.ctx.fillText("0" + highestScore.toString() + " ", this.canvas.width / 2 - (this.ctx.measureText("0" + highestScore.toString() + " ").width) / 2, this.FONTSIZE * 2);
                break;
            default:
                this.ctx.fillText(highestScore.toString() + " ", this.canvas.width / 2 - (this.ctx.measureText(highestScore.toString()).width) / 2, this.FONTSIZE * 2);
                break;
        }
        this.ctx.fillText("000", this.canvas.width - this.FONTSIZE / 2 - this.ctx.measureText("000").width, this.FONTSIZE * 2);
    };
    CanvasManager.prototype.displayBottom = function (lives, reset) {
        var _this = this;
        if (reset === void 0) { reset = false; }
        var image;
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, this.canvas.height - this.FONTSIZE * 2.75 + 2, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = 'white';
        this.ctx.fillText(lives.toString(), this.FONTSIZE / 2, this.canvas.height - this.FONTSIZE);
        var _loop_1 = function (i) {
            image = new Image();
            image.width = 3 * this_1.FONTSIZE;
            image.height = 2 * this_1.FONTSIZE;
            image.onload = function () {
                _this.ctx.drawImage(image, _this.FONTSIZE + 10 + i * (image.width + 10), _this.canvas.height - image.height - 10, image.width, image.height);
            };
            image.src = '../src/sounds_and_visuals/graphics/space-invaders-characters/player.png';
        };
        var this_1 = this;
        for (var i = 0; i < lives; i++) {
            _loop_1(i);
        }
        this.ctx.fillText("credit 00", this.canvas.width - this.FONTSIZE - this.ctx.measureText("credit 00").width, this.canvas.height - this.FONTSIZE);
        if (reset) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, this.canvas.height - 2.75 * this.FONTSIZE);
            this.ctx.lineTo(this.canvas.width, this.canvas.height - 2.75 * this.FONTSIZE);
            this.ctx.lineWidth = 2;
            this.ctx.stroke();
        }
    };
    CanvasManager.prototype.displayObject = function (id, posX, posY, height, width) {
        if (height === void 0) { height = this.STANDARD_ENEMY_SIZE; }
        if (width === void 0) { width = this.STANDARD_ENEMY_SIZE; }
        this.ctx.drawImage(this.texturesList[id], posX, posY, width, height);
    };
    CanvasManager.prototype.displayDefeatScreen = function () {
        this.clearZone(0, this.FONTSIZE * 2, this.getCanvasWidth(), this.getCanvasHeight() - (4 * this.FONTSIZE));
        this.ctx.fillStyle = 'white';
        this.ctx.font = '40px Space Invaders';
        this.ctx.fillText('Game Over', (this.getCanvasWidth() - this.getTextWidth('Game Over')) / 2, this.getCanvasHeight() / 2 - this.getTextHeight('Game Over'));
        this.ctx.font = this.FONTSIZE + "px Space Invaders";
        this.ctx.fillText('Press <backspace> to restart', (this.getCanvasWidth() - this.getTextWidth('Press <backspace> to restart')) / 2, this.getCanvasHeight() / 2 + (this.getTextHeight('Game Over') * 2));
    };
    CanvasManager.prototype.clearAlienZone = function () {
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, this.FONTSIZE * 2, this.getCanvasWidth(), this.getCanvasHeight() * 0.75 - this.getTextHeight('hi-score') - this.getTextHeight('000'));
    };
    CanvasManager.prototype.clearPlayerZone = function () {
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, this.canvas.height - 2.75 * this.FONTSIZE - this.getCanvasWidth() * 0.0375, this.getCanvasWidth(), this.getCanvasWidth() * 0.0375);
    };
    CanvasManager.prototype.clearZone = function (x, y, width, height) {
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(x, y, width, height);
    };
    CanvasManager.prototype.loadTexture = function (src) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var image = new Image();
                        image.onload = function () {
                            image.crossOrigin = null;
                            _this.texturesList.push(image);
                            resolve();
                        };
                        image.src = src;
                    })];
            });
        });
    };
    CanvasManager.prototype.loadAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _i, _a, element;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _i = 0, _a = this.imageList;
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        element = _a[_i];
                        return [4 /*yield*/, this.loadTexture(element)];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CanvasManager.prototype.getCanvasHeight = function () {
        return this.canvas.height;
    };
    CanvasManager.prototype.getCanvasWidth = function () {
        return this.canvas.width;
    };
    CanvasManager.prototype.getTextHeight = function (text) {
        return Math.abs(this.ctx.measureText(text).actualBoundingBoxAscent) + Math.abs(this.ctx.measureText(text).actualBoundingBoxDescent);
    };
    CanvasManager.prototype.getTextWidth = function (text) {
        return this.ctx.measureText(text).width;
    };
    CanvasManager.prototype.getImageData = function (x, y, width, height) {
        return this.ctx.getImageData(x, y, width, height);
    };
    CanvasManager.prototype.putImageData = function (imageData, x, y) {
        this.ctx.putImageData(imageData, x, y);
    };
    return CanvasManager;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CanvasManager);


/***/ }),

/***/ "./src/utils/Game.ts":
/*!***************************!*\
  !*** ./src/utils/Game.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _objects_Enemy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../objects/Enemy */ "./src/objects/Enemy.ts");
/* harmony import */ var _objects_Player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../objects/Player */ "./src/objects/Player.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};


// import SpecialEnemy from "../objects/SpecialEnemy";
var Game = /** @class */ (function () {
    function Game(canvasManager, audioManager) {
        this.highestScore = 0;
        this.score = 0;
        this.lives = 3;
        this.enemiesList = [];
        this.bulletList = [];
        this.isPlaying = false;
        this.displayCounter = 0;
        this.isDefeat = false;
        this.counter = 0;
        this.enemyVecSetter = 1;
        this.ENEMY_BOOST = 0.05;
        this.audioPlayer1 = document.getElementById("audio2");
        this.audioPlayer2 = document.getElementById("audio3");
        this.audioManager = audioManager;
        this.audioManager.load("explosion", this.audioPlayer1);
        this.audioManager.load("coolMusic", this.audioPlayer2);
        this.start(canvasManager);
    }
    Game.prototype.displayEnemies = function () {
        for (var _i = 0, _a = this.enemiesList; _i < _a.length; _i++) {
            var element = _a[_i];
            this.canvasManager.displayObject(element.graphic, element.x, element.y);
        }
    };
    Game.prototype.displayEnemiesDefault = function () {
        var _this = this;
        this.enemiesList.forEach(function (element, i) {
            setTimeout(function () {
                _this.canvasManager.displayObject(element.graphic, element.x, element.y);
                _this.displayCounter++;
            }, 50 * i);
        });
    };
    Game.prototype.setEnemiesList = function () {
        var _this = this;
        var x;
        var y;
        var graphic;
        Array(50)
            .fill(0)
            .forEach(function (_element, i) {
            if (i < 10) {
                graphic = 3;
                y =
                    _this.canvasManager.getTextHeight("score<1>") +
                        _this.canvasManager.getTextHeight("000") +
                        _this.canvasManager.STANDARD_ENEMY_SIZE * 2;
                x =
                    _this.canvasManager.getCanvasWidth() / 2 +
                        i * _this.canvasManager.STANDARD_ENEMY_SIZE * 2.5 -
                        5 * _this.canvasManager.STANDARD_ENEMY_SIZE * 2.5 +
                        _this.canvasManager.STANDARD_ENEMY_SIZE;
            }
            else if (i < 20) {
                graphic = 1;
                y =
                    _this.canvasManager.getTextHeight("score<1>") +
                        _this.canvasManager.getTextHeight("000") +
                        _this.canvasManager.STANDARD_ENEMY_SIZE * 4;
                x =
                    _this.canvasManager.getCanvasWidth() / 2 +
                        (i - 10) *
                            _this.canvasManager.STANDARD_ENEMY_SIZE *
                            2.5 -
                        5 * _this.canvasManager.STANDARD_ENEMY_SIZE * 2.5 +
                        _this.canvasManager.STANDARD_ENEMY_SIZE;
            }
            else if (i < 30) {
                graphic = 1;
                y =
                    _this.canvasManager.getTextHeight("score<1>") +
                        _this.canvasManager.getTextHeight("000") +
                        _this.canvasManager.STANDARD_ENEMY_SIZE * 6;
                x =
                    _this.canvasManager.getCanvasWidth() / 2 +
                        (i - 20) *
                            _this.canvasManager.STANDARD_ENEMY_SIZE *
                            2.5 -
                        5 * _this.canvasManager.STANDARD_ENEMY_SIZE * 2.5 +
                        _this.canvasManager.STANDARD_ENEMY_SIZE;
            }
            else if (i < 40) {
                graphic = 2;
                y =
                    _this.canvasManager.getTextHeight("score<1>") +
                        _this.canvasManager.getTextHeight("000") +
                        _this.canvasManager.STANDARD_ENEMY_SIZE * 8;
                x =
                    _this.canvasManager.getCanvasWidth() / 2 +
                        (i - 30) *
                            _this.canvasManager.STANDARD_ENEMY_SIZE *
                            2.5 -
                        5 * _this.canvasManager.STANDARD_ENEMY_SIZE * 2.5 +
                        _this.canvasManager.STANDARD_ENEMY_SIZE;
            }
            else {
                graphic = 2;
                y =
                    _this.canvasManager.getTextHeight("score<1>") +
                        _this.canvasManager.getTextHeight("000") +
                        _this.canvasManager.STANDARD_ENEMY_SIZE * 10;
                x =
                    _this.canvasManager.getCanvasWidth() / 2 +
                        (i - 40) *
                            _this.canvasManager.STANDARD_ENEMY_SIZE *
                            2.5 -
                        5 * _this.canvasManager.STANDARD_ENEMY_SIZE * 2.5 +
                        _this.canvasManager.STANDARD_ENEMY_SIZE;
            }
            var enemy = new _objects_Enemy__WEBPACK_IMPORTED_MODULE_0__["default"](graphic, x, y, i, _this.enemyVecSetter, _this);
            _this.enemiesList.push(enemy);
        });
    };
    Game.prototype.displayPlayerDefault = function () {
        this.canvasManager.displayObject(this.player.PLAYER_GRAPHIC, (this.canvasManager.getCanvasWidth() - this.player.PLAYER_WIDTH) /
            2, this.canvasManager.getCanvasHeight() -
            2.75 * this.canvasManager.FONTSIZE -
            this.player.PLAYER_HEIGHT, this.player.PLAYER_HEIGHT, this.player.PLAYER_WIDTH);
        this.player.x =
            (this.canvasManager.getCanvasWidth() - this.player.PLAYER_WIDTH) /
                2;
    };
    Game.prototype.displayPlayer = function () {
        this.canvasManager.displayObject(this.player.PLAYER_GRAPHIC, this.player.x, this.canvasManager.getCanvasHeight() -
            2.75 * this.canvasManager.FONTSIZE -
            this.player.PLAYER_HEIGHT, this.player.PLAYER_HEIGHT, this.player.PLAYER_WIDTH);
    };
    Game.prototype.displayShields = function () {
        this.canvasManager.displayObject(5, this.canvasManager.getCanvasWidth() * 0.2 - 50, this.canvasManager.getCanvasHeight() * 0.75, this.canvasManager.getCanvasHeight() * 0.1, this.canvasManager.getCanvasWidth() * 0.075);
        this.canvasManager.displayObject(5, this.canvasManager.getCanvasWidth() * 0.4 - 50, this.canvasManager.getCanvasHeight() * 0.75, this.canvasManager.getCanvasHeight() * 0.1, this.canvasManager.getCanvasWidth() * 0.075);
        this.canvasManager.displayObject(5, this.canvasManager.getCanvasWidth() * 0.6 - 50, this.canvasManager.getCanvasHeight() * 0.75, this.canvasManager.getCanvasHeight() * 0.1, this.canvasManager.getCanvasWidth() * 0.075);
        this.canvasManager.displayObject(5, this.canvasManager.getCanvasWidth() * 0.8 - 50, this.canvasManager.getCanvasHeight() * 0.75, this.canvasManager.getCanvasHeight() * 0.1, this.canvasManager.getCanvasWidth() * 0.075);
    };
    Game.prototype.updateEnemies = function () {
        for (var _i = 0, _a = this.enemiesList; _i < _a.length; _i++) {
            var element = _a[_i];
            element.updatePosition();
            element.shoot();
        }
    };
    Game.prototype.updateBullets = function () {
        for (var _i = 0, _a = this.bulletList; _i < _a.length; _i++) {
            var element = _a[_i];
            this.canvasManager.clearZone(element.x, element.y, element.BULLET_WIDTH, element.BULLET_HEIGHT);
            element.updatePosition();
            this.canvasManager.displayObject(element.graphic, element.x, element.y, element.BULLET_HEIGHT, element.BULLET_WIDTH);
        }
    };
    Game.prototype.updatePlayer = function () {
        if (this.player.moveLeft &&
            this.player.x - this.player.MOVE_VELOCITY >= 0) {
            this.player.x -= this.player.MOVE_VELOCITY;
        }
        else if (this.player.moveRight &&
            this.player.x +
                this.player.MOVE_VELOCITY +
                this.player.PLAYER_WIDTH <=
                this.canvasManager.getCanvasWidth()) {
            this.player.x += this.player.MOVE_VELOCITY;
        }
        // console.log(this.player.x);
    };
    Game.prototype.start = function (canvasManager) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.enemiesList = [];
                        this.bulletList = [];
                        this.canvasManager = canvasManager;
                        if (!(this.counter == 0)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.canvasManager.loadAll()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        this.canvasManager.clearAlienZone();
                        this.canvasManager.displayScore(this.score, this.highestScore);
                        this.canvasManager.displayBottom(this.lives, true);
                        this.setEnemiesList();
                        this.displayEnemiesDefault();
                        if (this.counter == 0) {
                            this.player = new _objects_Player__WEBPACK_IMPORTED_MODULE_1__["default"](this.canvasManager, this.audioManager, this);
                        }
                        this.displayPlayerDefault();
                        this.displayShields();
                        if (this.counter == 0) {
                            document.addEventListener("keydown", function (e) {
                                if (_this.displayCounter == 50 &&
                                    e.key == "Enter" &&
                                    _this.isPlaying === false) {
                                    _this.audioManager.restart(_this.audioPlayer2);
                                    _this.audioManager.play(_this.audioPlayer2);
                                    _this.isPlaying = true;
                                    _this.RAF = requestAnimationFrame(function () { return _this.play(); });
                                }
                                else if (e.key == "Backspace" &&
                                    _this.enemiesList.length == 0) {
                                    _this.start(_this.canvasManager);
                                }
                            });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Game.prototype.play = function () {
        var _this = this;
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
        }
        else {
            requestAnimationFrame(function () { return _this.play(); });
        }
    };
    Game.prototype.checkForWallCollision = function () {
        var _this = this;
        if (this.enemiesList.some(function (element) {
            return element.x + _this.canvasManager.STANDARD_ENEMY_SIZE >=
                _this.canvasManager.getCanvasWidth();
        })) {
            this.enemiesList.forEach(function (element) {
                (element.vector = -element.vector), element.pushDown();
            });
        }
        else if (this.enemiesList.some(function (element) { return element.x <= 0; })) {
            this.enemiesList.forEach(function (element) {
                (element.vector = -element.vector), element.pushDown();
            });
        }
    };
    Game.prototype.checkForRemoveableBulletsAndShieldCollision = function () {
        for (var _i = 0, _a = this.bulletList; _i < _a.length; _i++) {
            var element = _a[_i];
            if (element.y - element.BULLET_HEIGHT / 2 <=
                this.canvasManager.getTextHeight("hi-score") +
                    this.canvasManager.getTextHeight("000") ||
                element.y >=
                    this.canvasManager.getCanvasHeight() -
                        this.canvasManager.FONTSIZE) {
                this.canvasManager.clearZone(element.x, element.y, element.BULLET_WIDTH, element.BULLET_HEIGHT);
                this.bulletList.splice(this.bulletList.indexOf(element), 1);
            }
            else if (element.y + element.BULLET_HEIGHT >=
                this.canvasManager.getCanvasHeight() -
                    2.75 * this.canvasManager.FONTSIZE) {
                this.canvasManager.clearZone(element.x, element.y, element.BULLET_WIDTH, element.BULLET_HEIGHT);
                this.bulletList.splice(this.bulletList.indexOf(element), 1);
            }
            else if (element.type === "player") {
                var imageData = this.canvasManager.getImageData(element.x, element.y + element.vector - 1, element.BULLET_WIDTH, 1 - element.vector).data;
                for (var i = 0; i < imageData.length; i += 4) {
                    if (imageData[i + 1] == 252) {
                        this.canvasManager.clearZone(element.x, element.y, element.BULLET_WIDTH, element.BULLET_HEIGHT);
                        this.bulletList.splice(this.bulletList.indexOf(element), 1);
                        var destroyableImageData = this.canvasManager.getImageData(element.x - 10, element.y + element.vector, 20, -3 * element.vector);
                        for (var i_1 = 0; i_1 < destroyableImageData.data.length; i_1 += 4) {
                            destroyableImageData.data[i_1] = 0;
                            destroyableImageData.data[i_1 + 1] = 0;
                            destroyableImageData.data[i_1 + 2] = 0;
                            destroyableImageData.data[i_1 + 3] = 255;
                        }
                        this.canvasManager.putImageData(destroyableImageData, element.x - 10, element.y + element.vector * 3);
                        break;
                    }
                }
            }
            else if (element.type === "enemy") {
                var imageData = this.canvasManager.getImageData(element.x, element.y + element.BULLET_HEIGHT + element.vector, element.BULLET_WIDTH, 1).data;
                console.log(imageData.length / 4);
                for (var i = 0; i < imageData.length; i += 4) {
                    if (imageData[i + 1] == 252) {
                        this.canvasManager.clearZone(element.x, element.y, element.BULLET_WIDTH, element.BULLET_HEIGHT);
                        this.bulletList.splice(this.bulletList.indexOf(element), 1);
                        var destroyableImageData = this.canvasManager.getImageData(element.x - 10, element.y +
                            element.BULLET_HEIGHT +
                            element.vector, 30, -3 * element.vector);
                        for (var i_2 = 0; i_2 < destroyableImageData.data.length; i_2 += 4) {
                            destroyableImageData.data[i_2] = 0;
                            destroyableImageData.data[i_2 + 1] = 0;
                            destroyableImageData.data[i_2 + 2] = 0;
                            destroyableImageData.data[i_2 + 3] = 255;
                        }
                        this.canvasManager.putImageData(destroyableImageData, element.x - 10, element.y + element.vector * 3);
                        break;
                    }
                }
            }
        }
    };
    Game.prototype.checkForEnemyCollision = function () {
        var _this = this;
        for (var _i = 0, _a = this.bulletList; _i < _a.length; _i++) {
            var bullet = _a[_i];
            if (bullet.type === "player") {
                for (var _b = 0, _c = this.enemiesList; _b < _c.length; _b++) {
                    var enemy = _c[_b];
                    if (bullet.x >= enemy.x &&
                        bullet.x <=
                            enemy.x + this.canvasManager.STANDARD_ENEMY_SIZE &&
                        bullet.y - bullet.vector >= enemy.y &&
                        bullet.y <=
                            enemy.y + this.canvasManager.STANDARD_ENEMY_SIZE) {
                        this.enemiesList.forEach(function (enemy) {
                            if (enemy.vector < 0)
                                enemy.vector -= _this.ENEMY_BOOST;
                            else
                                enemy.vector += _this.ENEMY_BOOST;
                            enemy.shootProbabilty += 1;
                            console.log(_this.enemyVecSetter);
                        });
                        this.enemiesList.splice(this.enemiesList.indexOf(enemy), 1);
                        this.canvasManager.clearZone(enemy.x, enemy.y, this.canvasManager.STANDARD_ENEMY_SIZE, this.canvasManager.STANDARD_ENEMY_SIZE);
                        this.canvasManager.displayObject(6, enemy.x, enemy.y, this.canvasManager.STANDARD_ENEMY_SIZE, this.canvasManager.STANDARD_ENEMY_SIZE);
                        this.audioManager.play(this.audioPlayer1);
                        this.bulletList.splice(this.bulletList.indexOf(bullet), 1);
                        this.canvasManager.clearZone(bullet.x, bullet.y, bullet.BULLET_WIDTH, bullet.BULLET_HEIGHT);
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
                        this.canvasManager.displayScore(this.score, this.highestScore);
                        this.enemyVecSetter += this.ENEMY_BOOST;
                        break;
                    }
                }
            }
            else if (bullet.type === "enemy") {
                if (bullet.x >= this.player.x &&
                    bullet.x <= this.player.x + this.player.PLAYER_WIDTH &&
                    bullet.y >=
                        this.canvasManager.getCanvasHeight() -
                            2.75 * this.canvasManager.FONTSIZE -
                            this.player.PLAYER_HEIGHT &&
                    bullet.y <=
                        this.canvasManager.getCanvasHeight() -
                            2.75 * this.canvasManager.FONTSIZE) {
                    this.lives--;
                    if (this.lives <= 0) {
                        this.isDefeat = true;
                    }
                    this.bulletList.splice(this.bulletList.indexOf(bullet), 1);
                    this.canvasManager.clearZone(bullet.x, bullet.y, bullet.BULLET_WIDTH, bullet.BULLET_HEIGHT);
                    this.canvasManager.displayBottom(this.lives);
                }
            }
        }
    };
    Game.prototype.checkForDefeat = function () {
        for (var _i = 0, _a = this.enemiesList; _i < _a.length; _i++) {
            var enemy = _a[_i];
            if (enemy.y + 25 >= this.canvasManager.getCanvasHeight() * 0.75) {
                this.isPlaying = false;
                this.isDefeat = true;
            }
        }
    };
    Game.prototype.checkForWin = function () {
        if (this.enemiesList.length == 0) {
            this.bulletList = [];
            this.canvasManager.clearAlienZone();
            this.setEnemiesList();
            this.displayEnemiesDefault();
        }
    };
    return Game;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Game);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_AudioManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/AudioManager */ "./src/utils/AudioManager.ts");
/* harmony import */ var _utils_CanvasManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/CanvasManager */ "./src/utils/CanvasManager.ts");
/* harmony import */ var _utils_Game__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/Game */ "./src/utils/Game.ts");



var audioManager = new _utils_AudioManager__WEBPACK_IMPORTED_MODULE_0__["default"]();
var canvasManager = new _utils_CanvasManager__WEBPACK_IMPORTED_MODULE_1__["default"]();
new _utils_Game__WEBPACK_IMPORTED_MODULE_2__["default"](canvasManager, audioManager);

})();

/******/ })()
;
//# sourceMappingURL=main.bundle.js.map