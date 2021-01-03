var a2011 = [38,65,85,111,131,160,187,180,205,146,64,212];
var a2010 = [212,146,205,180,187,131,291,42,98,61,74,69];
var a2009 = [17,46,75,60,97,131,71,52,38,21,84,39];


var chartInfo= { y:{min:0, max:300, steps:5,label:"users"},
				x:{min:1, max:12, steps:11,label:"months"}
			};


var HIDE_ELEMENT = -1;
var LINE_ELEMENT = 0;
var FILL_ELEMENT = 1;


var CHART_PADDING = 20;
var wid;
var hei;
var context;


function init(){
	var can = document.getElementById("base");
	
	wid = can.width;
	hei = can.height;
	context = can.getContext("2d");
	
	drawChartFrame(context);
	
	
	can = document.getElementById("bar1");
	context = can.getContext("2d");
	addLine(context,formatData(a2011, "/2011","#B1DDF3"),"#B1DDF3",false);
	
	/*can = document.getElementById("bar2");
	context = can.getContext("2d");
	if(elementStatus.i2010>-1) addLine(context,formatData(a2010, "/2010","#FFDE89"),"#FFDE89",elementStatus.i2010==1);
	
	can = document.getElementById("bar3");
	context = can.getContext("2d");
	if(elementStatus.i2009>-1) addLine(context,formatData(a2009, "/2009","#E3675C"),"#E3675C",elementStatus.i2009==1);*/
		
}

function drawChartFrame(context){
	context.lineWidth = 1;
	context.fillStyle = "#eeeeee";
	context.strokeStyle = "#999999";
	context.fillRect(0,0,wid,hei);
	
	context.font = "10pt Verdana, sans-serif";
	context.fillStyle = "#999999";
	
	context.moveTo(CHART_PADDING,CHART_PADDING);
	context.rect(CHART_PADDING,CHART_PADDING,wid-CHART_PADDING*2,hei-CHART_PADDING*2);
	context.stroke();
	context.strokeStyle = "#cccccc";
	fillChart(context,chartInfo);

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

function addLine(context,data,style,isFill){ 
	var yDataLabel = chartInfo.y.label;
	var xDataLabel = chartInfo.x.label;
	var yDataRange = chartInfo.y.max-chartInfo.y.min;
	var xDataRange = chartInfo.x.max-chartInfo.x.min;
	var chartHeight = hei- CHART_PADDING*2;
	var chartWidth = wid- CHART_PADDING*2;
	
	var yPos;
	var xPos;
	var slowDrawID;
	context.strokeStyle = style;
	context.beginPath();
	context.lineWidth = 3;
	
	if(!isFill){
		xPos = CHART_PADDING + (data[0][xDataLabel]-chartInfo.x.min)/xDataRange * chartWidth;
		yPos = (hei - CHART_PADDING)  -(data[0][yDataLabel]-chartInfo.y.min)/yDataRange * chartHeight;
			
		registerLineDraw(context,xPos,yPos,100);
		
		for(var i=0; i<data.length;i++){
			xPos = CHART_PADDING + (data[i][xDataLabel]-chartInfo.x.min)/xDataRange * chartWidth;
			yPos = (hei - CHART_PADDING)  -(data[i][yDataLabel]-chartInfo.y.min)/yDataRange * chartHeight;
			
			context.fillStyle = data[i].style;
			context.fillRect(xPos-4 ,yPos-4,8,8);
			
			addPoint(context,xPos,yPos);
	
		}	
		startLineDraw(context);
		//if(style)context.stroke();
	}else{
		context.fillStyle = style;
		context.globalAlpha = .6;
		context.moveTo(CHART_PADDING,hei - CHART_PADDING)
		for(var i=1; i<data.length;i++){
			xPos = CHART_PADDING + (data[i][xDataLabel]-chartInfo.x.min)/xDataRange * chartWidth;
			yPos = (hei - CHART_PADDING)  -(data[i][yDataLabel]-chartInfo.y.min)/yDataRange * chartHeight;
			
			context.lineTo(xPos,yPos);
	
		}
		context.lineTo(	CHART_PADDING + chartWidth, CHART_PADDING+chartHeight);
		context.closePath();
		context.fill();	
		context.globalAlpha = 1;
	}
}

var slowDrawHelper = {};


function registerLineDraw(context,x,y,speed){
	slowDrawHelper[context.canvas.id] = {	context:context,
											speed:speed,
											startPoint:{x:x,y:y},
											points:[]};//setInterval(slowDrawPoint,speed,context)
}

function addPoint(context,x,y){
	slowDrawHelper[context.canvas.id].points.push({x:x,y:y});	
}

function startLineDraw(context){
	var ref = 	slowDrawHelper[context.canvas.id];
	
	context.moveTo(ref.startPoint.x,ref.startPoint.y);
	//context.lineTo(66,302);
	//context.stroke();
	ref.interval = setInterval( triggerLineQue, 250,ref);
}

function triggerLineQue(ref){
	if(ref.points.length>0){
		var point = ref.points[0];
		ref.points.splice(0, 1);
		ref.context.lineTo(point.x,point.y);
		
		ref.context.stroke();
		
		console.log(point.x,100*Math.random());
	}else{
		var chartHeight = hei- CHART_PADDING*2;
		var chartWidth = wid- CHART_PADDING*2;
		ref.context.lineTo(	CHART_PADDING + chartWidth, CHART_PADDING+chartHeight);
		ref.context.lineTo(	CHART_PADDING , CHART_PADDING+chartHeight);
		//ref.context.stroke();
		ref.context.fill();
		clearInterval(ref.interval);	
	}
	
}



function formatData(data , labelCopy , style){
	newData = [];
	for(var i=0; i<data.length;i++){
		newData.push({	label:(i+1)+labelCopy,
						users:data[i],
						months:i+1,
						style:style
						});	
	}
	
	return newData;	
}

