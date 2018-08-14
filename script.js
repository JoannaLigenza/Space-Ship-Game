document.addEventListener('DOMContentLoaded', function() {
	
	const canvas = document.getElementById("canvas");
	const context = canvas.getContext("2d");
	const cont = new AudioContext();
	let myV = "";
	let position = "";
	let song = "";
	let scale = "";
	let shooting_sound_stoped = false;
	const brick_width = 20;
	const brick_height = 15;
	let brick_col = 11
	let brick_row = 1;
	let all_virtual_bricks = [];
	const all_bricks = [];
	let ship_position_x = 160;
	let ship_position_y = 300;
	const ship_width = 40;
	const ship_height = 70;
	let enemy_position_x = [];
	let enemy_position_y = [];
	let space_ship = "";
	let which_key_pressed = "";
	let is_brick_moving = false;
	const brick_moving_delay = 10;
	let brick_moving_delay_arr = [];
	let surprise_bricks_quantity = [6];
	const all_surprise_bricks = [];
	let color = "orange";
	let yellow_bricks = 0;
	let green_bricks = 0;
	let move = false;
	let one_shoot = false;
	let can_shoot = true;
	let enemy_quantity = [];
	const bullets_counts = [];
	let bullet_limit = 5;
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
	let hearts_quantity = [];
	let heart_visible = false;
	let get_life_heart = "";
	let life_quantity = 1;
	let heart_position_x = 0;
	let heart_position_y = 0;
	let white_background = false;
	let background_delay = 100;
	let background_delay_arr = [];
	let get_arrow = "";
	let arrow_position = [];
	let is_arrow_visible = false;
	let get_slow_down_icon = "";
	let slow_down_icon_position = [];
	let is_slow_down_visible = false;
	let plus_two_visible_delay = 50;
	let get_draw_plus_two_icon = "";
	let plus_two_icon_position = [];
	let is_plus_two_visible = false;
	let score = 0;
	let level = 1;
	let change_level_delay = 30;
	let can_change_level = true;
	let interval_delay = 5;
	let slow_down = false;
	let slow_down_time = 150;
	let get_spider = "";
	let spider_pos_x = 140;
	let spider_pos_y = 15;
	let spider_width = 80;
	let spider_height = 75;
	let direction_of_spider_move = "left";
	let max_spider_bullets = 15;
	let all_spider_bullets = [];
	let spider_bullet_delay_arr = [];
	let can_spider_move = true;
	let can_spider_shoot = false;
	let spider_stop_moving = 250; 
	let spider_start_moving = 100;
	let spider_power_line = 190;
	let spider_power = 100;
	let refresh = false;
	let refresh_delay_time = 10;
	let animation = "";
	let end_game = false;
	let who_made_it = [["Graphic: ", 110, 400], ["Sounds: ",110, 450], ["Realisation: ", 105, 500], ["Ideas and inspirations: ",20, 550]]

	
	function draw_frame() {
		context.fillStyle = "rgb(6, 0, 135)";
		context.fillRect(2,2, canvas.width-4, canvas.height-4 );	
	}
	
	function start_screen() {
		draw_frame();
		context.font = "bold 16px Arial";
		context.textAlign = "left";
		context.textBaseline = "middle";
		context.fillStyle = "rgb(255,0,0)";
		context.fillText("Press enter to play", 100 , 170);
		loop1();
	}
	
	function loop1() {
		if (which_key_pressed == "13") {
			cancelAnimationFrame(animation3);
			init();
			return;
		}
		setTimeout(function() {
			animation3 = requestAnimationFrame(loop1); 
		}, interval_delay); 
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
	}
	
	function draw_virtual_bricks(positionX, positionY) {
		for (l=0; l < brick_row; l++) {
			for (k=0; k < brick_col; k++) {
				all_virtual_bricks.push(["get_brick", positionX + (brick_width * k), positionY + (brick_height * l), 0, color])
			}
		}
		const all_virtual_bricks_copy = [];
		for (j=0; j < all_virtual_bricks.length; j++) {
			all_virtual_bricks_copy.push(j);
		}
		for(i=0; i < yellow_bricks; i++ ) {
			const random_yellow_brick = Math.floor(Math.random() * all_virtual_bricks_copy.length);
			const number_of_yellow_brick = all_virtual_bricks_copy[random_yellow_brick];
			all_virtual_bricks[number_of_yellow_brick][4] = "yellow";
			all_virtual_bricks_copy.splice(random_yellow_brick ,1);
		}
		for(i=0; i < green_bricks; i++ ) {
			const random_green_brick = Math.floor(Math.random() * all_virtual_bricks_copy.length);
			const number_of_green_brick = all_virtual_bricks_copy[random_green_brick];
			all_virtual_bricks[number_of_green_brick][4] = "green";
			all_virtual_bricks_copy.splice(random_green_brick ,1);
		}
	}
	
	function draw_all_bricks(positionX, positionY) {
		for (m=0; m < all_virtual_bricks.length; m++) {
			draw_one_brick(all_virtual_bricks[m][1], all_virtual_bricks[m][2]);
				if (all_virtual_bricks[m][4] == "orange") {
					color = "orange"
				}
				if (all_virtual_bricks[m][4] == "yellow") {
					color = "yellow"
				}
				if (all_virtual_bricks[m][4] == "green") {
					color = "green"
				}
				brick_color(all_virtual_bricks[m][1], all_virtual_bricks[m][2]);
				if ( m % 2 == 0) { 
					brick_pattern1(all_virtual_bricks[m][1], all_virtual_bricks[m][2]);
				}
				get_brick = context.getImageData(all_virtual_bricks[m][1], all_virtual_bricks[m][2], brick_width+1, brick_height+1);
				all_bricks.push([get_brick, all_virtual_bricks[m][1], all_virtual_bricks[m][2], 0, color])
		}
		surprise_brick();
	}
	
	function move_bricks() {
		const brick_step = 3;
		brick_moving_delay_arr.push(1);
		
		if (all_bricks.length == 0 && can_change_level == true) {
			change_level_delay -= 1;
			show_next_level_info();
			if (change_level_delay == 29) {
				change_level_sound();
				return;
			}
			if (change_level_delay == 0) {
				change_level();
				return;
			}
		}
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
	
	function brick_collision() {
		for (i=0; i < all_bricks.length; i++) {
			if (all_bricks[i][2] + brick_height >= ship_position_y) {
				refresh_game();
			}
		}
	}

	
	function brick_color(positionX, positionY) {
		for (i = positionX + 1 ; i <= (positionX + brick_width) -1 ; i++) {
			for (j = positionY + 1; j <= (positionY + brick_height) - 1; j++) {
				if (color == "orange") { 
					context.fillStyle = "rgb(232, 169, 0)";
				}
				if (color == "yellow") { 
					context.fillStyle = "rgb(240, 240, 34)";
				}
				if (color == "green") { 
					context.fillStyle = "rgb(15, 120, 5)";
				}
				if (color == "transparent") { 
					context.fillStyle = "rgba(232, 169, 0, 0)";
				} 
				context.fillRect(i,j,1,1);
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
		draw_text("", "?", "", positionX, positionY,"bold 12px Arial", "center", "rgb(255,0,0)");
	}
	
	
	function surprise_brick() {
		let all_bricks_copy = [];
		for(s=0; s < all_bricks.length; s++) {
			all_bricks_copy.push(s);
		}
		for(i=0; i < surprise_bricks_quantity.length; i++) {
			const random_surprise_brick = Math.floor(Math.random() * all_bricks_copy.length );
			const random_surprise_brick_copy = all_bricks_copy[random_surprise_brick];
		
			const surprise_brick_positionX = all_bricks[random_surprise_brick_copy][1];
			const surprise_brick_positionY = all_bricks[random_surprise_brick_copy][2];
			const surprise_brick_color = all_bricks[random_surprise_brick_copy][4];
			brick_pattern2(surprise_brick_positionX + (brick_width / 2), surprise_brick_positionY + (brick_height / 2));
			
			get_surprise_brick = context.getImageData(surprise_brick_positionX, surprise_brick_positionY, brick_width+1, brick_height+1);			
			
			all_bricks[random_surprise_brick_copy] = [get_surprise_brick, surprise_brick_positionX, surprise_brick_positionY, surprise_bricks_quantity[i],  surprise_brick_color];
			all_surprise_bricks.push([get_surprise_brick, surprise_brick_positionX, surprise_brick_positionY, surprise_bricks_quantity[i]]);
			
			all_bricks_copy.splice(random_surprise_brick, 1);
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
	}
	
	function show_enemy() {
			for (k=0; k < enemy_quantity.length; k++) { 
				if (enemy_quantity[k][1] == true) {
					enemy_position_x[k] = enemy_quantity[k][2];
					enemy_position_y[k] = enemy_quantity[k][3];
					context.putImageData(shooting_enemy, enemy_position_x[k], enemy_position_y[k]);
				}
			} 
	}

	function draw_enemy_bullets() {
		enemy_bullet_delay_arr.push(1);
		if (enemy_bullet_delay_arr.length > 10){
			
			for (i=0; i < enemy_quantity.length; i++) {
				if (enemy_quantity[i][1] == true) { 
					context.beginPath();
					context.moveTo(enemy_position_x[i] + 11, enemy_position_y[i] + enemy_height); 
					context.lineTo(enemy_position_x[i] + 11, (enemy_position_y[i] + enemy_height) + bullet_height);
					context.lineWidth = bullet_width;
					context.strokeStyle = "rgb(250, 250, 250)";
					context.stroke();
					
					get_enemy_bullet = context.getImageData(enemy_position_x[i] + 11, enemy_position_y[i] + enemy_height, bullet_width, bullet_height);
					all_enemy_bullets.push([get_enemy_bullet, enemy_position_x[i] + 11, enemy_position_y[i] + enemy_height]);
					enemy_quantity[i][0] = enemy_quantity[i][0] - 1;					
				}
				if (enemy_quantity[i][0] == 0) {
					enemy_quantity[i][1] = false;
				}
				if (enemy_quantity[i][0] == 0 && all_enemy_bullets.length == 0) {
					enemy_quantity.splice(0, enemy_quantity.splice.length); 
					return;
				}
				
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
		if (all_enemy_bullets.length > 0) {
			for (i = 0; i < all_enemy_bullets.length; i++) {
				if ((all_enemy_bullets[i][2] + bullet_height) > ship_position_y && ( all_enemy_bullets[i][1] > ship_position_x && (all_enemy_bullets[i][1]) < ship_position_x + ship_width)) {
					refresh_game();
					return;
				}
				if ((all_enemy_bullets[i][2] + bullet_height) > canvas.height - 5 ) {
					all_enemy_bullets.splice(i, 1);
					return;
				}
			}
		}
	}
	
	function move_heart() {
		const heart_step = 3;
		if (hearts_quantity.length > 0) { 
			for (i=0; i < hearts_quantity.length; i++) {
				context.putImageData(get_life_heart, heart_position_x, heart_position_y + heart_step);
				heart_position_y = heart_position_y + heart_step;
			}
		}
	} 
	
	function heart_collision() {
		if (hearts_quantity.length > 0) {	
			for (i = 0; i < hearts_quantity.length; i++) {
				//console.log("test");
				if (heart_position_y + 8 > ship_position_y && heart_position_x > ship_position_x && heart_position_x < ship_position_x + ship_width) {
					hearts_quantity.splice(i, 1);
					life_quantity += 1;
					//console.log("test2");
					return;
				}
				if (heart_position_y + 8  > canvas.height - 5 ) {
					hearts_quantity.splice(i, 1);
					return;
				}
			}
		}
	} 
	
	function draw_arrow() {
		context.beginPath();
		context.moveTo(340,363); 
		context.lineTo(340,370);
		context.moveTo(337,367);
		context.lineTo(340,370);
		context.lineTo(343,367);
		context.lineWidth = bullet_width;
		context.strokeStyle = "rgb(250, 250, 250)";
		context.lineWidth = bullet_width;
		context.stroke();
		
		get_arrow = context.getImageData(337, 363, 6, 8);
	}
	
	function show_arrow() {
		context.putImageData(get_arrow, arrow_position[0] + 7, arrow_position[1] + 5);
	}
	
	function background() {
		background_delay_arr.push(1);
		if(background_delay_arr.length < background_delay) {
			canvas.style.backgroundColor = "rgb(250, 250, 250)";
		}
		if(background_delay_arr.length > background_delay) {
			canvas.style.backgroundColor = "rgb(6, 0, 135)";
			background_delay_arr.splice(0, background_delay_arr.length);
			white_background = false;
		}
	}
	
	function draw_slow_down_icon() {
	/*	context.beginPath();
		context.moveTo(340,340); 
		context.lineTo(340,350);
		context.moveTo(337,342);
		context.lineTo(343,348);
		context.moveTo(337,348);
		context.lineTo(343,342);
		context.lineWidth = bullet_width;
		context.strokeStyle = "rgb(250, 250, 250)";
		context.lineWidth = bullet_width;
		context.stroke(); */
		//draw_text("", "SLOW", "", 5, 5, "bold 12px Arial", "left", "rgb(255,0,0)");
		//draw_text("", "?", "", positionX, positionY,"bold 12px Arial", "center", "rgb(255,0,0)")
		
		//get_slow_down_icon = context.getImageData(337, 340, 10, 10);
		
	/*	context.font = "bold 12px Arial";
		context.textAlign = "left";
		context.textBaseline = "middle";
		context.fillStyle = "rgb(255,255,255)";
		context.fillText("S", 337 , 340); */
		
		draw_text("", "S", "", 337, 340,"bold 10px Arial", "left", "rgb(255,255,255)")
		
		get_slow_down_icon = context.getImageData(337, 335, 8, 10);
	}
	
	function show_slow_down_icon() {
		context.putImageData(get_slow_down_icon, slow_down_icon_position[0] + 7, slow_down_icon_position[1] + 3);
	}
	
	function slow_down_game() {
		if (slow_down == true && slow_down_time > 0) {
			interval_delay = 30;
			slow_down_time -= 1;	
		}
		if (slow_down == true && slow_down_time == 0) {
			slow_down = false;
			is_slow_down_visible = false;
			slow_down_time = 150;
			interval_delay = 5;
		}
	}

	function draw_plus_two_icon() {
		draw_text("", "+2", "", 337, 325,"bold 10px Arial", "left", "rgb(255,255,255)")
		
		get_draw_plus_two_icon = context.getImageData(337, 320, 13, 10);
	}
	
	function show_plus_two_icon() {
		context.putImageData(get_draw_plus_two_icon, plus_two_icon_position[0] + 3, plus_two_icon_position[1] + 3);
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
		
		space_ship = context.getImageData(30, 300, ship_width, ship_height);
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
			
			if (shooting_sound_stoped == false) {
				shooting_sound(60);
			}
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
			if (level == 10) {
				if (all_bullets[i][1] >= (spider_pos_x + 30) && all_bullets[i][1] <= ((spider_pos_x + spider_width) - 30) && all_bullets[i][2] <= (spider_pos_y + spider_height) ) {
					all_bullets.splice(i, 1);
					bullets_counts.splice(i, 1);
					score += 50;
					spider_power -= 1;
					spider_power_line -= 1;
					
			/*		const spider_data = get_spider; 
					const spider_temp_data = spider_data;
					for (let m=0; m < spider_data.data.length; m += 4) {
							if (spider_data.data[m] === 28) {
								spider_data.data[m] = 255;
							}
							if (spider_data.data[m+1] === 28) {
								spider_data.data[m+1] = 0;
							}
							if (spider_data.data[m+2] === 28) {
								spider_data.data[m+2] = 0;
							}
						} 
						
						get_spider = spider_data; */
						
						
					return;
				}
			}
			for (j = 0; j < all_bricks.length; j++) {
				if ((all_bullets[i][1] >= all_bricks[j][1] && all_bullets[i][1] <= all_bricks[j][1] + brick_width && all_bullets[i][2] >= all_bricks[j][2] && all_bullets[i][2] <= all_bricks[j][2] + brick_height)) {
					if(all_bricks[j][4] == "yellow") {
						const yellow_brick_data = all_bricks[j][0];
						
						all_bricks[j][4] = "orange";
						console.log("yellow")
						console.log("color ", all_bricks[j][4])
						all_bullets.splice(i, 1);
						bullets_counts.splice(i, 1);
						
						for (let m=0; m < yellow_brick_data.data.length; m += 4) {
							if (yellow_brick_data.data[m] === 240) {
								yellow_brick_data.data[m] = 232;
							}
							if (yellow_brick_data.data[m+1] === 240) {
								yellow_brick_data.data[m+1] = 169;
							}
							if (yellow_brick_data.data[m+2] === 34) {
								yellow_brick_data.data[m+2] = 0;
							}
						} 
						
						all_bricks[j][0] = yellow_brick_data;
						return;
					}
					if(all_bricks[j][4] == "green") {
						const green_brick_data = all_bricks[j][0];
						all_bricks[j][4] = "yellow";
						console.log("green")
						console.log("color ", all_bricks[j][4])
						all_bullets.splice(i, 1);
						bullets_counts.splice(i, 1);
						for (let m=0; m < green_brick_data.data.length; m += 4) {
							if (green_brick_data.data[m] === 15) {
								green_brick_data.data[m] = 240;
							}
							if (green_brick_data.data[m+1] === 120) {
								green_brick_data.data[m+1] = 240;
							}
							if (green_brick_data.data[m+2] === 5) {
								green_brick_data.data[m+2] = 34;
							}
						} 
						
						return;
					} 
					if(all_bricks[j][3] == 1) {
						enemy_quantity.push([enemy_max_bullet, true, all_bricks[j][1], all_bricks[j][2]]);
						console.log("yes! 1")
						console.log("enemy_quantity ", enemy_quantity)
					}
					if(all_bricks[j][3] == 2) {
						hearts_quantity.push(1);
						heart_position_x = all_bricks[j][1] + 6;
						heart_position_y = all_bricks[j][2] + 5;
						heart_visible = true;
						console.log("yes! 2")
					}
					if(all_bricks[j][3] == 3) {
						is_brick_moving = true;
						is_arrow_visible = true;
						arrow_position = [all_bricks[j][1], all_bricks[j][2]]
						console.log("yes! 3")
					}
					if(all_bricks[j][3] == 4) {
						white_background = true;
						console.log("yes! 4")
					}
					if(all_bricks[j][3] == 5) {
						slow_down = true;
						is_slow_down_visible = true;
						slow_down_icon_position = [all_bricks[j][1], all_bricks[j][2]]
						console.log("yes! 5" )
					}
					if(all_bricks[j][3] == 6) {
						bullet_limit += 2;
						is_plus_two_visible = true;
						plus_two_icon_position = [all_bricks[j][1], all_bricks[j][2]]
						console.log("yes! 6" )
					}
					
					all_bullets.splice(i, 1);
					bullets_counts.splice(i, 1);
					all_bricks.splice(j, 1);
					all_virtual_bricks.splice(j, 1);
					score += 10;
					//console.log(all_bullets);
					
					return;
				} 
			}
		}
	}
	
	function draw_text(before, text, after, posX , posY, font, align, rgb) {
		context.font = font;
		context.textAlign = align;
		context.textBaseline = "middle";
		context.fillStyle = rgb;
		context.fillText(before + text + after, posX , posY);
	}
	
	function draw_level() {
		draw_text("", "Level: ", level, 5, canvas.height - 15, "bold 12px Arial", "left", "rgb(255,0,0)");
	}
	
	function count_score() {
		draw_text("", "Score: ", score, 70 , canvas.height - 15, "bold 12px Arial", "left", "rgb(255,0,0)");
	}
	
	function draw_life() {
		draw_text("", "Life: ", "", 150 , canvas.height - 15, "bold 12px Arial", "left", "rgb(255,0,0)");
	}
	
	function draw_hearts() {
		for (i=1; i < life_quantity + 1; i++) {
			context.beginPath();
			context.fillStyle = "rgb(255,0,0)";
			context.moveTo(172 + (10 * i) ,canvas.height - 11);
			context.bezierCurveTo(167 + (10 * i),canvas.height - 13, 167 + (10 * i),canvas.height - 21, 172 + (10 * i), canvas.height - 17);
			context.moveTo(172 + (10 * i) ,canvas.height - 11);
			context.bezierCurveTo(177 + (10 * i),canvas.height - 13, 177 + (10 * i),canvas.height - 21, 172 + (10 * i), canvas.height - 17);
			context.fill();
		}
	}

	function get_heart() {
		get_life_heart = context.getImageData(177, canvas.height - 18, 10, 8);
	}
	
	function draw_spider_power() {
		draw_text("", "Spider power: ", "", 5, 10, "bold 12px Arial", "left", "rgb(255,0,0)");
		draw_text("", spider_power , " %", 200 , 10, "bold 12px Arial", "left", "rgb(255,0,0)");
	}
	
	function draw_spider_power_line() {
		context.beginPath();
		context.strokeStyle = "rgb(255,0,0)";
		context.lineWidth = 3;
		context.moveTo(90, 11); 
		context.lineTo(spider_power_line, 11);
		context.stroke();
	}
	
	
	function draw_spider() {
		// Body of spider
		context.beginPath();
		context.fillStyle = "rgb(28, 28, 28)";
		context.moveTo(180,15);
		context.bezierCurveTo(165,25, 165,40, 170,60);
		context.bezierCurveTo(170,70, 170,80, 180,90);
		context.bezierCurveTo(190,80, 190,70, 190,60);
		context.bezierCurveTo(195,40, 195,25, 180,15);
		//context.closePath();
		context.fill();
		
		// Spider eye
		context.beginPath();
		context.fillStyle = "rgb(250, 250, 250)";
		context.moveTo(170,80); 
		context.arc(175, 80, 2, radianAngle(0), radianAngle(360));
		context.moveTo(190,80); 
		context.arc(185, 80, 2, radianAngle(0), radianAngle(360));
		context.fill();
		
		// Spider legs
		context.beginPath();
		context.strokeStyle = "rgb(28, 28, 28)";
		context.lineWidth = 4;
		context.moveTo(170, 45); 
		context.lineTo(150, 40);
		context.lineTo(140, 20);
		
		context.moveTo(190, 45);
		context.lineTo(210, 40);
		context.lineTo(220, 20);
		
		context.moveTo(170, 65); 
		context.lineTo(150, 70);
		context.lineTo(140, 90);
		
		context.moveTo(190, 65);
		context.lineTo(210, 70);
		context.lineTo(220, 90);
		context.stroke();
		
		get_spider = context.getImageData(140, 15, spider_width, spider_height);
	}
	
	function move_spider() {
		let spider_step = 3;
		if (spider_power < 50) {
			spider_step = 4;
		}
		if (spider_power < 20) {
			spider_step = 5;
		}
		if (can_spider_move == false) {
			context.putImageData(get_spider, spider_pos_x, spider_pos_y);
		}
		if (can_spider_move == true) {
			context.putImageData(get_spider, spider_pos_x, spider_pos_y);
			if (direction_of_spider_move == "left") {
				spider_pos_x = spider_pos_x - spider_step
			}
			if (direction_of_spider_move == "right") {
				spider_pos_x = spider_pos_x + spider_step
			}
			if (spider_pos_x <= (canvas.width - (canvas.width-2) )) {
				direction_of_spider_move = "right"
			}
			if (spider_pos_x >= (canvas.width -2) - spider_width ) {
				direction_of_spider_move = "left"
			}
		}
		
		
	}
	
	function draw_spider_bullets() {
		spider_bullet_delay_arr.push(1);
		if (spider_bullet_delay_arr.length > 10 && max_spider_bullets > 0) { 
			max_spider_bullets -= 1;
			
			context.beginPath();
			context.moveTo(spider_pos_x + (spider_width / 2), spider_pos_y + (spider_height)); 
			context.lineTo(spider_pos_x + (spider_width / 2), (spider_pos_y + (spider_height)) + bullet_height);
			context.lineWidth = bullet_width;
			context.strokeStyle = "rgb(250, 250, 250)";
			context.stroke();
			
			spider_bullet_pos_x = spider_pos_x + (spider_width / 2);
			spider_bullet_pos_y = spider_pos_y + (spider_height)
				
			get_spider_bullet = context.getImageData(spider_bullet_pos_x, spider_bullet_pos_y, bullet_width, bullet_height);
			all_spider_bullets.push([get_spider_bullet, spider_bullet_pos_x, spider_bullet_pos_y]);
			
			spider_bullet_delay_arr.splice(0, spider_bullet_delay_arr.length);
			
			//shooting_sound_stoped = true;
			shooting_sound(90);
		}
		if (max_spider_bullets == 0) {
			shooting_sound_stoped = false;
		}
	}
	
	function move_spider_bullet() {
		const bullet_step = 3;
		for (i=0; i < all_spider_bullets.length; i++) {
			context.putImageData(all_spider_bullets[i][0], all_spider_bullets[i][1], all_spider_bullets[i][2] + bullet_step);
			all_spider_bullets[i][2] = all_spider_bullets[i][2] + bullet_step;
		}
	}
	
	function spider_bullets_collision() {
		for (i = 0; i < all_spider_bullets.length; i++) {
			if ((all_spider_bullets[i][2] + bullet_height) > ship_position_y && ( all_spider_bullets[i][1] > ship_position_x && (all_spider_bullets[i][1]) < ship_position_x + ship_width)) {
				//all_enemy_bullets.splice(i, 1);
				//life_quantity = life_quantity - 1;
				refresh_game();
				return;
			}
			if ((all_spider_bullets[i][2] + bullet_height) > canvas.height - 5 ) {
				all_spider_bullets.splice(i, 1);
				return;
			}
		}
	}
	
	function stop_spider() {
		spider_stop_moving -= 1;
		if (spider_stop_moving <= 0) {
			spider_stop_moving = 0;
			can_spider_move = false;
			can_spider_shoot = true;
			if(max_spider_bullets == 0) {
				can_spider_move = true;
			}
			if(all_spider_bullets.length == max_spider_bullets) {
				
				can_spider_shoot = false;
				max_spider_bullets = 15;
				spider_stop_moving = 250;
			}
		}
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
	
	function shooting_sound(freq2) {
		//const cont2 = new AudioContext();
		let oscillator = cont.createOscillator();
		let gain = cont.createGain();
		oscillator.connect(gain);
		gain.connect(cont.destination);
			
		oscillator.type = "sine";
		oscillator.frequency.value = freq2;
			
		let now = cont.currentTime;
		gain.gain.setValueAtTime(100, now);
		gain.gain.exponentialRampToValueAtTime(0.001, now + 1);
		oscillator.start(now);
		oscillator.stop(now + 1);
		console.log("gram")
	}
	
	function change_level_sound() {
		//let now = cont.currentTime,
		let osc = cont.createOscillator(),
		gain = cont.createGain();
			
		osc.connect(gain);
		gain.connect(cont.destination);
			position = 0,
			scale = {
				f: 698.46,
				c: 523.25,       
			},
			
			song = "cccf-cf--";

		myV = setInterval(play, 1000 / 5);
	}

	function createOscillator(freq) {
		let attack = 10,
			decay = 400,
			gain = cont.createGain(),
			osc = cont.createOscillator();

		gain.connect(cont.destination);
		gain.gain.setValueAtTime(0, cont.currentTime);
		gain.gain.linearRampToValueAtTime(5, cont.currentTime + attack / 1000);
		gain.gain.linearRampToValueAtTime(0, cont.currentTime + decay / 1000);

		osc.frequency.value = freq;
		osc.type = "square";
		osc.connect(gain);
		osc.start(0);

		setTimeout(function() {
			osc.stop(0);
			osc.disconnect(gain);
			gain.disconnect(cont.destination);
		}, decay)
	}
	
	function play() {
		var note = song.charAt(position),
			freq = scale[note];
		position += 1;
		if(position == song.length) {
			clearInterval(myV)
		}
		if(freq) {
			createOscillator(freq);
		}
	}
	
	function change_level() {
			refresh = true;
			level += 1; 
			what_to_refresh();
			//change_level_sound();
			refersh_delay();
			change_level_delay = 30;
			console.log("level ", level);	
	}
	
	function show_next_level_info() {
			context.font = "bold 16px Arial";
			context.textAlign = "left";
			context.textBaseline = "middle";
			context.fillStyle = "rgb(255,0,0)";
			context.fillText("Next Level: " + (level+1), 150 , 170);
	}
	
	function refresh_game() {
		refresh = true;
		if (life_quantity == 0) {
			end_game = true;
		}
		if (life_quantity > 0) {
			life_quantity -= 1;
			score -= ((brick_col*brick_row) - all_bricks.length)*10
			console.log(score)
			what_to_refresh();
			refersh_delay();
			//console.log("crash");
		}
	}
	
	function what_to_refresh() {
		can_change_level = false;
		is_brick_moving = false;
		is_arrow_visible = false; 
		is_slow_down_visible = false;
		is_plus_two_visible = false;
		heart_visible = false;
		shooting_sound_stoped = false;
		hearts_quantity.splice(0, hearts_quantity.length);
		all_bullets.splice(0, all_bullets.length);
		all_bricks.splice(0, all_bricks.length);
		all_virtual_bricks.splice(0 , all_virtual_bricks.length);
		all_enemy_bullets.splice(0, all_enemy_bullets.length);
		bullets_counts.splice(0, bullets_counts.length);
		enemy_quantity.splice(0, enemy_quantity.length);
		yellow_bricks = 0;
		green_bricks = 0;
		
		if (level == 10) {
			can_spider_move = true;
			can_spider_shoot = false;
			max_spider_bullets = 15;
			spider_stop_moving = 250;
			all_spider_bullets.splice(0, all_spider_bullets.length);
		}

	}
	
	function refersh_delay() {
		refresh_delay_time -= 1 
		if (refresh_delay_time == 0) {
			if (level == 1) {
				draw_virtual_bricks(70, 15)
			}
			if (level == 2) {
				brick_col = 17;
				brick_row = 3;
				surprise_bricks_quantity = [6, 1, 3, 5];
				draw_virtual_bricks(9, 5)
			}
			if (level == 3) {
				brick_col = 17;
				brick_row = 4;
				surprise_bricks_quantity = [6, 1, 3, 2];
				draw_virtual_bricks(9, 5)
			}
			if (level == 4) {
				brick_col = 17;
				brick_row = 4;
				yellow_bricks = 10;
				surprise_bricks_quantity = [6, 1, 3, 5, 1, 4];
				draw_virtual_bricks(9, 5)
			}
			if (level == 5) {
				brick_col = 17;
				brick_row = 6;
				yellow_bricks = 20;
				surprise_bricks_quantity = [6, 1, 3, 5, 1, 1, 2];
				draw_virtual_bricks(9, 5)
			}
			if (level == 6) {
				brick_col = 17;
				brick_row = 7;
				yellow_bricks = 40;
				surprise_bricks_quantity = [6, 1, 3, 5, 1, 4, 1, 1, 4];
				draw_virtual_bricks(9, 5)
			}
			if (level == 7) {
				brick_col = 17;
				brick_row = 8;
				//green_bricks = 10;
				yellow_bricks = (brick_col * brick_row);
				surprise_bricks_quantity = [6, 1, 3, 5, 1, 4, 1, 1, 4, 1, 2];
				draw_virtual_bricks(9, 5)
			}
			if (level == 8) {
				brick_col = 17;
				brick_row = 8;
				green_bricks = 20;
				yellow_bricks = (brick_col * brick_row) - green_bricks;
				surprise_bricks_quantity = [6, 1, 3, 5, 1, 4, 1, 1, 4, 1, 6];
				draw_virtual_bricks(9, 5)
			}
			if (level == 9) {
				brick_col = 17;
				brick_row = 8;
				green_bricks = (brick_col * brick_row);
				yellow_bricks = 0;
				surprise_bricks_quantity = [6, 1, 3, 5, 1, 4, 1, 1, 4, 1, 2, 6];
				draw_virtual_bricks(9, 5)
			}
			if (level == 10) {
				brick_col = 0;
				brick_row = 0;
				green_bricks = 0;
				yellow_bricks = 0;
				surprise_bricks_quantity = [];
				move_spider();
				return;
			}
			draw_all_bricks();
			refresh_delay_time = 10;
			refresh = false;
			can_change_level = true;  
		}
	}
	
	function game_over() {
		hearts_quantity.splice(0, hearts_quantity.length);
		all_bricks.splice(0, all_bricks.length);
		all_enemy_bullets.splice(0, all_enemy_bullets.length);
		
		context.font = "bold 16px Arial";
		context.textAlign = "left";
		context.textBaseline = "middle";
		context.fillStyle = "rgb(255,0,0)";
		context.fillText("Game Over ", 150 , 170);
		
		context.font = "bold 12px Arial";
		context.textAlign = "left";
		context.textBaseline = "middle";
		context.fillStyle = "rgb(255,0,0)";
		context.fillText("Your score: " + score, 150 , 200);
	}
	
	function win_game() {
		if(spider_power <= 0) {
			spider_power = 0;
			spider_power_line = 0;
			score += life_quantity*500*10;
			end_screen();
		}
	}
	
	function end_screen() {
		context.font = "bold 16px Arial";
		context.textAlign = "left";
		context.textBaseline = "middle";
		context.fillStyle = "rgb(255,0,0)";
		context.fillText("You won! ", 150 , 170);
	}
	
	function author() {
		context.clearRect(0, 0, canvas.width, canvas.height);
		interval_delay = 30;
		win_game();
		
		context.font = "bold 12px Arial";
		context.textAlign = "left";
		context.textBaseline = "middle";
		context.fillStyle = "rgb(255,0,0)";
		
		let JL = "Joanna Ligenza";
		let CLT = " Pawel Ligenza";

		for (i=0; i < who_made_it.length; i++) {
			if (who_made_it[who_made_it.length - 1][2] < 0 ) {
				cancelAnimationFrame(animation2);
				return;
			}
			if ( i !== 3) {
				context.fillText(who_made_it[i][0] + JL, who_made_it[i][1] , who_made_it[i][2]);
			}
			if (i === 3) {
				context.fillText(who_made_it[i][0] + JL + CLT, who_made_it[i][1] , who_made_it[i][2]);
			}
			who_made_it[i][2] = who_made_it[i][2] - 1 ;
		}
		
		setTimeout(function() {
			animation2 = requestAnimationFrame(author); 
		}, interval_delay);
	}

	
	var t0 = performance.now();
	
	function loop() {
		//console.log("enemy_quantity ", enemy_quantity)
		//console.log("all_virtual_bricks ", all_virtual_bricks)
		//console.log("interval_delay", interval_delay)
		
		context.clearRect(0, 0, canvas.width, canvas.height);
		draw_frame();
		draw_level();
		count_score();
		draw_life();
		draw_hearts();		
		if (end_game == true) {
			console.log("end_game");
			game_over();
			cancelAnimationFrame(animation);
			return;
		}
		
		if (level == 10) {
			draw_spider_power();
			draw_spider_power_line();
			if(spider_power <= 0) {
				//win_game();
				author();
				cancelAnimationFrame(animation);
				return;
			}
			if (can_spider_shoot == true) {
				draw_spider_bullets();
				move_spider_bullet();
			}
			if (all_spider_bullets.length > 0) {
				spider_bullets_collision();
			}
			//draw_spider();
			move_spider();
			stop_spider();	
		}
		
		if (enemy_quantity.length > 0) {
			show_enemy();
			draw_enemy_bullets();
			move_enemy_bullets();
			enemy_bullets_collision();
		}
		if (is_arrow_visible == true) {
			show_arrow();
		}
		if (is_slow_down_visible == true) {
			show_slow_down_icon();
			slow_down_game();
		}
		if (heart_visible == true) {
			move_heart();
			heart_collision();
		}
		if (is_plus_two_visible == true) {
			plus_two_visible_delay -= 1;
			show_plus_two_icon()
			if(plus_two_visible_delay == 0) {
				is_plus_two_visible = false;
				plus_two_visible_delay = 50;
			}
		}
		if (refresh == true) {
			refersh_delay();
		}
		if (all_bullets.length > 0) {
			move_bullet();
			bullet_collision();
		}
		if (is_brick_moving == true) {
			brick_collision();
		}
		if (white_background == true) {
			background();
		}
		space_ship_move();
		move_bricks();
		if (bullets_counts.length < bullet_limit) {
			can_shoot = true;
		}
		if (bullets_counts.length > bullet_limit) {
			can_shoot = false;
		}
		setTimeout(function() {
			animation = requestAnimationFrame(loop); 
		}, interval_delay); 
	}
	
	start_screen();
	
	function init() {
		context.clearRect(0, 0, canvas.width, canvas.height);
		draw_frame();
		draw_spider();
		draw_virtual_bricks(70, 15);
		draw_all_bricks();
		draw_space_ship();
		draw_enemy();
		//get_space_ship();
		draw_hearts();
		get_heart();
		draw_arrow();
		draw_slow_down_icon();
		draw_plus_two_icon();
		move_bricks();
		loop();
	}

	

	console.log("all_bricks ", all_bricks)
	var t1 = performance.now();
	console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.")  
})