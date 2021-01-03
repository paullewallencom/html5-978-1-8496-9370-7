function LineChart(chartInfo,barData){
	this.chartInfo = chartInfo;
	this.barData = barData;
		
	this.HIDE_ELEMENT = -1;
	this.LINE_ELEMENT = 0;
	this.FILL_ELEMENT = 1;
	this.CHART_PADDING = 20;

	this.wid;
	this.hei;
	
		
	this.drawChart();
	
	var radContainer = document.getElementById("controllers");
	
	var hasLooped= false;
	for(var id in barData){
		
		radContainer.innerHTML += (hasLooped ? " || ":"") + barData[id].label +": " ;

		this.appendRadioButton(radContainer,id,-1," off ");
		this.appendRadioButton(radContainer,id,0," line ");
		this.appendRadioButton(radContainer,id,1," full ");
		hasLooped = true;
		
	}
	
	var radios ;
	for(id in barData){
		radios = document.getElementsByName(id);
		for (var i=0; i<radios.length; i++){
			 radios[i].onchange = this.bind(this, this.onChangedRadio);
			if(radios[i].value == barData[id].status ){
				 radios[i].checked = true;	 
			}
		}	
	}
	
}

LineChart.prototype.bind = function(scope, fun){
	 return function () {
        fun.apply(scope, arguments);
    };
	
}


LineChart.prototype.drawChart =function(){
	var can = document.getElementById("base");
	
	this.wid = can.width;
	this.hei = can.height;
	var context = can.getContext("2d");
	
	context.lineWidth = 1;
	context.fillStyle = "#eeeeee";
	context.strokeStyle = "#999999";
	context.fillRect(0,0,this.wid,this.hei);
	
	context.font = "10pt Verdana, sans-serif";
	context.fillStyle = "#999999";
	
	context.moveTo(this.CHART_PADDING,this.CHART_PADDING);
	context.rect(this.CHART_PADDING,this.CHART_PADDING,this.wid-this.CHART_PADDING*2,this.hei-this.CHART_PADDING*2);
	context.stroke();
	context.strokeStyle = "#cccccc";
	this.fillChart(context,this.chartInfo);
	
	var chartContainer = document.getElementById("chartContainer");

	
	for(var id in this.barData){
		can = document.createElement("canvas");
		can.id=id;
        can.width=this.wid;
        can.height=this.hei; 
		can.setAttribute("class","canvasLayer");
		chartContainer.appendChild(can);
		this.changeLineView(id,this.barData[id].status);

	}
	
}


LineChart.prototype.appendRadioButton = function(container, id,value,text){
	var radioButton = document.createElement("input");
	radioButton.setAttribute("type", "radio");
	radioButton.setAttribute("value", value);
	radioButton.setAttribute("name", id);
	
	container.appendChild(radioButton);
	
	container.innerHTML += text;
}


LineChart.prototype.onChangedRadio = function (e){
	this.changeLineView(e.target.name,e.target.value);
}

LineChart.prototype.changeLineView = function(id,value){
	this.barData[id].status = value;
	var dataSource = this.barData[id];
		
	can = document.getElementById(id);
	context = can.getContext("2d");
	context.clearRect(0,0,this.wid,this.hei);
	if( dataSource.status!=this.HIDE_ELEMENT){
		context.beginPath();
		this.addLine(context,this.formatData(dataSource.data, dataSource.label,dataSource.style),dataSource.style,dataSource.status==1);
	}
}

