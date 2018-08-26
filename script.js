document.addEventListener('DOMContentLoaded', function() {
	
	const canvas = document.getElementById("canvas");
	const context = canvas.getContext("2d");
	const canva2s = document.getElementById("canvas2");
	const context2 = canvas2.getContext("2d");
	const cont = new AudioContext();
	const cont1 = new AudioContext();
	const cont2 = new AudioContext();
	const cont3 = new AudioContext();
	const cont4 = new AudioContext();
	let position = "";
	let song = "";
	let scale = "";
	let myV = "";
	let can_draw_frame = true;
	const brick_width = 20;
	const brick_height = 15;
	let brick_col = 11
	let brick_row = 1;
	let all_virtual_bricks = [];
	const all_bricks = [];
	let ship_position_x = 160;
	let ship_position_y = 300;
	const ship_width = 72;
	const ship_height = 77;
	let enemy_position_x = [];
	let enemy_position_y = [];
	let space_ship = "";
	let space_ship_blue = "";
	let which_key_pressed = "";
	let is_brick_moving = false;
	const brick_moving_delay = 10;
	let brick_moving_delay_arr = [];
	let surprise_bricks_quantity = [6, 1];
	const all_surprise_bricks = [];
	let color = "orange";
	let yellow_bricks = 0;
	let green_bricks = 0;
	let move = false;
	let one_shoot = false;
	let can_shoot = true;
	let enemy_quantity = [];
	const bullets_counts = [];
	let bullet_limit = 17; //4
	const bullet_width = 2;
	const bullet_height = 10;
	let get_bullets = "";
	let get_enemy = "";
	let all_bullets = [];
	let all_additional_bullets = [];
	let turbo_shooting = false;
	let turbo_shooting_delay = 450;
	let shooting_enemy = "";
	const enemy_width = 12;
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
	let get_arrow = "";
	let arrow_position = [];
	let is_arrow_visible = false;
	let slow_down = false;
	let slow_down_time = 150;
	let get_slow_down_icon = "";
	let slow_down_icon_position = [];
	let is_slow_down_visible = false;
	let plus_two_visible_delay = 50;
	let get_draw_plus_two_icon = "";
	let plus_two_icon_position = [];
	let is_plus_two_visible = false;
	let get_lightning_icon = "";
	let lightning_icon_position = [];
	let get_star_icon = "";
	let catched_stars = [];
	let star_icon_quantity = [];
	let get_boss = "";
	let boss_pos_x = 140;
	let boss_pos_y = 20;
	let spider_width = 80;
	let spider_height = 75;
	let alien_width = 106;
	let alien_height = 84;
	let direction_of_boss_move = "left";
	let max_boss_bullets = 15;
	let all_boss_bullets = [];
	let boss_bullet_delay_arr = [];
	let can_boss_move = true;
	let can_boss_shoot = false;
	let boss_stop_moving = 250; 
	let boss_start_moving = 100;
	let boss_power_line = 100;
	let boss_power = 100;
	let all_obstacles = [];
	let obstacles_delay = 30;
	let three_obstacles_lines = [];
	let score = 0;
	let level = 9;
	let change_level_delay = 100;
	let can_change_level = true;
	let interval_delay = 5;
	let refresh = false;
	let refresh_delay_time = 10;
	let animation = "";
	let end_game = false;
	let end_screen_text = [];
	let where_to_draw = 400;
	let change_level_refresh = false;
	let lost_life_refresh = false;
	let secret_level = true;
	let one_time_sound = 0;
	let boss_star_delay = 700;
	let how_many_stars_in_boss = 6;
	
	
	function draw_frame() {
		context.fillStyle = "rgb(255, 195, 35)";
		context.fillRect(0,0, canvas.width, canvas.height);
		context.fillStyle = "rgb(6, 0, 135)";
		context.fillRect(2,2, canvas.width-4, canvas.height-4 );
		
		context2.fillStyle = "rgb(255, 195, 35)";
		context2.fillRect(0,0, canvas.width, canvas.height);
		context2.fillStyle = "rgb(6, 0, 135)";
		context2.fillRect(2,2, canvas.width-4, canvas.height-4 );
	}
	
	function start_screen() {
		// ->>> CLT function
		refresh_color_data();
		// ->>> end CLT function
		draw_frame();
		context.font = "Bold 16px Arial";
		context.textAlign = "left";
		context.textBaseline = "middle";
		context.fillStyle = "rgb(255,0,0)";
		context.fillText("Press enter to play", 100 , 170);
		draw_space_ship();
		space_ship_move();
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
	
	//CLT -> counting colors on screen
	function count_colors_opt(size_x,size_y){
		var pixel_data = context.getImageData(0,0, size_x, size_y).data;
		var pixel_arr = [];
		var last_pixels = [];
		for (let i=0; i<= pixel_data.length-4;i=i+4){
			pixels = pixel_data[i]+","+pixel_data[i+1]+","+pixel_data[i+2]+","+pixel_data[i+3];
			if (pixels!==last_pixels) {
				pixel_arr.push(pixels);
				last_pixels = pixels
			}
		}
		const colors_unique_count = [...new Set(pixel_arr)];
		//console.log(colors_unique_count)
		return colors_unique_count.length;
	}


	function refresh_color_data() {
		x = 5;  // 5 Seconds
		var perf0 = performance.now();
		let all_colors = count_colors_opt(360,400);
		var perf1 = performance.now();
		console.log("Colors on screen:" + all_colors + " take: " + parseInt(perf1 - perf0) + " ms" );
		setTimeout(refresh_color_data, x*1000);
	}
	//CLT -> end counting colors on screen
	
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
				console.log("color ", color)
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
				if ( m % 2 != 0) { 
					brick_pattern3(all_virtual_bricks[m][1], all_virtual_bricks[m][2]);
				}
				//brick_pattern3(positionX, positionY);
				get_brick = context.getImageData(all_virtual_bricks[m][1], all_virtual_bricks[m][2], brick_width+1, brick_height+1);
				all_bricks.push([get_brick, all_virtual_bricks[m][1], all_virtual_bricks[m][2], 0, color])
		}
		surprise_brick();
	}
	
	function move_bricks() {
		const brick_step = 3;
		brick_moving_delay_arr.push(1);
		if (all_bricks.length == 0 && can_change_level == true && level == 8 && secret_level == true) {
			secret_level = false;
			level -= 1;
		}
		if (all_bricks.length == 0 && can_change_level == true) {
			change_level_refresh = true;
			change_level();
			//change_level_refresh = false;
			return;
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
				if (color == "orange") { 
					context.fillStyle = "rgb(232, 169, 0)";
					context.fillRect(positionX + 1, positionY + 1, brick_width - 1, brick_height - 1);
				}
				if (color == "yellow") { 
					context.fillStyle = "rgb(240, 240, 34)";
					context.fillRect(positionX + 1, positionY + 1, brick_width - 1, brick_height - 1);
				}
				if (color == "green") { 
					context.fillStyle = "rgb(123, 190, 35)";
					context.fillRect(positionX + 1, positionY + 1, brick_width - 1, brick_height - 1);
				}
	}
	
	function brick_pattern1(positionX, positionY) {
		horizontal_line1 = Math.floor(brick_height / 3);
		horizontal_line2 = Math.floor(brick_height / 3) * 2;
		let vertical_line1 = Math.floor(brick_width / 10);
		let vertical_line2 = Math.floor(brick_width / 10) * 5;
		let vertical_line3 = Math.floor(brick_width / 10) * 9;
		let vertical_line4 = Math.floor(brick_width / 10) * 3;
		let vertical_line5 = Math.floor(brick_width / 10) * 7;
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
		context.fillStyle = "rgb(255, 0, 0)";
		context.fillRect(positionX + 8, positionY + 3, 1, 2);
		context.fillRect(positionX + 9, positionY + 2, 3, 2);
		context.fillRect(positionX + 11, positionY + 2, 1, 4);
		context.fillRect(positionX + 10, positionY + 5, 1, 1);
		context.fillRect(positionX + 9, positionY + 6, 2, 1);
		context.fillRect(positionX + 8, positionY + 7, 2, 1);
		context.fillRect(positionX + 8, positionY + 8, 4, 1);
		context.fillRect(positionX + 9, positionY + 10, 2, 3);
	}
	
	function brick_pattern3(positionX, positionY) {
		context.beginPath();
		if (color == "orange") { 
			context.fillStyle = "rgb(253, 190, 120)";
		}
		if (color == "yellow") { 
			context.fillStyle = "rgb(255, 233, 135)";
		}
		if (color == "green") { 
			context.fillStyle = "rgb(187, 219, 141)";
		}
		context.moveTo(positionX + (brick_width), positionY + 1);
		context.lineTo(positionX + (brick_width - 3), positionY + 1 + 3);
		context.lineTo(positionX + 1 + 3, positionY + 1 + 3);												 
		context.lineTo(positionX + 1 + 3, positionY + (brick_height - 3));					   
		context.lineTo(positionX + 1, positionY + (brick_height));
		context.lineTo(positionX + 1, positionY + 1);
		context.closePath();
		context.fill();
		
		context.beginPath();
		if (color == "orange") { 
			context.fillStyle = "rgb(184, 98, 0)";
		}
		if (color == "yellow") { 
			context.fillStyle = "rgb(192, 163, 0)";
		}
		if (color == "green") { 
			context.fillStyle = "rgb(86, 143, 19)";
		}
		context.moveTo(positionX + 1, positionY + (brick_height));
		context.lineTo(positionX + 1 + 3, positionY + (brick_height - 3));
		context.lineTo(positionX + (brick_width - 3), positionY + (brick_height - 3));
		context.lineTo(positionX + (brick_width - 3), positionY + 1 + 3);
		context.lineTo(positionX + (brick_width), positionY + 1);
		context.lineTo(positionX + (brick_width), positionY + (brick_height));																	  
		context.closePath();
		context.fill();
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
			brick_pattern2(surprise_brick_positionX , surprise_brick_positionY );
			
			get_surprise_brick = context.getImageData(surprise_brick_positionX, surprise_brick_positionY, brick_width+1, brick_height+1);			
			
			all_bricks[random_surprise_brick_copy] = [get_surprise_brick, surprise_brick_positionX, surprise_brick_positionY, surprise_bricks_quantity[i],  surprise_brick_color];
			all_surprise_bricks.push([get_surprise_brick, surprise_brick_positionX, surprise_brick_positionY, surprise_bricks_quantity[i]]);
			
			all_bricks_copy.splice(random_surprise_brick, 1);
		}
	}
	
	function draw_enemy() {
		context.fillStyle = "rgb(250, 250, 250)";
		context.fillRect(331, 381, 8, 2);
		context.fillRect(330, 383, 10, 2);
		context.fillRect(329, 385, 12, 2);
		context.fillRect(330, 387, 10, 2);
		context.fillRect(331, 389, 8, 2);
		context.fillRect(334, 391, 2, 4);

		get_enemy = context.getImageData(329, 379, enemy_width, enemy_height);
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
					context.fillStyle = "rgb(250, 250, 250)";
					context.fillRect(enemy_position_x[i] + 5, enemy_position_y[i] + enemy_height, bullet_width, bullet_height)
					
					get_enemy_bullet = context.getImageData(enemy_position_x[i] + 5, enemy_position_y[i] + enemy_height, bullet_width, bullet_height);
					all_enemy_bullets.push([get_enemy_bullet, enemy_position_x[i] + 5, enemy_position_y[i] + enemy_height]);
					enemy_quantity[i][0] = enemy_quantity[i][0] - 1;	
						
					//enemy_shooting_sound(190);
					new_sound(cont1, "sine", 190, 5, 0.001, 1, 1)
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
				if (heart_position_y + 8 > ship_position_y && heart_position_x > ship_position_x && heart_position_x < ship_position_x + ship_width) {
					hearts_quantity.splice(i, 1);
					life_quantity += 1;
					life_star_catch_sound(660);
					return;
				}
				if (heart_position_y + 8  > canvas.height - 5 ) {
					hearts_quantity.splice(i, 1);
					if (!(level == 8 && secret_level == true)) {
						secret_level = false;
					}
					return;
				}
			}
		}
	} 
	
	function draw_arrow() {
		context.fillStyle = "rgb(250, 250, 250)";
		context.fillRect(340, 363, 2, 9);
		context.fillRect(339, 368, 4, 3);
		context.fillRect(338, 367, 1, 3);
		context.fillRect(337, 366, 1, 3);
		context.fillRect(343, 367, 1, 3);
		context.fillRect(344, 366, 1, 3);
		
		get_arrow = context.getImageData(337, 363, 8, 11);
	}
	
	function show_arrow() {
		context.putImageData(get_arrow, arrow_position[0] + 7, arrow_position[1] + 5);
	}
	
	function background() {
		background_delay -= 1;
		if(background_delay > 0) {
			context.fillStyle = "rgb(250, 250, 250)";
			context.fillRect(2,2, canvas.width-4, canvas.height-4 );
			
			const ship_data = space_ship; 
			space_ship_blue = ship_data;
				for (let m=0; m < ship_data.data.length; m += 4) {
						if (ship_data.data[m] === 6) {
							ship_data.data[m] = 251;
						}
						if (ship_data.data[m+1] === 0) {
							ship_data.data[m+1] = 251;
						}
						if (ship_data.data[m+2] === 135) {
							ship_data.data[m+2] = 251;
						}
					} 
						
			space_ship = ship_data 
		}
		if(background_delay == 0) {
			background_delay = 100;
			white_background = false;
			const ship_data = space_ship; 
				for (let m=0; m < ship_data.data.length; m += 4) {
						if (ship_data.data[m] === 251) {
							ship_data.data[m] = 6;
						}
						if (ship_data.data[m+1] === 251) {
							ship_data.data[m+1] = 0;
						}
						if (ship_data.data[m+2] === 251) {
							ship_data.data[m+2] = 135;
						}
					} 
						
			space_ship = ship_data 
		} 
	}
	
	function draw_slow_down_icon() {
		context.beginPath();
		context.fillStyle = "rgb(250, 250, 250)";
		context.fillRect(339, 335, 3, 1);
		context.fillRect(338, 336, 5, 1);
		context.fillRect(337, 337, 2, 2);
		context.fillRect(338, 339, 4, 2);
		context.fillRect(341, 341, 2, 2);
		context.fillRect(337, 343, 5, 2);
		context.fillRect(338, 345, 3, 1);
		context.fill();
		
		get_slow_down_icon = context.getImageData(337, 335, 6, 11);
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
		context.beginPath();
		context.fillStyle = "rgb(250, 250, 250)";
		context.fillRect(339, 320, 2, 6);
		context.fillRect(337, 322, 6, 2);
		context.fillRect(346, 317, 2, 1);
		context.fillRect(345, 318, 4, 1);
		context.fillRect(345, 319, 4, 1);
		context.fillRect(348, 320, 2, 2);
		context.fillRect(345, 322, 4, 1);
		context.fillRect(344, 323, 2, 2);
		context.fillRect(344, 325, 6, 1);
		context.fillRect(344, 326, 6, 1);
		context.fill();
		
		get_draw_plus_two_icon = context.getImageData(337, 317, 13, 10);
	}
	
	function show_plus_two_icon() {
		context.putImageData(get_draw_plus_two_icon, plus_two_icon_position[0] + 3, plus_two_icon_position[1] + 3);
	}
	
	function draw_star_icon() {		
		context.beginPath();
		context.fillStyle = "rgb(255, 233, 135)";
		context.fillRect(340, 300, 1, 11);
		context.fillRect(335, 305, 11, 1);
		context.fillRect(339, 304, 3, 3);
		context.fillRect(336, 301, 1, 1);
		context.fillRect(337, 302, 1, 1);
		context.fillRect(338, 303, 1, 1);
		context.fillRect(336, 309, 1, 1);
		context.fillRect(337, 308, 1, 1);
		context.fillRect(338, 307, 1, 1);
		context.fillRect(344, 301, 1, 1);
		context.fillRect(343, 302, 1, 1);
		context.fillRect(342, 303, 1, 1);
		context.fillRect(342, 307, 1, 1);
		context.fillRect(343, 308, 1, 1);
		context.fillRect(344, 309, 1, 1);
		context.fill();
		
		get_star_icon = context.getImageData(335, 300, 11, 11);
	}
	
	function move_star_icon() {
		const star_icon_step = 3;
		for (i=0; i < star_icon_quantity.length; i++) {
			context.putImageData(get_star_icon, star_icon_quantity[i][0] + 5, star_icon_quantity[i][1]);
			star_icon_quantity[i][1] = star_icon_quantity[i][1] + star_icon_step
		}
	}
	
	function star_icon_collision() {
		if (star_icon_quantity.length > 0) {	
			for (i = 0; i < star_icon_quantity.length; i++) {
				if (star_icon_quantity[i][1] + 11 > ship_position_y && star_icon_quantity[i][0] + 5 > ship_position_x && star_icon_quantity[i][0] + 11 < ship_position_x + ship_width) {
					star_icon_quantity.splice(i, 1);
					catched_stars.push(1);
					score += 200;
					life_star_catch_sound(660);
					return;
				}
				if (star_icon_quantity[i][1] + 16  > canvas.height - 5 ) {
					star_icon_quantity.splice(i, 1);
					if (!(level == 8 && secret_level == true)) {
						console.log("secret_level ", secret_level)
						secret_level = false;
					}
					return;
				}
			}
		}
	} 
	
	function draw_lightning_icon() {
		
		context.beginPath();
		context.fillStyle = "rgb(255, 233, 135)";
		context.fillRect(341, 282, 2, 1);
		context.fillRect(340, 283, 2, 1);
		context.fillRect(339, 284, 2, 1);
		context.fillRect(338, 285, 2, 1);
		context.fillRect(337, 286, 8, 1);
		context.fillRect(336, 287, 8, 1);
		context.fillRect(341, 288, 2, 1);
		context.fillRect(340, 289, 2, 1);
		context.fillRect(339, 290, 2, 1);
		context.fillRect(338, 291, 2, 1);
		context.fillRect(337, 292, 2, 1);
		context.fill();
		
		get_lightning_icon = context.getImageData(336, 282, 8, 10);
	}
	
	function show_lightning_icon() {
		context.putImageData(get_lightning_icon, lightning_icon_position[0] + 6, lightning_icon_position[1] + 3);
	}
	
	function draw(x1, y1, width, height) {
		context.fillRect(x1, y1, width, height);
	}
	
	function draw_space_ship() {
		// Wings
		context.fillStyle = "rgb(0, 168, 89)";
		draw_square(26,308,20,320,45,320,50,350, 1);
		draw_triangle(30,300,26,308,28,312,1);
		
		draw_square(65,320,60,350,83,308,90,320, 1);
		draw_triangle(79,300,83,308,81,312,1);
		context.fillRect(29, 300, 2, 2);
		context.fillRect(79, 300, 2, 2);
		
		// Body of ship
		context.fillStyle = "rgb(215, 215, 215)";
		context.fillRect(51, 300, 9, 51);
		draw_triangle(51,300,42,335,49,350,1);
		draw_triangle(59,300,68,335,61,350,1);
		
		// Shape on body
		context.fillStyle = "rgb(59, 116, 244)";
		draw_square(52,305,49,320,56,305,52,320, 1);
		draw_square(54,305,58,320,58,305,62,320, 1);
		
		context.fillStyle = "rgb(104, 104, 104)";
		context.fillRect(52, 330, 7, 15);
		draw_triangle(55,321,52,330,58,330,1);
		draw_triangle(49,323,43,335,49,345,1);
		draw_triangle(61,323,67,335,61,345,1);
		
		// Engine
		draw_square(51,351,54,358,60,351,56,358, 1);
		//context.fillRect(51, 351, 10, 3);
		//context.fillRect(52, 354, 8, 2);
		//context.fillRect(53, 356, 6, 2);
		
		//Shape on wings
		context.fillStyle = "rgb(36, 82, 55)";
		draw_square(32,311,32,316,37,314,37,320, 1);
		draw_square(40,316,40,321,44,319,44,325, 1);
		
		context.fillRect(24, 319, 2, 2);
		context.fillRect(29, 324, 2, 2);
		context.fillRect(34, 329, 2, 2);
		context.fillRect(39, 334, 2, 2);
		
		draw_square(66,319,66,325,70,316,70,322, 1);
		draw_square(73,314,73,320,77,312,77,316, 1);
		
		context.fillRect(84, 319, 2, 2);
		context.fillRect(79, 324, 2, 2);
		context.fillRect(74, 329, 2, 2);
		context.fillRect(69, 334, 2, 2);
		
		// Bottom wing
		draw_triangle(40,342,47,360,51,351,1);
		draw_triangle(69,342,63,360,60,351,1);
		
		// left yellow circle
		context.fillStyle = "rgb(240, 240, 34)";
		context.fillRect(28, 294, 4, 6);
		context.fillRect(27, 296, 6, 2);
		
		context.fillRect(78, 294, 4, 6);
		context.fillRect(77, 296, 6, 2);
		
		// engine fire
		context.fillStyle = "rgb(232, 169, 0)";		
		context.fillRect(52, 364, 2, 5);
		context.fillRect(55, 364, 2, 7);
		context.fillRect(58, 364, 2, 5);
		
		space_ship = context.getImageData(20, 294, ship_width, ship_height);
		
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
		if (ship_position_x >= (canvas.width - ship_width) - 6 ) {
			ship_position_x = (canvas.width - ship_width) - 6;
		}
	}
	
	
	function draw_bullet() {
		if (which_key_pressed == "32" && one_shoot == true && can_shoot == true) { 
			
			context.fillStyle = "rgb(250, 250, 250)";
			context.fillRect((ship_position_x + (ship_width/2))-1, ship_position_y - bullet_height, bullet_width, bullet_height);
			
			bullets_counts.push(1);
			
			if (turbo_shooting == true) {
				draw_additional_bullets();     
			}
			
			one_shoot = false;
			
			//ship_shooting_sound(60);
			new_sound(cont2, "sine", 60, 100, 0.001, 1, 1);

			get_bullet();
		}
	}
	
	function get_bullet() {
		let bullet_position_x = (ship_position_x + (ship_width/2))-1
		let bullet_position_y = ship_position_y - bullet_height;
		let get_bullet = context.getImageData(bullet_position_x, bullet_position_y, bullet_width, bullet_height);
		
		all_bullets.push([get_bullet, bullet_position_x, bullet_position_y]);
	}
	
	function draw_additional_bullets() {
		if (which_key_pressed == "32" && one_shoot == true && can_shoot == true) { 
			
			context.beginPath();
			context.fillStyle = "rgb(250, 250, 250)";
			context.fillRect(ship_position_x + 9, ship_position_y - bullet_height, bullet_width, bullet_height);
			
			context.fillRect((ship_position_x + ship_width) - 13, ship_position_y - bullet_height, bullet_width, bullet_height);
			
			bullets_counts.push(1);

			let get_1_bullet = context.getImageData(ship_position_x + 9, ship_position_y - bullet_height, bullet_width, bullet_height);
			let get_2_bullet = context.getImageData((ship_position_x + ship_width) - 13, ship_position_y - bullet_height, bullet_width, bullet_height);
		
			all_bullets.push([get_1_bullet, ship_position_x + 9, ship_position_y - bullet_height]);
			all_bullets.push([get_2_bullet, (ship_position_x + ship_width) - 13, ship_position_y - bullet_height]);
		}
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
			if (all_bullets[i][2] <= (canvas.height - (canvas.height-2))) {
				all_bullets.splice(i, 1);
				bullets_counts.splice(i, 1);
				return;
			}
			if (level == 10) {
				if (all_bullets[i][1] >= (boss_pos_x + 20) && all_bullets[i][1] <= ((boss_pos_x + alien_width) - 20) && all_bullets[i][2] <= (boss_pos_y + alien_height) - 15 ) {
					all_bullets.splice(i, 1);
					bullets_counts.splice(i, 1);
					score += 50;
					boss_power -= 1;
					boss_power_line -= 1;	
					return;
				}
				for(k = 0; k < all_obstacles.length; k++) {
					if (all_bullets[i][2] <= all_obstacles[k][2] && all_bullets[i][2] + bullet_height >= all_obstacles[k][2] && all_bullets[i][1] >= all_obstacles[k][1] && all_bullets[i][1] <= all_obstacles[k][1] + three_obstacles_lines[0][1]) {
						if(all_obstacles[k][3] == "orange") {
							//score += 20;
							all_obstacles.splice(k, 1);
						}
						all_bullets.splice(i, 1);
						bullets_counts.splice(i, 1);	
						return;
					}
				}
			}
			for (j = 0; j < all_bricks.length; j++) {
				if ((all_bullets[i][1] >= all_bricks[j][1] && all_bullets[i][1] <= all_bricks[j][1] + brick_width && all_bullets[i][2] >= all_bricks[j][2] && all_bullets[i][2] <= all_bricks[j][2] + brick_height)) {
					new_sound(cont4, "sine", 200, 10, 0.11, 0.1, 0.1);
					if(all_bricks[j][4] == "yellow") {
						const yellow_brick_data = all_bricks[j][0];
						
						all_bricks[j][4] = "orange";
						all_bullets.splice(i, 1);
						bullets_counts.splice(i, 1);
						
						for (let m=0; m < yellow_brick_data.data.length; m += 4) {
							if (yellow_brick_data.data[m] === 225) {
								yellow_brick_data.data[m] = 253;
							}
							if (yellow_brick_data.data[m+1] === 233) {
								yellow_brick_data.data[m+1] = 190;
							}
							if (yellow_brick_data.data[m+2] === 135) {
								yellow_brick_data.data[m+2] = 120;
							}
							
							if (yellow_brick_data.data[m] === 240) {
								yellow_brick_data.data[m] = 232;
							}
							if (yellow_brick_data.data[m+1] === 240) {
								yellow_brick_data.data[m+1] = 169;
							}
							if (yellow_brick_data.data[m+2] === 34) {
								yellow_brick_data.data[m+2] = 0;
							}
							
							if (yellow_brick_data.data[m] === 192) {
								yellow_brick_data.data[m] = 184;
							}
							if (yellow_brick_data.data[m+1] === 163) {
								yellow_brick_data.data[m+1] = 98;
							}
							if (yellow_brick_data.data[m+2] === 0) {
								yellow_brick_data.data[m+2] = 0;
							}
							
							if (yellow_brick_data.data[m] === 220) {
								yellow_brick_data.data[m] = 222;
							}
							if (yellow_brick_data.data[m+1] === 208) {
								yellow_brick_data.data[m+1] = 150;
							}
							if (yellow_brick_data.data[m+2] === 60) {
								yellow_brick_data.data[m+2] = 46;
							}
						} 
						
						all_bricks[j][0] = yellow_brick_data;
						return;
					}
					if(all_bricks[j][4] == "green") {
						const green_brick_data = all_bricks[j][0];
						all_bricks[j][4] = "yellow";
						all_bullets.splice(i, 1);
						bullets_counts.splice(i, 1);
						for (let m=0; m < green_brick_data.data.length; m += 4) {
							if (green_brick_data.data[m] === 123) {
								green_brick_data.data[m] = 240;
							}
							if (green_brick_data.data[m+1] === 190) {
								green_brick_data.data[m+1] = 240;
							}
							if (green_brick_data.data[m+2] === 35) {
								green_brick_data.data[m+2] = 34;
							}

							if (green_brick_data.data[m] === 187) {
								green_brick_data.data[m] = 255;
							}
							if (green_brick_data.data[m+1] === 219) {
								green_brick_data.data[m+1] = 233;
							}
							if (green_brick_data.data[m+2] === 141) {
								green_brick_data.data[m+2] = 135;
							} 

							if (green_brick_data.data[m] === 86) {
								green_brick_data.data[m] = 192;
							}
							if (green_brick_data.data[m+1] === 143) {
								green_brick_data.data[m+1] = 163;
							}
							if (green_brick_data.data[m+2] === 19) {
								green_brick_data.data[m+2] = 0;
							}
							
							if (green_brick_data.data[m] === 133) {
								green_brick_data.data[m] = 228;
							}
							if (green_brick_data.data[m+1] === 184) {
								green_brick_data.data[m+1] = 208;
							}
							if (green_brick_data.data[m+2] === 70) {
								green_brick_data.data[m+2] = 60;
							}
						} 
						return;
					} 
					if(all_bricks[j][3] == 1) {
						enemy_quantity.push([enemy_max_bullet, true, all_bricks[j][1]+5, all_bricks[j][2] +1]);
						console.log("yes! 1")
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
						arrow_position = [all_bricks[j][1], all_bricks[j][2]];
						console.log("yes! 3")
					}
					if(all_bricks[j][3] == 4) {
						white_background = true;
						console.log("yes! 4")
					}
					if(all_bricks[j][3] == 5) {
						slow_down = true;
						is_slow_down_visible = true;
						slow_down_icon_position = [all_bricks[j][1], all_bricks[j][2]];
						console.log("yes! 5" )
					}
					if(all_bricks[j][3] == 6) {
						bullet_limit += 2;
						is_plus_two_visible = true;
						plus_two_icon_position = [all_bricks[j][1], all_bricks[j][2]];
						console.log("yes! 6" )
					}
					if(all_bricks[j][3] == 7) {
						star_icon_quantity.push([all_bricks[j][1], all_bricks[j][2]]);
						console.log("yes! 7" )
					}
					if(all_bricks[j][3] == 8) {
						turbo_shooting = true;
						lightning_icon_position = [all_bricks[j][1], all_bricks[j][2]];
						console.log("yes! 8" )
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
	
	function draw_text(numb, before, text, after, posX , posY, font, align, rgb, text_height) {
		context2.font = font;
		context2.textAlign = align;
		context2.textBaseline = "middle";
		context2.fillStyle = rgb;
		context2.fillText(before + text + after, posX , posY);
		
		let get_text = context2.getImageData(posX, posY-7, context2.measureText(text).width + (context2.measureText(after).width+10), text_height);
		
		for (let m=0; m < get_text.data.length; m += 4) {
			if (get_text.data[m] !== 255 && get_text.data[m] !== 6 ) {
				get_text.data[m] = 255;
			}
			if (get_text.data[m+1] !== 0) {
				get_text.data[m+1] = 0;
			}
			if (get_text.data[m+2] !== 0 && get_text.data[m+2] !== 135) {
				get_text.data[m+2] = 0;
			}
		}
		end_screen_text[numb] = get_text;
	}
	
	function draw_level() {
		if (level == 8 && secret_level == true) {
			draw_text(3, "", "L e v e l : ", "+", 5, canvas.height - 15, "bold small-caps 12px Arial", "left", "rgb(255,0,0)", 12);
			context.putImageData(end_screen_text[3], 5, canvas.height - 15);
		}
		if (!(level == 8 && secret_level == true)) {
			draw_text(0, "", "L e v e l : ", level, 5, canvas.height - 15, "bold small-caps 12px Arial", "left", "rgb(255,0,0)", 12);
			context.putImageData(end_screen_text[0], 5, canvas.height - 15);
		}

	}
	
	function count_score() {
		draw_text(1, "", "S c o r e : ", score, 90 , canvas.height - 15, "bold small-caps 12px Arial", "left", "rgb(255,0,0)", 12);
		
		context.putImageData(end_screen_text[1], 90, canvas.height - 15);
	}
	
	function draw_life() {
		draw_text(2, "", "L i f e : ", "", 210 , canvas.height - 15, "bold small-caps 12px Arial", "left", "rgb(255,0,0)", 12);
		
		context.putImageData(end_screen_text[2], 210, canvas.height - 15);
	}
	
	function draw_hearts() {
		for (i=1; i < life_quantity + 1; i++) {
			context.beginPath();
			context.fillStyle = "rgb(255,0,0)";
			context.fillRect(247 + (11 * i), 387, 10, 4);
			context.fillRect(248 + (11 * i), 385, 3, 2);
			context.fillRect(253 + (11 * i), 385, 3, 2);
			context.fillRect(249 + (11 * i), 391, 6, 2);
			context.fillRect(251 + (11 * i), 393, 2, 2);
		}
	}

	function get_heart() {
		get_life_heart = context.getImageData(257, 385, 11, 10);
	}
	
	function draw_boss_power() {
		draw_text(4, "", "A l i e n  p o w e r : ", "", 5, 10, "bold small-caps 12px Arial", "left", "rgb(255,0,0)", 12);
		draw_text(5, "", boss_power , " %", 230 , 10, "bold small-caps 12px Arial", "left", "rgb(255,0,0)", 12);
		
		context.putImageData(end_screen_text[4], 5, 7);
		context.putImageData(end_screen_text[5], 230, 7);
	}
	
	function draw_boss_power_line() {
		context.beginPath();
		context.strokeStyle = "rgb(255,0,0)";
		context.lineWidth = 3;
		context.moveTo(125, 15); 
		context.lineTo(125 + boss_power_line, 15);
		context.stroke();
	}
	
	function sqrt(x1,y1,x2,y2) {
		return Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
	}
	// finds the angle of (x,y) on a plane from the origin
	function getAngle(x,y) { return Math.atan(y/(x==0?0.01:x))+(x<0?Math.PI:0); }

	function drawLineNoAliasing(sx, sy, tx, ty, line_width, line_height, color) {
		var dist = sqrt(sx,sy,tx,ty); // length of line
		var ang = getAngle(tx-sx,ty-sy); // angle of line
		for(var i=0;i<dist;i++) {
			// for each point along the line
			context.fillStyle = color;
			context.fillRect(Math.round(sx + Math.cos(ang)*i), // round for perfect pixels
				Math.round(sy + Math.sin(ang)*i), // thus no aliasing
				line_width,line_height); // fill in one pixel, eg 1x1
		}
	}

	
	function draw_boss() {
		
		// Boss legs
		drawLineNoAliasing(158, 63, 145, 55, 4, 2, "rgb(162, 163, 164)");
		drawLineNoAliasing(143, 54, 128, 69, 4, 2, "rgb(162, 163, 164)");
		drawLineNoAliasing(128, 69, 141, 86, 4, 2, "rgb(162, 163, 164)");
		
		drawLineNoAliasing(200, 63, 213, 54, 4, 2, "rgb(162, 163, 164)");
		drawLineNoAliasing(213, 54, 228, 69, 4, 2, "rgb(162, 163, 164)");
		drawLineNoAliasing(228, 69, 216, 86, 4, 2, "rgb(162, 163, 164)");
		
		// circle on legs
		context.fillStyle = "rgb(255, 195, 35)";
		context.fillRect(143, 53, 4, 6);
		context.fillRect(142, 54, 6, 4);
		
		context.fillRect(129, 67, 4, 6);
		context.fillRect(128, 68, 6, 4);
		
		context.fillRect(213, 53, 4, 6);
		context.fillRect(212, 54, 6, 4);
		
		context.fillRect(227, 67, 4, 6);
		context.fillRect(226, 68, 6, 4);
		
		// left and right laser
		context.fillStyle = "rgb(255,0,0)";
		context.fillRect(136, 86, 13, 1);
		context.fillRect(137, 87, 11, 2);
		context.fillRect(138, 89, 9, 2);
		context.fillRect(139, 91, 7, 2);
		context.fillRect(140, 93, 5, 2);
		context.fillRect(141, 95, 3, 2);
		context.fillRect(142, 97, 1, 2);
		
		context.fillRect(211, 86, 13, 1);
		context.fillRect(212, 87, 11, 2);
		context.fillRect(213, 89, 9, 2);
		context.fillRect(214, 91, 7, 2);
		context.fillRect(215, 93, 5, 2);
		context.fillRect(216, 95, 3, 2);
		context.fillRect(217, 97, 1, 2);
		
		// upper part of boss - blue
		context.fillStyle = "rgb(95, 159, 255)";
		context.fillRect(160, 46, 1, 25);
		context.fillRect(161, 40, 1, 30);
		context.fillRect(162, 35, 1, 30);
		context.fillRect(163, 32, 1, 30);
		context.fillRect(164, 30, 1, 30);
		context.fillRect(165, 28, 1, 32);
		
		context.fillRect(166, 26, 28, 35);
		
		context.fillRect(194, 28, 1, 36);
		context.fillRect(195, 30, 1, 34);
		context.fillRect(196, 32, 1, 32);
		context.fillRect(197, 35, 1, 30);
		context.fillRect(198, 40, 1, 30);
		context.fillRect(199, 46, 1, 30);
		
		context.fillRect(167, 25, 26, 1);
		context.fillRect(168, 23, 24, 2);
		context.fillRect(169, 22, 22, 1);
		context.fillRect(170, 21, 20, 1);
		context.fillRect(171, 20, 18, 1);
		context.fillRect(172, 19, 16, 1);
		context.fillRect(174, 18, 12, 1);
		context.fillRect(176, 17, 8, 1);
		context.fillRect(178, 16, 4, 1);
		context.fillRect(179, 15, 2, 1);
		
		
		// alien
		context.fillStyle = "rgb(0, 103, 12)";
		context.fillRect(175, 32, 10, 45);
		
		context.fillRect(177, 31, 6, 1);
		context.fillRect(178, 30, 4, 1);
		
		context.fillRect(174, 33, 1, 27);
		context.fillRect(173, 34, 1, 25);
		context.fillRect(172, 35, 1, 23);
		context.fillRect(171, 36, 1, 21);
		context.fillRect(170, 37, 1, 18);
		context.fillRect(169, 39, 1, 14);
		context.fillRect(168, 41, 1, 10);
		

		context.fillRect(185, 33, 1, 27);
		context.fillRect(186, 34, 1, 25);
		context.fillRect(187, 35, 1, 23);
		context.fillRect(188, 36, 1, 21);
		context.fillRect(189, 37, 1, 18);
		context.fillRect(190, 39, 1, 14);
		context.fillRect(191, 41, 1, 10);
		
		// alien eyes
		context.fillStyle = "rgb(0, 0, 0)";
		context.fillRect(173, 39, 1, 3);
		context.fillRect(174, 39, 1, 5);
		context.fillRect(175, 40, 1, 6);
		context.fillRect(176, 41, 1, 6);
		context.fillRect(177, 42, 1, 5);
		context.fillRect(178, 43, 1, 4);
		context.fillRect(179, 44, 1, 2);
		
		context.fillRect(181, 44, 1, 2);
		context.fillRect(182, 43, 1, 4);
		context.fillRect(183, 42, 1, 5);
		context.fillRect(184, 41, 1, 6);
		context.fillRect(185, 40, 1, 6);
		context.fillRect(186, 39, 1, 5);
		context.fillRect(187, 38, 1, 3);
		
		// lower part of boss
		context.fillStyle = "rgb(40, 98, 184)";
		context.fillRect(160, 61, 40, 18);
		
		context.fillRect(163, 60, 34, 1);
		context.fillRect(166, 59, 28, 1);
		
		context.fillRect(163, 79, 34, 1);
		context.fillRect(166, 80, 28, 1);
		
		context.fillRect(159, 62, 2, 16);
		context.fillRect(157, 62, 2, 16);
		context.fillRect(155, 63, 2, 14);
		context.fillRect(153, 64, 2, 12);
		context.fillRect(151, 65, 2, 10);
		context.fillRect(149, 66, 2, 8);
		context.fillRect(147, 68, 2, 4);
		
		context.fillRect(200, 62, 2, 16);
		context.fillRect(202, 62, 2, 16);
		context.fillRect(204, 63, 2, 14);
		context.fillRect(206, 64, 2, 12);
		context.fillRect(208, 65, 2, 10);
		context.fillRect(210, 66, 2, 8);
		context.fillRect(212, 68, 2, 4);
		
		// blue little laser under lower part of boss
		context.fillStyle = "rgb(95, 159, 255)";
		context.fillRect(179, 82, 2, 2);
		
		// stripes on lower part of boss
		drawLineNoAliasing(160, 62, 167, 78, 2, 2, "rgb(95, 159, 255)");
		drawLineNoAliasing(175, 59, 184, 79, 2, 2, "rgb(95, 159, 255)");
		drawLineNoAliasing(192, 60, 200, 77, 2, 2, "rgb(95, 159, 255)");
		
		// dots on lower part of boss
		context.fillStyle = "rgb(255, 195, 35)";
		context.fillRect(155, 69, 4, 2);
		context.fillRect(156, 68, 2, 4);
		
		context.fillRect(170, 69, 4, 2);
		context.fillRect(171, 68, 2, 4);
		
		context.fillRect(186, 69, 4, 2);
		context.fillRect(187, 68, 2, 4);
		
		context.fillRect(201, 69, 4, 2);
		context.fillRect(202, 68, 2, 4);

		
		get_boss = context.getImageData(127, 15, alien_width, alien_height);
	}
	
	function move_boss() {
		let boss_step = 3;
		if (boss_power < 50) {
			boss_step = 4;
		}
		if (boss_power < 20) {
			boss_step = 5;
		}
		if (can_boss_move == false) {
			context.putImageData(get_boss, boss_pos_x, boss_pos_y);
		}
		if (can_boss_move == true) {
			context.putImageData(get_boss, boss_pos_x, boss_pos_y);
			if (direction_of_boss_move == "left") {
				boss_pos_x = boss_pos_x - boss_step
			}
			if (direction_of_boss_move == "right") {
				boss_pos_x = boss_pos_x + boss_step
			}
			if (boss_pos_x <= (canvas.width - (canvas.width-2) )) {
				direction_of_boss_move = "right"
			}
			if (boss_pos_x >= (canvas.width -2) - alien_width - 1 ) {
				direction_of_boss_move = "left"
			}
		}
	}
	
	function boss_collision() {
		if (boss_pos_x <= 6) {
			boss_pos_x = 6;
		}
		if (boss_pos_x >= (canvas.width - alien_width) - 6 ) {
			boss_pos_x = (canvas.width - alien_width) - 6;
		}
	}
	
	function draw_boss_bullets() {
		boss_bullet_delay_arr.push(1);
		if (boss_bullet_delay_arr.length > 10 && max_boss_bullets > 0) { 
			max_boss_bullets -= 1;
			
			context.beginPath();
			context.moveTo(boss_pos_x + (alien_width / 2), (boss_pos_y + alien_height) - 15); 
			context.lineTo(boss_pos_x + (alien_width / 2), ((boss_pos_y + alien_height) - 15) + bullet_height);
			
			context.moveTo(boss_pos_x + 16, boss_pos_y + alien_height); 
			context.lineTo(boss_pos_x + 16, (boss_pos_y + alien_height) + bullet_height);
			
			context.moveTo((boss_pos_x + alien_width) - 16, boss_pos_y + alien_height); 
			context.lineTo((boss_pos_x + alien_width) - 16, (boss_pos_y + alien_height) + bullet_height);
			
			context.lineWidth = bullet_width;
			context.strokeStyle = "rgb(250, 250, 250)";
			context.stroke();
			
			let boss_bullet_width = 2;
			
			let boss_bullet_pos_x = boss_pos_x + (alien_width / 2) -1;
			let boss_bullet_pos_y = (boss_pos_y + alien_height) - 15;
			
			let boss_left_bullet_pos_x = boss_pos_x + 16 -1
			let boss_left_bullet_pos_y = boss_pos_y + alien_height
			
			let boss_right_bullet_pos_x = (boss_pos_x + alien_width) - 16 -1
			let boss_right_bullet_pos_y = boss_pos_y + alien_height
				
			let get_boss_bullet = context.getImageData(boss_bullet_pos_x, boss_bullet_pos_y, boss_bullet_width, bullet_height);
			let get_left_boss_bullet = context.getImageData(boss_left_bullet_pos_x, boss_left_bullet_pos_y, boss_bullet_width, bullet_height);
			let get_right_boss_bullet = context.getImageData(boss_right_bullet_pos_x, boss_right_bullet_pos_y, boss_bullet_width, bullet_height);
			
			all_boss_bullets.push([get_boss_bullet, boss_bullet_pos_x, boss_bullet_pos_y]);
			all_boss_bullets.push([get_left_boss_bullet, boss_left_bullet_pos_x, boss_left_bullet_pos_y]);
			all_boss_bullets.push([get_right_boss_bullet, boss_right_bullet_pos_x, boss_right_bullet_pos_y]);
			
			boss_bullet_delay_arr.splice(0, boss_bullet_delay_arr.length);
			
			//enemy_shooting_sound(190);
			new_sound(cont1, "sine", 190, 100, 0.001, 1, 1);
		}
	}
	
	function move_boss_bullet() {
		const bullet_step = 3;
		for (i=0; i < all_boss_bullets.length; i++) {
			context.putImageData(all_boss_bullets[i][0], all_boss_bullets[i][1], all_boss_bullets[i][2] + bullet_step);
			all_boss_bullets[i][2] = all_boss_bullets[i][2] + bullet_step;
		}
	}
	
	function boss_bullets_collision() {
		for (i = 0; i < all_boss_bullets.length; i++) {
			if ((all_boss_bullets[i][2] + bullet_height) >= ship_position_y && ( all_boss_bullets[i][1] >= ship_position_x && (all_boss_bullets[i][1]) <= ship_position_x + ship_width)) {
				refresh_game();
				return;
			}
			if ((all_boss_bullets[i][2] + bullet_height) > canvas.height - 5 ) {
				all_boss_bullets.splice(i, 1);
				return;
			}
		}
	}
	
	function stop_boss() {
		boss_stop_moving -= 1;
		if (boss_stop_moving <= 0) {
			boss_stop_moving = 0;
			can_boss_move = false;
			can_boss_shoot = true;
			if(max_boss_bullets == 0) {
				can_boss_move = true;
			}
			if(all_boss_bullets.length == max_boss_bullets) {
				
				can_boss_shoot = false;
				max_boss_bullets = 15;
				boss_stop_moving = 250;
			}
		}
	}
	
	// przeszkoda
	function draw_obstacle() {
		
		let obstacle = [];
		// [x1, y1, x2, y2, rgb, obstacle_pos_x, obstacle_pos_y]
		let first_line = [5, 210, 30, 210, "rgb(250, 250, 250)", canvas.width -2, 120];
		let second_line = [5, 220, 20, 220, "rgb(255, 195, 35)", canvas.width -10, 150];
		let thrid_line = [5, 230, 15, 230, "rgb(250, 250, 250)", canvas.width -20, 180];
		obstacle.push(first_line, second_line, thrid_line);
		
		for (i=0; i < obstacle.length; i++) {
			context.beginPath();
			context.moveTo(obstacle[i][0], obstacle[i][1]); 
			context.lineTo(obstacle[i][2], obstacle[i][3]);
			context.lineWidth = 5;
			context.strokeStyle = obstacle[i][4];
			context.stroke();
			
			let get_obstacle = context.getImageData(obstacle[i][0], obstacle[i][1]-2, Math.abs(obstacle[i][2]-obstacle[i][0]), 5);
			//console.log("dlugosc: ", Math.abs(obstacle[i][2]-obstacle[i][0]))
			three_obstacles_lines.push([get_obstacle, Math.abs(obstacle[i][2]-obstacle[i][0]), 5]);
		}
	}
	
	function push_obstacles() {
		if (boss_power <= 100) {
			all_obstacles.push([three_obstacles_lines[0][0], canvas.width -2, 120, "white"]);
		}
		if (boss_power <= 85) {
			all_obstacles.push([three_obstacles_lines[1][0], canvas.width -10, 150, "orange"]);
		}
		if (boss_power <= 70) {
			all_obstacles.push([three_obstacles_lines[2][0], canvas.width -20, 180, "white"]);
		} 
	}
	
	function move_obstacles() {
		const obstacle_step = 2;
		for (i=0; i < all_obstacles.length; i++) {
			context.putImageData(all_obstacles[i][0], all_obstacles[i][1], all_obstacles[i][2]);
			all_obstacles[i][1] = all_obstacles[i][1] - obstacle_step;
			//console.log("three_obstacles_lines[0][2]", three_obstacles_lines[0][2])
			if (all_obstacles[i][1] + three_obstacles_lines[0][1] < 2) {
				all_obstacles.splice(i, 1);
				//console.log("tesssssst")
			}
		}
		//console.log("all_obstacles ", all_obstacles.length)
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
	
	function new_sound(contx, type, freq, volume, time, mute, stopTime) {
		let oscillator = contx.createOscillator();
		let gain = contx.createGain();
		oscillator.connect(gain);
		gain.connect(contx.destination);
			
		oscillator.type = type;
		oscillator.frequency.value = freq;
			
		let now = contx.currentTime;
		gain.gain.setValueAtTime(volume, now);
		gain.gain.exponentialRampToValueAtTime(time, now + mute);
		oscillator.start(now);
		oscillator.stop(now + stopTime);
	}
	
	//new_sound(cont4, "sawtooth", 200, 100, 0.11, 0.1, 0.1)
	
	function life_star_catch_sound(freq2) {
		let oscillator = cont3.createOscillator();
		let gain = cont3.createGain();
		oscillator.connect(gain);
		gain.connect(cont3.destination);
			
		oscillator.type = "sine";
		oscillator.frequency.value = freq2;
			
		let now = cont3.currentTime;
		gain.gain.setValueAtTime(100, now);
		gain.gain.exponentialRampToValueAtTime(0.001, now + 1);
		
		oscillator.start(now);
		oscillator.stop(now + 1);
		
		oscillator.frequency.setValueAtTime(freq2+100, cont3.currentTime + 0.15);
	}
	
	function change_level_sound(text) {
		//let now = cont.currentTime,
		let osc = cont.createOscillator(),
		gain = cont.createGain();
			
		osc.connect(gain);
		gain.connect(cont.destination);
			position = 0,
			scale = {
				f: 698.46,
				c: 523.25, 
				l: 130.81,
				m: 123.47,
				o: 90.00
			}
			
			if (text == "change-level") {
				song = "cccf-cf--";
			}
			if (text == "lost-life") {
				song = "lmo--";
			}
			//song = "cccf-cf--";

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
		level += 1; 
		what_to_refresh();
		refresh = true;
		refresh_delay();
		change_level_delay = 100;
		console.log("level ", level);	
	}
	
	function show_next_level_info() {
			
		draw_text(6, "", "N e x t  L e v e l :  ", level, 100, 170, "bold 16px Arial", "left", "rgb(255,0,0)", 16);
		
		context.putImageData(end_screen_text[6], 100, 170);
	}
	
	function show_lost_life_info() {
			
		draw_text(7, "", "Y o u  l o s t  l i f e  : ( ", "", 100, 170, "bold 16px Arial", "left", "rgb(255,0,0)", 16);
		
		context.putImageData(end_screen_text[7], 100, 170);
	}
	
	function show_bonus_level_info() {
		draw_text(8, "", "B o n u s   L e v e l  !  ", "", 100, 170, "bold 16px Arial", "left", "rgb(255,0,0)", 16);
		
		context.putImageData(end_screen_text[8], 100, 170);
	}
	
	function refresh_game() {
		refresh = true;
		if (life_quantity == 0) {
			end_game = true;
		}
		if (life_quantity > 0) {
			lost_life_refresh = true;
			if (!(level == 8 && secret_level == true)) {
				life_quantity -= 1;
				score -= ( (((brick_col*brick_row) - all_bricks.length)*10) + (catched_stars.length*200));
			}
			//life_quantity -= 1;
			secret_level = false;
			//console.log(score)
			
			what_to_refresh();
			refresh_delay();
			//can_shoot = true;
			//console.log("crash");
		}
	}
	
	function what_to_refresh() {
		can_change_level = false;
		is_brick_moving = false;
		is_arrow_visible = false; 
		is_plus_two_visible = false;
		heart_visible = false;
		if (slow_down == true) {
			slow_down = false;
			is_slow_down_visible = false;
			slow_down_time = 150;
			interval_delay = 5;
		}
		if (turbo_shooting == true) {
			turbo_shooting = false;
			turbo_shooting_delay = 450;
		}
		hearts_quantity.splice(0, hearts_quantity.length);
		all_bullets.splice(0, all_bullets.length);
		all_bricks.splice(0, all_bricks.length);
		all_virtual_bricks.splice(0 , all_virtual_bricks.length);
		all_enemy_bullets.splice(0, all_enemy_bullets.length);
		enemy_quantity.splice(0, enemy_quantity.length);
		bullets_counts.splice(0, bullets_counts.length);
		catched_stars.splice(0, catched_stars.length);
		star_icon_quantity.splice(0, star_icon_quantity.length);
		color = "orange";
		yellow_bricks = 0;
		green_bricks = 0;
		
		//if(background_delay > 0) {
		if(white_background == true) {
			space_ship = space_ship_blue;
			background_delay = 100;
			white_background = false;
			const ship_data = space_ship; 
				for (let m=0; m < ship_data.data.length; m += 4) {
						if (ship_data.data[m] === 251) {
							ship_data.data[m] = 6;
						}
						if (ship_data.data[m+1] === 251) {
							ship_data.data[m+1] = 0;
						}
						if (ship_data.data[m+2] === 251) {
							ship_data.data[m+2] = 135;
						}
					} 
						
			space_ship = ship_data 
			//console.log("odswiezylo sie")
		} 
		
		if (level == 10) {
			turbo_shooting = true;
			can_boss_move = true;
			can_boss_shoot = false;
			max_boss_bullets = 15;
			boss_stop_moving = 250;
			all_boss_bullets.splice(0, all_boss_bullets.length);
			change_level_delay = 100;
		}

	}
	
	function refresh_delay() {
		//console.log("secret_level ", secret_level)
		can_shoot = false;
		show_info();
		//refresh_delay_time -= 1 
		if (change_level_delay == 0) {			
			
			if (level == 1) {
				draw_virtual_bricks(70, 15)
			}
			if (level == 2) {
				brick_col = 15;
				brick_row = 3;
				//green_bricks = 8;
				yellow_bricks = 8;
				surprise_bricks_quantity = [6, 1, 7];
				draw_virtual_bricks(30, 5);
			}
			if (level == 3) {
				brick_col = 15;
				brick_row = 4;
				yellow_bricks = 0;
				surprise_bricks_quantity = [6, 1, 3, 2, 7];
				draw_virtual_bricks(30, 5);
			}
			if (level == 4) {
				brick_col = 15;
				brick_row = 4;
				yellow_bricks = 10;
				green_bricks = 0;
				surprise_bricks_quantity = [6, 1, 3, 5, 1, 4, 7];
				draw_virtual_bricks(30, 5);
			}
			if (level == 5) {
				brick_col = 15;
				brick_row = 6;
				yellow_bricks = 20;
				green_bricks = 0;
				surprise_bricks_quantity = [6, 1, 3, 5, 1, 1, 2, 7];
				draw_virtual_bricks(30, 5);
			}
			if (level == 6) {
				brick_col = 15;
				brick_row = 7;
				yellow_bricks = 40;
				green_bricks = 0;
				surprise_bricks_quantity = [6, 1, 3, 5, 1, 4, 1, 1, 4, 7, 7, 8];
				draw_virtual_bricks(30, 5);
			}
			if (level == 7) {
				brick_col = 15;
				brick_row = 8;
				green_bricks = 0;
				yellow_bricks = (brick_col * brick_row);
				surprise_bricks_quantity = [6, 1, 3, 5, 1, 4, 1, 1, 4, 1, 2, 7, 7, 8];
				draw_virtual_bricks(30, 5);
			}
			if (level == 8 && secret_level == true) {
				brick_col = 15;
				brick_row = 8;
				green_bricks = 0;
				yellow_bricks = (brick_col * brick_row);
				surprise_bricks_quantity = [8, 2, 3, 7, 1, 7, 1, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7];
				//surprise_bricks_quantity = [1,7,1,7,1,7,1,7]
				draw_virtual_bricks(30, 5);
				one_time_sound = 1;
			}
			if (level == 8 && secret_level == false) {
				brick_col = 15;
				brick_row = 8;
				green_bricks = 50;
				yellow_bricks = (brick_col * brick_row) - green_bricks;
				surprise_bricks_quantity = [6, 1, 3, 5, 1, 4, 1, 1, 4, 1, 7, 7, 7, 7, 8];
				draw_virtual_bricks(30, 5);
				one_time_sound = 0;
			}
			if (level == 9) {
				brick_col = 15;
				brick_row = 8;
				green_bricks = (brick_col * brick_row);
				yellow_bricks = 0;
				surprise_bricks_quantity = [6, 1, 3, 5, 1, 4, 1, 1, 4, 1, 2, 7, 7, 7, 7, 7, 7, 8];
				draw_virtual_bricks(30, 5);
			}
			if (level == 10) {
				turbo_shooting = true;
				brick_col = 0;
				brick_row = 0;
				green_bricks = 0;
				yellow_bricks = 0;
				surprise_bricks_quantity = [];
				move_boss();
				refresh = false;
				change_level_refresh = false;
				return;
			}
			draw_all_bricks();
			change_level_delay = 100;
			refresh = false;
			can_change_level = true;
			can_shoot = true;
			change_level_refresh = false;
			lost_life_refresh = false;
		}
	}
	
	function show_info() {
		change_level_delay -= 1;
		if (change_level_delay === 98 && change_level_refresh == true) {
			change_level_sound("change-level");
		}	
		if (change_level_delay < 99 && change_level_delay > 0 && change_level_refresh == true) {
			if (level == 8 && secret_level == true) {
				show_bonus_level_info();
				return;
			}
			show_next_level_info();
			return;
		}
		if (change_level_delay === 98 && lost_life_refresh == true) {
			console.log("secret_level ", secret_level)
			if (one_time_sound !== 1) {
				change_level_sound("lost-life");
			}
			if (one_time_sound == 1) {
				change_level_sound("change-level");
			}
		}
		if (change_level_delay < 99 && change_level_delay > 0 && lost_life_refresh == true) {
			if (one_time_sound !== 1) {
				show_lost_life_info();
			}
			if (one_time_sound == 1) {
				show_next_level_info();
			}
			return;
		}
	}
	
	function game_over() {
		hearts_quantity.splice(0, hearts_quantity.length);
		all_bricks.splice(0, all_bricks.length);
		all_enemy_bullets.splice(0, all_enemy_bullets.length);
		
		context2.font = "bold 16px Arial";
		context2.textAlign = "left";
		context2.textBaseline = "middle";
		context2.fillStyle = "rgb(255,0,0)";
		context2.fillText("G a m e  O v e r ", 110 , 170);
		
		context2.font = "bold 12px Arial";
		context2.textAlign = "left";
		context2.textBaseline = "middle";
		context2.fillStyle = "rgb(255,0,0)";
		context2.fillText("Y o u r  s c o r e: " + score, 110 , 210);
		
		context2.fillText("Y o u  l o s t ! ", 130 , 130);
		
		let get_text = context2.getImageData(110, 100-7, 200, 200);
		
		for (let m=0; m < get_text.data.length; m += 4) {
							if (get_text.data[m] !== 255 && get_text.data[m] !== 6) {
								get_text.data[m] = 255;
							}
							if (get_text.data[m+1] !== 0) {
								get_text.data[m+1] = 0;
							}
							if (get_text.data[m+2] !== 0 && get_text.data[m+2] !== 135) {
								get_text.data[m+2] = 0;
							}
		}
		context.putImageData(get_text, 110, 100-7);
	}
	
	function win_game() {
		if(boss_power <= 0) {
			boss_power = 0;
			boss_power_line = 0;
			end_screen();
			return;
		}
	}
	
	function end_screen() {		
		draw_text(9, "", "Y o u  w o n ! ", "", 130, 70, "bold 16px Arial", "left", "rgb(255,0,0)", 16);
		draw_text(10, "", "Y o u r  s c o r e :  ", score, 80, 100, "bold 16px Arial", "left", "rgb(255,0,0)", 16);
		
		context.putImageData(end_screen_text[9], 130, 70);
		context.putImageData(end_screen_text[10], 80, 100);
	}

	function draw_author(text, posX , posY, font, align, rgb, text_height) {
		draw_text(11, "", "G r a p h i c :   J o a n n a   L i g e n z a ", "", 80, 150, "bold 12px Arial", "left", "rgb(255,0,0)", 12);
		draw_text(12, "", "S o u n d s :   J o a n n a   L i g e n z a ", "", 80, 180, "bold 12px Arial", "left", "rgb(255,0,0)", 12);
		draw_text(13, "", "R e a l i s a t i o n :   J o a n n a   L i g e n z a ", "", 75, 210, "bold 12px Arial", "left", "rgb(255,0,0)", 12);
		draw_text(14, "", "I d e a s  a n d  i n s p i r a t i o n s : ", "", 75, 240, "bold 12px Arial", "left", "rgb(255,0,0)", 12);
		draw_text(15, "", "J o a n n a  L i g e n z a ,  P a w e l  L i g e n z a", "", 5, 270, "bold 12px Arial", "left", "rgb(255,0,0)", 12);
		draw_text(16, "", "B u g s  f i x i n g :  J o a n n a   L i g e n z a", "", 75, 290, "bold 12px Arial", "left", "rgb(255,0,0)", 12);
		draw_text(17, "", "T e s t i n g :  M a t i  L i g e n z a , P a w e l  L i g e n z a", "", 10, 310, "bold 12px Arial", "left", "rgb(255,0,0)", 12);
		draw_text(18, "", "P r e s s  F 5  t o  p l a y  a g a i n", "", 80, 340, "bold small-caps 12px Arial", "left", "rgb(255,0,0)", 12);
	}
	
	function move_author() {
		context.putImageData(end_screen_text[11], 70, where_to_draw);
		context.putImageData(end_screen_text[12], 75, where_to_draw+40);
		context.putImageData(end_screen_text[13], 55, where_to_draw+80);
		context.putImageData(end_screen_text[14], 75, where_to_draw+120);
		context.putImageData(end_screen_text[15], 45, where_to_draw+155);
		context.putImageData(end_screen_text[16], 75, where_to_draw+195);
		context.putImageData(end_screen_text[17],10, where_to_draw+235);
		context.putImageData(end_screen_text[18], 80, where_to_draw+320);
		where_to_draw = where_to_draw - 1;
	}
	
	function blue_background() {
		context.fillStyle = "rgb(255, 195, 35)";
		context.fillRect(0,0, canvas.width, 2);
		context.fillRect(0,canvas.height-2, canvas.width, 2);
		context.fillStyle = "rgb(6, 0, 135)";
		context.fillRect(2,2, canvas.width - 4, 135);
	}
	
	function author() {
		console.log("tesssssst")
		context.clearRect(0, 0, canvas.width, canvas.height);
		interval_delay = 30;
		draw_frame();
		draw_author();
		move_author();
		blue_background();
		win_game();
		
		//if (who_made_it[0][2] < 140 ) {
		if (where_to_draw+320 < 150 ) {
			cancelAnimationFrame(animation2);
			//reload_game();
			return;
		}
		
		setTimeout(function() {
			animation2 = requestAnimationFrame(author); 
		}, interval_delay);
	}
	
/*	function reload_game() {
		if (which_key_pressed == "13") {
			location.reload();
		}
	} */

	
	var t0 = performance.now();
	
	function loop() {
		//console.log("enemy_quantity ", enemy_quantity)
		//console.log("all_virtual_bricks ", all_virtual_bricks)
		//console.log("enemy_quantity ", enemy_quantity.length)
		//console.log("end_screen_text ", end_screen_text)
		
		context.clearRect(0, 0, canvas.width, canvas.height);
		draw_frame();
		//draw_space();
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
		
		if (level == 10 && change_level_delay == 0) {
			draw_boss_power();
			draw_boss_power_line();
			obstacles_delay -= 1;
			boss_star_delay -=1;
			if(boss_power <= 0) {
				//win_game();
				score = score + life_quantity*500*10;
				draw_author();
				author();
				cancelAnimationFrame(animation);
				return;
			}
			if(obstacles_delay == 0) {
				//draw_obstacle();
				push_obstacles();
				obstacles_delay = 30;
			} 
			if (boss_star_delay == 0 && how_many_stars_in_boss > 0) {
				how_many_stars_in_boss -= 1;
				let random_star = Math.floor(Math.random() * (canvas.width-15));
				star_icon_quantity.push([random_star, 1]);
				boss_star_delay = 700;
			}
			move_boss();
			stop_boss();
			move_obstacles();
			if (can_boss_shoot == true) {
				draw_boss_bullets();
				move_boss_bullet();
			}
			if (all_boss_bullets.length > 0) {
				boss_bullets_collision();
			}
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
		if (star_icon_quantity.length > 0) {
			move_star_icon();
			star_icon_collision();
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
			refresh_delay();
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
		if (turbo_shooting == true && level < 10) {
			turbo_shooting_delay -= 1;
			show_lightning_icon();
			if (turbo_shooting_delay == 0) {
				turbo_shooting = false;
				turbo_shooting_delay = 450;
			}
		}
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
		draw_boss();
		draw_virtual_bricks(70, 15);
		draw_all_bricks();
		draw_space_ship();
		draw_enemy();
		draw_star_icon();
		draw_hearts();
		get_heart();
		draw_arrow();
		draw_slow_down_icon();
		draw_plus_two_icon();
		draw_lightning_icon();
		move_bricks();
		draw_obstacle();
		loop();
	}
	
	

	//console.log("all_bricks ", all_bricks)
	var t1 = performance.now();
	console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.")  
	
	
	
	
	function draw_line(x1,y1,x2,y2){
		data = [];
		dlugosc_x = Math.abs(x2-x1);
		dlugosc_y = Math.abs(y2-y1);
		a = dlugosc_y/dlugosc_x;
		
		if (dlugosc_x>= dlugosc_y) ilosc_punktow = dlugosc_x;
		if (dlugosc_x< dlugosc_y) ilosc_punktow = dlugosc_y;
		
		if (x1 < x2) {kierunek_x=1} else {kierunek_x=-1};
		if (y1 < y2) {kierunek_y=1} else {kierunek_y=-1};
		
		
		for(i=0;i<=ilosc_punktow;i++){
		
			x=i;y=i;
			if (a>1) {y=i;x=parseInt((y)/(a))};
			if (a<1) {x=i;y=parseInt(a*(x))};
			
			real_x = Math.abs(x+(x1*kierunek_x));
			real_y = Math.abs(y+(y1*kierunek_y));

			context.fillRect(real_x,real_y,1,1);
	
			let point = [real_x,real_y];
			data.push(point);
	
		}
		//if (!(real_x===x2)) console.log("Error X")
		//if (!(real_y===y2)) console.log("Error Y")
	
	return data;
	
	}
	
	
	function fill_space(p1,p2){
		p1.forEach(function(points1){
			p2.forEach(function(points2){
				x1 = points1[0];
				y1 = points1[1];
				x2 = points2[0];
				y2 = points2[1];
				if (y1===y2) {
					context.fillRect(x1,y1,x2-x1,1)
				}
			});
		});

	}	

	function draw_triangle(x1,y1,x2,y2,x3,y3,fill){
		p1 = draw_line(x1,y1,x2,y2);
		p2 = draw_line(x1,y1,x3,y3);
		p3 = draw_line(x2,y2,x3,y3);
		
		if (!fill){return};

			fill_space(p1,p2);
			fill_space(p1,p3);
			fill_space(p2,p3);
	}
	
	function draw_square(x1,y1,x2,y2,x3,y3,x4,y4,fill){
		
		draw_line(x1,y1,x2,y2);
		draw_line(x1,y1,x3,y3);
		draw_line(x2,y2,x4,y4);
		draw_line(x3,y3,x4,y4);
		if (!fill){return};
		draw_triangle(x1,y1,x2,y2,x3,y3,fill)
		draw_triangle(x2,y2,x3,y3,x4,y4,fill)
		
	}
	    
})