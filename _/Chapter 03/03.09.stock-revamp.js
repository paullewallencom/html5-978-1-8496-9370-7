var chartInfo= { y:{min:11500, max:12900,steps:5,label:"close"},
				x:{label:"date",formatter:weeklyCapture}
				};			
var stockData;
var CHART_PADDING = 20;
var wid;
var hei;
function init(){
		
	var client = new XMLHttpRequest();
	client.open('GET', 'data/DJI.txt');
	
	client.onreadystatechange = function(e) {
	 if(e.target.readyState==4){
	 	
	 	var aStockInfo = e.target.responseText.split("\n");
	 	stockData = translateCSV(aStockInfo);
  		
  		startUp()
  		
	 }
	}
	
	client.send();
}

function startUp(){
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
	
	addStock(context,stockData);	
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
	var output; 
	for(var i=0; i<steps; i++){
		output = chartInfo.x.formatter && chartInfo.x.formatter(i);
		if(output || !chartInfo.x.formatter){
			currentX = startX + (i/steps) *	chartWidth;
			context.moveTo(currentX, startY );
			context.lineTo(currentX,endY);
			context.fillText(output?output:xData.min+stepSize*(i), currentX-6, endY+CHART_PADDING/2);
		}
	}
	
	if(!chartInfo.x.formatter){
		currentX = startX +	chartWidth;
		context.moveTo(currentX, startY );
		context.lineTo(currentX,endY);
		context.fillText(xData.max, currentX-3, endY+CHART_PADDING/2);
	}	
	
	context.stroke();
	
}


function addStock(context,data,isCandle){ 
	if(!chartInfo.x.max){
		chartInfo.x.min = 0;
		chartInfo.x.max = data.length;
		chartInfo.x.steps = data.length;	
	}
	
	fillChart(context,chartInfo);
	var elementWidth =(wid-CHART_PADDING*2)/ data.length;
	var startY = CHART_PADDING;
	var endY = hei-CHART_PADDING;
	var chartHeight = endY-startY;
	var stepSize = chartHeight/(chartInfo.y.max-chartInfo.y.min);
	var openY;
	var closeYOffset;
	var highY;
	var LowY;
	var currentX;
	context.strokeStyle = "#000000";
	for(i=0; i<data.length; i++){
		openY = (data[i].open-chartInfo.y.min)*stepSize;
		closeYOffset = (data[i].open-data[i].close)*stepSize;
		highY = (data[i].high-chartInfo.y.min)*stepSize;
		LowY =(data[i].low-chartInfo.y.min)*stepSize;
		context.beginPath();
		currentX = CHART_PADDING +elementWidth*(i+.5);
		context.moveTo(currentX,endY-highY);
		context.lineTo(currentX,endY-LowY);
		if(!isCandle){
			context.moveTo(currentX,endY-openY);
			context.lineTo(CHART_PADDING +elementWidth*(i+.25),endY-openY);
			context.moveTo(currentX,endY-openY+closeYOffset);
			context.lineTo(CHART_PADDING +elementWidth*(i+.75),endY-openY+closeYOffset);
			context.stroke();
		}else{
			context.rect(CHART_PADDING +elementWidth*i ,endY-openY,elementWidth,closeYOffset);
			context.stroke();
			context.fillStyle = closeYOffset<0? "#C2D985" :"#E3675C" ;
			context.fillRect(CHART_PADDING +elementWidth*i ,endY-openY,elementWidth,closeYOffset);
			
		}
		
	}
		
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


function translateCSV(data,startIndex){
	startIndex|=1; //if nothing set set to 1
	var newData = [];
	var aCurrent;
	var dataDate;
	for(var i=startIndex; i<data.length;i++){
		aCurrent = data[i].split(",");
		dataDate = aCurrent[0].charAt(0)=="a"?parseInt(aCurrent[0].slice(1)):parseInt(aCurrent[0]);
		newData.push({	date:dataDate,
						close:parseFloat(aCurrent[1]),
						high:parseFloat(aCurrent[2]),
						low:parseFloat(aCurrent[3]),
						open:parseFloat(aCurrent[4]),
						volume:parseFloat(aCurrent[5])
						});	
	}
	
	return newData;	
}

var DAY = 1000*60*60*24;
function weeklyCapture(i){
	var d;
	if(i==0){
		d =  new Date(stockData[i].date);	
	}else if ( i>1 && stockData[i].date != stockData[i-1].date+1 ){
		d = new Date(stockData[0].date + DAY*stockData[i].date );
	}
	
	return d? d.getMonth()+1+"/"+d.getDate():false;
	
}

