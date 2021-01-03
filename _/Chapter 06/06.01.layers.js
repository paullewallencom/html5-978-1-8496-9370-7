var chartInfo= { y:{min:0, max:300, steps:5,label:"users"},
				x:{min:1, max:12, steps:11,label:"months"}
			};


var HIDE_ELEMENT = -1;
var LINE_ELEMENT = 0;
var FILL_ELEMENT = 1;

	
var barData = {
				i2009:{
					status:	FILL_ELEMENT,
					style: "#E3675C",
					label: "/2009",
					data:[17,46,75,60,97,131,71,52,38,21,84,39]
				},
				i2010:{
					status:	FILL_ELEMENT,
					style: "#FFDE89",
					label: "/2010",
					data:[212,146,205,180,187,131,291,42,98,61,74,69]
				},
				i2011:{
					status:	FILL_ELEMENT,
					style: "#B1DDF3",
					label: "/2011",
					data:[38,65,85,111,131,160,187,180,205,146,64,212]
				}	
	
			};


var CHART_PADDING = 20;
var wid;
var hei;

window.onload = init;

function init(){
	drawChart();
	
	var radios ;
	for(var id in barData){
		radios = document.getElementsByName(id);
		for (var rid in radios){
			 radios[rid].onchange = onChangedRadio;
			if(radios[rid].value == barData[id].status ) radios[rid].checked = true;	 
		}
		
	}
	
}

function drawChart(){
	var can = document.getElementById("base");
	
	wid = can.width;
	hei = can.height;
	var context = can.getContext("2d");
	
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
	
	changeLineView("i2011",barData.i2011.status);
	changeLineView("i2010",barData.i2010.status);
	changeLineView("i2009",barData.i2009.status);
	
}

function onChangedRadio(e){
	changeLineView(e.target.name,e.target.value);
}

function changeLineView(id,value){
	barData[id].status = value;
	var dataSource = barData[id];
		
	can = document.getElementById(id);
	context = can.getContext("2d");
	context.clearRect(0,0,wid,hei);
	if( dataSource.status!=HIDE_ELEMENT){
		context.beginPath();
		addLine(context,formatData(dataSource.data, dataSource.label,dataSource.style),dataSource.style,dataSource.status==1);
	}
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

