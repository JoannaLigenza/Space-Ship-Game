document.addEventListener('DOMContentLoaded', function() {
	
	const canvas = document.getElementById("canvas");
	const context = canvas.getContext("2d");
	function setpixelated(context){
    context['imageSmoothingEnabled'] = false;       /* standard */
    context['mozImageSmoothingEnabled'] = false;    /* Firefox */
    context['oImageSmoothingEnabled'] = false;      /* Opera */
    context['webkitImageSmoothingEnabled'] = false; /* Safari */
    context['msImageSmoothingEnabled'] = false;     /* IE */
	}
	context.imageSmoothingEnabled= false;
	setpixelated(canvas.getContext('2d'));
	const cont = new AudioContext();
	const cont1 = new AudioContext();
	const cont2 = new AudioContext();
	const cont3 = new AudioContext();
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
	const ship_width = 70;
	const ship_height = 77;
	let enemy_position_x = [];
	let enemy_position_y = [];
	let space_ship = "";
	let which_key_pressed = "";
	let is_brick_moving = false;
	const brick_moving_delay = 10;
	let brick_moving_delay_arr = [];
	let surprise_bricks_quantity = [6, 8];
	const all_surprise_bricks = [];
	let color = "orange";
	let yellow_bricks = 0;
	let green_bricks = 0;
	let move = false;
	let one_shoot = false;
	let can_shoot = true;
	let enemy_quantity = [];
	const bullets_counts = [];
	let bullet_limit = 20;
	const bullet_width = 2;
	const bullet_height = 10;
	let get_bullets = "";
	let get_enemy = "";
	let all_bullets = [];
	let all_additional_bullets = [];
	let turbo_shooting = false;
	let turbo_shooting_delay = 450;
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
	let get_lightning_icon = "";
	let lightning_icon_position = [];
	let slow_down = false;
	let slow_down_time = 150;
	let get_star_icon = "";
	let catched_stars = [];
	let star_icon_quantity = [];
	let get_boss = "";
	let boss_pos_x = 140;
	let boss_pos_y = 15;
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
	let boss_power_line = 190;
	let boss_power = 100;
	let all_obstacles = [];
	let obstacles_delay = 30;
	let get_obstacle = "";
	let get_2_obstacle = "";
	let get_3_obstacle = "";
	let obstacle_pos_x = "";
	let obstacle_pos_y = "";
	let obstacle_2_pos_x = "";
	let obstacle_2_pos_y = "";
	let obstacle_3_pos_x = "";
	let obstacle_3_pos_y = "";
	let first_obstacle_width = "";
	let score = 0;
	let level = 1;
	let change_level_delay = 30;
	let can_change_level = true;
	let interval_delay = 5;
	let refresh = false;
	let refresh_delay_time = 10;
	let animation = "";
	let end_game = false;
	let who_made_it = [["Graphic: ", 110, 400], ["Sounds: ",110, 450], ["Realisation: ", 105, 500], ["Ideas and inspirations: ",20, 550], ["Press F5 to play again", 110, 620]]

	
	function draw_frame() {
		context.fillStyle = "rgb(6, 0, 135)";
		context.fillRect(2,2, canvas.width-4, canvas.height-4 );	
	}
	
	function start_screen() {
		// ->>> CLT function
		refresh_color_data();
		// ->>> end CLT function
		draw_frame();
		context.font = "bold 16px Arial";
		context.textAlign = "left";
		context.textBaseline = "middle";
		context.fillStyle = "rgb(255,0,0)";
		context.fillText("Press enter to play", 100 , 170);
		//draw_boss();
		//draw_space_ship2();
		draw_space_ship3();
		loop1();
	}
	
	function loop1() {
		//context.clearRect(0, 0, canvas.width, canvas.height);
		
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
		var pixel_arr = []
		for (let i=0; i<= pixel_data.length-4;i=i+4){
			pixel_arr.push((pixel_data[i]+","+pixel_data[i+1]+","+pixel_data[i+2]+","+pixel_data[i+3]))
		}
		const colors_unique_count = [...new Set(pixel_arr)]; 
		return colors_unique_count.length;
	}

	function refresh_color_data()
	{
		x = 1;  // 5 Seconds
		var perf0 = performance.now();
		let all_colors = count_colors_opt(360,400)+1;
		var perf1 = performance.now();
		console.log("Colors on screen:" + all_colors + " take: " + parseInt(perf1 - perf0) + " ms" );
		setTimeout(refresh_color_data, x*1000);
	}
	//CLT -> end counting colors on screen
	
/*	function draw_space() {
		for (i=0; i < 100; i++) {
			const random_x = Math.floor(Math.random() * canvas.width);
			const random_y = Math.floor(Math.random() * canvas.height);
			context.beginPath();
			context.fillStyle = "rgb(250, 250, 250)";
			//context.moveTo(50,340); 
			context.arc(random_x, random_y, 1, radianAngle(0), radianAngle(360));
			context.fill();
		}
	} */
	
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
		//for (i = positionX + 1 ; i <= (positionX + brick_width) -1 ; i++) {
		//	for (j = positionY + 1; j <= (positionY + brick_height) - 1; j++) {
				if (color == "orange") { 
					context.fillStyle = "rgb(232, 169, 0)";
					//context.fillStyle = "rgb(246, 133, 0)";
					context.fillRect(positionX + 1, positionY + 1, brick_width - 1, brick_height - 1);
				}
				if (color == "yellow") { 
					context.fillStyle = "rgb(240, 240, 34)";
					//context.fillStyle = "rgb(255, 217, 0)";
					context.fillRect(positionX + 1, positionY + 1, brick_width - 1, brick_height - 1);
				}
				if (color == "green") { 
					//context.fillStyle = "rgb(15, 120, 5)";
					context.fillStyle = "rgb(123, 190, 35)";
					context.fillRect(positionX + 1, positionY + 1, brick_width - 1, brick_height - 1);
				}
				//context.fillRect(positionX + 1, positionY + 1, brick_width - 1, brick_height - 1);
		//	}
		//}
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
		context.moveTo(positionX + (brick_width -1), positionY + 1);
		context.lineTo(positionX + (brick_width -1 - 3), positionY + 1 + 3);
		context.lineTo(positionX + 1 + 3, positionY + 1 + 3);												 
		context.lineTo(positionX + 1 + 3, positionY + (brick_height - 1 - 3));					   
		context.lineTo(positionX + 1, positionY + (brick_height - 1));
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
			//brick_pattern2(surprise_brick_positionX + (brick_width / 2), surprise_brick_positionY + (brick_height / 2));
			
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
						
					enemy_shooting_sound(190);
				}
				if (enemy_quantity[i][0] == 0) {
					enemy_quantity[i][1] = false;
				}
				if (enemy_quantity[i][0] == 0 && all_enemy_bullets.length == 0) {
					enemy_quantity.splice(0, enemy_quantity.splice.length); 
					return;
				}
				//enemy_shooting_sound(190);
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
			context.fillStyle = "rgb(250, 250, 250)";
			context.fillRect(2,2, canvas.width-4, canvas.height-4 );
			
			const ship_data = space_ship; 
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
		if(background_delay_arr.length > background_delay) {
			background_delay_arr.splice(0, background_delay_arr.length);
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
	
	function draw_star_icon() {
		context.beginPath();
		context.moveTo(341,303); 
		context.lineTo(340,307);
		context.lineTo(339,306);
		context.lineTo(340,308);
		context.lineTo(339,310);
		context.lineTo(340,309);
		context.lineTo(341,313);
		context.lineTo(342,309);
		context.lineTo(343,310);
		context.lineTo(342,308); 
		context.lineTo(343,306);
		context.lineTo(342,307);
		context.closePath(); 
		context.lineWidth = 1;
		context.strokeStyle = "rgb(240, 240, 34)";
		context.lineWidth = bullet_width;
		context.stroke();
		
		get_star_icon = context.getImageData(335, 300, 12, 16);
	}
	
	function move_star_icon() {
		const star_icon_step = 3;
		for (i=0; i < star_icon_quantity.length; i++) {
			context.putImageData(get_star_icon, star_icon_quantity[i][0] + 4, star_icon_quantity[i][1]);
			star_icon_quantity[i][1] = star_icon_quantity[i][1] + star_icon_step
		}
	}
	
	function star_icon_collision() {
		console.log("collision")
		if (star_icon_quantity.length > 0) {	
			for (i = 0; i < star_icon_quantity.length; i++) {
			//	if (heart_position_y + 8 > ship_position_y && heart_position_x > ship_position_x && heart_position_x < ship_position_x + ship_width) {
				if (star_icon_quantity[i][1] + 16 > ship_position_y && star_icon_quantity[i][0] > ship_position_x && star_icon_quantity[i][0] + 12 < ship_position_x + ship_width) {
					star_icon_quantity.splice(i, 1);
					catched_stars.push(1);
					score += 200;
					life_star_catch_sound(660);
					return;
				}
				if (star_icon_quantity[i][1] + 16  > canvas.height - 5 ) {
					star_icon_quantity.splice(i, 1);
					return;
				}
			}
		}
	} 
	
	function draw_lightning_icon() {
		context.beginPath();
		context.moveTo(342,282); 
		context.lineTo(335,295);
		context.lineTo(341,291);
		context.lineTo(338,300);
		context.lineTo(344,288);
		context.lineTo(339,291);
		context.closePath(); 
		context.lineWidth = 1;
		context.fillStyle = "rgb(240, 240, 34)";
		context.fill();
		get_lightning_icon = context.getImageData(335, 282, 9, 18);
	}
	
	function show_lightning_icon() {
		context.putImageData(get_lightning_icon, lightning_icon_position[0] + 5, lightning_icon_position[1]);
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
		if (ship_position_x >= (canvas.width - ship_width) - 6 ) {
			ship_position_x = (canvas.width - ship_width) - 6;
		}
	}
	
	
	function draw_bullet() {
		if (which_key_pressed == "32" && one_shoot == true && can_shoot == true) { 
			
			context.beginPath();
			context.moveTo(ship_position_x + (ship_width/2), ship_position_y - bullet_height); 
			context.lineTo(ship_position_x + (ship_width/2), ship_position_y);
			context.lineWidth = bullet_width;
			context.strokeStyle = "rgb(250, 250, 250)";
			context.stroke();
			
			bullets_counts.push(1);
			
			if (turbo_shooting == true) {
				draw_additional_bullets();     
			}
			
			one_shoot = false;
			
			ship_shooting_sound(60);

			get_bullet();
			
		}
	}
	
	function get_bullet() {
		let bullet_position_x = "";
		let bullet_position_y = "";
		let get_bullet = "";
		
		bullet_position_x = ship_position_x + (ship_width/2)-1;
		bullet_position_y = ship_position_y - bullet_height;
		get_bullet = context.getImageData(bullet_position_x, bullet_position_y, bullet_width, bullet_height);
		
		all_bullets.push([get_bullet, bullet_position_x, bullet_position_y]);
	}
	
	function draw_additional_bullets() {
		if (which_key_pressed == "32" && one_shoot == true && can_shoot == true) { 
			
			context.beginPath();
			context.moveTo(ship_position_x + 10, ship_position_y - bullet_height); 
			context.lineTo(ship_position_x + 10, ship_position_y);
			
			context.moveTo((ship_position_x + ship_width) - 10, ship_position_y - bullet_height); 
			context.lineTo((ship_position_x + ship_width) - 10, ship_position_y);
			
			context.lineWidth = bullet_width;
			context.strokeStyle = "rgb(250, 250, 250)";
			context.stroke();
			
			bullets_counts.push(1);
			//one_shoot = false;
			
			//ship_shooting_sound(60);

			add_1_bullet_position_x = ship_position_x + 10 -1;
			add_1_bullet_position_y = ship_position_y - bullet_height;
			get_1_bullet = context.getImageData(add_1_bullet_position_x, add_1_bullet_position_y, bullet_width, bullet_height);
			
			add_2_bullet_position_x = (ship_position_x + ship_width) - 10 -1;
			add_2_bullet_position_y = ship_position_y - bullet_height;
			get_2_bullet = context.getImageData(add_2_bullet_position_x, add_2_bullet_position_y, bullet_width, bullet_height);
		
			all_bullets.push([get_1_bullet, add_1_bullet_position_x, add_1_bullet_position_y]);
			all_bullets.push([get_2_bullet, add_2_bullet_position_x, add_2_bullet_position_y]);
			//all_additional_bullets.push(1,1);
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
					if (all_bullets[i][2] <= all_obstacles[k][2] && all_bullets[i][2] + bullet_height >= all_obstacles[k][2] && all_bullets[i][1] >= all_obstacles[k][1] && all_bullets[i][1] <= all_obstacles[k][1] + first_obstacle_width) {
						if(all_obstacles[k][3] == "orange") {
							all_obstacles.splice(k, 1);
							console.log("orange");
						}
						all_bullets.splice(i, 1);
						bullets_counts.splice(i, 1);	
						return;
					}
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
							
							if (yellow_brick_data.data[m] === 255) {
								yellow_brick_data.data[m] = 253;
							}
							if (yellow_brick_data.data[m+1] === 233) {
								yellow_brick_data.data[m+1] = 190;
							}
							if (yellow_brick_data.data[m+2] === 135) {
								yellow_brick_data.data[m+2] = 120;
							}
							
							if (yellow_brick_data.data[m] === 255) {
								yellow_brick_data.data[m] = 249;
							}
							if (yellow_brick_data.data[m+1] === 255) {
								yellow_brick_data.data[m+1] = 161;
							}
							if (yellow_brick_data.data[m+2] === 71) {
								yellow_brick_data.data[m+2] = 62;
							}
							
							if (yellow_brick_data.data[m] === 132) {
								yellow_brick_data.data[m] = 126;
							}
							if (yellow_brick_data.data[m+1] === 113) {
								yellow_brick_data.data[m+1] = 61;
							}
							if (yellow_brick_data.data[m+2] === 0) {
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
							
							if (green_brick_data.data[m] === 154) {
								green_brick_data.data[m] = 255;
							}
							if (green_brick_data.data[m+1] === 204) {
								green_brick_data.data[m+1] = 255;
							}
							if (green_brick_data.data[m+2] === 88) {
								green_brick_data.data[m+2] = 71;
							}
							
							if (green_brick_data.data[m] === 49) {
								green_brick_data.data[m] = 132;
							}
							if (green_brick_data.data[m+1] === 98) {
								green_brick_data.data[m+1] = 113;
							}
							if (green_brick_data.data[m+2] === 0) {
								green_brick_data.data[m+2] = 0;
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
	
	function draw_boss_power() {
		draw_text("", "Alien power: ", "", 5, 10, "bold 12px Arial", "left", "rgb(255,0,0)");
		draw_text("", boss_power , " %", 200 , 10, "bold 12px Arial", "left", "rgb(255,0,0)");
	}
	
	function draw_boss_power_line() {
		context.beginPath();
		context.strokeStyle = "rgb(255,0,0)";
		context.lineWidth = 3;
		context.moveTo(90, 11); 
		context.lineTo(boss_power_line, 11);
		context.stroke();
	}
	
	function draw_boss() {
		
		// left leg
		context.beginPath();
		context.strokeStyle = "rgb(162, 163, 164)";
		context.moveTo(164, 65); 
		context.lineTo(145, 55);
		context.lineTo(130, 70);
		context.lineTo(145, 90);
		context.lineWidth = 4;
		context.stroke();
		
		// right leg
		context.beginPath();
		context.strokeStyle = "rgb(162, 163, 164)";
		context.moveTo(200, 65); 
		context.lineTo(215, 55);
		context.lineTo(230, 70);
		context.lineTo(215, 90);
		context.lineWidth = 4;
		context.stroke();
		
		// circle on legs
		context.beginPath();
		context.fillStyle = "rgb(255, 195, 35)";
		context.moveTo(145, 55); 
		context.arc(145, 55, 3, radianAngle(0), radianAngle(360));
		context.moveTo(130, 70); 
		context.arc(130, 70, 3, radianAngle(0), radianAngle(360));
		
		context.moveTo(215, 55); 
		context.arc(215, 55, 3, radianAngle(0), radianAngle(360));
		context.moveTo(230, 70); 
		context.arc(230, 70, 3, radianAngle(0), radianAngle(360));
		context.fill();
		
		// left laser
		context.beginPath();
		context.fillStyle = "rgb(255,0,0)";
		context.moveTo(148, 86);
		context.lineTo(137, 86);
		context.lineTo(143, 99);
		context.closePath();
		context.fill();
		
		// right laser
		context.beginPath();
		context.fillStyle = "rgb(255,0,0)";
		context.moveTo(212, 86);
		context.lineTo(223, 86);
		context.lineTo(217, 99);
		context.closePath();
		context.fill();
		
		// upper part of boss - blue
		context.beginPath();
		context.fillStyle = "rgb(95, 159, 255)";
		context.moveTo(180,15);
		context.bezierCurveTo(160,25, 160,40, 160,70);
		context.lineTo(200, 70);
		context.bezierCurveTo(200,40, 200,25, 180,15);
		context.fill();
		
		// alien
		context.beginPath();
		context.fillStyle = "rgb(0, 103, 12)";
		context.moveTo(175,65);
		context.bezierCurveTo(150,20, 210,20, 185,65);
		context.fill();
		
		// alien eyes
		context.beginPath();
		context.fillStyle = "rgb(0, 0, 0)";
		context.moveTo(173,40);
		context.bezierCurveTo(174,36, 179,43, 180,45);
		context.bezierCurveTo(179,51, 174,45, 173,40);
		
		context.moveTo(188,40);
		context.bezierCurveTo(187,36, 182,43, 181,45);
		context.bezierCurveTo(182,51, 187,45, 188,40);
		context.fill();
		
		// lower part of boss
		context.beginPath();
		//context.fillStyle = "rgb(198, 198, 198)";
		context.fillStyle = "rgb(40, 98, 184)";
		context.moveTo(210,70);
		context.bezierCurveTo(210,55, 150,55, 150,70);
		context.bezierCurveTo(150,85, 210,85, 210,70);
		context.fill();
		
		// blue little laser under lower part of boss
		context.beginPath();
		context.strokeStyle = "rgb(95, 159, 255)";
		context.moveTo(180, 82);
		context.lineTo(180, 84);
		context.lineWidth = 2;
		context.stroke();
		
		// stripes on lower part of boss
		context.beginPath();
		context.strokeStyle = "rgb(95, 159, 255)";
		context.moveTo(160, 62);
		context.lineTo(168, 80);
		context.moveTo(175, 59);
		context.lineTo(185, 81);
		context.moveTo(192, 60);
		context.lineTo(200, 78);
		context.lineWidth = 2;
		context.stroke();
		
		// dots on lower part of boss
		context.beginPath();
		context.fillStyle = "rgb(255, 195, 35)";
		context.moveTo(157, 70); 
		context.arc(157, 70, 2, radianAngle(0), radianAngle(360));
		context.moveTo(172, 70); 
		context.arc(172, 70, 2, radianAngle(0), radianAngle(360));
		context.moveTo(188, 70); 
		context.arc(188, 70, 2, radianAngle(0), radianAngle(360));
		context.moveTo(203, 70); 
		context.arc(203, 70, 2, radianAngle(0), radianAngle(360));
		context.fill();
		
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
			
			enemy_shooting_sound(190);
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
		first_obstacle_width = 30;
		context.beginPath();
		context.moveTo(35, 210); 
		context.lineTo(5, 210);
		context.lineWidth = 5;
		context.strokeStyle = "rgb(250, 250, 250)";
		context.stroke();
		
		obstacle_pos_x = canvas.width -2
		obstacle_pos_y = 120

		get_obstacle = context.getImageData(5, 207, first_obstacle_width, 6);
		
		second_obstacle_width = 20;
		context.beginPath();
		context.moveTo(25, 220); 
		context.lineTo(5, 220);
		context.lineWidth = 5;
		context.strokeStyle = "rgb(255, 195, 35)";
		context.stroke();
		
		obstacle_2_pos_x = canvas.width -4
		obstacle_2_pos_y = 150

		get_2_obstacle = context.getImageData(5, 217, second_obstacle_width, 6);
		
		thrid_obstacle_width = 10;
		context.beginPath();
		context.moveTo(15, 230); 
		context.lineTo(5, 230);
		context.lineWidth = 5;
		context.strokeStyle = "rgb(250, 250, 250)";
		context.stroke();
		
		obstacle_3_pos_x = canvas.width 
		obstacle_3_pos_y = 180

		get_3_obstacle = context.getImageData(5, 227, thrid_obstacle_width, 6);
	}
	
	function push_obstacles() {
		if (boss_power <= 100) {
			all_obstacles.push([get_obstacle, obstacle_pos_x, obstacle_pos_y, "white"]);
		}
		if (boss_power <= 85) {
			all_obstacles.push([get_2_obstacle, obstacle_2_pos_x, obstacle_2_pos_y, "orange"]);
		}
		if (boss_power <= 70) {
			all_obstacles.push([get_3_obstacle, obstacle_3_pos_x, obstacle_3_pos_y, "white"]);
		}
	}
	
	function move_obstacles() {
		const obstacle_step = 2;
		for (i=0; i < all_obstacles.length; i++) {
			context.putImageData(all_obstacles[i][0], all_obstacles[i][1], all_obstacles[i][2]);
			all_obstacles[i][1] = all_obstacles[i][1] - obstacle_step;
			if (all_obstacles[i][1] + first_obstacle_width < 2) {
				all_obstacles.splice(i, 1);
			}
		}
		
	}
	
	function ship_bullets_bouncing() {
		
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
	
	function ship_shooting_sound(freq2) {
		//const cont2 = new AudioContext();
		let oscillator = cont2.createOscillator();
		let gain = cont2.createGain();
		oscillator.connect(gain);
		gain.connect(cont2.destination);
			
		oscillator.type = "sine";
		oscillator.frequency.value = freq2;
			
		let now = cont2.currentTime;
		gain.gain.setValueAtTime(100, now);
		gain.gain.exponentialRampToValueAtTime(0.001, now + 1);
		oscillator.start(now);
		oscillator.stop(now + 1);
	}
	
	function enemy_shooting_sound(freq2) {
		//const cont = new AudioContext();
		let oscillator = cont1.createOscillator();
		let gain = cont1.createGain();
		oscillator.connect(gain);
		gain.connect(cont1.destination);
			
		oscillator.type = "sine";
		oscillator.frequency.value = freq2;
			
		let now = cont1.currentTime;
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
			context.fillText("Next Level: " + (level+1), 120 , 170);
	}
	
	function refresh_game() {
		refresh = true;
		if (life_quantity == 0) {
			end_game = true;
		}
		if (life_quantity > 0) {
			life_quantity -= 1;
			console.log(score)
			score -= ( (((brick_col*brick_row) - all_bricks.length)*10) + (catched_stars.length*200));
			can_shoot = false;
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
		turbo_shooting = false;
		turbo_shooting_delay = 450;
		hearts_quantity.splice(0, hearts_quantity.length);
		all_bullets.splice(0, all_bullets.length);
		all_bricks.splice(0, all_bricks.length);
		all_virtual_bricks.splice(0 , all_virtual_bricks.length);
		all_enemy_bullets.splice(0, all_enemy_bullets.length);
		bullets_counts.splice(0, bullets_counts.length);
		enemy_quantity.splice(0, enemy_quantity.length);
		catched_stars.splice(0, catched_stars.length);
		yellow_bricks = 0;
		green_bricks = 0;
		
		
		if (level == 10) {
			turbo_shooting = true;
			can_boss_move = true;
			can_boss_shoot = false;
			max_boss_bullets = 15;
			boss_stop_moving = 250;
			all_boss_bullets.splice(0, all_boss_bullets.length);
		}

	}
	
	function refersh_delay() {
		refresh_delay_time -= 1 
		if (refresh_delay_time == 0) {
			if (level == 1) {
				draw_virtual_bricks(70, 15)
			}
			if (level == 2) {
				brick_col = 15;
				brick_row = 3;
				green_bricks = 8;
				yellow_bricks = 8;
				surprise_bricks_quantity = [6, 1, 3, 5];
				draw_virtual_bricks(30, 5)
			}
			if (level == 3) {
				brick_col = 15;
				brick_row = 4;
				surprise_bricks_quantity = [6, 1, 3, 2, 7];
				draw_virtual_bricks(30, 5)
			}
			if (level == 4) {
				brick_col = 15;
				brick_row = 4;
				yellow_bricks = 10;
				surprise_bricks_quantity = [6, 1, 3, 5, 1, 4, 7];
				draw_virtual_bricks(30, 5)
			}
			if (level == 5) {
				brick_col = 15;
				brick_row = 6;
				yellow_bricks = 20;
				surprise_bricks_quantity = [6, 1, 3, 5, 1, 1, 2, 7];
				draw_virtual_bricks(30, 5)
			}
			if (level == 6) {
				brick_col = 15;
				brick_row = 7;
				yellow_bricks = 40;
				surprise_bricks_quantity = [6, 1, 3, 5, 1, 4, 1, 1, 4, 7, 8];
				draw_virtual_bricks(30, 5)
			}
			if (level == 7) {
				brick_col = 15;
				brick_row = 8;
				//green_bricks = 10;
				yellow_bricks = (brick_col * brick_row);
				surprise_bricks_quantity = [6, 1, 3, 5, 1, 4, 1, 1, 4, 1, 2, 7, 8];
				draw_virtual_bricks(30, 5)
			}
			if (level == 8) {
				brick_col = 15;
				brick_row = 8;
				green_bricks = 20;
				yellow_bricks = (brick_col * brick_row) - green_bricks;
				surprise_bricks_quantity = [6, 1, 3, 5, 1, 4, 1, 1, 4, 1, 6, 7, 7, 8];
				draw_virtual_bricks(30, 5)
			}
			if (level == 9) {
				brick_col = 15;
				brick_row = 8;
				green_bricks = (brick_col * brick_row);
				yellow_bricks = 0;
				surprise_bricks_quantity = [6, 1, 3, 5, 1, 4, 1, 1, 4, 1, 2, 6, 7, 7, 8];
				draw_virtual_bricks(30, 5)
			}
			if (level == 10) {
				turbo_shooting = true;
				brick_col = 0;
				brick_row = 0;
				green_bricks = 0;
				yellow_bricks = 0;
				surprise_bricks_quantity = [];
				move_boss();
				return;
			}
			draw_all_bricks();
			refresh_delay_time = 10;
			refresh = false;
			can_change_level = true;
			can_shoot = true;
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
		if(boss_power <= 0) {
			boss_power = 0;
			boss_power_line = 0;
			end_screen();
			return;
		}
	}
	
	function end_screen() {
		context.font = "bold 16px Arial";
		context.textAlign = "left";
		context.textBaseline = "middle";
		context.fillStyle = "rgb(255,0,0)";
		context.fillText("You won! ", 150 , 70);
		context.fillText("Your score: " + score, 120 , 100);
	}
	function draw_author() {
		context.font = "bold 12px Arial";
		context.textAlign = "left";
		context.textBaseline = "middle";
		context.fillStyle = "rgb(255,0,0)";
		
		let JL = "Joanna Ligenza";
		let CLT = ", Pawel Ligenza";

		for (i=0; i < who_made_it.length; i++) {
			//if (who_made_it[who_made_it.length - 1][2] < 0 ) {
			
			if ( i !== 3 && i !== 4) {
				context.fillText(who_made_it[i][0] + JL, who_made_it[i][1] , who_made_it[i][2]);
			}
			if (i === 3) {
				context.fillText(who_made_it[i][0] + JL + CLT, who_made_it[i][1] , who_made_it[i][2]);
			}
			if (i === 4) {
				context.fillText(who_made_it[i][0], who_made_it[i][1] , who_made_it[i][2]);
			}
			who_made_it[i][2] = who_made_it[i][2] - 1 ;
			
		}
	}
	
	function author() {
		context.clearRect(0, 0, canvas.width, canvas.height);
		interval_delay = 30;
		draw_frame();
		win_game();
		draw_author();
		
		if (who_made_it[0][2] < 140 ) {
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
		//console.log("all_obstacles", all_obstacles)
		
		context.clearRect(0, 0, canvas.width, canvas.height);
		draw_frame();
		//draw_space();
		//draw_level();
		//count_score();
		//draw_life();
		//draw_hearts();		
		if (end_game == true) {
			console.log("end_game");
			game_over();
			cancelAnimationFrame(animation);
			return;
		}
		
		if (level == 10) {
			draw_boss_power();
			draw_boss_power_line();
			obstacles_delay -= 1;
			if(boss_power <= 0) {
				//win_game();
				score = score + life_quantity*500*10;
				author();
				cancelAnimationFrame(animation);
				return;
			}
			if(obstacles_delay == 0) {
				//draw_obstacle();
				push_obstacles();
				obstacles_delay = 30;
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
			
			//draw_spider();	
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
		//draw_spider();
		draw_boss();
		draw_virtual_bricks(70, 15);
		draw_all_bricks();
		//draw_space_ship();
		//draw_space_ship2();
		draw_space_ship3();
		draw_enemy();
		draw_star_icon();
		//get_space_ship();
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
	
	function draw_space_ship3() {
		// Wings
		context.beginPath();
		context.fillStyle = "rgb(0, 168, 89)";
		//context.fillStyle = "rgb(250, 250, 250)";
		context.fillRect(28, 300, 2, 2);
		context.fillRect(27, 302, 3, 2);
		context.fillRect(26, 304, 3, 2);
		context.fillRect(25, 306, 4, 2);
		context.fillRect(24, 308, 4, 4);
		context.fillRect(24, 310, 4, 2);
		context.fillRect(23, 311, 6, 1);
		context.fillRect(23, 312, 7, 1);
		context.fillRect(22, 313, 9, 1);
		context.fillRect(22, 314, 11, 1);
		context.fillRect(21, 315, 14, 1);
		context.fillRect(21, 316, 16, 1);
		context.fillRect(20, 317, 19, 3);
		context.fillRect(21, 318, 21, 3);
		context.fillRect(22, 319, 21, 3);
		context.fillRect(23, 320, 23, 3);
		
		context.fillRect(80, 300, 2, 2);
		context.fillRect(80, 302, 3, 2);
		context.fillRect(81, 304, 3, 2);
		context.fillRect(81, 306, 4, 2);
		context.fillRect(82, 308, 4, 3);
		context.fillRect(82, 311, 5, 1);
		context.fillRect(80, 312, 7, 1);
		context.fillRect(78, 313, 10, 1);
		context.fillRect(75, 314, 13, 1);
		context.fillRect(73, 315, 16, 1);
		context.fillRect(71, 316, 18, 1);
		context.fillRect(69, 317, 21, 3);
		context.fillRect(67, 318, 22, 3);
		context.fillRect(65, 319, 23, 3);
		context.fillRect(63, 320, 24, 3); 
		
		context.fillRect(24, 321, 62, 3);
		context.fillRect(25, 322, 60, 3);
		context.fillRect(26, 323, 58, 3);
		context.fillRect(27, 324, 56, 3);
		context.fillRect(28, 325, 54, 3);
		context.fillRect(29, 326, 52, 3);
		context.fillRect(30, 327, 50, 3);
		context.fillRect(31, 328, 48, 3);
		context.fillRect(32, 329, 46, 3);
		context.fillRect(33, 330, 44, 3);
		context.fillRect(34, 331, 42, 3);
		context.fillRect(35, 332, 40, 3);
		context.fillRect(36, 333, 38, 3);
		context.fillRect(37, 334, 36, 3);
		context.fillRect(38, 335, 34, 3);
		context.fillRect(39, 336, 32, 3);
		context.fillRect(40, 337, 30, 3);
		context.fillRect(41, 338, 28, 3);
		context.fillRect(42, 339, 26, 3);
		context.fillRect(43, 340, 24, 3);
		context.fillRect(44, 341, 22, 3);
		context.fillRect(45, 342, 20, 3);
		context.fillRect(46, 343, 18, 3);
		context.fillRect(47, 344, 16, 3);
		context.fillRect(48, 345, 14, 3);
		context.fillRect(49, 346, 12, 3);
		context.fillRect(50, 347, 10, 3);
		context.fill(); 
		
		// Body of ship
		context.beginPath();
		context.fillStyle = "rgb(215, 215, 215)";
		//context.fillStyle = "rgb(250, 250, 250)";
		context.fillRect(52, 300, 6, 50);
		
		context.fillRect(51, 302, 1, 48);
		context.fillRect(50, 305, 1, 45);
		context.fillRect(49, 308, 1, 40);
		context.fillRect(48, 312, 1, 34);
		context.fillRect(47, 316, 1, 28);
		context.fillRect(46, 320, 1, 22);
		context.fillRect(45, 324, 1, 16);
		context.fillRect(44, 328, 1, 10);
		context.fillRect(43, 332, 1, 4);
		
		context.fillRect(58, 302, 1, 48);
		context.fillRect(59, 305, 1, 45);
		context.fillRect(60, 308, 1, 40);
		context.fillRect(61, 312, 1, 34);
		context.fillRect(62, 316, 1, 28);
		context.fillRect(63, 320, 1, 22);
		context.fillRect(64, 324, 1, 16);
		context.fillRect(65, 328, 1, 10);
		context.fillRect(66, 332, 1, 4);
		context.fill(); 
		
		// Shape on body - middle
		context.beginPath();
		context.fillStyle = "rgb(104, 104, 104)";
		//context.fillStyle = "rgb(250, 250, 250)";
		context.fillRect(52, 330, 6, 15);
		context.fillRect(52, 327, 6, 3);
		context.fillRect(53, 324, 4, 4);
		context.fillRect(54, 322, 2, 2);
		
		// Shape on body - left
		context.fillRect(49, 325, 1, 20);
		context.fillRect(48, 327, 1, 16);
		context.fillRect(47, 329, 1, 12);
		context.fillRect(46, 331, 1, 8);
		context.fillRect(45, 333, 1, 4);
		context.fillRect(44, 334, 1, 2);
		
		// Shape on body - right
		context.fillRect(60, 325, 1, 20);
		context.fillRect(61, 327, 1, 16);
		context.fillRect(62, 329, 1, 12);
		context.fillRect(63, 331, 1, 8);
		context.fillRect(64, 333, 1, 4);
		context.fillRect(65, 334, 1, 2);
		
		// Engine
		context.fillRect(51, 350, 8, 3);
		context.fillRect(52, 353, 6, 2);
		context.fillRect(53, 355, 4, 2);
		context.fill(); 
		
		// Shape on body - glass
		//context.beginPath();
		context.fillStyle = "rgb(59, 116, 244)";
		//context.fillStyle = "rgb(250, 250, 250)";
		context.fillRect(52, 305, 6, 4);
		context.fillRect(51, 309, 8, 4);
		context.fillRect(50, 313, 10, 2);
		context.fillRect(50, 315, 4, 2);
		context.fillRect(50, 317, 3, 2);
		context.fillRect(50, 319, 3, 2);
		
		context.fillRect(56, 315, 4, 2);
		context.fillRect(57, 317, 3, 2);
		context.fillRect(57, 319, 3, 2);
		context.fill(); 
		
		// Thins on wings
		context.beginPath();
		context.fillStyle = "rgb(36, 82, 55)";
		//context.fillStyle = "rgb(250, 250, 250)";
		context.fillRect(30, 313, 1, 1);
		context.fillRect(30, 314, 3, 1);
		context.fillRect(30, 315, 5, 1);
		context.fillRect(30, 316, 7, 1);
		context.fillRect(31, 317, 6, 1);
		context.fillRect(31, 318, 6, 1);
		context.fillRect(32, 319, 5, 1);
		context.fillRect(33, 320, 4, 1);
		context.fillRect(35, 321, 2, 1);
		
		context.fillRect(39, 317, 1, 1);
		context.fillRect(39, 318, 3, 1);
		context.fillRect(39, 319, 4, 1);
		context.fillRect(39, 320, 6, 1);
		context.fillRect(39, 321, 6, 1);
		context.fillRect(39, 322, 6, 1);
		context.fillRect(40, 323, 5, 1);
		context.fillRect(41, 324, 4, 1);
		context.fillRect(42, 325, 3, 1);
		context.fillRect(43, 326, 1, 1);
		
		context.fillRect(68, 317, 4, 2);
		context.fillRect(67, 318, 4, 1);
		context.fillRect(65, 319, 7, 1);
		context.fillRect(65, 320, 7, 1);
		context.fillRect(65, 321, 7, 1);
		context.fillRect(65, 322, 6, 1);
		context.fillRect(65, 323, 5, 1);
		context.fillRect(65, 324, 4, 1);
		context.fillRect(65, 325, 3, 1);
		context.fillRect(66, 326, 1, 1);
		
		context.fillRect(78, 313, 1, 1);
		context.fillRect(75, 314, 5, 1);
		context.fillRect(74, 315, 6, 1);
		context.fillRect(74, 316, 6, 1);
		context.fillRect(74, 317, 5, 1);
		context.fillRect(74, 318, 4, 1);
		context.fillRect(74, 319, 3, 1);
		context.fillRect(74, 320, 2, 1);
		
		context.fillRect(24, 319, 2, 2);
		context.fillRect(29, 324, 2, 2);
		context.fillRect(34, 329, 2, 2);
		context.fillRect(39, 334, 2, 2);
		
		context.fillRect(84, 319, 2, 2);
		context.fillRect(79, 324, 2, 2);
		context.fillRect(74, 329, 2, 2);
		context.fillRect(69, 334, 2, 2);
		context.fill();
		
		// Small wings
		context.beginPath();
		context.fillStyle = "rgb(36, 82, 55)";
		//context.fillStyle = "rgb(250, 250, 250)";
		context.fillRect(49, 349, 1, 2);
		context.fillRect(48, 348, 1, 6);
		context.fillRect(47, 347, 1, 10);
		context.fillRect(46, 346, 1, 13);
		context.fillRect(45, 345, 1, 12);
		context.fillRect(44, 344, 1, 10);
		context.fillRect(43, 343, 1, 8);
		context.fillRect(42, 342, 1, 6);
		context.fillRect(41, 341, 1, 4);
		context.fillRect(40, 340, 1, 2);
		
		context.fillRect(60, 349, 1, 2);
		context.fillRect(61, 348, 1, 6);
		context.fillRect(62, 347, 1, 10);
		context.fillRect(63, 346, 1, 13);
		context.fillRect(64, 345, 1, 12);
		context.fillRect(65, 344, 1, 10);
		context.fillRect(66, 343, 1, 8);
		context.fillRect(67, 342, 1, 6);
		context.fillRect(68, 341, 1, 4);
		context.fillRect(69, 340, 1, 2);
		context.fill();
		
		// left yellow circle
		context.beginPath();
		context.fillStyle = "rgb(229, 247, 26)";
		//context.fillStyle = "rgb(250, 250, 250)";
		context.fillRect(28, 294, 4, 2);
		context.fillRect(27, 296, 6, 2);
		context.fillRect(28, 298, 4, 2);
		
		context.fillRect(78, 294, 4, 2);
		context.fillRect(77, 296, 6, 2);
		context.fillRect(78, 298, 4, 2);
		context.fill();
		
		// engine fire
		context.beginPath();
		context.strokeStyle = "rgb(255, 195, 35)";
		context.moveTo(52, 362);
		context.lineTo(52, 367);
		context.moveTo(55, 362);
		context.lineTo(55, 370);
		context.moveTo(58, 362);
		context.lineTo(58, 367);
		context.lineWidth = 2;
		context.stroke();
		
		space_ship = context.getImageData(20, 294, ship_width, ship_height);
	}
	
	function draw_space_ship2() {
		
		// left small wing
		context.beginPath();
		context.fillStyle = "rgb(36, 82, 55)";
		context.moveTo(50, 350);
		context.lineTo(40, 341);
		context.lineTo(47, 360);
		context.closePath();
		context.fill();

		// right small wing
		context.beginPath();
		context.fillStyle = "rgb(36, 82, 55)";
		context.moveTo(60, 350);
		context.lineTo(70, 341);
		context.lineTo(63, 360);
		context.closePath();
		context.fill();
		
		// Left wing
		context.beginPath();
		context.fillStyle = "rgb(0, 168, 89)";
		context.moveTo(45, 320);
		context.lineTo(28, 312);
		context.lineTo(30, 300);
		context.lineTo(28, 300);
		context.lineTo(20, 320);
		context.lineTo(50, 350);
		context.closePath();
		context.fill();
		
		// Thins on left wing
		context.beginPath();
		context.fillStyle = "rgb(36, 82, 55)";
		context.moveTo(45, 320);
		context.lineTo(40, 317);
		context.lineTo(38, 322);
		context.lineTo(44, 327);
		context.closePath();
		
		context.moveTo(37, 316);
		context.lineTo(32, 313);
		context.lineTo(30, 317);
		context.lineTo(36, 322);
		context.closePath();
		context.fill();
		
		context.moveTo(40, 335); 
		context.arc(40, 333, 1, radianAngle(0), radianAngle(360));
		context.moveTo(35, 330);
		context.arc(35, 330, 1, radianAngle(0), radianAngle(360));
		context.moveTo(30, 325);
		context.arc(30, 325, 1, radianAngle(0), radianAngle(360));
		context.moveTo(25, 320);
		context.arc(25, 320, 1, radianAngle(0), radianAngle(360));
		context.fill();
		
		// Right wing
		context.beginPath();
		context.fillStyle = "rgb(0, 168, 89)";
		context.moveTo(65, 320);
		context.lineTo(82, 312);
		context.lineTo(80, 300);
		context.lineTo(82, 300);
		context.lineTo(90, 320);
		context.lineTo(60, 350);
		context.closePath();
		context.fill();
		
		// Thins on right wing
		context.beginPath();
		context.fillStyle = "rgb(36, 82, 55)";
		context.moveTo(65, 320);
		context.lineTo(70, 317);
		context.lineTo(72, 322);
		context.lineTo(66, 327);
		context.closePath();
		
		context.moveTo(73, 316);
		context.lineTo(78, 313);
		context.lineTo(80, 317);
		context.lineTo(74, 322);
		context.closePath();
		context.fill();
		
		context.moveTo(70, 335); 
		context.arc(70, 333, 1, radianAngle(0), radianAngle(360));
		context.moveTo(75, 330);
		context.arc(75, 330, 1, radianAngle(0), radianAngle(360));
		context.moveTo(80, 325);
		context.arc(80, 325, 1, radianAngle(0), radianAngle(360));
		context.moveTo(85, 320);
		context.arc(85, 320, 1, radianAngle(0), radianAngle(360));
		context.fill();
		
		// Body of ship
		context.beginPath();
		context.fillStyle = "rgb(215, 215, 215)";
		context.moveTo(52, 300);
		context.lineTo(43, 335);
		context.lineTo(50, 350);
		context.lineTo(60, 350);
		context.lineTo(67, 335);
		context.lineTo(58, 300);
		context.lineTo(52, 300);
		context.fill();
		
		// Shape on body - middle
		context.beginPath();
		context.fillStyle = "rgb(104, 104, 104)";
		context.moveTo(52, 345);
		context.lineTo(58, 345);
		context.lineTo(58, 330);
		context.bezierCurveTo(57,320, 53,320, 52, 330);
		context.lineTo(52, 345);
		context.fill();
		
		// Shape on body - left
		context.beginPath();
		context.fillStyle = "rgb(104, 104, 104)";
		context.moveTo(50, 325);
		context.lineTo(44, 335);
		context.lineTo(50, 345);
		context.lineTo(50, 325);
		context.fill();
		
		// Shape on body - right
		context.beginPath();
		context.fillStyle = "rgb(104, 104, 104)";
		context.moveTo(60, 325);
		context.lineTo(66, 335);
		context.lineTo(60, 345);
		context.lineTo(60, 325);
		context.fill();
		
		// Shape on body - glass
		context.beginPath();
		context.fillStyle = "rgb(59, 116, 244)";
		context.moveTo(52, 305);
		context.lineTo(50, 320);
		context.lineTo(52, 320);
		context.lineTo(54, 315);
		context.lineTo(56, 315);
		context.lineTo(58, 320);
		context.lineTo(60, 320);
		context.lineTo(58, 305);
		context.lineTo(52, 305);
		context.fill();
		
		// left yellow circle
		context.beginPath();
		context.fillStyle = "rgb(229, 247, 26)";
		context.moveTo(30, 297); 
		context.arc(30, 297, 3, radianAngle(0), radianAngle(360));
		context.fill();
		
		// right yellow circle
		context.beginPath();
		context.fillStyle = "rgb(229, 247, 26)";
		context.moveTo(80, 297); 
		context.arc(80, 297, 3, radianAngle(0), radianAngle(360));
		context.fill();
		
		// engine
		context.beginPath();
		context.fillStyle = "rgb(104, 104, 104)";
		context.moveTo(50, 350);
		context.lineTo(60, 350);
		context.bezierCurveTo(57,360, 53,360, 50, 350);
		context.fill();
		
		// engine fire
		context.beginPath();
		context.strokeStyle = "rgb(255, 195, 35)";
		context.moveTo(52, 362);
		context.lineTo(52, 367);
		context.moveTo(55, 362);
		context.lineTo(55, 370);
		context.moveTo(58, 362);
		context.lineTo(58, 367);
		context.lineWidth = 2;
		context.stroke();
		
		space_ship = context.getImageData(20, 294, ship_width, ship_height);
	}

	//console.log("all_bricks ", all_bricks)
	var t1 = performance.now();
	console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.")  
	
    
})