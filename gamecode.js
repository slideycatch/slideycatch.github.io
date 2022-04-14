const canvas = document.getElementById("my-canvas");
const ctx = canvas.getContext("2d");
canvas.height = 500;
canvas.width = 494;
const left = 37;
const right = 39;
const keystate = {};
keystate[left] = false;
keystate[right] = false;
let score = "0"

let circleBall = {
	x: 150,
	y: 250,
	r: 10,
	isfalling: true,
	xspeed: 0,
	yspeed: 5
};

const drawBall = () => {
	ctx.beginPath();
	ctx.arc(circleBall.x, circleBall.y, circleBall.r, 0, Math.PI * 2, false);
	ctx.fill();
	ctx.closePath();
};

const updateBall = () => {
	if (circleBall.isfalling) {
		circleBall.y += circleBall.yspeed;
		circleBall.x += circleBall.xspeed;
	} else {
		circleBall.y -= circleBall.yspeed;
		circleBall.x -= circleBall.xspeed;
	}
	if (circleBall.y <= 0) {
		circleBall.isfalling = true;
	}
	if (circleBall.x >= 494) {
		circleBall.xspeed *= -1;
	}
	if (circleBall.x <= 0) {
		circleBall.xspeed *= -1;
	}

	if (circleBall.x >= paddle.x && circleBall.x <= paddle.x + paddle.width) {
		if (circleBall.y >= paddle.y && circleBall.y <= paddle.y + paddle.height) {
			circleBall.isfalling = false;
			circleBall.xspeed = Math.floor(Math.random() * 10);
		}
	}
	for (let i = 0; i < boxes.length; i++) {
		if (
			circleBall.x >= boxes[i].x &&
			circleBall.x <= boxes[i].x + boxes[i].width
		) {
			if (
				circleBall.y >= boxes[i].y &&
				circleBall.y <= boxes[i].y + boxes[i].height
			) {
				circleBall.isfalling = true;
				boxes.splice(i, 1);
			}
		}
	}
};

const paddle = {
	x: 150,
	y: 450,
	height: 10,
	width: 100
};

circleBall.xspeed = Math.floor(Math.random() * 10 - 5);

circleBall.xspeed = Math.floor(Math.random() * 10 - 5);
const drawpaddle = () => {
	ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
};
const updatepaddle = () => {
	if (keystate[left]) {
		paddle.x -= 11;
	}
	if (keystate[right]) {
		paddle.x += 11;
	}
};
document.addEventListener("keydown", function (e) {
	keystate[e.keyCode] = true;
});

document.addEventListener("keyup", function (e) {
	keystate[e.keyCode] = false;
});

let boxes = [];

for (let j = 0; j < 3; j++) {
	for (let i = 0; i < 5; i++) {
		let box = { x: i * 100, y: j * 30, width: 98, height: 25 };
		boxes.push(box);
	}
}

const drawBox = () => {
	for (let i = 0; i < boxes.length; i++) {
		ctx.fillStyle = "gray";
		ctx.fillRect(boxes[i].x, boxes[i].y, boxes[i].width, boxes[i].height);
	}
};

const draw = () => {
	ctx.clearRect(0, 0, 500, 500);
	drawpaddle();
	updatepaddle();
	drawBall();
	updateBall();
	drawBox();
	requestAnimationFrame(draw);
};

draw();


 