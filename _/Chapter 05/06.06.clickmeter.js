

var currentObject = {label:1,
				 value:0,
				 style:"rgba(241, 178, 225, .5)"};
var colorOptons = ["rgba(241, 178, 225, 1)","#B1DDF3","#FFDE89","#E3675C","#C2D985"];

var data = [];


var context;
var wid;
var hei;
function init(){
	
	var can = document.getElementById("bar");
	wid = can.width;
	hei = can.height;
	
	context = can.getContext("2d");
	
	
	document.addEventListener("click",onClick);
	interval = setInterval(onTimeReset,1000);
	refreshChart();
}


function onTimeReset(){
	if(currentObject.value){
		data.push(currentObject);
		if(data.length>25) data = data.slice(1);
		refreshChart();		
	}
	currentObject = {label:currentObject.label+1, value:0, style: colorOptons[currentObject.label%5]};

}

function onClick(e){
	currentObject.value++;
	refreshChart();
	}

function refreshChart(){
	var newData = data.slice(0);
	newData.push(currentObject);
	
	drawChart(newData);	

}

function drawChart(data){
	context.fillStyle = "#eeeeee";
	context.strokeStyle = "#999999";
	context.fillRect(0,0,wid,hei);
	
	var CHART_PADDING = 20;
	
	context.font = "12pt Verdana, sans-serif";
	context.fillStyle = "#999999";
	
	
	context.moveTo(CHART_PADDING,CHART_PADDING);
	context.lineTo(CHART_PADDING,hei-CHART_PADDING);
	context.lineTo(wid-CHART_PADDING,hei-CHART_PADDING);
	
	var stepSize = (hei - CHART_PADDING*2)/10;
	for(var i=0; i<10; i++){
		context.moveTo(CHART_PADDING, CHART_PADDING + i*	stepSize);
		context.lineTo(CHART_PADDING*1.3,CHART_PADDING + i*	stepSize);
		context.fillText(10-i, CHART_PADDING*1.5, CHART_PADDING + i*	stepSize + 6);
	}
	context.stroke();
	
	var elementWidth =(wid-CHART_PADDING*2)/ data.length;
	context.textAlign = "center";
	for(i=0; i<data.length; i++){
		context.fillStyle = data[i].style;
		context.fillRect(CHART_PADDING +elementWidth*i ,hei-CHART_PADDING - data[i].value*stepSize,elementWidth,data[i].value*stepSize);
		context.fillStyle = "rgba(255, 255, 225, 0.8)";
		context.fillText(data[i].label, CHART_PADDING +elementWidth*(i+.5), hei-CHART_PADDING*1.5);
		
	}	
}


