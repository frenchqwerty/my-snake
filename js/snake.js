let snake = new Snake();
let scl = 20;
let apple;

function setup() {
    createCanvas(700, 700);
    frameRate(10);
    pickLocation();
}

function draw() {
    background(100);
    snake.death();
    snake.update();
    snake.display();

    (snake.eat(apple) ? pickLocation() : 0);

    fill(255, 0, 100);
    rect(apple.x, apple.y, scl, scl);
}

function pickLocation() {
    let cols = floor(width / scl);
    let rows = floor(height / scl);
    apple = createVector(floor(random(cols)), floor(random(rows)));
    apple.mult(scl);
}

function keyPressed() {
    if (keyCode === UP_ARROW)
        snake.goTo(0, -1);
    else if (keyCode === DOWN_ARROW)
        snake.goTo(0, 1);
    else if (keyCode === LEFT_ARROW)
        snake.goTo(-1, 0);
    else if (keyCode === RIGHT_ARROW)
        snake.goTo(1, 0);
}

function Snake() {
    this.xspeed = 1;
    this.yspeed = 0;
    this.size = 0;
    this.body = [];
    this.x = 320;
    this.y = 320;

    this.initPos = () => {
        this.x = 320;
        this.y = 320;
    };

    this.death = () => {
        if ((this.x >= 700) || (this.x < 0)) {
            this.initPos();
            this.size = 0;
            this.body = [];
        }
        if ((this.y >= 700) || (this.y < 0)) {
            this.initPos();
            this.size = 0;
            this.body = [];
        }
        for (let i = 0; i < this.body.length; i++) {
            let pos = this.body[i];
            let d = dist(this.x, this.y, pos.x, pos.y);
            if (d < 1) {
                this.x = 320;
                this.y = 320;
                this.size = 0;
                this.body = [];
            }
        }

    };

    this.update = () => {
        for (let i = 0; i < this.body.length - 1; i++)
            this.body[i] = this.body[i + 1];
        this.body[this.size - 1] = createVector(this.x, this.y);
        this.x += this.xspeed * scl;
        this.y += this.yspeed * scl;
    };

    this.display = () => {
        fill(255);
        for (let i = 0; i < this.size; i++)
            rect(this.body[i].x, this.body[i].y, scl, scl);
        rect(this.x, this.y, scl, scl)
    };

    this.goTo = (x, y) => {
        this.xspeed = x;
        this.yspeed = y;
    };

    this.eat = (pos) => {
        let distance = dist(this.x, this.y, pos.x, pos.y);
        if (distance < 1) {
            this.size++;
            return true;
        } else
            return false;
    }
}