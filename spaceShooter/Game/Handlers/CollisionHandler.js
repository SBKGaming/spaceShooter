class CollisionHandler {
    constructor() {

    }

    circleHasCollision(x1, y1, r1, x2, y2, r2) {
        if (Math.hypot(x1 - x2, y1 - y2) < r1 + r2) { return true }
    }
}