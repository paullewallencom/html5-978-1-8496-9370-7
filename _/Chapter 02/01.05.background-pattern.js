function init(){
		
		createEye();	
}



function createEye(){
	var canvas = document.getElementById("bgpatern");
	var wid = canvas.width;
	var hei = canvas.height;
	var radian = Math.PI/180;
	
	var context = canvas.getContext("2d");
	var oIMG = new Image();
	oIMG.onload = function(){
		var pattern = context.createPattern(this, "repeat");
		context.fillStyle = pattern;
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

		context.drawImage(this, (wid-this.width)/2, (hei-this.height)/2);
		//context.drawImage(this, 25,25,20,20,0,0,50,50);
	};
	oIMG.src = "img/haiti.png";
	
	
}

