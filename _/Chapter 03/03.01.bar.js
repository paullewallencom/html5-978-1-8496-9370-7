function init(){
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

	
	var can = document.getElementById("bar");
	var wid = can.width;
	var hei = can.height;
	
	
	var context = can.getContext("2d");
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


