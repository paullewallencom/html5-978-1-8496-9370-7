var data = [{label:"David",
			 math:50,
			 english:80,
			 art:92
			 style:"rgba(241, 178, 225, 0.5)"},
			 {label:"Ben",
			 math:80,
			 english:60,
			 art:43,
			 style:"#B1DDF3"},
			 {label:"Oren",
			 math:70,
			 english:20,
			 art:92,
			 style:"#FFDE89"},
			 {label:"Barbera",
			 math:90,
			 english:55,
			 art:81,
			 style:"#E3675C"},
			 {label:"Belann",
			 math:50,
			 english:50,
			 art:50
			 style:"#C2D985"}];

var chartInfo= { y:{min:40, max:100, steps:5,label:"math"},
				x:{min:40, max:100, steps:4,label:"english"}
			};
var CHART_PADDING = 30;
var wid;
var hei;
function init(){
	
	var can = document.getElementById("bar");
	
	wid = can.width;
	hei = can.height;
	var context = can.getContext("2d");
	context.fillStyle = "#eeeeee";
	context.strokeStyle = "#999999";
	context.fillRect(0,0,wid,hei);
	
	context.font = "10pt Verdana, sans-serif";
	context.fillStyle = "#999999";
	
	
	context.moveTo(CHART_PADDING,CHART_PADDING);
	context.lineTo(CHART_PADDING,hei-CHART_PADDING);
	context.lineTo(wid-CHART_PADDING,hei-CHART_PADDING);
	
	fillChart(context,chartInfo);
	createDots(context,data);
	
}

function fillChart(context, chartInfo){ 
	var startY = CHART_PADDING;
	var endY = hei-CHART_PADDING;
	var chartHeight = endY-startY;
	
	var yData = chartInfo.y;
	var steps = yData.steps;
	var rangeLength = yData.max-yData.min;
	var stepSize = rangeLength/steps;
	
	var currentY;
	
	context.textAlign = "left";
	for(var i=0; i<steps; i++){
		currentY = startY + (i/steps) *	chartHeight;
		context.moveTo(wid-CHART_PADDING, currentY );
		context.lineTo(CHART_PADDING,currentY);
		context.fillText(yData.min+stepSize*(steps-i), 0, currentY+4);
	}
	
	currentY = startY +	chartHeight;
	context.moveTo(CHART_PADDING, currentY );
	context.lineTo(CHART_PADDING/2,currentY);
	context.fillText(yData.min, 0, currentY-3);
	
	
	var xData = chartInfo.x;
	steps = xData.steps;
	var startX = CHART_PADDING;
	var endX = wid-CHART_PADDING;
	var chartWidth = endX-startX;
	var currentX;
	rangeLength = xData.max-xData.min;
	stepSize = rangeLength/steps;
	context.textAlign = "left";
	for(var i=0; i<steps; i++){
		currentX = startX + (i/steps) *	chartWidth;
		context.moveTo(currentX, startY );
		context.lineTo(currentX,endY);
		context.fillText(xData.min+stepSize*(i), currentX-6, endY+CHART_PADDING/2);
	}
	
	currentX = startX +	chartWidth;
	context.moveTo(currentX, startY );
	context.lineTo(currentX,endY);
	context.fillText(xData.max, currentX-3, endY+CHART_PADDING/2);
	
	
	context.stroke();
	
}

function createDots(context,data){ 
	var yDataLabel = chartInfo.y.label;
	var xDataLabel = chartInfo.x.label;
	var yDataRange = chartInfo.y.max-chartInfo.y.min;
	var xDataRange = chartInfo.x.max-chartInfo.x.min;
	var chartHeight = hei- CHART_PADDING*2;
	var chartWidth = wid- CHART_PADDING*2;
	
	var yPos;
	var xPos;
	
	for(var i=0; i<data.length;i++){
		xPos = CHART_PADDING + (data[i][xDataLabel]-chartInfo.x.min)/xDataRange * chartWidth;
		yPos = (hei - CHART_PADDING)  -(data[i][yDataLabel]-chartInfo.y.min)/yDataRange * chartHeight;
		
		context.fillStyle = data[i].style;
		context.fillRect(xPos-4 ,yPos-4,8,8);


	}	
}

