google.load('visualization', '1', {packages: ['corechart','controls']});


google.setOnLoadCallback(init);


function init(){
	var data = google.visualization.arrayToDataTable([
		['Mon', 10, 24, 18, 21],
		['Tue', 31, 38, 55, 74],
		['Wed', 50, 55, 20, 103],
		['Thu', 77, 77, 77, 77],
		['Fri', 68, 66, 22, 15]
		], true);
	
	var options = {
		legend:'none',
		backgroundColor:{fill:'#eeeeee',strokeWidth:2},
		bar:{groupWidth:17},
		candlestick:{hollowIsRising:true,
					 fallingColor:{stroke:'red',fill:'#ffaaaa'},
					 risingColor: {stroke:'blue',fill:'#aaaaff'}
					 },
		enableInteractivity:false
		
		};
	
	var chart = new google.visualization.CandlestickChart(document.getElementById('chart'));
	chart.draw(data, options);
	
}