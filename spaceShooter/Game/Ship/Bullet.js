class Bullet {
    constructor(x, y, velX, velY, angle) {
        this.size = 40;
        this.radius = this.size / 2;
        this.angle = angle;

        this.x = x - this.size / 2 + Math.sin(angle) * (this.size / 2);
        this.y = y - this.size / 2 + Math.cos(angle) * (this.size / 2);

        this.centerX = x + ((this.size * 1.4) * Math.sin(angle));
        this.centerY = y + ((this.size * 1.4) * Math.cos(angle));

        this.initVelX = game.ship.velX;
        this.initVelY = game.ship.velY;

        this.velX = velX;
        this.velY = velY;
        this.speed = 0.6;

        //visual
        this.flameIgnite = spriteHandler.flameIgnite;
        this.flameSize = this.size * 0.4;
        this.thrust = {
            stage: 0
        }
        this.igniteSpeed = 0.3

        this.torpedoe = spriteHandler.torpedoe
    }

    update(time) {
        let velX = this.velX * this.speed * time
        let velY = this.velY * this.speed * time

        //Add self velocity
        this.x += velX;
        this.y += velY;

        //initialized velocity
        this.x += this.initVelX * slideMovementHandler.moveFactor;
        this.y += this.initVelY * slideMovementHandler.moveFactor;

        //hitbox center
        this.centerX = this.x + this.size / 2 + Math.sin(this.angle) * this.size;
        this.centerY = this.y + this.size / 2 + Math.cos(this.angle) * this.size;
    }
    
    draw() {
        ctx.save();

        ctx.imageSmoothingEnabled = false;

        ctx.beginPath();
        ctx.translate(this.x + this.size / 2, this.y + this.size / 2)
        ctx.rotate(this.angle * -1);

        this.drawFlame();

        ctx.drawImage(this.torpedoe, -this.size / 2, this.size / 2, this.size, this.size);

        ctx.restore();

        ctx.arc(this.centerX, this.centerY, this.radius, 0, Math.PI * 2);
        ctx.stroke();

    }

    drawFlame() {
        let sheetDest;

        switch (Math.round(this.thrust.stage)) {
            case 0:
                sheetDest = {
                    x: 0,
                    y: 0
                }
                this.thrust.stage += this.igniteSpeed; 
                break;
            case 1:
                sheetDest = {
                    x: 32,
                    y: 0
                }
                this.thrust.stage += this.igniteSpeed; 
                break;
            case 2:
                sheetDest = {
                    x: 64,
                    y: 0
                }
                this.thrust.stage += this.igniteSpeed; 
                break;  
            case 3:
                sheetDest = {
                    x: 0,
                    y: 32
                }
                this.thrust.stage += this.igniteSpeed; 
                break;
            case 4:
                sheetDest = {
                    x: 32,
                    y: 32
                }
                this.thrust.stage += this.igniteSpeed; 
                break;
            case 5:
                sheetDest = {
                    x: 64,
                    y: 32
                }
                this.thrust.stage += this.igniteSpeed; 
                break;
            case 6:
                sheetDest = {
                    x: 0,
                    y: 64
                }
                this.thrust.stage += this.igniteSpeed; 
                break; 
            case 7:
                sheetDest = {
                    x: 32,
                    y: 64
                }
                break;
        }

        ctx.drawImage(this.flameIgnite, sheetDest.x, sheetDest.y, 32, 32, 0 - this.flameSize / 2, this.size - this.flameSize - this.size * 0.37, this.flameSize, this.flameSize)
    }
}