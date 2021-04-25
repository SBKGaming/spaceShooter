class SlideMovementHandler {
    constructor() {
        this.slideSpeed = 0.022;

        this.currentSlide;

        this.moveFactor;

        this.currentTopLeft = {
            x: 0,
            y: 0
        }
    }

    update(time) {
        this.currentSlide = {
            x: game.ship.velX * time * this.slideSpeed * -1,
            y: game.ship.velY * time * this.slideSpeed * -1
        }

        this.currentTopLeft.x += this.currentSlide.x;
        this.currentTopLeft.y += this.currentSlide.y;

        this.moveFactor = this.slideSpeed * time;

        game.bg.stars.forEach(star => {
            star.x += this.currentSlide.x;
            star.y += this.currentSlide.y;
        });

        game.enemies.forEach(enemy => {
            enemy.x += this.currentSlide.x;
            enemy.y += this.currentSlide.y;
        });

        game.bullets.forEach(bullet => {
            bullet.x += this.currentSlide.x;
            bullet.y += this.currentSlide.y;
        })
    }

}