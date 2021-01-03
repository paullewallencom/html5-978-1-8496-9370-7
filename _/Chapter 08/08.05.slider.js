google.load('visualization', '1', {packages: ['controls']});


google.setOnLoadCallback(init);


function init(){
	var data = google.visualization.arrayToDataTable([
		['Age (+- 2 Years)', 'Deaths'],
		[2, 4730],
        [7, 2502],
        [12, 3149], 
        [17, 12407],
        [22, 19791],
        [27,20786],
        [32,21489],
        [37,29864],
        [42,46506],
        [47,77417],
        [52, 109125],
        [57,134708],
        [62,161474],
        [67,183450],
        [72,218129],
        [77,287370],
        [82,366190],
        [87,372552],
        [92,251381],
         [100,20892],
		]);
	
	
	var dashboard = new google.visualization.Dashboard(document.getElementById('dashboard'));
	
	
	var slider = new google.visualization.ControlWrapper({
	  containerId: 'filter',
	  controlType: 'NumberRangeFilter',
	  options: {
	    filterColumnLabel: 'Age (+- 2 Years)'
	  }
	});

	var chart = new google.visualization.ChartWrapper({
	  chartType: 'ScatterChart',
	  containerId: 'chart',
	  options: {
	    legend: 'left',
	    title:'Deaths, by age groups: United States, 2008',
	    width: 800,
	    height: 600
	   
	  }
	});
	
	dashboard.bind(slider, chart);
	dashboard.draw(data);		
}