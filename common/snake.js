/*
 * @Author: xisen.he 
 * @Date: 2021-12-20 11:16:10 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2021-12-22 23:43:58
 */

import Event from "./event"

const TYPE = {
    "head": "HEAD",
    "body": "BODY"
}


export class Snake extends Event {

    constructor(x, y) {
        super();
        this.maxX = x;
        this.maxY = y;
        this.coordinates = [];

        // move direction, need a default
        this.direction = "ArrowRight";

        // header's coordinate
        this.head = {};

        // setInterval
        this.timer = null;

        this.createSnake();
    }

    /**
     * @description create the list by the xlen, ylen.
     * @param {number} xlen 
     * @param {number} ylen 
     */
    createCoordinates() {
        const coordinates = this.coordinates;
        for (let y = 1; y <= this.maxY; y++) {
            for (let x = 1; x <= this.maxX; x++) {
                coordinates.push({
                    x,
                    y,
                    id: x + '-' + y,
                });
            }
        }

        return coordinates;
    }

    createSnake() {
        this.snakeBody = [];

        let head = {
            x: Math.ceil(this.maxX / 2),
            y: Math.ceil(this.maxY / 2),
        };

        head.id = head.x + '-' + head.y;
        this.head = head;
        let { x, y } = head;

        this.snakeBody.unshift(head);
        this.snakeBody.unshift({
            y,
            x: x - 1,
            id: x - 1 + '-' + y,
        });

        this.snakeBody.unshift({
            y,
            x: x - 2,
            id: x - 2 + '-' + y,
        });

        this.snakeBody.unshift({
            y,
            x: x - 3,
            id: x - 3 + '-' + y,
        });

        return this.snakeBody;
    }

    keydown(event) {
        let key = event.key;
        switch (key) {
            case "ArrowLeft":
            case "ArrowRight":
            case "ArrowUp":
            case "ArrowDown":
                break;
            default:
                return;
        }

        // it's the same way.
        if (key == this.direction) {
            return;
        }

        let xArrow = ["ArrowLeft", "ArrowRight"];
        let yArrow = ["ArrowUp", "ArrowDown"];

        if (xArrow.includes(key) && xArrow.includes(this.direction)) {
            return;
        }

        if (yArrow.includes(key) && yArrow.includes(this.direction)) {
            return;
        }

        this.direction = key;
    }

    start() {

        this.timer = setInterval(() => {
            this.move();
        }, 100);
    }

    move() {
        let nextCoordinate = this.next();
        if (!nextCoordinate) {
            // dead
            alert("Game over")
            return clearInterval(this.timer);
        }

        this.snakeBody.push(nextCoordinate);
        this.snakeBody.splice(0, 1);

        // setting the type
        this.snakeBody.map((item, index) => {
            if (index == this.snakeBody.length - 1) {
                item.type = TYPE.head;
            } else {
                item.type = TYPE.body;
            }
        })

        this.emit("update", this.snakeBody);
    }

    next() {
        let direction = this.direction;
        let snakeHead = this.snakeBody[this.snakeBody.length - 1];
        let { x, y } = snakeHead;
        switch (direction) {
            case "ArrowLeft":
                x--;
                break;
            case "ArrowRight":
                x++;
                break;
            case "ArrowUp":
                y--;
                break;
            case "ArrowDown":
                y++;
                break;
            default:
                break;
        }

        let id = x + '-' + y;

        // touch left border, died.
        if (x < 1) {
            return;
        }

        // touch right border, died.
        if (x > this.maxX) {
            return;
        }

        // touch top border, died.
        if (y < 1) {
            return;
        }

        // touch bottom border, died.
        if (y > this.maxY) {
            return;
        }

        // touch it'self, died.
        let tmp = this.snakeBody.find((item) => {
            return item.id == id;
        })
        if (tmp) {
            return;
        }

        return {
            x,
            y,
            id
        }
    }
}