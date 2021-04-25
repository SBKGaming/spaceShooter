class Game {
    constructor() {
        this.ship = new Ship(this, 700, 200);
        this.bg = new Background();

        this.bullets = [];
        this.enemies = [];

        this.x = 2000;
        this.y = 2000;

        innerWidth = this.x;
        innerHeight = this.y;

        this.enemies.push(new Enemy(200, 200))
    }

    update(time) {
        this.ship.update(time);
        
        this.bullets.forEach((bullet) => {
            bullet.update(time);
        });

        this.enemies.forEach((enemy) => {
            enemy.update(time);
        })
 
        this.bullets.forEach((bullet, bulletIndex) => {
            this.enemies.forEach((enemy, enemyIndex) => {
                if (collisionHandler.circleHasCollision(bullet.centerX, bullet.centerY, bullet.radius, enemy.centerX, enemy.centerY, enemy.radius)) {
                    this.enemies.splice(enemyIndex, 1);
                    this.bullets.splice(bulletIndex, 1);
                }
            })
        })   

        this.bg.update(time);
    }

    draw() {
        ctx.clearRect(0, 0, innerWidth, innerHeight)

        this.bg.draw();

        this.enemies.forEach((enemy) => {
            enemy.draw();
        })

        this.bullets.forEach((bullet) => {
            bullet.draw();
        })

        this.ship.draw();
    }
} 