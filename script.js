document.addEventListener('DOMContentLoaded', function() {
	
	const canvas = document.getElementById("canvas");
	const context = canvas.getContext("2d");
	const brick_width = 20;
	const brick_height = 15;
	const brick_quantity = 17;
	const all_brick_arr = [];
	let ship_position_x = 160;
	let ship_position_y = 300;
	let space_ship = "";
	let which_key_pressed = "";
	let move = false;
	let one_shoot = false;
	const bullet_width = 2;
	const bullet_height = 10;
	let bullet_arr = [];
	//let new_date = new Date();
	//let bullet_delay = new_date.getTime();
	
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
		all_brick_arr.push([positionX, positionY, brick_width, brick_height]);
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
	
	function brick_pattern2(positionX, positionY) {
		context.font = "bold 12px Arial";
		context.textAlign = "center";
		context.textBaseline = "middle";
		context.fillStyle = "rgba(255,0,0)";
		context.fillText("?", positionX, positionY);
		//brick_width
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
		//	if ( k % 2 == 0) { 
		//		brick_pattern2((positionX + (brick_width * k)) + (brick_width / 2), (positionY + (brick_height / 2)));
		//	}
		}
	}
	
	function suprise_brick() {
		const random_suprise_brick = Math.floor(Math.random() * all_brick_arr.length );
		suprise_brick_positionX = all_brick_arr[random_suprise_brick][0];
		suprise_brick_positionY = all_brick_arr[random_suprise_brick][1];
		//brick_color_orange(suprise_brick_positionX, suprise_brick_positionY);
		brick_pattern2(suprise_brick_positionX + (brick_width / 2), suprise_brick_positionY + (brick_height / 2));
	}
	
	function radianAngle(angle) {
		return radians = (Math.PI/180)*angle;
	}
	
	function draw_space_ship() {
	
		// Body of ship
		context.beginPath();
		context.fillStyle = "rgba(28, 28, 28)";
		context.moveTo(50,300);
		context.bezierCurveTo(38,310, 38,355, 40,360);
		//context.lineTo(40,360);
		context.lineTo(60,360);
		context.bezierCurveTo(62,355, 62,310, 50,300);
		//context.closePath();
		context.fill();
		
		// Circle on body
		context.beginPath();
		context.fillStyle = "white";
		context.moveTo(50,340); 
		context.arc(50, 330, 5, radianAngle(0), radianAngle(360));
		context.fill();
		
		// Left wing
		context.beginPath();
		context.fillStyle = "rgba(28, 28, 28)";
		context.moveTo(38,340); 
		context.lineTo(30,360);
		context.lineTo(38,360);
		context.closePath();
		context.fill();
		
		// Right wing
		context.beginPath();
		context.fillStyle = "rgba(28, 28, 28)";
		context.moveTo(62,340); 
		context.lineTo(62,360);
		context.lineTo(70,360);
		context.closePath();
		context.fill();
		
		// Left bottom engine
		context.beginPath();
		context.fillStyle = "rgba(28, 28, 28)";
		context.moveTo(45,361); 
		context.lineTo(41,370);
		context.lineTo(49,370);
		context.closePath();
		context.fill();
		
		// Right bottom engine
		context.beginPath();
		context.fillStyle = "rgba(28, 28, 28)";
		context.moveTo(55,361); 
		context.lineTo(51,370);
		context.lineTo(59,370);
		context.closePath();
		context.fill();
	}
	
	function get_space_ship() {
		space_ship = context.getImageData(30, 300, 40, 70);
		//context.putImageData(space_ship, 100, 300);
		
		return space_ship;
	}
	
	function space_ship_move() {
		const step = 3;
		if (which_key_pressed == "") { 
			ship_position_x = ship_position_x;
		}
		if (which_key_pressed == "39" && move == true) { 
			ship_collision();
			ship_position_x = ship_position_x + step;
		}
		if (which_key_pressed == "37" && move == true) { 
			ship_collision();
			ship_position_x = ship_position_x - step;
		}
		context.putImageData(space_ship, ship_position_x, ship_position_y);
	}
	
	function ship_collision() {
		if (ship_position_x <= 6) {
			ship_position_x = 6;
		}
		if (ship_position_x >= (canvas.width - space_ship.width - 6  ) ) {
			ship_position_x = canvas.width - space_ship.width - 6;
		}
	}
	
	function draw_bullet() {
	/*	const new_date2 = new Date();
		const actual_time = new_date2.getTime();
		
		
		console.log("czas aktualny: " , actual_time);
		console.log("czas zapisany: " , bullet_delay);
		console.log("roznica: " , actual_time - bullet_delay); */
		
		
		
		//if (which_key_pressed == "32" && (actual_time - bullet_delay) < 40 ) { 
		if (which_key_pressed == "32" && one_shoot == true) { 
			context.beginPath();
			context.moveTo(ship_position_x + 20, ship_position_y - bullet_height); 
			context.lineTo(ship_position_x + 20, ship_position_y);
			context.lineWidth = bullet_width;
			context.strokeStyle = "rgb(250, 250, 250)";
			context.stroke();
			
			one_shoot = false;
			get_bullet();
		}	
		//bullet_delay = actual_time;
		
	}
	
	function get_bullet() {
		let bullet_position_x = "";
		let bullet_position_y = "";
		let get_bullet = "";
		
		bullet_position_x = ship_position_x + 19;
		bullet_position_y = ship_position_y - bullet_height;
		get_bullet = context.getImageData(bullet_position_x, bullet_position_y, bullet_width, bullet_height);
		
		bullet_arr.push([get_bullet, bullet_position_x, bullet_position_y]);
	}
	
	function move_bullet() {
		const bullet_step = 3;
		for (i=0; i < bullet_arr.length; i++) {
			//context.putImageData(get_bullet, bullet_position_x, bullet_position_y - bullet_step);
			context.putImageData(bullet_arr[i][0], bullet_arr[i][1], bullet_arr[i][2] - bullet_step);
			bullet_arr[i][2] = bullet_arr[i][2] - bullet_step;
		}
	}
	
	function bullet_collision() {
		
	}
	
	document.addEventListener("keydown", function(e) {
		which_key_pressed = e.keyCode;
		console.log(which_key_pressed)
		move = true;
	}); 
	
	document.addEventListener("keyup", function() {
		move = false;
		one_shoot = true;
		which_key_pressed = "";
	});

	
	var t0 = performance.now();

	//draw_line_brick1(5, 5);
	//draw_line_brick2(5, 5 + brick_height);
	//draw_line_brick1(5, 5 + (brick_height * 2));
	//suprise_brick();
	
	
	
	
	function loop() {
		context.clearRect(0, 0, canvas.width, canvas.height);
		space_ship_move();
		draw_frame();
		draw_line_brick1(5, 5);
		draw_line_brick2(5, 5 + brick_height);
		draw_line_brick1(5, 5 + (brick_height * 2));
		draw_bullet();
		move_bullet();
		console.log("test");
		setTimeout(function() {
			const req = requestAnimationFrame(loop); 
			
			//console.log("test")
		}, 10); 
	}
	
	draw_space_ship();
	get_space_ship();
	draw_frame();
	loop();
	
	console.log(all_brick_arr);

	var t1 = performance.now();
	console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.")  
})