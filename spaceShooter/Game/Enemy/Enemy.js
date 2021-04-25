class Enemy {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        
        this.centerX;
        this.centerY;

        this.moveAngle;

        this.velX = 1;
        this.velY = 1;

        this.speed = 0.5;

        this.size = 100;

        this.radius = this.size / 2;
    }

    update(time) {
        this.moveAngle = Math.atan2(this.x - game.ship.x, this.y - game.ship.y);

        let dist = Math.hypot(this.x - game.ship.x, this.y - game.ship.y)

        let velX = -Math.sin(this.moveAngle);
        let velY = -Math.cos(this.moveAngle);
    
        this.x += velX * time * this.speed;
        this.y += velY * time * this.speed;

        this.centerX = this.x + this.radius;
        this.centerY = this.y + this.radius;

    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.centerX, this.centerY, this.size / 2, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.drawImage(spriteHandler.enemy, this.x, this.y, this.size, this.size)

        ctx.beginPath();
        ctx.fillStyle = "white"
        ctx.fillRect(slideMovementHandler.currentTopLeft.x, slideMovementHandler.currentTopLeft.y, 100, 100)
    }
}