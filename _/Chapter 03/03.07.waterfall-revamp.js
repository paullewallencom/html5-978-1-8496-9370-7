var a2011 = [60,60,60,111,-31,-80,0,-43,-29,14,64,12];

var chartInfo= { y:{steps:5,label:"users"},
				x:{min:1, max:12, steps:11,label:"months"}
				};
			

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
	
	context.font = "10pt Verdana, sans-serif";
	context.fillStyle = "#999999";
	
	
	context.moveTo(CHART_PADDING,CHART_PADDING);
	context.rect(CHART_PADDING,CHART_PADDING,wid-CHART_PADDING*2,hei-CHART_PADDING*2);
	context.stroke();
	context.strokeStyle = "#cccccc";
	
	createWaterfall(context,formatData(a2011));		
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
		context.fillText(formatNumber(yData.min+stepSize*(steps-i),2), 0, currentY+4);
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
	fillChart(context,chartInfo);
	var yDataLabel = chartInfo.y.label;
	var xDataLabel = chartInfo.x.label;
	var yDataRange = chartInfo.y.max-chartInfo.y.min;
	var xDataRange = chartInfo.x.max-chartInfo.x.min;
	var chartHeight = hei- CHART_PADDING*2;
	var chartWidth = wid- CHART_PADDING*2;
	
	var yPos;
	var xPos;
	context.strokeStyle = style;
	context.beginPath();
	context.lineWidth = 3;
	
	if(!isFill){
		for(var i=0; i<data.length;i++){
			xPos = CHART_PADDING + (data[i][xDataLabel]-chartInfo.x.min)/xDataRange * chartWidth;
			yPos = (hei - CHART_PADDING)  -(data[i][yDataLabel]-chartInfo.y.min)/yDataRange * chartHeight;
			
			context.fillStyle = data[i].style;
			context.fillRect(xPos-4 ,yPos-4,8,8);
			
			i==0? context.moveTo(xPos,yPos):context.lineTo(xPos,yPos);
	
		}	
		if(style)context.stroke();
	}else{
		context.fillStyle = style;
		context.globalAlpha = .6;
		context.moveTo(CHART_PADDING,hei - CHART_PADDING)
		for(var i=0; i<data.length;i++){
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

function createBars(context,data){ 
	fillChart(context,chartInfo);
	var range = chartInfo.x;
	var elementWidth =(wid-CHART_PADDING*2)/ data.length;
	var startY = CHART_PADDING;
	var endY = hei-CHART_PADDING;
	var chartHeight = endY-startY;
	var stepSize = chartHeight/(chartInfo.y.max-chartInfo.y.min);
	context.textAlign = "center";
	for(i=0; i<data.length; i++){
		context.fillStyle = data[i].style;
		context.fillRect(CHART_PADDING +elementWidth*i ,endY - data[i][chartInfo.y.label]*stepSize,elementWidth,data[i][chartInfo.y.label]*stepSize);
		context.fillStyle = "rgba(255, 255, 225, 0.8)";
		context.fillText(data[i].label, CHART_PADDING +elementWidth*(i+.5), hei-CHART_PADDING*1.5);
		
	}
		
}



function createWaterfall(context,data){ 
	if(!chartInfo.y.min || !chartInfo.y.max) 
		updateCumalitiveChartInfo(chartInfo,data);
	
	fillChart(context,chartInfo);
	
	var range = chartInfo.x;
	var elementWidth =(wid-CHART_PADDING*2)/ data.length;
	var startY = CHART_PADDING;
	var endY = hei-CHART_PADDING;
	var chartHeight = endY-startY;
	var stepSize = chartHeight/(chartInfo.y.max-chartInfo.y.min);
	var currentY= endY;
	var elementValue ;
	var total=0;
	context.textAlign = "center";
	
	for(i=0; i<data.length; i++){
		elementValue = data[i][chartInfo.y.label];
		total +=elementValue;
		if(elementValue!=0){
			context.fillStyle = elementValue>0? "#C2D985" :"#E3675C" ;
			currentY -=(elementValue*stepSize);
			context.fillRect(CHART_PADDING +elementWidth*i ,currentY,elementWidth,elementValue*stepSize);
		}else{
			context.fillStyle = "#B1DDF3" ;
			
			context.fillRect(CHART_PADDING +elementWidth*i ,currentY,elementWidth,endY-currentY);
			elementValue = total; //hack so we see the right value
		}
		context.fillStyle = "rgba(255, 255, 255, .8)";
		
		context.fillText(elementValue, CHART_PADDING +elementWidth*(i+.5), endY - (stepSize*total) + (stepSize*elementValue/2) + 6);
		
	}
		
}

function updateCumalitiveChartInfo(chartInfo,data){
	var aTotal=[];
	var total = 0;
	aTotal.push(total);
	for(i=0; i<data.length; i++){
		total +=data[i][chartInfo.y.label]
		aTotal.push(total);
		
	}
	chartInfo.y.min = Math.min.apply(this,aTotal);
	chartInfo.y.max = Math.max.apply(this,aTotal);
}

function formatNumber(num,lead){
	for(var i=0;i<lead;i++) num*=10;
	num = parseInt(num);
	for(var i=0;i<lead;i++) num/=10;
	return num;	
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

