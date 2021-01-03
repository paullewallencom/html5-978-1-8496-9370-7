var data1= [	{label:"Asia", value:3518000000,style:"#B1DDF3"},
			{label:"Africa", value:839000000,style:"#FFDE89"},
			{label:"Europe", value:803000000,style:"#E3675C"},
			{label:"Latin America", value: 539000000,style:"#C2D985"},
			{label:"North America", value:320000000,style:"#999999"},
			{label:"Near East", value:179000000,style:"#666666"}
			];
			
var data2= [	{label:"Asia", value:151000,style:"#B1DDF3"},
			{label:"Africa", value:232000,style:"#FFDE89"},
			{label:"Europe", value:842000,style:"#E3675C"},
			{label:"Latin America", value: 538100,style:"#C2D985"},
			{label:"North America", value:3200,style:"#999999"},
			{label:"Near East", value:17900,style:"#666666"}
			];

var wid;
var hei;
var copyStyle = "#000000";


function init(){
	var can = document.getElementById("bar");
	
	wid = can.width;
	hei = can.height;
	var context = can.getContext("2d");
	context.translate(wid/2,hei/2);
	
	context.shadowOffsetX = 0;
	context.shadowOffsetY = 0;
	context.shadowBlur    = 8;
	context.shadowColor   = 'rgba(0, 0, 0, 0.5)';
	
	createPie(context,data1,190);
	createPie(context,data2,150);
	createHole(context,100);
	
	context.shadowColor   = 'rgba(0, 0, 0, 0)';
	
	context.translate(-35,-55);
	createLegend(context,data1);
	
}


function createLegend(context,data){
	context.textAlign="left";
	for(var i=0;i<data.length;i++){
		context.fillStyle=data[i].style;
		context.fillRect(0,i*20,10,10);	
		context.fillText(data[i].label,20,i*20+8);
	}	
}

function createPie(context,data,radius){
	var total=0;
	for(var i=0; i<data.length;i++) total+=data[i].value;
	
	
	var rad360 = Math.PI*2;
	
	
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
		context.textAlign = "center";
		
		context.fillText(formatToPercent(data[i].value/total),Math.cos(midRadian)*(radius-20),Math.sin(midRadian)*(radius-20) );
		
		currentTotal+=data[i].value;
		
	}

}

function createHole(context,radius){
	context.beginPath();
	context.moveTo(0,0);
	context.fillStyle = "#ffffff";
	context.arc( 0,0,radius,0,Math.PI*2,false);
	context.closePath();
	context.fill();	

}

function formatToPercent(val){
	val*=10000;
	val = parseInt(val);
	val/=100;
	return val + "%"	
}

function formatToMillions(val){
	val/=1000000;
	return val + "Millon";	
}
