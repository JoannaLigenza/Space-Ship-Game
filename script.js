document.addEventListener('DOMContentLoaded', function() {
	
	const canvas = document.getElementById("canvas");
	const context = canvas.getContext("2d");
	const brick_width = 20;
	const brick_height = 15;
	//const brick_quantity = 17;
	const brick_col = 17;
	const brick_row = 3;
	const all_bricks = [];
	let ship_position_x = 160;
	let ship_position_y = 300;
	const ship_width = 40;
	const ship_height = 70;
	let enemy_position_x = 0;
	let enemy_position_y = 0;
	let space_ship = "";
	let which_key_pressed = "";
	let is_brick_moving = false;
	const brick_moving_delay = 10;
	let brick_moving_delay_arr = [];
	let surprise_bricks_quantity = 5;
	const all_surprise_bricks = [];
	let move = false;
	let one_shoot = false;
	let can_shoot = true;
	let can_enemy_shoot = false;
	const bullets_counts = [];
	const bullet_limit = 20;
	const bullet_width = 2;
	const bullet_height = 10;
	let get_bullets = "";
	let get_enemy = "";
	let all_bullets = [];
	let shooting_enemy = "";
	const enemy_width = 20;
	const enemy_height = 14;
	const enemy_bullet_width = 2;
	const enemy_bullet_height = 10;
	const enemy_bullet_delay = 10;
	let enemy_bullet_delay_arr = [];
	let enemy_max_bullet = 20;
	const all_enemy_bullets = [];
	let get_enemy_bullet = "";
	const my_keys = { 32: false };
	let first_surprise_quantity = [];
	let second_surprise_quantity = [];
	let get_life_heart = "";
	let life_quantity = 2;
	let heart_position_x = 0;
	let heart_position_y = 0;
	let score = 0;
	let level = 1;
	
	function draw_frame() {
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
			}
		}
		//all_bricks.push([positionX, positionY, brick_width, brick_height]);
	}
	
	function draw_all_bricks(positionX, positionY) {
		for (k=0; k < brick_col; k++) {
			for (l=0; l < brick_row; l++) {
				draw_one_brick(positionX + (brick_width * k), positionY + (brick_height * l));
				if (( k % 2 == 0 && l % 2 == 0) || (k % 2 != 0 && l % 2 != 0) ) { 
					brick_color_orange(positionX + (brick_width * k), positionY + (brick_height * l));
					brick_pattern1(positionX + (brick_width * k), positionY + (brick_height * l));
					
					
					
					//get_bullet = context.getImageData(bullet_position_x, bullet_position_y, bullet_width, bullet_height);
					//context.putImageData(all_bullets[i][0], all_bullets[i][1], all_bullets[i][2] - bullet_step);
				}
				get_brick = context.getImageData(positionX + (brick_width * k), positionY + (brick_height * l), brick_width+1, brick_height+1);
				all_bricks.push([get_brick, positionX + (brick_width * k), positionY + (brick_height * l), 0])
				//all_bullets.push([get_bullet, bullet_position_x, bullet_position_y]);
			}
		}
			surprise_brick();
			//console.log("all_bricks ", all_bricks);
	}
	
	function move_bricks() {
		const brick_step = 3;
		brick_moving_delay_arr.push(1);
		
		for (i=0; i < all_bricks.length; i++) {
			if (is_brick_moving == false) {
				context.putImageData(all_bricks[i][0], all_bricks[i][1], all_bricks[i][2]);
			}
			if (is_brick_moving == true && brick_moving_delay_arr.length > brick_moving_delay) {
				for (j=0; j < all_bricks.length; j++) {
					context.putImageData(all_bricks[j][0], all_bricks[j][1], all_bricks[j][2] + brick_step);
					all_bricks[j][2] = all_bricks[j][2] + brick_step ;
					brick_moving_delay_arr.splice(0, brick_moving_delay_arr.length);
				}
				return;
			}
			context.putImageData(all_bricks[i][0], all_bricks[i][1], all_bricks[i][2]);
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
	
	function brick_pattern2(positionX, positionY) {
		context.font = "bold 12px Arial";
		context.textAlign = "center";
		context.textBaseline = "middle";
		context.fillStyle = "rgba(255,0,0)";
		context.fillText("?", positionX, positionY);
	}
	
	
	function surprise_brick() {
		let surprise_number = 1;
		let brick_number = 0;
		let all_bricks_copy = [];
		//let random_surprise_brick_copy = "";
		for(s=0; s < all_bricks.length; s++) {
			all_bricks_copy.push(brick_number++);
		}
		for(i=0; i < surprise_bricks_quantity; i++) {
			//console.log("surprise_bricks_quantity2 " ,surprise_bricks_quantity);
			let surprise_number_copy = surprise_number;
			const random_surprise_brick = Math.floor(Math.random() * all_bricks_copy.length );
			const random_surprise_brick_copy = all_bricks_copy[random_surprise_brick];
		
			surprise_brick_positionX = all_bricks[random_surprise_brick_copy][1];
			surprise_brick_positionY = all_bricks[random_surprise_brick_copy][2];
			brick_pattern2(surprise_brick_positionX + (brick_width / 2), surprise_brick_positionY + (brick_height / 2));
			
			get_surprise_brick = context.getImageData(surprise_brick_positionX, surprise_brick_positionY, brick_width+1, brick_height+1);
			all_bricks[random_surprise_brick_copy] = [get_surprise_brick, surprise_brick_positionX, surprise_brick_positionY, surprise_number++];
			
			all_surprise_bricks.push([get_surprise_brick, surprise_brick_positionX, surprise_brick_positionY, surprise_number_copy++]);
			
			all_bricks_copy.splice(random_surprise_brick, 1);
			console.log(random_surprise_brick);
		}
	}
	
	function first_surprise() {
		if (first_surprise_quantity.length > 0) { 
			for (j=0; j < all_surprise_bricks.length; j++) {
				if (all_surprise_bricks[j][3] == 1) { 
					enemy_position_x = all_surprise_bricks[j][1];
					enemy_position_y = all_surprise_bricks[j][2];
					context.putImageData(shooting_enemy, enemy_position_x, enemy_position_y);
				}
			}
		}
	}
	
	function draw_enemy() {
		context.beginPath();
		context.fillStyle = "rgb(250, 250, 250)";
		//context.moveTo(50,250); 
		context.arc(340, 380, 4, radianAngle(0), radianAngle(360));
		context.fill();
		
		context.beginPath();
		context.strokeStyle = "rgb(250, 250, 250)";;
		context.moveTo(340,384); 
		context.lineTo(340,388);
		context.lineWidth = bullet_width;
		context.stroke();

		get_enemy = context.getImageData(329, 374, enemy_width, enemy_height);
		shooting_enemy = get_enemy;
		//context.putImageData(all_bullets[i][0], all_bullets[i][1], all_bullets[i][2] - bullet_step);
	}
	
	function draw_enemy_bullets() {
		enemy_bullet_delay_arr.push(1);
		if (can_enemy_shoot == true && enemy_bullet_delay_arr.length > 10 && enemy_max_bullet > 0) { 
			for (i=0; i < first_surprise_quantity.length; i++) {
				//console.log("position enemy: ", enemy_position_x, enemy_position_y)
				//console.log("position bullet: ", enemy_position_x + (enemy_width / 2), enemy_position_y + enemy_height)
				context.beginPath();
				context.moveTo(enemy_position_x + 11, enemy_position_y + enemy_height); 
				context.lineTo(enemy_position_x + 11, (enemy_position_y + enemy_height) + bullet_height);
				context.lineWidth = bullet_width;
				context.strokeStyle = "rgb(250, 250, 250)";
				context.stroke();
				
				get_enemy_bullet = context.getImageData(enemy_position_x + 11, enemy_position_y + enemy_height, bullet_width, bullet_height);
				all_enemy_bullets.push([get_enemy_bullet, enemy_position_x + 11, enemy_position_y + enemy_height]);
				enemy_max_bullet -= 1;
				//console.log("all_enemy_bullets ", all_enemy_bullets[i][2]);
				//bullets_counts.push(1);
				//one_shoot = false;
				//console.log(bullets_counts);
				//get_bullet();
			}
			enemy_bullet_delay_arr.splice(0, enemy_bullet_delay_arr.length);
		}
	}
	
	function move_enemy_bullets() {
		const bullet_step = 3;
		for (i=0; i < all_enemy_bullets.length; i++) {
			context.putImageData(all_enemy_bullets[i][0], all_enemy_bullets[i][1], all_enemy_bullets[i][2] + bullet_step);
			all_enemy_bullets[i][2] = all_enemy_bullets[i][2] + bullet_step;
		}
	}
	
	function enemy_bullets_collision() {
		if (can_enemy_shoot == true) {
			for (i = 0; i < all_enemy_bullets.length; i++) {
				if ((all_enemy_bullets[i][2] + bullet_height) > ship_position_y && ( all_enemy_bullets[i][1] > ship_position_x && (all_enemy_bullets[i][1]) < ship_position_x + ship_width)) {
					all_enemy_bullets.splice(i, 1);
					return;
				}
				if ((all_enemy_bullets[i][2] + bullet_height) > canvas.height - 5 ) {
					all_enemy_bullets.splice(i, 1);
					return;
				}
			}
		}
	}
	
	
/*	function second_surprise() {
		if (second_surprise_quantity.length > 0) { 
			for (j=0; j < all_surprise_bricks.length; j++) {
				if (all_surprise_bricks[j][3] == 2) { 
					heart_position_x = all_surprise_bricks[j][1] + 6;
					heart_position_y = all_surprise_bricks[j][2] + 5;
					//console.log("heart_position_x", heart_position_x);
					//console.log("heart_position_y", heart_position_y);
					//context.putImageData(get_life_heart, heart_position_x, heart_position_y);
				}
			}
		}
	} */
	
	function move_heart() {
		const heart_step = 3;
		if (second_surprise_quantity.length > 0) { 
			for (i=0; i < second_surprise_quantity.length; i++) {
				context.putImageData(get_life_heart, heart_position_x, heart_position_y + heart_step);
				//console.log("heart_position_x", heart_position_x);
				heart_position_y = heart_position_y + heart_step;
				//console.log("heart_position_y", heart_position_y);
			}
		}
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
		context.fillStyle = "rgb(250, 250, 250)";
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
		space_ship = context.getImageData(30, 300, ship_width, ship_height);
		return space_ship;
	}
	
	function space_ship_move() {
		const step = 3;
		if (which_key_pressed == "") { 
			ship_position_x = ship_position_x;
		}
		if (my_keys.keys && my_keys.keys[39] && move == true)  { 
			ship_collision();
			ship_position_x = ship_position_x + step;
		}
		if (my_keys.keys && my_keys.keys[37] && move == true) { 
			ship_collision();
			ship_position_x = ship_position_x - step;
		}
		move = true;
		draw_bullet();
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
		if (which_key_pressed == "32" && one_shoot == true && can_shoot == true) { 
			
			context.beginPath();
			context.moveTo(ship_position_x + 20, ship_position_y - bullet_height); 
			context.lineTo(ship_position_x + 20, ship_position_y);
			context.lineWidth = bullet_width;
			context.strokeStyle = "rgb(250, 250, 250)";
			context.stroke();
			
			bullets_counts.push(1);
			one_shoot = false;
			
			get_bullet();
		}
	}
	
	function get_bullet() {
		let bullet_position_x = "";
		let bullet_position_y = "";
		let get_bullet = "";
		
		bullet_position_x = ship_position_x + 19;
		bullet_position_y = ship_position_y - bullet_height;
		get_bullet = context.getImageData(bullet_position_x, bullet_position_y, bullet_width, bullet_height);
		
		all_bullets.push([get_bullet, bullet_position_x, bullet_position_y]);
	}
	
	function move_bullet() {
		const bullet_step = 3;
		for (i=0; i < all_bullets.length; i++) {
			context.putImageData(all_bullets[i][0], all_bullets[i][1], all_bullets[i][2] - bullet_step);
			all_bullets[i][2] = all_bullets[i][2] - bullet_step;
		}
	}
	
	function bullet_collision() {
		for (i = 0; i < all_bullets.length; i++) {
			if (all_bullets[i][2] == (canvas.height - (canvas.height-2))) {
				all_bullets.splice(i, 1);
				bullets_counts.splice(i, 1);
				return;
			}
			for (j = 0; j < all_bricks.length; j++) {
				//if ((all_bullets[i][1] >= all_bricks[j][0] && all_bullets[i][1] <= all_bricks[j][0] + brick_width && all_bullets[i][2] >= all_bricks[j][1] && all_bullets[i][2] <= all_bricks[j][1] + brick_height) || all_bullets[i][2] == (canvas.height - (canvas.height-2))) {
				if ((all_bullets[i][1] >= all_bricks[j][1] && all_bullets[i][1] <= all_bricks[j][1] + brick_width && all_bullets[i][2] >= all_bricks[j][2] && all_bullets[i][2] <= all_bricks[j][2] + brick_height)) {
					console.log("all_surprise_bricks ", all_surprise_bricks)
					if(all_bricks[j][3] == 1) {
						first_surprise_quantity.push(1);
						can_enemy_shoot = true;
						console.log("yes! 1")
					}
					if(all_bricks[j][3] == 2) {
						second_surprise_quantity.push(1);
						heart_position_x = all_bricks[j][1] + 6;
						heart_position_y = all_bricks[j][2] + 5;
						console.log("yes! 2")
						//second_surprise();
					}
					if(all_bricks[j][3] == 3) {
						console.log("yes! 3")
					}
					if(all_bricks[j][3] == 4) {
						console.log("yes! 4")
					}
					if(all_bricks[j][3] == 5) {
						console.log("yes! 5" )
					}
					
					all_bullets.splice(i, 1);
					bullets_counts.splice(i, 1);
					all_bricks.splice(j, 1);
					score += 10;
					//console.log(all_bullets);
					
					return;
				} 
			}
		}
	}
	
	function count_score() {
		context.font = "bold 12px Arial";
		context.textAlign = "left";
		context.textBaseline = "middle";
		context.fillStyle = "rgb(255,0,0)";
		context.fillText("Score: " + score, 5 , canvas.height - 15);
	}
	
	function draw_life() {
		context.font = "bold 12px Arial";
		context.textAlign = "left";
		context.textBaseline = "middle";
		context.fillStyle = "rgb(255,0,0)";
		context.fillText("Life: ", 100 , canvas.height - 15);
	}
	
	function draw_hearts() {
		for (i=1; i < life_quantity + 1; i++) {
			context.beginPath();
			context.fillStyle = "rgb(255,0,0)";
			context.moveTo(122 + (10 * i) ,canvas.height - 11);
			context.bezierCurveTo(117 + (10 * i),canvas.height - 13, 117 + (10 * i),canvas.height - 21, 122 + (10 * i), canvas.height - 17);
			context.moveTo(122 + (10 * i) ,canvas.height - 11);
			context.bezierCurveTo(127 + (10 * i),canvas.height - 13, 127 + (10 * i),canvas.height - 21, 122 + (10 * i), canvas.height - 17);
			context.fill();
		}
	}

	function get_heart() {
		get_life_heart = context.getImageData(127, canvas.height - 18, 10, 8);
	}
	
	document.addEventListener("keydown", function(e) {
		which_key_pressed = e.keyCode;
		console.log(which_key_pressed)
		move = true;
		
		my_keys.keys =  (my_keys.keys || []); 
		my_keys.keys[e.keyCode] = true;
	}); 
	
	document.addEventListener("keyup", function(e) {
		move = false;
		one_shoot = true;
		which_key_pressed = "";
		
		my_keys.keys =  (my_keys.keys || []);
		my_keys.keys[e.keyCode] = false;
	});

	
	var t0 = performance.now();
	
	function loop() {
		context.clearRect(0, 0, canvas.width, canvas.height);
		space_ship_move();
		draw_frame();
		first_surprise();
		
		//draw_enemy()
		//second_surprise();
		move_heart();
		draw_enemy_bullets()
		move_enemy_bullets()
		//console.log("all_surprise_bricks ", all_surprise_bricks)

		
		move_bricks();
		move_bullet();
		bullet_collision();
		enemy_bullets_collision();
		count_score();
		draw_life();
		draw_hearts();
		if (bullets_counts.length < bullet_limit) {
			can_shoot = true;
		}
		if (bullets_counts.length > bullet_limit) {
			can_shoot = false;
		}
		//console.log("ilosc kul: ", bullets_counts.length);
		//console.log("can_shoot: ", can_shoot);
		setTimeout(function() {
			const req = requestAnimationFrame(loop); 
			
			//console.log("test")
		}, 30); 
	}
	
	
	draw_all_bricks(9, 5);
	draw_space_ship();
	//second_surprise();
	draw_enemy();
	get_space_ship();
	draw_hearts();
	get_heart();
	draw_frame();
	move_bricks();
	loop();
	
	

	//console.log("all_surprise_bricks ", all_surprise_bricks)
	var t1 = performance.now();
	console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.")  
})