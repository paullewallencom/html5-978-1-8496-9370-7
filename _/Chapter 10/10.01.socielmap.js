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
		var searchKeyWord = 'html5';
	  	var geocode=e.latLng.lat() + "," + e.latLng.lng()+",50km";
	  	var searchLink = 'http://search.twitter.com/search.json?q='+ searchKeyWord+ '&geocode=' + geocode +"&result_type=recent&rpp=1";
	  	console.log(e);
	  	
	  	$.getJSON(searchLink, function(data) {
	  		showTweet(data.results[0],e.latLng);
		});
	  
	  });
	

	function showTweet(obj,latLng){
			if(!obj) obj = {text:'No tweet found in this area for this topic'};
			console.log(obj);	
			
			var marker = new google.maps.Marker({
		        map: map,
		        position: latLng,
		        title:obj.text    });
				
			
	}


}