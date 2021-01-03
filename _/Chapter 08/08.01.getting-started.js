
google.load('visualization', '1.0', {'packages':['corechart']});

google.setOnLoadCallback(init);


function init(){
	console.log(arguments);
	var data = new google.visualization.DataTable();
	data.addColumn('string', 'Type of Death');
    data.addColumn('number', 'Deaths');
    data.addRows([
        ['Diseases of heart', 616828],
        ['Malignant neoplasms', 565469],
        ['Chronic lower respiratory diseases', 141090], 
        ['Cerebrovascular diseases', 134148],
        ['Accidents ', 121902],
        ['Alzheimer\'s disease ', 82435],
        ['Diabetes mellitus', 70553],
        ['Influenza and pneumonia', 56284],
        ['Suicide', 36035],
        ['Septicemia', 35927],
        ['Chronic liver disease and cirrhosis', 29963],
        ['Essential hypertension and hypertensive renal disease', 25742],
        ['Parkinson\'s disease', 20483],
        ['Homicide', 17826],
        ['All other causes', 469062]
        
      ]);

	var options = {'title':'Deaths, for the 15 leading causes of death: United States, 2008',
                     'width':800,
                     'height':600,
                     "is3D": true};

	var chart = new google.visualization.PieChart(document.getElementById('chart'));
    chart.draw(data, options);

	
}