document.addEventListener('DOMContentLoaded', function() {
	
	const canvas = document.getElementById("canvas");
	const context = canvas.getContext("2d");
	const brick_width = 20;
	const brick_height = 15;
	const brick_quantity = 17;
	//context.fillStyle = "rgb(233, 233, 233)";
	//context.fillRect(1,1,canvas.width,canvas.height);	
	
	function draw() {
		context.fillStyle = "green";
		context.fillRect(0,0,1,1);
	}
	
	function draw_frame() {
	//	const color = context.getImageData(10,10,canvas.width,canvas.height);
	//	const red = color.data[0];
	//	const green = color.data[1];
	//	const blue = color.data[2];
	//	console.log("colors: ", red + " " + green + " " + blue)
		for (i=0; i < canvas.width; i++) {
			for (j=0; j < canvas.height; j++) {
				//console.log("test")
				if (i == 0 || i == (canvas.width -1) || j == 0 || j == (canvas.height -1)) { 
				context.fillStyle = "rgb(232, 169, 0)";
				context.fillRect(i,j,1,1);
				}
				if (i == 1 || i == (canvas.width -2) || j == 1 || j == (canvas.height -2)) { 
				context.fillStyle = "rgb(255, 195, 35)";
				context.fillRect(i,j,1,1);
				}
			}
		}		
	}
	
	function draw_one_brick(positionX, positionY) {
		for (i = positionX; i <= positionX + brick_width; i++) {
			for (j = positionY; j <= positionY + brick_height; j++) {
				if (i == positionX || i == (positionX + brick_width) || j == positionY || j == (positionY + brick_height)) { 
				context.fillStyle = "rgb(250, 250, 250)";
				context.fillRect(i,j,1,1);
				}
			/*	if (j == positionY + 10 || j == ((positionY + 10) + brick_width)) { 
				context.fillStyle = "rgb(232, 169, 0)";
				context.fillRect(i,j,1,1);
				} */
			}
		}
	}
	
	function brick_color_orange(positionX, positionY) {
		for (i = positionX + 1 ; i <= (positionX + brick_width) -1 ; i++) {
			for (j = positionY + 1; j <= (positionY + brick_height) - 1; j++) {
				//if (i == positionX || i == (positionX + brick_width) || j == positionY || j == (positionY + brick_height)) { 
				context.fillStyle = "rgb(232, 169, 0)";
				context.fillRect(i,j,1,1);
				//}
			}
		}
	}
	
	function brick_pattern1(positionX, positionY) {
		horizontal_line1 = Math.floor(brick_height / 3);
		horizontal_line2 = Math.floor(brick_height / 3) * 2;
		vertical_line1 = Math.floor(brick_width / 10);
		vertical_line2 = Math.floor(brick_width / 10) * 5;
		vertical_line3 = Math.floor(brick_width / 10) * 9;
		vertical_line4 = Math.floor(brick_width / 10) * 3;
		vertical_line5 = Math.floor(brick_width / 10) * 7;
		for (i = positionX; i <= positionX + brick_width; i++) {
			for (j = positionY; j <= positionY + brick_height; j++) {
				// Horizontal lines
				if (j == positionY + horizontal_line1 || j == positionY + horizontal_line2) { 
				context.fillStyle = "rgb(250, 250, 250)";
				context.fillRect(i,j,1,1);
				}
				// First line of brick
				if (j > positionY && j < positionY + horizontal_line1 && (i == positionX + vertical_line1 || i == positionX + vertical_line2 || i == positionX + vertical_line3) ) { 
					context.fillStyle = "rgb(250, 250, 250)";
					context.fillRect(i,j,1,1);
				}
				// Second line of brick
				if (j > positionY + horizontal_line1 && j < positionY + horizontal_line2 && (i == positionX + vertical_line4 || i == positionX + vertical_line5) ) { 
					context.fillStyle = "rgb(250, 250, 250)";
					context.fillRect(i,j,1,1);
				}
				// Thrid line of brick
				if (j > positionY + horizontal_line2 && j < (positionY + brick_height)  && (i == positionX + vertical_line1 || i == positionX + vertical_line2 || i == positionX + vertical_line3) ) { 
					context.fillStyle = "rgb(250, 250, 250)";
					context.fillRect(i,j,1,1);
				}
			}
		}
	}
	
	
	function draw_line_brick1(positionX, positionY) {
		draw_one_brick(positionX, positionY);
		brick_color_orange(positionX, positionY);
		brick_pattern1(positionX, positionY);
		for (k=1; k < brick_quantity; k++) {
			draw_one_brick(positionX + (brick_width * k), positionY);
			if ( k % 2 == 0) { 
				brick_color_orange(positionX + (brick_width * k), positionY);
				brick_pattern1(positionX + (brick_width * k), positionY);
			}
		}
	}
	
	function draw_line_brick2(positionX, positionY) {
		draw_one_brick(positionX, positionY);
		for (k=1; k < brick_quantity; k++) {
			draw_one_brick(positionX + (brick_width * k), positionY);
			if ( k % 2 != 0) { 
				brick_pattern1(positionX + (brick_width * k), positionY);
			}
		}
	}
	
	
	//draw_line_brick1(5, 5);
	//draw_line_brick2(5, 5 + brick_height);
	
	
	//draw_one_brick(5, 5);
	//draw_one_brick(5 + brick_width, 5);
	//draw_one_brick(5 + (brick_width * 2), 5);

	
	var t0 = performance.now();

	draw_line_brick1(5, 5);
	draw_line_brick2(5, 5 + brick_height);
	
	
	var t1 = performance.now();
	console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.")  
	
	function loop() {
		
		setTimeout(function() {
			//const req = requestAnimationFrame(loop); 
			console.log("test")
		}, 1000); 
	}
	
	draw_frame();
	loop();



})