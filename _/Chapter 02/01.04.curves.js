function init(){
		createPacman();
		createEye();	
		createOval();	
}


function createPacman(){
	var canvas = document.getElementById("pacman");
	var wid = canvas.width;
	var hei = canvas.height;
	var radian = Math.PI/180;
	
	var context = canvas.getContext("2d");
		context.fillStyle = "#000000";
		context.fillRect(0,0,wid,hei);
		context.beginPath();
		
		context.fillStyle = "#F3F100";
		
		context.moveTo(wid/2,hei/2);
		context.arc(wid / 2, hei / 2, 40, 40*radian, 320*radian, false);
		context.lineTo(wid/2,hei/2);
		context.closePath();
		context.fill();
}

function createEye(){
	var canvas = document.getElementById("eye");
	var wid = canvas.width;
	var hei = canvas.height;
	var radian = Math.PI/180;
	
	var context = canvas.getContext("2d");
		context.fillStyle = "#dfdfdf";
		context.fillRect(0,0,wid,hei);
		context.beginPath();
		context.lineWidth = 1;
		context.strokeStyle = "black"; // line color	
		context.fillStyle = "#ffffff";
		context.moveTo(0,hei/2);
		context.quadraticCurveTo(wid / 2, 0, wid,hei/2);
		context.quadraticCurveTo(wid / 2, hei, 0,hei/2);
		context.closePath();
		context.stroke();
		context.fill();
}

function createOval(){
	var canvas = document.getElementById("oval");
	var wid = canvas.width;
	var hei = canvas.height;
	var radian = Math.PI/180;
	
	var context = canvas.getContext("2d");
		context.fillStyle = "#dfdfdf";
		context.fillRect(0,0,wid,hei);
		context.beginPath();
		context.lineWidth = 1;
		context.strokeStyle = "black"; // line color	
		context.fillStyle = "#ffff00";
		context.moveTo(2,hei/2);
		context.bezierCurveTo(0, 0,wid,0, wid-2,hei/2);
		context.bezierCurveTo(wid, hei,0,hei, 2,hei/2);
		context.closePath();
		context.stroke();
		context.fill();
}