function init(){
	createLibyaFlag();
	createPalauFlag()
	createGreeceFlag();
	createGuyanaFlag();
	createBahrainFlag();
	createIsraelFlag();
	createSomaliaFlag();
	createTurkeyFlag();
	createCanadaFlag();
	createHaitiFlag();
}

function createLibyaFlag(){
	var cnvLibya = document.getElementById("libya");
	var context = cnvLibya.getContext("2d");
		context.fillStyle = "#009530";
		context.fillRect(0,0,cnvLibya.width,cnvLibya.height);
		
	addBoarder(context,cnvLibya.width,cnvLibya.height);
}

function createPalauFlag(){
	var cnvPalau = document.getElementById("palau");
	var wid = cnvPalau.width;
	var hei = cnvPalau.height;
	
	var context = cnvPalau.getContext("2d");
		context.fillStyle = "#4AADD6";
		context.fillRect(0,0,wid,hei);
		
		context.fillStyle = "#FFDE00";
		context.arc(wid / 2.3, hei / 2, 40, 0, 2 * Math.PI, false);
		context.fill();
		
	addBoarder(context,wid,hei);
}
function createGreeceFlag(){
	var canvas = document.getElementById("greece");
	var wid = canvas.width;
	var hei = canvas.height;
	
	
	var context = canvas.getContext("2d");
		context.fillStyle = "#000080";
		context.fillRect(0,0,wid,hei);
		
	var lineHeight = hei/9;
	
	context.lineWidth = lineHeight;
	context.strokeStyle = "#ffffff";
	
	var offset = lineHeight/2;
	for(var i=1; i<8; i+=2){
		context.moveTo(0,i*lineHeight + offset);
		context.lineTo(wid,i*lineHeight+offset);
		
	}	
	context.stroke();
	
	context.fillRect(0,0,lineHeight*5,lineHeight*5);
	context.beginPath();
	context.moveTo(0, lineHeight*2.5);
	context.lineTo(lineHeight*5,lineHeight*2.5);
	context.moveTo(lineHeight*2.5,0);
	context.lineTo(lineHeight*2.5,lineHeight*5+1);
	context.stroke();
		
	addBoarder(context,wid,hei);
}

function createGuyanaFlag(){
	var canvas = document.getElementById("guyana");
	var wid = canvas.width;
	var hei = canvas.height;
	
	var context = canvas.getContext("2d");
		context.fillStyle = "#009E49";
		context.fillRect(0,0,wid,hei);

		
		fillTrinagle(context,	0,0,
								wid,hei/2,
								0,hei, "#ffffff");
		fillTrinagle(context,	0,10,
								wid-25,hei/2,
								0,hei-10, "#FCD116");
		fillTrinagle(context,	0,0,
								wid/2,hei/2,
								0,hei, "#000000");
		fillTrinagle(context,	0,10,
								wid/2-16,hei/2,
								0,hei-10, "#CE1126");


	addBoarder(context,wid,hei);
}

function createBahrainFlag(){
	var canvas = document.getElementById("bahrain");
	var wid = canvas.width;
	var hei = canvas.height;
	
	var context = canvas.getContext("2d");
		context.fillStyle = "#CE1126";
		context.fillRect(0,0,wid,hei);
		
	
	var baseX = wid*.25;
	context.fillStyle = "#ffffff";
	context.beginPath();
	context.lineTo(baseX,0);
	
	var zagHeight = hei/5;
	for(var i=0; i<5; i++){
		context.lineTo(baseX +25 , (i+.5)*zagHeight);
		context.lineTo(baseX  , (i+1)*zagHeight);
		 	
	}

	context.lineTo(0,hei);
	context.lineTo(0,0);
	context.closePath();
	context.fill();

	addBoarder(context,wid,hei);

}

function createIsraelFlag(){
	var canvas = document.getElementById("israel");
	var wid = canvas.width;
	var hei = canvas.height;
	
	var context = canvas.getContext("2d");
		
		
	var radian = Math.PI/180;
	var tilt = radian*180;	
	var baseX = wid / 2;
	var baseY = hei / 2;
	var radius = 24;
	var stripHeight = 14;
		
	context.lineWidth=5;
	createTrinagle(context,
						baseX+ Math.sin(0) * radius, 	baseY + Math.cos(0) * radius,
						baseX+ Math.sin(radian*120) * radius, 	baseY + Math.cos(radian*120) * radius,
						baseX+ Math.sin(radian*240) * radius, 	baseY + Math.cos(radian*240) * radius, 
																								null,"#0040C0");
	createTrinagle(context,
						baseX+ Math.sin(tilt) * radius, 	baseY + Math.cos(tilt) * radius,
						baseX+ Math.sin(radian*120+tilt) * radius, 	baseY + Math.cos(radian*120+tilt) * radius,
						baseX+ Math.sin(radian*240+tilt) * radius, 	baseY + Math.cos(radian*240+tilt) * radius, 
																								null,"#0040C0");
		
	context.lineWidth=stripHeight;
	context.beginPath();
	context.moveTo(0,stripHeight);
	context.lineTo(wid,stripHeight);
	context.moveTo(0,hei- stripHeight);
	context.lineTo(wid,hei- stripHeight);
	context.closePath();
	context.stroke();
	
		
		
		/*
		context.fillStyle = "#FFDE00";
		context.arc(wid / 2, hei / 2, 30, 0, 2 * Math.PI, false);
		context.fill();
		context.strokeStyle = "#ff0000";
		context.beginPath();
		context.moveTo(Math.sin(0) * 30 + wid / 2, Math.cos(0) * 30 + hei/2);
		context.lineTo(Math.sin(radian*120) * 30 + wid / 2, Math.cos(radian*120) * 30 + hei/2);
		context.closePath();
		context.stroke();	
		*/

	addBoarder(context,wid,hei);
}