LineChart.prototype.fillChart = function (context, chartInfo){ 
	var startY = this.CHART_PADDING;
	var endY = this.hei-this.CHART_PADDING;
	var chartHeight = endY-startY;
	
	var yData = this.chartInfo.y;
	var steps = yData.steps;
	var rangeLength = yData.max-yData.min;
	var stepSize = rangeLength/steps;
	
	var currentY;
	
	context.textAlign = "left";
	for(var i=0; i<steps; i++){
		currentY = startY + (i/steps) *	chartHeight;
		context.moveTo(this.wid-this.CHART_PADDING, currentY );
		context.lineTo(this.CHART_PADDING,currentY);
		context.fillText(yData.min+stepSize*(steps-i), 0, currentY+4);
	}
	
	currentY = startY +	chartHeight;
	context.moveTo(this.CHART_PADDING, currentY );
	context.lineTo(this.CHART_PADDING/2,currentY);
	context.fillText(yData.min, 0, currentY-3);
	
	
	var xData = chartInfo.x;
	steps = xData.steps;
	var startX = this.CHART_PADDING;
	var endX = this.wid-this.CHART_PADDING;
	var chartWidth = endX-startX;
	var currentX;
	rangeLength = xData.max-xData.min;
	stepSize = rangeLength/steps;
	context.textAlign = "left";
	for(var i=0; i<steps; i++){
		currentX = startX + (i/steps) *	chartWidth;
		context.moveTo(currentX, startY );
		context.lineTo(currentX,endY);
		context.fillText(xData.min+stepSize*(i), currentX-6, endY+this.CHART_PADDING/2);
	}
	
	currentX = startX +	chartWidth;
	context.moveTo(currentX, startY );
	context.lineTo(currentX,endY);
	context.fillText(xData.max, currentX-3, endY+this.CHART_PADDING/2);
	
	
	context.stroke();
	
}

LineChart.prototype.addLine = function(context,data,style,isFill){ 
	var chartInfo = this.chartInfo;
	var yDataLabel = chartInfo.y.label;
	var xDataLabel = chartInfo.x.label;
	var yDataRange = chartInfo.y.max-chartInfo.y.min;
	var xDataRange = chartInfo.x.max-chartInfo.x.min;
	var chartHeight = this.hei- this.CHART_PADDING*2;
	var chartWidth = this.wid- this.CHART_PADDING*2;
	
	var yPos;
	var xPos;
	context.strokeStyle = style;
	context.beginPath();
	context.lineWidth = 3;
	
	if(!isFill){
		for(var i=0; i<data.length;i++){
			xPos = this.CHART_PADDING + (data[i][xDataLabel]-chartInfo.x.min)/xDataRange * chartWidth;
			yPos = (this.hei - this.CHART_PADDING)  -(data[i][yDataLabel]-chartInfo.y.min)/yDataRange * chartHeight;
			
			context.fillStyle = data[i].style;
			context.fillRect(xPos-4 ,yPos-4,8,8);
			
			i==0? context.moveTo(xPos,yPos):context.lineTo(xPos,yPos);
		}	
		if(style)context.stroke();
	}else{
		context.fillStyle = style;
		context.globalAlpha = .6;
		context.moveTo(this.CHART_PADDING,this.hei - this.CHART_PADDING)
		for(var i=0; i<data.length;i++){
			xPos = this.CHART_PADDING + (data[i][xDataLabel]-chartInfo.x.min)/xDataRange * chartWidth;
			yPos = (this.hei - this.CHART_PADDING)  -(data[i][yDataLabel]-chartInfo.y.min)/yDataRange * chartHeight;
			
			context.lineTo(xPos,yPos);
	
		}
		context.lineTo(	this.CHART_PADDING + chartWidth, this.CHART_PADDING+chartHeight);
		context.closePath();
		context.fill();	
		context.globalAlpha = 1;
	}
}

LineChart.prototype.formatData = function(data , labelCopy , style){
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


window.onload = init;


function init(){
	var chartInfo= { y:{min:0, max:300, steps:5,label:"users"},
				x:{min:1, max:12, steps:11,label:"months"}
			};
			
	var barData = {
				i2011:{
					status:	1,
					style: "#B1DDF3",
					label: "2011",
					data:[38,65,85,111,131,160,187,180,205,146,64,212]
				},
				i2010:{
					status:	1,
					style: "#FFDE89",
					label: "2010",
					data:[212,146,205,180,187,131,291,42,98,61,74,69]
				},	

				i2009:{
					status:	1,
					style: "#E3675C",
					label: "2009",
					data:[17,46,75,60,97,131,71,52,38,21,84,39]
				}
									
			};		
	
	
	new LineChart(chartInfo,barData);	
}



