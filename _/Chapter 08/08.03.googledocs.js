
google.load('visualization', '1.0');

google.setOnLoadCallback(init);


function init(){
	var options = {'title':'Deaths, for the 15 leading causes of death: United States, 2008',
                     'width':800,
                     'height':600};

	var chart = new google.visualization.ChartWrapper({
		chartType:'BarChart',
		dataSourceUrl:"https://spreadsheets.google.com/tq?key=0Aldzs55s0XbDdFJfUTNVSVltTS1ZQWQ0bWNsX2xSbVE",
		query: 'SELECT A,E,D,C ORDER BY D',
		refreshInterval: 1,
		options:options,
		containerId:'chart'
		
	});
	chart.draw();
	
}