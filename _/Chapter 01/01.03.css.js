var BOX_COUNT = 50;
var ANIM_AREA_WIDTH = 600;
var ANIM_AREA_HEIGHT = 400;
var aColors=["#43A9D1","#EFA63B","#EF7625","#5E4130"];
var COLORS_LENGTH = aColors.length;
function init(){
	
	var box;
	for(var i=0; i<BOX_COUNT;i++){
		box = document.createElement('div');
		box.setAttribute('id', 'box_'+i);
		box.setAttribute('class', 'box');
		updateIt(box);
	
		document.body.appendChild(box);
		
	}
	setInterval(updateThings,2000);
}

function updateThings(){
	var trgt;
	for(var i=0;i<10;i++){
		trgt = "box_" + Math.floor(Math.random()*BOX_COUNT);
		updateIt(document.getElementById(trgt));
		
	}
}

function updateIt(it){
	it.style.top=Math.floor(Math.random()*ANIM_AREA_HEIGHT)+'px';
	it.style.left=Math.floor(Math.random()*ANIM_AREA_WIDTH)+'px';
	it.style.backgroundColor=aColors[Math.floor(Math.random()*COLORS_LENGTH)];
					
}
