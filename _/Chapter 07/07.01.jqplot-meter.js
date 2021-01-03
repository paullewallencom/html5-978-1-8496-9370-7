var meter;
var meterValue=0;
var startingSpeed = parseInt(Math.random()*60) + 30;
var isStarting = true;
var renderOptions= {
               label: 'Miles Per Hour',
               labelPosition: 'bottom',
               labelHeightAdjust: -10,
               intervalOuterRadius: 45,
               //ticks: [0, 40, 80, 120],
               intervals:[10,25, 90, 120],
               intervalColors:['#999999', '#E7E658','#66cc66', '#cc6666']
           };


$(document).ready(function(){
  
  meter = $.jqplot('meter',[[meterValue]],{
       seriesDefaults: {
           renderer: $.jqplot.MeterGaugeRenderer,
           rendererOptions:renderOptions
       }
   });
   
  setInterval(updateMeter,30);
  
});


function updateMeter(){
	meter.destroy();  
   
   
   	if(isStarting && meterValue<startingSpeed){
   		++meterValue	
   	}else{
   		meterValue += 1- Math.random()*2;
   		meterValue = Math.max(0,Math.min(meterValue,120)); //keep our value in range no mater what	
   	}
   
    meter = $.jqplot('meter',[[meterValue]],{
       seriesDefaults: {
           renderer: $.jqplot.MeterGaugeRenderer,
           rendererOptions:renderOptions
       }
   });

}