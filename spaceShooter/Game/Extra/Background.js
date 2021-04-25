class Background {
    constructor() {
        this.stars = []
        this.starCountInView = 100;

        this.renderDistFactor = 1.3;
        this.renderDistX = innerWidth * this.renderDistFactor;
        this.renderDistY = innerHeight * this.renderDistFactor;

        this.renderOpp = (2 * this.renderDistX + canvas.width) * (2 * this.renderDistY + canvas.height);
        this.viewOpp = canvas.width * canvas.height

        this.totalStarCount = (this.renderOpp * this.starCountInView) / this.viewOpp


        for (let i = 0; i < this.totalStarCount; i++) {
            this.genStar();
        }
    }

    genStar() {
        let maxX = canvas.width + this.renderDistX;
        let minX = -this.renderDistX;

        let maxY = canvas.height + this.renderDistY;
        let minY = -this.renderDistY

        this.stars.push(new Star(Math.random() * (maxX - minX) + minX, Math.random() * (maxY - minY) + minY))
    }


    update(time) {
        this.stars.forEach((star, index) => {
            star.update(time);

            //place opposite side
            if (star.x < 0 - this.renderDistX) {
                star.x = canvas.width - (Math.random() * game.ship.velX) + this.renderDistX;
            }

            if (star.x > canvas.width + this.renderDistX) {
                star.x = 0 + (Math.random() * game.ship.velX) - this.renderDistX;
            }

            if (star.y < 0 - this.renderDistY) {
                star.y = canvas.height - (Math.random() * game.ship.velY) + this.renderDistY;
            }

            if (star.y > canvas.height + this.renderDistY) {
                star.y = 0 + (Math.random() * game.ship.velY) - this.renderDistY;
            }
        })
    }

    draw() {
        this.stars.forEach((star) => {
            star.draw();
        });
    }
}

class Star {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 3;
    }

    update(time, bg) {
        //this.y += game.ship.velY * time * SLIDESPEED * -1;
        //this.x += game.ship.velX * time * SLIDESPEED * -1;
    }

    draw() {
        if(this.x + this.size >= 0 && this.y - this.size <= canvas.width && this.y + this.size >= 0 && this.y - this.size <= canvas.height) {
            ctx.beginPath();
            ctx.fillStyle = 'white'
            ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI)
            ctx.fill();
        }
    }
}