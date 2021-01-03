google.load('visualization', '1.0');
google.setOnLoadCallback(init);
var map;

function init() {
	var BASE_CENTER = new google.maps.LatLng(48.516817734860105,13.005318750000015 );
		
	
	map = new google.maps.Map(document.getElementById("map"),{
		center: BASE_CENTER,
		mapTypeId: google.maps.MapTypeId.SATELLITE,
		disableDefaultUI: true,

	});
	

	var query = new google.visualization.Query(
      'https://spreadsheets.google.com/tq?key=0Aldzs55s0XbDdERJVlYyWFJISFN3cjlqU1JnTGpOdHc');
    query.send(onTripDataReady);

}

function onTripDataReady(response){
	var gmt = new GoogleMapTraveler(response.g.D,map);	
}


function GoogleMapTraveler(aData,map){
	this.latLong; //will be used to store current location
	this.zoomLevel; //to store current zoom level
	this.currentIndex=0;
	this.data = aData; //locations
	this.map = map;
	
	//this.setPosition(0,2);
	this.animator = new Animator(30);
	
	this.pathPoints = [this.getPosition(0,1)]; //start with two points at same place.
	
	var lineSymbol = {
        path: 'M 0,-1 0,1',
        strokeOpacity: .6,
        scale: 2
      };

    this.lines = new google.maps.Polyline({
        path: this.pathPoints,
        strokeOpacity: 0,
        strokeColor: "#FF0000",
        icons: [{
          icon: lineSymbol,
          offset: '0',
          repeat: '20px'
        }],
        map: map
      });
	
	this.traveler = new Traveler(this.map,this.getPosition(0,1));
	this.nextPathPoint(1);
	
	

}

GoogleMapTraveler.prototype.getPosition = function (index,amount){
	var lat=0;
	var lng=0;
	for(var i=0; i<amount; i++){
		lat+= parseFloat(this.data[index+i].c[0].v);
		lng+= parseFloat(this.data[index+i].c[1].v);
		
	}
	var ll=new google.maps.LatLng(
						lat/amount, 
						lng/amount);
	return ll;					
}

GoogleMapTraveler.prototype.setPosition = function(index,amount){
	this.currentFocus = index;
	
	var lat=0;
	var lng=0;
	for(var i=0; i<amount; i++){
		lat+= parseFloat(this.data[index+i].c[0].v);
		lng+= parseFloat(this.data[index+i].c[1].v);
		
	}
	var ll=new google.maps.LatLng(
						lat/amount, 
						lng/amount);
		
	if(this.data[index].c[2])this.map.setZoom(this.data[index].c[2].v);
	this.map.setCenter(ll);
	
}

GoogleMapTraveler.prototype.nextPathPoint = function(index){
	this.setPosition(index-1,2);
	this.pathPoints.push(this.getPosition(index-1,1)); //add last point again
	var currentPoint = this.pathPoints[this.pathPoints.length-1];
	var point = this.getPosition(index,1);
	
	//console.log(index,currentPoint,point,this.getPosition(index,1));
	this.animator.add(currentPoint,"Za",currentPoint.Za,point.Za,1);
	this.animator.add(currentPoint,"Ya",currentPoint.Ya,point.Ya,1);
	this.animator.add(this.traveler.ll,"Za",this.traveler.ll.Za,point.Za,2,0.75);
	this.animator.add(this.traveler.ll,"Ya",this.traveler.ll.Ya,point.Ya,2,0.75);
	
	this.animator.onUpdate = this.bind(this,this.renderLine);
	this.animator.onComplete = this.bind(this,this.showOverlayCopy);//show copy after getting to destination
}

GoogleMapTraveler.prototype.renderLine = function(){
	
	this.lines.setPath(this.pathPoints);
	if(this.traveler.isReady)this.traveler.refreshPosition();
}

GoogleMapTraveler.prototype.showOverlayCopy = function(){
	
	var textObject = this.data[this.currentIndex].c[5];
	
	if(textObject.v.length==0) {
		this.hideOverlayCopy();	
		return; // no text skip text overlay	
	}
	
	
	$("body")
		.append('<div class="overlay"></div><div class="overlayBox"></div>')

		
	var wid = 400;// 728;
	var hei = 140;//409;
	
	$(".overlay").animate({"opacity":"0.6"}, 500, "linear");
	var textObject = this.data[this.currentIndex].c[5];
	textObject.textLength = textObject.v.length;
	textObject.position = 0;
	this.animator.add(textObject,"position",0,1,textObject.v.length*.08,0.2);
	this.animator.onUpdate = this.bind(this,this.updateOverlayCopy);
	this.animator.onComplete = this.bind(this,this.hideOverlayCopy);//show copy after getting to destination
	
	$(".overlayBox").html(textObject.v);
	$(".overlayBox")
			.css({
				"top":        "50%",
				"left":        "50%",
				"width":      wid,
				"height":     hei,
				"margin-top": -(hei/2) ,
				"margin-left":-(wid/2) 
			})
			.animate({"opacity":"1"}, 350, "linear");
	
	
	
}

GoogleMapTraveler.prototype.updateOverlayCopy = function(){
	var textObject = this.data[this.currentIndex].c[5];
	$(".overlayBox").html(textObject.v.slice(0,parseInt(textObject.position*textObject.textLength)));	
}

