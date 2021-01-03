var layers = [{label:"Completed Chapter 1", amount:23},
			  {label:"Completed Chapter 2", amount:15},
			  {label:"Completed Chapter 3", amount:11},
			  {label:"Completed Chapter 4", amount:7},
			  {label:"Completed Chapter 5", amount:3} ];

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
	
	for(i=0; i+1<layers.length; i++) findLine(context, layers[i].amount);
		
	context.stroke();
}

function findLine(context,val){
	var newHeight = currentTriangleHeight;
	var pixels = pixelsPerData * val;
	var lines = parseInt(pixels/newHeight); //rounded
	
	pixels = lines*lines/2; //missing pixels
	
	newHeight-=lines;
	
	lines += parseInt(pixels/newHeight); // rounded extra lines can get deeper into this but this will do
	
	currentTriangleHeight-=lines; //triangle gets smaller each time we take some of its bottom out.
	
	
	context.moveTo(-currentTriangleHeight/2 , currentTriangleHeight);
	context.lineTo(currentTriangleHeight/2,currentTriangleHeight);
}



	
