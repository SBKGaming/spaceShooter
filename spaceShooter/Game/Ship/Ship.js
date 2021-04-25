class Ship {
    constructor(game, x, y) {
        this.game = game;

        this.size = 100;
        this.velChange = 0.01;
        this.velCap = 5;
        this.speed = 0.008;

        this.ship = spriteHandler.ship;
        this.flameIgnite = spriteHandler.flameIgnite;

        this.flameIgniteSpeed = 0.7; 
        this.flameSize = 40;

        this.x = x;
        this.y = y;

        this.targetX = x;
        this.targetY = y;

        this.velX = 0;
        this.velY = 0;

        this.shootX;
        this.shootY;

        this.angle = 0;

        this.mouseX;
        this.mouseY;

        this.velXChange = 0;
        this.velYChange = 0;

        this.thrust = {
            on: false,
            stage: 0 
        };

        addEventListener("keydown", (event) => {
            if (event.keyCode == 32) {
                this.changeVel();
                if (!this.thrust.on) {
                    this.thrust = {
                        on: true,
                        stage: 0
                    };
                }
            }
        })

        addEventListener("keyup", (event) => {
            if (event.keyCode == 32) {
                this.velXChange = 0;
                this.velYChange = 0;
                this.thrust = {
                    on: false,
                    stage: 0
                };
            }
        })

        addEventListener("mousemove", (event) => {
            this.mouseX = event.clientX;
            this.mouseY = event.clientY;

            this.angle = this.getAngleFromPos(this.mouseX + canvas.style.left, this.mouseY - canvas.style.bottom)
        })

        addEventListener("click", () => {
            this.game.bullets.push(new Bullet(this.shootX, this.shootY, Math.sin(this.angle), Math.cos(this.angle), this.angle))
        })
    }

    getAngleFromPos(x, y) {
        let angle = Math. atan2(x - (this.x + this.size / 2), y - (this.y   + this.size / 2));
        return angle
    }

    changeVel() {
        let angle = this.getAngleFromPos(this.mouseX, this.mouseY);
 
        this.velXChange = Math.sin(angle);
        this.velYChange = Math.cos(angle);

    }

    update(time) {
        this.velX += this.velXChange * time * this.speed * this.thrust.stage;
        this.velY += this.velYChange * time * this.speed * this.thrust.stage;

        this.targetX += this.velX;
        this.targetY += this.velY;

        let centerX = this.x + this.size / 2
        let centerY = this.y + this.size / 2


        let offset = 2.27;
        this.shootX = centerX + (Math.sin(this.angle) * this.size / offset);
        this.shootY = centerY + (Math.cos(this.angle) * this.size / offset);
    }

    draw() {
        ctx.beginPath();

        ctx.save();
        ctx.imageSmoothingEnabled = false;
        ctx.translate(this.x + this.size / 2, this.y + this.size / 2)
        ctx.rotate(this.angle * -1);

        this.drawFlame();
        
        ctx.drawImage(this.ship, 0 - this.size / 2, 0 - this.size / 2, this.size, this.size)
        ctx.restore();  

        ctx.arc(this.x + this.size / 2, this.y + this.size / 2, this.size / 1.5, 0, 2 * Math.PI)
        ctx.stroke();
    }

    drawFlame() {
        if (this.thrust.on) {
            let sheetDest;

            switch (Math.round(this.thrust.stage)) {
                case 0:
                    sheetDest = {
                        x: 0,
                        y: 0
                    }
                    this.thrust.stage += this.flameIgniteSpeed; 
                    break;
                case 1:
                    sheetDest = {
                        x: 32,
                        y: 0
                    }
                    this.thrust.stage += this.flameIgniteSpeed; 
                    break;
                case 2:
                    sheetDest = {
                        x: 64,
                        y: 0
                    }
                    this.thrust.stage += this.flameIgniteSpeed; 
                    break;  
                case 3:
                    sheetDest = {
                        x: 0,
                        y: 32
                    }
                    this.thrust.stage += this.flameIgniteSpeed; 
                    break;
                case 4:
                    sheetDest = {
                        x: 32,
                        y: 32
                    }
                    this.thrust.stage += this.flameIgniteSpeed; 
                    break;
                case 5:
                    sheetDest = {
                        x: 64,
                        y: 32
                    }
                    this.thrust.stage += this.flameIgniteSpeed; 
                    break;
                case 6:
                    sheetDest = {
                        x: 0,
                        y: 64
                    }
                    this.thrust.stage += this.flameIgniteSpeed; 
                    break; 
                case 7:
                    sheetDest = {
                        x: 32,
                        y: 64
                    }
                    break;
            }
            ctx.drawImage(this.flameIgnite, sheetDest.x, sheetDest.y, 32, 32, 0 - this.flameSize / 2, 0 - this.size / 2 - this.flameSize * 0.4, this.flameSize, this.flameSize)
        }
    }
} 