GoogleMapTraveler.prototype.hideOverlayCopy = function(){
	//update index now that we are done with initial element
	this.currentIndex++;
	setTimeout(this.bind(this,function(){
		$(".overlayBox").animate({"opacity":"0"}, 200, "linear");
		$(".overlay").animate({"opacity":"0"}, 300, "linear",function(){
			$('.overlayBox').remove();
			$('.overlay').remove();		
		});
	}),1000);
	
	//as long as the slide is not over go to the next.
	if(this.data.length>this.currentIndex+1)this.nextPathPoint(this.currentIndex+1); 
	
}




GoogleMapTraveler.prototype.bind = function(scope, fun){
	 return function () {
        fun.apply(scope, arguments);
    };
}




function Traveler(map,ll) {
	this.ll = ll;
    this.radius = 15;
    this.innerRadius = 10;
    this.glowDirection = -1;
    this.setMap(map);
    this.isReady = false;
    
  }

  Traveler.prototype = new google.maps.OverlayView();
	
  Traveler.prototype.onAdd = function() {
	this.div = document.createElement("DIV");
	this.canvasBG = document.createElement("CANVAS");
    this.canvasBG.width = this.radius*2;
	this.canvasBG.height = this.radius*2;
	this.canvasFG = document.createElement("CANVAS");
    this.canvasFG.width = this.radius*2;
	this.canvasFG.height = this.radius*2;
	
	this.div.style.border = "none";
	this.div.style.borderWidth = "0px";
	this.div.style.position = "absolute";
	
	this.canvasBG.style.position = "absolute";
	this.canvasFG.style.position = "absolute";
	
	
	this.div.appendChild(this.canvasBG);
	this.div.appendChild(this.canvasFG);
	
	
    this.contextBG = this.canvasBG.getContext("2d");
    this.contextFG = this.canvasFG.getContext("2d");
	
	var panes = this.getPanes();
  	panes.overlayLayer.appendChild(this.div);

    

  }
	
  Traveler.prototype.draw = function() {
    var radius = this.radius;
    var context = this.contextBG;
	
	context.fillStyle = "rgba(73,154,219,.4)";
	context.beginPath();
		context.arc(radius,radius, radius, 0, Math.PI*2, true); 
	context.closePath();
	context.fill();
	
	context = this.contextFG;
	context.fillStyle = "rgb(73,154,219)";
	context.beginPath();
		context.arc(radius,radius, this.innerRadius, 0, Math.PI*2, true); 
	context.closePath();
	context.fill();
	
    var projection = this.getProjection();
	
    this.updatePosition(this.ll);
    this.canvasBG.style.opacity = 1;
    this.glowUpdate(this);
    setInterval(this.glowUpdate,100,this);
    this.isReady = true;
    
  };
  
  Traveler.prototype.refreshPosition=function(){
  	this.updatePosition(this.ll);	
  }
  
  Traveler.prototype.updatePosition=function(latlng){
  	var radius = this.radius;
  	var projection = this.getProjection();
	var point = projection.fromLatLngToDivPixel(latlng);
  	this.div.style.left = (point.x - radius) + 'px';
    this.div.style.top = (point.y - radius) + 'px';	
  }
  
  Traveler.prototype.glowUpdate=function(scope){ //endless loop
  	scope.canvasBG.style.opacity = parseFloat(scope.canvasBG.style.opacity) + scope.glowDirection*.04;
  	if(scope.glowDirection==1 && scope.canvasBG.style.opacity>=1) scope.glowDirection=-1;
  	if(scope.glowDirection==-1 && scope.canvasBG.style.opacity<=0.1) scope.glowDirection=1;
  }
  
  
 
function Animator(refreshRate){
	this.onUpdate = function(){};
	this.onComplete = function(){};
	this.animQue = [];
	this.refreshRate = refreshRate || 35; //if nothing set 35 FPS
	this.interval = 0;
}

Animator.prototype.add = function(obj,property, from,to,time,delay){
	obj[property] = from;
	
	this.animQue.push({obj:obj,
						p:property,
						crt:from,
						to:to,
						stepSize: (to-from)/(time*1000/this.refreshRate),
						delay:delay*1000 || 0});
	
	if(!this.interval){ //only start interval if not running already
		this.interval = setInterval(this._animate,this.refreshRate,this);	
	}
	
}


Animator.prototype._animate = function(scope){
	var obj;
	var data;
	
	for(var i=0; i<scope.animQue.length; i++){
			data = scope.animQue[i];
			
			if(data.delay>0){
				data.delay-=scope.refreshRate;
			}else{
				obj = data.obj;
				if((data.stepSize>0 && data.crt<data.to) ||
				   (data.stepSize<0 && data.crt>data.to)){
					
					data.crt = data.crt + data.stepSize;
					obj[data.p] = data.crt;
				}else{
					obj[data.p] = data.to;	
					scope.animQue.splice(i,1);
					--i;				
				}
			}
			
	}
	scope.onUpdate();
	if(	scope.animQue.length==0){
		clearInterval(scope.interval);
		scope.interval = 0; //reset interval variable
		scope.onComplete();
	}
}



