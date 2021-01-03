

var xml = <node name ="Display Object">
	<node name="AVM1Mobie" />
	<node name="Bitmap" />
	<node name="InteractiveObject" >
		<node name="DisplayObjectContainer">
			<node name="Loader" />	
			<node name="Sprite" >
				<node name="MovieClip"/>
			</node>	
			<node name="Stage" />	
		</node>	
		<node name="SimpleButton" />	
		<node name="TextField" />	
	</node>
	<node name="MorphShape" />
	<node name="Shape" />
	<node name="StaticText" />
	<node name="Video" />
</node>;

var wid;
var hei;
var style = {boxWidth:90,boxHeight:30, boxColor:"black",boxCopy:"white", boxSpace:4, lines:"black",lineSpace:30 };

function init(){
	var can = document.getElementById("bar");
	
	wid = can.width;
	hei = can.height;
	var context = can.getContext("2d");
	context.textAlign = "center";
	context.font = "6pt Arial";
	drawTree(context,wid/2,20, xml );
}

function drawTree(context,_x,_y,node){
	
	context.fillStyle=style.boxColor;
	context.fillRect(_x-style.boxWidth/2,_y-style.boxHeight/2,style.boxWidth,style.boxHeight);
	context.fillStyle=style.boxCopy;
	context.fillText(node.@name,_x,_y+8);
	
	if(node.hasComplexContent()){
		var nodes = node.node;
		var totalWidthOfNewLayer = nodes.length()* style.boxWidth;
		if(nodes.length()>1)totalWidthOfNewLayer += ( nodes.length()-1)* style.boxSpace;
		var startXPoint = _x-totalWidthOfNewLayer/2 + style.boxWidth/2;
		var currentY = _y+style.boxHeight/2;
		
		context.beginPath();
		context.strokeStyle ="#000000";
		context.lineWidth=3;
		context.moveTo(_x,currentY);
		currentY+=style.lineSpace/2;
		context.lineTo(_x,currentY);
		context.moveTo(startXPoint,currentY);
		context.lineTo(startXPoint+totalWidthOfNewLayer- style.boxWidth,currentY); 
		context.stroke();	
	
		for(var i=0; i<nodes.length();i++){
			drawTree(context,startXPoint + i*(style.boxWidth + style.boxSpace) ,_y+50,nodes[i]);
		}	
	}
}
