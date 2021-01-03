
var chartData = [
				{name: "Asia", value:4216},
				{name: "Africa",value:1051},
				{name: "The Americas and the Caribbean", value:942},
				{name: "Europe", value:740},
				{name: "Oceania", value:37}
				];


var wid;
var hei;
var context;
var total=0;

function init(){
	var can = document.getElementById("bar");

	wid = can.width;
	hei = can.height;
	context = can.getContext("2d");
	
	for(var item in chartData) total += chartData[item].value;
	
	context.fillRect(0,0,wid,hei);
	context.fillStyle = "RGB(255,255,255)";
	context.fillRect(5,5,wid-10,hei-10);
	context.translate(5,5);
	wid-=10;
	hei-=10; // ignoring the outer layers
	
	drawTreeMap(chartData);
	
}

function drawTreeMap(infoArray){
	var percent=0;
	var cx=0;
	var rollingPercent = 0;
	for(var i=0; i<infoArray.length; i++){
		precent = infoArray[i].value/total;
		rollingPercent +=precent
		context.fillStyle = formatColorObject(getRandomColor(255));
		context.fillRect(cx,0 ,wid*precent,hei);
		cx+=wid*precent;
		if(rollingPercent > 0.7) break;
		
	}
	
	var leftOverPercent = 1-rollingPercent;
	var leftOverWidth = wid*leftOverPercent;
	var cy=0;
	for(i=i+1; i<infoArray.length; i++){
		precent = (infoArray[i].value/total)/leftOverPercent;
		context.fillStyle = formatColorObject(getRandomColor(255));
		context.fillRect(cx,cy ,leftOverWidth,hei*precent);
		cy+=hei*precent;
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