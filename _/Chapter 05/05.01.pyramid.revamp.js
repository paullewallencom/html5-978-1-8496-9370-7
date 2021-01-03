var layers = [{label:"Completed Chapter 1", amount:23, style:"#B1DDF3"},
			  {label:"Completed Chapter 2", amount:15, style:"#FFDE89"},
			  {label:"Completed Chapter 3", amount:11, style:"#E3675C"},
			  {label:"Completed Chapter 4", amount:7, style:"#C2D985"},
			  {label:"Completed Chapter 5", amount:3, style:"#999999"}];

var chartInfo= {height:200, width:200};

var s = { outlinePadding:4,
				barSize:16,
				font:"12pt Verdana, sans-serif",
				background:"eeeeee",
				stroke:"cccccc",
				text:"605050"
				};	

var wid;
var hei;
var totalPixels;
var totalData=0;
var pixelsPerData;
var currentTriangleHeight = chartInfo.height;

function init(){
	var can = document.getElementById("bar");
	
	wid = can.width;
	hei = can.height;
	totalPixels = (chartInfo.height * chartInfo.width) / 2; 
	for(var i in layers) totalData +=layers[i].amount;
	
	pixelsPerData = totalPixels/totalData;
	
	
	var context = can.getContext("2d");
		context.fillStyle = s.background;
		context.strokeStyle = s.stroke;
	
	context.translate(wid/2,hei/2 - chartInfo.height/2);
	
	context.moveTo(-chartInfo.width/2 , chartInfo.height);
	context.lineTo(chartInfo.width/2,chartInfo.height);
	context.lineTo(0,0);
	context.lineTo(-chartInfo.width/2 , chartInfo.height);
	context.stroke();
	var secHeight = 0;
	for(i=0;i<layers.length-1; i++){
		context.beginPath();
		findLine(context, 0,true);
		secHeight = findLine(context, layers[i].amount);
		currentTriangleHeight -= secHeight;
		context.fillStyle = layers[i].style;
		context.fill();	
		context.fillStyle = s.text;
		context.fillText(layers[i].label, currentTriangleHeight/2 +secHeight/2, currentTriangleHeight+secHeight/2);
	}
	
	context.beginPath();
	findLine(context, 0,true);
	context.lineTo(0,0);
	context.fillStyle = layers[i].style;
	context.fill();	
	context.fillStyle = s.text;
	context.fillText(layers[i].label, currentTriangleHeight/2 , currentTriangleHeight/2);
	
}




function findLine(context,val,isMove){
	var newHeight = currentTriangleHeight;
	var pixels = pixelsPerData * val;
	var lines = parseInt(pixels/newHeight); //rounded
	
	pixels = lines*lines/2; //missing pixels
	
	newHeight-=lines;
	
	lines += parseInt(pixels/newHeight); // rounded extra lines can get deeper into this but this will do
	
	newHeight = currentTriangleHeight-lines;
	
	if(isMove){
		context.moveTo(newHeight/2,newHeight);	
		context.lineTo(-newHeight/2 , newHeight);
	}else{
		context.lineTo(-newHeight/2 , newHeight);
		context.lineTo(newHeight/2,newHeight);	
	}
	
	
	return lines;
}



	
