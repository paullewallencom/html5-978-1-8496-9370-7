var data= [	{label:"Asia", value:3518000000,style:"#B1DDF3"},
			{label:"Africa", value:839000000,style:"#FFDE89"},
			{label:"Europe", value:803000000,style:"#E3675C"},
			{label:"Latin America and Caribbean", value: 539000000,style:"#C2D985"},
			{label:"North America", value:320000000,style:"#999999"},
			{label:"Near East", value:179000000,style:"#666666"},
			{label:"Oceania", value:32000000,style:"#444444"}
			];

var wid;
var hei;
var radius = 100;
var copyStyle = "#000000";


function init(){
	var can = document.getElementById("bar");
	
	wid = can.width;
	hei = can.height;
	var context = can.getContext("2d");
	var total=0;
	for(var i=0; i<data.length;i++) total+=data[i].value;
	
	
	var rad360 = Math.PI*2;
	context.translate(wid/2,hei/2);
	
	var currentTotal=0;
	var midRadian;
	var offset=0;
	for(i=0; i<data.length; i++){
		context.beginPath();
		context.moveTo(0,0);
		context.fillStyle = data[i].style;
		context.arc( 0,0,radius,currentTotal/total*rad360,(currentTotal+data[i].value)/total*rad360,false);
		context.lineTo(0,0);
		context.closePath();
		context.fill();	
		
		context.strokeStype = context.fillStyle =  copyStyle;
		midRadian = (currentTotal+data[i].value/2)/total*rad360;
		context.beginPath();
		context.moveTo(Math.cos(midRadian)*radius,Math.sin(midRadian)*radius);
		context.lineTo(Math.cos(midRadian)*(radius+20),Math.sin(midRadian)*(radius+20));
		context.stroke();
		
		context.textAlign = Math.cos(midRadian)>0? "left":"right";
		
		offSet = data[i].value/total > 0.01 ? 0: offset+10;
		context.fillText(data[i].label,Math.cos(midRadian)*(radius+40),Math.sin(midRadian)*(radius+40) +offSet);
		context.fillText(formatToMillions(data[i].value) + "(" +formatToPercent(data[i].value/total) + ")" ,Math.cos(midRadian)*(radius+40),Math.sin(midRadian)*(radius+40) + 12 + offSet);
		
		currentTotal+=data[i].value;
		
	}
}


function formatToPercent(val){
	val*=10000;
	val = parseInt(val);
	val/=100;
	return val + "%"	
}

function formatToMillions(val){
	val/=1000000;
	return val + "Million";	
}
