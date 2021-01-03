var gData = [];
var traillingArray=[];
var trailCount = 5;
var curIndex=0;

var g;



window.onload=function(){  
      //Initialise Graph  
	g = new canvasGraph('graph');  
	g.barStyle = {cap:'rgba(255,255,255,1)',main:'rgba(0,0,0,0.7)', shadow:'rgba(0,0,0,1)',outline:'rgba(0,0,0,0.7)',formatter:styleFormatter};	
	for(i=0;i<100;i++){
		gData[i] = {x:(Math.cos((i/10)) * 400 + 400), y:(1000-(i*9.2)), z:(i*10)};
	}
	
	plotBar();
	setInterval(plotBar,40);
	
	
}  
   

function plotBar(){
	traillingArray.push(gData[curIndex]);
	
	if(traillingArray.length>=5) traillingArray.shift();
	
	g.drawGraph(traillingArray);//traillingArray);
	curIndex++
	if(curIndex>=gData.length) curIndex=0;
}


function styleFormatter(styleColor,index,total){
	var clrs = styleColor.split(",");
	var alpha = parseFloat(clrs[3].split(")"));
	alpha *= index/total+.1;
	clrs[3] = alpha+")";
	return clrs.join(",");
}