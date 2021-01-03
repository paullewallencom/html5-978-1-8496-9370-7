var data = [{label:"David",
				 value:3,
				 style:"rgba(241, 178, 225, 0.5)"},
				 {label:"Ben",
				 value:2,
				 style:"#B1DDF3"},
				 {label:"Oren",
				 value:9,
				 style:"#FFDE89"},
				 {label:"Barbera",
				 value:6,
				 style:"#E3675C"},
				 {label:"Belann",
				 value:10,
				 style:"#C2D985"}];

var chartYData = [{label:"10 cats", value:10},
				  {label:"5 cats", value:5},
				  {label:"3 cats",value:3}];
var range = {min:0, max:10};

var CHART_PADDING = 20;
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
	
	context.font = "12pt Verdana, sans-serif";
	context.fillStyle = "#999999";
	
	
	context.moveTo(CHART_PADDING,CHART_PADDING);
	context.lineTo(CHART_PADDING,hei-CHART_PADDING);
	context.lineTo(wid-CHART_PADDING,hei-CHART_PADDING);
	
	fillChart(context,chartYData);
	createBars(context,data);
	
}

function fillChart(context, stepsData){ 
	var steps = stepsData.length;
	var startY = CHART_PADDING;
	var endY = hei-CHART_PADDING;
	var chartHeight = endY-startY;
	var currentY;
	var rangeLength = range.max-range.min;
	for(var i=0; i<steps; i++){
		currentY = startY + (1-(stepsData[i].value/rangeLength)) *	chartHeight;
		context.moveTo(CHART_PADDING, currentY );
		context.lineTo(CHART_PADDING*1.3,currentY);
		context.fillText(stepsData[i].label, CHART_PADDING*1.5, currentY+6);
	}
	context.stroke();
	
}

function createBars(context,data){ 
	var elementWidth =(wid-CHART_PADDING*2)/ data.length;
	var startY = CHART_PADDING;
	var endY = hei-CHART_PADDING;
	var chartHeight = endY-startY;
	var rangeLength = range.max-range.min;
	var stepSize = chartHeight/rangeLength;
	context.textAlign = "center";
	for(i=0; i<data.length; i++){
		context.fillStyle = data[i].style;
		context.fillRect(CHART_PADDING +elementWidth*i ,hei-CHART_PADDING - data[i].value*stepSize,elementWidth,data[i].value*stepSize);
		context.fillStyle = "rgba(255, 255, 225, 0.8)";
		context.fillText(data[i].label, CHART_PADDING +elementWidth*(i+.5), hei-CHART_PADDING*1.5);
		
	}
		
}