function createSomaliaFlag(){
	var canvas = document.getElementById("somalia");
	var wid = canvas.width;
	var hei = canvas.height;
	
	var context = canvas.getContext("2d");
		context.fillStyle = "#4189DD";
		context.fillRect(0,0,wid,hei);
		createStar(context,wid/2,hei/2,7,20,5,"#ffffff",null,0);

}

function createTurkeyFlag(){
	var canvas = document.getElementById("turkey");
	var wid = canvas.width;
	var hei = canvas.height;
	
	var context = canvas.getContext("2d");
		context.fillStyle = "#E30A17";
		context.fillRect(0,0,wid,hei);
		
		
		context.fillStyle = "#ffffff";
		context.beginPath();
		context.arc(wid / 2 - 23, hei / 2, 23, 0, 2 * Math.PI, false);
		context.closePath();
		context.fill();
		context.fillStyle = "#E30A17";
		context.beginPath();
		context.arc(wid / 2 - 18, hei / 2, 19, 0, 2 * Math.PI, false);
		context.closePath();
		context.fill();
		
		createStar(context,wid/2 + 13,hei/2,5,16,5,"#ffffff",null,15);
}

function createCanadaFlag(){
	var canvas = document.getElementById("canada");
	var wid = canvas.width;
	var hei = canvas.height;
	
	var context = canvas.getContext("2d");
	context.fillStyle="#FF0000";
	context.fillRect(0,0,50,100);
	context.fillRect(wid-50,0,50,100);

	context.beginPath();
	context.moveTo(84,19);
	context.bezierCurveTo(90,24,92,24,99,8);
	context.bezierCurveTo(106,23,107,23,113,19);
	context.bezierCurveTo(108,43,110,44,121,31);
	context.bezierCurveTo(122,37,124,38,135,35);
	context.bezierCurveTo(130,48,131,50,136,51);
	context.bezierCurveTo(117,66,116,67,118,73);
	context.bezierCurveTo(100,71,99,72,100,93);
	context.lineTo(97,93);
	context.bezierCurveTo(97,72,97,71,79,74);
	context.bezierCurveTo(81,67,80,66,62,51);
	context.bezierCurveTo(67,49,67,48,63,35);
	context.bezierCurveTo(74,38,75,37,77,31);
	context.bezierCurveTo(88,44,89,43,84,19);
	
	context.closePath();
	context.fill();	
	addBoarder(context,wid,hei);	
}

function createHaitiFlag(){
	var canvas = document.getElementById("haiti");
	var wid = canvas.width;
	var hei = canvas.height;
	
	var context = canvas.getContext("2d");	
	context.fillStyle="#00209F";
	context.fillRect(0,0,wid,hei/2);
	context.fillStyle="#D21034";
	context.fillRect(0,hei/2,wid,hei/2);
	
	var oIMG = new Image();
	oIMG.onload = function(){
		context.drawImage(this, (wid-this.width)/2, (hei-this.height)/2);
		//context.drawImage(this, 25,25,20,20,0,0,50,50);
		//var pattern = context.createPattern(this, "repeat");
		//createStar(context,wid/2,hei/2,20,50,20,pattern,"#ffffff",20);
	};
	oIMG.src = "img/haiti.png";

}


function createStar(context,baseX,baseY,innerRadius,outerRaduis,points,fillColor,strokeColor,tilt){
	var radian = Math.PI/180;
	var radianStepper = radian * ( 360/points) /2;
	var currentRadian =0;
	var radianTilt = tilt*radian;
	
	context.beginPath();
	context.moveTo(baseX+ Math.sin(currentRadian + radianTilt) * innerRadius,baseY+ Math.cos(currentRadian + radianTilt) * innerRadius);
	for(var i=0; i<points; i++){
		currentRadian +=  radianStepper;
		context.lineTo(baseX+ Math.sin(currentRadian + radianTilt) * outerRaduis,baseY+ Math.cos(currentRadian + radianTilt) * outerRaduis);
		currentRadian +=  radianStepper;
		context.lineTo(baseX+ Math.sin(currentRadian + radianTilt) * innerRadius,baseY+ Math.cos(currentRadian + radianTilt) * innerRadius);
	}
	context.closePath();
	
	if(fillColor){
		context.fillStyle = fillColor;
		context.fill();	
	}
	
	if(strokeColor){
		context.strokeStyle = strokeColor;
		context.stroke();	
	
	}
	
}


function fillTrinagle(context,x1,y1,x2,y2,x3,y3,color){
	context.fillStyle = color;
	context.beginPath();
	context.moveTo(x1,y1);
	context.lineTo(x2,y2);
	context.lineTo(x3,y3);
	context.lineTo(x1,y1);
	context.closePath();
	context.fill();
}

function createTrinagle(context,x1,y1,x2,y2,x3,y3,fillColor,strokeColor){
	context.beginPath();
	context.moveTo(x1,y1);
	context.lineTo(x2,y2);
	context.lineTo(x3,y3);
	context.lineTo(x1,y1);
	context.closePath();
	
	if(fillColor) {
		context.fillStyle = fillColor;
		context.fill();	
	}
	
	if(strokeColor){
		context.strokeStyle = strokeColor;
		context.stroke();	
	
	}
	
}



function addBoarder(context,wid,hei){
	context.lineWidth=1;
	context.strokeStyle = "#000000";
	context.beginPath();
	context.moveTo(0,0);
	context.lineTo(0,hei);
	context.lineTo(wid,hei);
	context.lineTo(wid,0);
	context.lineTo(0,0);
	context.closePath();
	context.stroke();
}
