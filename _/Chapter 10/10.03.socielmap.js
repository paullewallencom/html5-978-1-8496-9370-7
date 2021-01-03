function init() {
	var BASE_CENTER = new google.maps.LatLng(48.516817734860105,13.005318750000015 );
	//40.7142° N, -74.0064 E NYC
	
	
	var aGray =  [
		{
			stylers: [{saturation: -100}]
		}
	];

	var grayStyle = new google.maps.StyledMapType(aGray,{name: "Black & White"});
	
	var map = new google.maps.Map(document.getElementById("map"),{
		center: BASE_CENTER,
		zoom: 6,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		disableDefaultUI: true,

	});
	
	map.mapTypes.set('grayStyle', grayStyle);
    map.setMapTypeId('grayStyle');


	google.maps.event.addListener(map, 'click', function(e) {
		//console.log(e.latLng);
	  	var searchKeyWord = 'html5';
	  	var geocode=e.latLng.lat() + "," + e.latLng.lng()+",50km";
	  	var searchLink = 'http://search.twitter.com/search.json?q='+ searchKeyWord+ '&geocode=' + geocode +"&result_type=recent&rpp=100";
	  	
	  	
	  	$.getJSON(searchLink, function(data) {
	  		showTweet(data.results,e.latLng);
		});
	  
	  });
	

	function showTweet(a,latLng){
			if(!a) a = [{text:'No tweet found in this area for this topic'}];
			//console.log(obj);	
			
			var marker = new TwitterMarker({
		        map: map,
		        position: latLng,
		        tweet: a,
		        title:a[0].text    });			
			
	}
}



function TwitterMarker(opt){
	this.count = opt.tweet.length;
	this.crnt = 0;
	this.id = TwitterMarker.aMarkers.push(this); 
	this.aTweets = opt.tweet;
	var strTweet = this.buildTwitterHTML(opt.tweet[0])
	this.infoWindow = new google.maps.InfoWindow({
			maxWidth:300,
			content:strTweet
	});

		
	this.setValues(opt);
	this.infoWindow.open(this.map,this);
	google.maps.event.addListener(this, 'click', this.onMarkerClick);
}

TwitterMarker.prototype = new google.maps.Marker();
TwitterMarker.aMarkers= [];
TwitterMarker.prototype.onMarkerClick=function(evt){
	
	this.isOpen=!this.isOpen;
	if(this.isOpen)
		this.infoWindow.close();
	else 
		this.infoWindow.open(this.map,this);
	
	
}

TwitterMarker.prototype.buildTwitterHTML = function(twt){
	var str;
	if(twt.from_user_name){
	 str =	  "<span><img style='float: left' src='"+twt.profile_image_url+"' />"+
	 		  "<b>" +twt.from_user_name + "</b><br/><a href ='http://twitter.com/" 
			  + twt.from_user + "'>@"+twt.from_user+"</a><br/> " 
			  + twt.location + "</span>"
			  + "<p>"+twt.text+"</p>";
			  
		if(this.count>1){
			
			str+="<span style='absolute; bottom: 0; right: 0px; width:80px'>";
			if(this.crnt!=0) str+="<a href='javascript:TwitterMarker.aMarkers["+(this.id-1)+"].prev();'>&lt;</a> ";
			str+= (this.crnt+1) + " of " + this.count;
			if(this.crnt<(this.count-1)) str+= "<a href='javascript:TwitterMarker.aMarkers["+(this.id-1)+"].next();'>&gt;</a> ";
			str+= "</span>"	
		}
	}else{
		str="The 50 Kilometer radius around this point did not message this value";
	}
	return str;
}
TwitterMarker.prototype.next =function(){
	this.infoWindow.close();
	this.infoWindow.content = this.buildTwitterHTML(this.aTweets[++this.crnt]);
	this.infoWindow.open(this.map,this);
	return false;	
}

TwitterMarker.prototype.prev =function(){
	this.infoWindow.close();
	this.infoWindow.content = this.buildTwitterHTML(this.aTweets[--this.crnt]);
	this.infoWindow.open(this.map,this);
	return false;	
}
