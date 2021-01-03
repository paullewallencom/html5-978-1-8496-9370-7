var students2001 = [{name:"Ben",
					 math:30,
					 english:60,
					 programing:30},
					 {name:"Joe",
					 math:40,
					 english:60,
					 programing:40},
					 {name:"Danny",
					 math:50,
					 english:90,
					 programing:50},
					 {name:"Mary",
					 math:60,
					 english:60,
					 programing:60},
					 {name:"Jim",
					 math:80,
					 english:20,
					 programing:80}];

var chartInfo= { y:{min:0, max:100,steps:5,label:"math"},
				x:{min:0, max:100,steps:5,label:"programing"},
				bubble:{min:0, max:100, minRadius:3, maxRadius:20,label:"english"}
			   };
var styling = { outlinePadding:4,
				barSize:16,
				font:"12pt Verdana, sans-serif",
				background:"eeeeee",
				bar:"cccccc",
				text:"605050"
				};	

var wid;
var hei;

function init(){
	var can = document.getElementById("bar");
	
	wid = can.width;
	hei = can.height;
	var context = can.getContext("2d");
	
	createOutline(context,chartInfo);
	addDots(context,chartInfo,students2001,["math","programing","english"],"name");
}

function createOutline(context,chartInfo){
	var s = styling;
	var pad = s.outlinePadding;
	var barSize = s.barSize;
	context.fillStyle = s.background;
	context.fillRect(0,0,wid,hei);
	context.fillStyle = s.bar;
	context.fillRect(pad,pad,barSize,hei-pad*2);
	context.font = s.font;
	context.fillStyle = s.text;
	
	context.save();
	context.translate(17, hei/2 );
	context.rotate(-Math.PI/2);
	context.textAlign = "center";
	context.fillText(chartInfo.y.label, 0, 0);
	context.restore();
	
	context.fillStyle = s.bar;
	context.fillRect(pad+barSize,hei-pad-barSize,wid-pad*2-barSize,barSize);
	context.font = s.font;
	context.fillStyle = s.text;
	context.fillText(chartInfo.x.label,( wid-pad*2-barSize)/2, hei-pad*2);
	
	context.translate(pad+barSize,hei-pad-barSize);
	context.scale(1, -1);
	//SET UP CONSTANTS - NEVER CHANGE AFTER CREATED
	styling.CHART_HEIGHT = hei-pad*2-barSize;
	styling.CHART_WIDTH = wid-pad*2-barSize;
	
	var steps = chartInfo.y.steps;
	var ratio;
	chartInfo.y.range = chartInfo.y.max-chartInfo.y.min;
	var scope = chartInfo.y.range;
	context.strokeStyle = s.text;
	var fontStyle = s.font.split("pt");
	var pointSize = fontStyle[0]/2;
		fontStyle[0]=pointSize;
		fontStyle = fontStyle.join("pt");
	context.font = fontStyle; // making 1/2 original size of bars	
	for(var i=1; i<=steps; i++){
		ratio = i/steps;
		context.moveTo(0,ratio*styling.CHART_HEIGHT-1);
		context.lineTo(pad*2,ratio*styling.CHART_HEIGHT-1);	
		context.scale(1,-1);
		context.fillText(chartInfo.y.min + (scope/steps)*i,0,(ratio*styling.CHART_HEIGHT-3 -pointSize)*-1);
		context.scale(1,-1);
		
	}
	
	steps = chartInfo.x.steps;
	chartInfo.x.range = chartInfo.x.max-chartInfo.x.min;
	scope = chartInfo.x.max-chartInfo.x.min;
	context.textAlign = "right";
	for(var i=1; i<=steps; i++){
		ratio = i/steps;
		context.moveTo(ratio*styling.CHART_WIDTH-1,0);
		context.lineTo(ratio*styling.CHART_WIDTH-1,pad*2);	
		context.scale(1,-1);
		context.fillText(chartInfo.x.min + (scope/steps)*i,ratio*styling.CHART_WIDTH-pad,-pad/2);
		context.scale(1,-1);
	}
	
	context.stroke();
}


function addDots(context,chartInfo,data,keys,label){
	var rangeX = chartInfo.y.range;
	var _y;
	var _x; 
	
	var _xoffset=0;
	var _yoffset=0;
	
	if(chartInfo.bubble){
		var range = chartInfo.bubble.max-chartInfo.bubble.min;
		var radRange = chartInfo.bubble.maxRadius-chartInfo.bubble.minRadius; 
		context.textAlign = "left";
	}
	
	for(var i=0; i<data.length; i++){
			_x = ((data[i][keys[0]] - chartInfo.x.min )/ chartInfo.x.range) * styling.CHART_WIDTH;
			_y = ((data[i][keys[1]] - chartInfo.y.min )/ chartInfo.y.range) * styling.CHART_HEIGHT;
			context.fillStyle = "#44ff44";
			
			
			if(data[i][keys[2]]){
				_xoffset = chartInfo.bubble.minRadius + (data[i][keys[2]]-chartInfo.bubble.min)/range *radRange;
				_yoffset = -3;
				context.beginPath();
				context.arc(_x,_y, _xoffset , 0, Math.PI*2, true); 
				context.closePath();
				context.fill();	
				
				_xoffset+=styling.outlinePadding;
			}else{
				context.fillRect(_x,_y,10,10);	
			}
			
			if(label){
				_x+=_xoffset;
				_y+=_yoffset;
				context.fillStyle = styling.text;
				context.save();
				context.translate(_x,_y );
				context.scale(1,-1);
				context.fillText(data[i][label],0,0);
				context.restore();
 						
 			}
	}	
}

	
