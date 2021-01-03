var dataSource = [ {"id": "node0", "name": "","data": {"$type": "none" },"adjacencies": []}]; //starting with invisible root


function createNode(id,name,wid,hei,clr){
	var obj = {id:id,name:name,data:{"$angularWidth":wid,"$height":hei,"$color":clr},adjacencies:[]};
	dataSource[0].adjacencies.push({"nodeTo": id,"data": {'$type': 'none'}});
	dataSource.push(obj);
	
	return obj; 	
}

function relate(obj){
	for(var i=1; i<arguments.length; i++){
		obj.adjacencies.push({'nodeTo':arguments[i]});
	}	
}


function highlight(nodeid){
	var selectedIndex = 0;
	for(var i=1; i<dataSource.length; i++){
		if(nodeid!=	dataSource[i].id){
			for(var item in dataSource[i].adjacencies)
				delete dataSource[i].adjacencies[item].data;
		}else{
			selectedIndex = i;
			for(var item in dataSource[i].adjacencies)
				dataSource[i].adjacencies[item].data =  {"$color": "#ddaacc","$lineWidth": 4 };
		}
		
	}
	
	if(selectedIndex){ //move selecte node to be first (so it will highlight everything
		var node = dataSource.splice(selectedIndex,1)[0];
		dataSource.splice(1,0,node); 
	}
		
}


function init(){
   var node = createNode('geek','02geek',100,40,"#B1DDF3");
   	relate(node,'ben');
   node = createNode('packt','PacktBub',100,40,"#FFDE89");
   	relate(node,'ben');
   node = createNode('ben','Ben',100,40,"#E3675C");
   	relate(node,'geek','packt','nic');
   
   node = createNode('nic','Nicolas',100,40,"#C2D985");
    //no known relationships so far ;)
    
    

  var sb = new $jit.Sunburst({
    injectInto: 'infovis', //id container
     Node: {
      overridable: true,
      type: 'multipie'
    },
    Edge: {
      overridable: true,
      type: 'hyperline',
      lineWidth: 1,
      color: '#777'
    },
    //Add animations when hovering and clicking nodes
    NodeStyles: {
      enable: true,
      type: 'Native',
      stylesClick: {
        'color': '#444444'
      },
      stylesHover: {
        'color': '#777777'
      },
      duration: 700
    },
    Events: {
      enable: true,
      type: 'Native',
      //List node connections onClick
      onClick: function(node, eventInfo, e){
        if (!node) return;
          
          highlight(node.id);
          sb.loadJSON(dataSource);
  		  sb.refresh()
      }
    },
    levelDistance: 120
  });
  
 /* 
  var can = document.getElementById("infovis-canvas");
  var context = can.getContext("2d"); 
*/
  sb.loadJSON(dataSource);
  sb.refresh();

}
