document.addEventListener('DOMContentLoaded', function() {


	const canvasElem = document.getElementById("can");
	const ctx = canvasElem.getContext("2d");
	
	// kwadrat
	ctx.fillRect(25,25,100,100);		//rysujemy kwadrat
	ctx.clearRect(45,45,60,60);			//wycinamy jego srodek
	ctx.strokeRect(50,50,50,50);		//rysujemy obramowanie drugiego kwadratu
	
	//ctx.beginPath();
	//ctx.moveTo(265,340); //rysowanie zaczynamy od punktów 35,10 - tam więc przesuwamy nasze piórko - to nie rysue sciezki
	//ctx.lineTo(190,270);	// prawa
	//ctx.lineTo(140,270);	// dolna
	//ctx.lineTo(165,240);	// lewa
	//ctx.stroke();
	
	// trojkat
	ctx.beginPath();
	ctx.moveTo(300,200); 
	ctx.lineTo(400,400);	
	ctx.lineTo(200,400);	
	ctx.lineTo(300,200);	
	ctx.stroke();
	
	ctx.fillText('a',230,300);
	ctx.fillText('c',360,300);
	ctx.fillText('b',300,415);
	
	// kolo niebieskie
	ctx.beginPath();
	ctx.arc(500,100, 80, 0,10*Math.PI);
	ctx.strokeStyle="blue";
	ctx.stroke();
	
	// kolo czerwone
	ctx.beginPath();
	ctx.arc(500,500, 80, radianAngle(0), radianAngle(360));
	ctx.fillStyle="red";
	ctx.fill();
	
	// kolo zielone
	ctx.beginPath();
	ctx.arc(100,500, 80, radianAngle(0), radianAngle(280));
	ctx.fillStyle="green";
	ctx.fill();
	//ctx.stroke();
	
	function radianAngle(angle) {
    return radians = (Math.PI/180)*angle;
	}
	// lub:
	//const miara_w_radianach = miara_w_stopniach * (Math.PI / 180);
	
	// napisy
	const canvasElem2 = document.getElementById("can2");
	const ctx2 = canvasElem2.getContext("2d");
	const gradient = ctx.createLinearGradient(0, 0, 800, 0); //Gradient liniowy biegnie z punktu x1,y1 do punktu x2,y2
	const gradient2 = ctx.createLinearGradient(200, 200, 500, 0);
	
	
	ctx2.font = "normal 20px Arial";
	ctx2.textBaseline = "top";							// wyrownanie tekstu w pionie
	ctx2.strokeText('Ala ma kota Burek', 130, 80);		// dodaje napis
	
	ctx2.font = "italic bold 30px Arial";
	ctx2.textBaseline = "middle";
	ctx2.fillText('Ala ma kota Bolek', 0, 30);

	//ctx2.shadowColor = "#888";
	//ctx2.shadowBlur = "5";
	ctx2.font = "italic bold 20px Arial";
	ctx2.textBaseline = "bottom";
	ctx2.strokeText('Ala ma kota Lolek', 30, 70);
	
	// prostokat zolty z czerwona ramka
	ctx2.beginPath();
	ctx2.rotate(Math.PI / 40);			// obrot
	ctx2.rect(50,200, 100, 200 );		//położenie względem lewej i prawej krawędzi, szerokość, wysokość
	ctx2.fillStyle="yellow";
	ctx2.fill();
	ctx2.lineWidth=5;
	ctx2.lineJoin = "round";
	ctx2.strokeStyle="red";
	ctx2.stroke();
	
	// prostokat z gradientem
	ctx2.beginPath();
	gradient.addColorStop(0, "yellow");
	//gradient.addColorStop(0.5, "yellow");
	gradient.addColorStop(1, "lime");
	//ctx2.scale(1,1.1);
	ctx2.fillStyle = gradient;
	ctx2.fillRect(200, 200, 200, 100);
	
	// prostokat z gradientem2
	ctx2.beginPath();
	gradient2.addColorStop(0, "yellow");
	gradient2.addColorStop(0.5, "red");
	gradient2.addColorStop(1, "yellow");
	ctx2.fillStyle = gradient2;
	ctx2.fillRect(280, 280, 200, 100);
	
	//rysujemy uśmiech
	ctx2.beginPath();
	ctx2.moveTo(50,505);
	ctx2.bezierCurveTo(75,530,125,530,150,500);
	ctx2.moveTo(50,505);
	ctx2.bezierCurveTo(75,550,125,550,150,500);
	ctx2.strokeStyle="blue";
	ctx2.stroke();
	
	
	
	const canvasElem3 = document.getElementById("can3");
	const ctx3 = canvasElem3.getContext("2d");
	
	// Polkole
	ctx3.beginPath();
	ctx3.arc(50,50,30,Math.PI,0,false);
	ctx3.closePath();
	ctx3.lineWidth = 5;
	ctx3.strokeStyle = "black";
	ctx3.stroke();
	
	// kwadratowa krzywa
	ctx3.beginPath();
	ctx3.moveTo(150,80);
	ctx3.quadraticCurveTo(200,0,250,80);
	ctx3.closePath();
	ctx3.strokeStyle = "red";
	ctx3.stroke();
	
	// buzka
	ctx3.beginPath();
	ctx3.arc(150,250,100,Math.PI,180);
	ctx3.strokeStyle="blue";
	ctx3.stroke();
	
	// oczka
	ctx3.beginPath();
	ctx3.arc(120,220,10,Math.PI,180);
	ctx3.strokeStyle="blue";
	ctx3.stroke();
	
	ctx3.beginPath();
	ctx3.arc(180,220,10,Math.PI,180);
	ctx3.strokeStyle="blue";
	ctx3.stroke();
	
	// nosek
	ctx3.beginPath();
	ctx3.arc(150,260,10,Math.PI,0);
	ctx3.closePath();
	ctx3.strokeStyle="blue";
	ctx3.stroke();
	
	// usmiech
	ctx3.beginPath();
	ctx3.moveTo(120,290);
	ctx3.quadraticCurveTo(150,320,180,290);
	ctx3.closePath();
	ctx3.strokeStyle = "red";
	ctx3.stroke();
	
	// kwadrat przekreslony
	ctx3.beginPath();
	ctx3.moveTo(300,150);
	ctx3.lineTo(300,350);
	ctx3.lineTo(500,350);
	ctx3.lineTo(500,150);
	ctx3.lineTo(300,150);
	ctx3.lineTo(500,350);
	ctx3.moveTo(500,150);
	ctx3.lineTo(300,350);
	ctx3.lineJoin = "round"; // mozna jeszcze uzyc bevel lub miter 
	ctx3.lineWidth = 15;
	ctx3.strokeStyle = "green";
	ctx3.stroke();
	
	
	const canvasElem4 = document.getElementById("can4");
	const ctx4 = canvasElem4.getContext("2d");
	const image = new Image();
	image.src = "mis.jpg";
	
	image.addEventListener('load', function(){
		// wklejenie obrazka i skalowanie obrazka
		ctx4.drawImage(image, 20, 20, 300, 200);			// (image, x, y, width, height)
		ctx4.drawImage(image, 340, 20, 250, 150);
		ctx4.drawImage(image, 20, 240, 200, 100);
		ctx4.drawImage(image, 340, 240, 150, 70);
		
		// wyciecie kawalka obrazka
			// najpierw podaje wspolrzedne obrazka wycinanego, a potem gdzie ma zostac wklejony na canvasie
			// ctx.drawImage(img, x-wycinany, y-wycinany, Width-wycinany, Height-wycinany,  x, y, width, height);
		ctx4.drawImage(image, 40, 40, 100, 100,     20, 400, 100, 100);
		ctx4.drawImage(image, 150, 150, 100, 50,     170, 400, 100, 50);
		
		// przezroczystosc 1 - cos nie wyszlo
		ctx4.drawImage(image, 280, 380, 300, 200);
		ctx4.fillStyle = "white";
		for (let i = 0; i < 1; i += 0.04) {
			ctx4.globalAlpha = i;
			ctx4.fillRect(280, i * 225, 300, 10); 
		}
		
		// przezroczystosc 2 - na ostatnim misq - biegnie z punktu 580, 580 do punktu 350, 380
		ctx4.beginPath();
		ctx4.rect(280, 380, 300, 200);
		const gradient3 = ctx.createLinearGradient(580, 580, 350, 380);
		gradient3.addColorStop(0, "rgba(255,255,255, 1)");
		gradient3.addColorStop(1, "rgba(255,255,255, 0)");
		ctx4.fillStyle = gradient3;
		ctx4.fill();
    
	});
	
	
	
	
	
	const canvasElem5 = document.getElementById("can5");
	const ctx5 = canvasElem5.getContext("2d");
		
	// 3 kolka przezroczyste
	ctx5.beginPath();
	ctx5.arc(100,100, 80, radianAngle(0), radianAngle(360));
	ctx5.fillStyle="rgba(255,0,0, 0.5)";
	ctx5.fill();
	
	ctx5.beginPath();
	ctx5.arc(200,100, 80, radianAngle(0), radianAngle(360));
	ctx5.fillStyle="rgba(0,255,0, 0.5)";
	ctx5.fill();
	
	ctx5.beginPath();
	ctx5.arc(150,200, 80, radianAngle(0), radianAngle(360));
	ctx5.fillStyle="rgba(0,0,255, 0.5)";
	ctx5.fill();
	
	// 3 kolka wymiana kolorow
	
	ctx5.beginPath();
	ctx5.arc(400,200, 80, radianAngle(0), radianAngle(360));
	ctx5.globalCompositeOperation = "lighter";  // !!!!!!!!
	ctx5.fillStyle="rgba(255,0,0, 1)";
	ctx5.fill();
	
	ctx5.beginPath();
	ctx5.arc(500,200, 80, radianAngle(0), radianAngle(360));
	ctx5.fillStyle="rgba(0,255,0, 1)";
	ctx5.fill();
	
	ctx5.beginPath();
	ctx5.arc(450,300, 80, radianAngle(0), radianAngle(360));
	ctx5.fillStyle="rgba(0,0,255, 1)";
	ctx5.fill();
	
	
	
	
	//const canvasElem6 = document.getElementById("can6");
	//const ctx6 = canvasElem6.getContext("2d");
	
	var canvas;
	var ctx6;
	let x = 300;
	let y = 20;
	let dy = 10; 
	const kolory = new Array("blue","red","yellow","green");
	let i = 0;
	
	//ctx5.clearRect(0, 0, canvas.width, canvas.height);
	
/*	ctx6.beginPath();
	ctx6.arc(x, y, 20, 0, Math.PI * 2, true);
	ctx6.fillStyle = kolory[i];
	ctx6.closePath;
	ctx6.fill();  */
	
	function draw() {
		canvas = document.getElementById('can6');
		ctx6 = canvas.getContext('2d');
		setInterval(anim, 100);
	}
	
	function anim() {
		
		ctx6.clearRect(0, 0, canvas.width, canvas.height);
		
		y +=dy;
		if (y > (canvas.height-20)) {
			//y -= dy;
			dy = -10;
			i = ++i % kolory.length;
			
		}
		if (y < 20) {
			//y +=dy;
			dy = 10;
			i = ++i % kolory.length;
			
		}
		
		ctx6.beginPath();
		ctx6.arc(x, y, 20, 0, Math.PI * 2, true);
		ctx6.fillStyle = kolory[i];
		ctx6.closePath;
		ctx6.fill();
	}
	
	draw();
	
	
	const canvasElem7 = document.getElementById("can7");
	const ctx7 = canvasElem7.getContext("2d");
	const image3 = new Image();
	image3.src = "http://misia.0dev.pl/blog/cwiczenia/kwiatek.png";
			
	image3.addEventListener('load', function(){
		// wklejenie obrazka i skalowanie obrazka
		ctx7.drawImage(image3, 0, 0, 400, 200);			// (image, x, y, width, height)
		
		// zmiana koloru pikseli
			// pobieram dane z płótna do zmiennej myImgData
			// const myImgData = ctx4.getImageData(0, 0, canvasElem.width, canvasElem.height);
		const myImgData = ctx7.getImageData(0, 0, 400, 200);
		
		
		//zmieniam kolor listków kwiatka
			// data - tablica 1-wymiarowa zawierająca informacje na temat kolejnych pikseli płótna. Każdy piksel definiują 4 kolejne indeksy:
			// i : czerwony, i+1 : zielony, i+2 : niebieski, i+3 : przezroczystość
		for (let i=0; i<myImgData.data.length; i+=4) {
			if (myImgData.data[i] === 255) {
				myImgData.data[i] = 255;
			}
			if (myImgData.data[i+1] === 245) {
				myImgData.data[i+1] = 0;
			}
			if (myImgData.data[i+2] === 104) {
				myImgData.data[i+2] = 0;
			}
		}
		
		//rysujem na płótnie zmieniony obraz
		ctx7.putImageData(myImgData, 220, 0);
    
	});

 
})