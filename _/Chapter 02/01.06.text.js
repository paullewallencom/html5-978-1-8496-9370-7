function init(){
	var canvas = document.getElementById("textCanvas");
	var wid = canvas.width;
	var hei = canvas.height;
	
	var context = canvas.getContext("2d");
	
	var grd = context.createLinearGradient(wid/2, hei/2, wid, hei);
	grd.addColorStop(0, "#8ED6FF"); 
	grd.addColorStop(1, "#004CB3");
	context.fillStyle= grd;
	context.fillRect(0,0,wid,hei);
	
	grd = context.createLinearGradient(100, hei/2, 200, hei/2+110);
	grd.addColorStop(0, "#ffff00"); 
	grd.addColorStop(1, "#aaaa44");

	context.font = "50pt Verdana, sans-serif";
	context.fillStyle = grd;
	context.shadowOffsetX = 0;
	context.shadowOffsetY = 0;
	context.shadowBlur    = 8;
	context.shadowColor   = 'rgba(255, 255, 255, 0.5)';
	context.fillText("Hello World!", 100, hei/2);
	context.strokeStyle = "#ffffff";
	context.strokeText("Hello World!", 100, hei/2);
	
}



