
var chartData = [
				{name: "Asia", data:[
									{name: "South Central",total:1800},
									{name: "East",total:1588},
									{name: "South East",total:602},
									{name: "Western",total:238},
									{name: "Northern",data:[
														{name: "1",data:[
																		{name: "2",total:30},
																		{name: "2",total:30}																		
																		]},
														{name: "2",total:53},
														{name: "2",total:30}
															]}
				
									]},
				{name: "Africa",total:1051},
				{name: "The Americas and the Caribbean", data:[
									{name: "South America",total:396},
									{name: "North America",total:346},
									{name: "Central America",total:158},
									{name: "Caribbean",total:42}
									]},
				{name: "Europe", total:740},
				{name: "Oceania", total:37}
				];


var wid;
var hei;
var context;
var total=0;
var PAD = 2;
var PAD2 = PAD * 2;

function init(){
	var can = document.getElementById("bar");

	wid = can.width;
	hei = can.height;
	context = can.getContext("2d");
	
	total = calculateTotal(chartData); //recursive function
	
		
	context.fillRect(0,0,wid,hei);
	context.fillStyle = "RGBA(255,255)";
	context.fillRect(5,5,wid-10,hei-10);
	context.translate(5,5);
	wid-=10;
	hei-=10; // ignoring the outer layers
	
	drawTreeMap(chartData,wid,hei,0,0,total);
	
}

function calculateTotal(chartData){
	var total =0;
	var val;
	var i;
	for(var item in chartData) {
		val = chartData[item];
		if(!val.total && val.data)
		 	val.total = calculateTotal(val.data);		
		
		total += val.total;
	}
	
	return total;
	
}



function drawTreeMap(infoArray,wid,hei,x,y,total,clr){
	var percent=0;
	var cx=x ;
	var cy=y;
	
	var pad = 0;
	var pad2 = 0;
	
	var rollingPercent = 0;
	var keepColor = false;
	if(clr){ //keep color and make darker
		keepColor = true;
		clr.r = parseInt(clr.r *.9);
		clr.g = parseInt(clr.g *.9);
		clr.b = parseInt(clr.b *.9);
		pad = PAD*2;	
		pad2 = PAD2*2;
	}
	
	for(var i=0; i<infoArray.length; i++){
		percent = infoArray[i].total/total;
		rollingPercent +=percent
		if(!keepColor){
			clr = 	getRandomColor(255);
		}
		
		context.fillStyle = formatColorObject(clr);
		context.fillRect(cx+pad ,cy+pad ,wid*percent - pad2,hei-pad2);
		context.strokeRect(cx+pad ,cy+pad ,wid*percent - pad2,hei-pad2);
		if(infoArray[i].data){
			drawTreeMap(infoArray[i].data,parseInt(wid*percent - PAD2),hei - PAD2,cx+ PAD,cy + PAD,infoArray[i].total,clr);	
		}
		
		cx+=wid*percent;
		
		if(rollingPercent > 0.7) break;
		
	}
	
	var leftOverPercent = 1-rollingPercent;
	var leftOverWidth = wid*leftOverPercent;
	
	for(i=i+1; i<infoArray.length; i++){
		percent = (infoArray[i].total/total)/leftOverPercent;
		if(!keepColor){
			clr = 	getRandomColor(255);
		}
		context.fillStyle = formatColorObject(clr);
		context.fillRect(cx + pad,cy + pad ,leftOverWidth -pad2,hei*percent-pad2);
		context.strokeRect(cx + pad,cy + pad ,leftOverWidth -pad2,hei*percent-pad2);
		if(infoArray[i].data){
			drawTreeMap(infoArray[i].data,parseInt(leftOverWidth -PAD2),parseInt(hei*percent-PAD2),parseInt(cx+ PAD),parseInt(cy+ PAD),infoArray[i].total,clr);	
		}
		cy+=hei*percent;
		
	}
	
}

function formatColorObject(o){
	return "RGB("+o.r+","+o.g+","+o.b+")";	
}

function getRandomColor(val){
	return {r:getRandomInt(255),g:getRandomInt(255),b:getRandomInt(255)};	
}

function getRandomInt(val){
	return parseInt(Math.random()*val)+1	
}