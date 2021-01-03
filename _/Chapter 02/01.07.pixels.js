var context;
var imageData;
var pixelData;
var pixelLen;
var currentLocation=0;
var fadeOutImageInterval;

function init(){
	var canvas = document.getElementById("textCanvas");
	var wid = canvas.width;
	var hei = canvas.height;
	
	context = canvas.getContext("2d");
	
	var oIMG = new Image();
	oIMG.onload = function(){
		context.drawImage(this, 0,0,this.width,this.height,0,0,wid,hei);
		imageData = context.getImageData(0, 0, wid, hei);
		pixelData = imageData.data;
		pixelLen = pixelData.length;
		//fadeOutImageInterval = setInterval(fadeOutImage, 25);
		//grayScaleImage();
		colorReverseImage();
	};
	oIMG.src = "img/slide2.jpg";
	
}

function fadeOutImage(){
	var pixelsChanged=0;
	for (var i = 0; i < pixelLen; i +=4) {
		if(pixelData[i]) {
			pixelData[i] =  pixelData[i]-1; // red
			pixelsChanged++;
		}
		if(pixelData[i + 1]){
			pixelData[i + 1] = pixelData[i+1]-1; // green
			pixelsChanged++;
		}
		if(pixelData[i + 2]){
			pixelData[i + 2] = pixelData[i+2]-1; // green
			pixelsChanged++;
		}

	}
	context.putImageData(imageData, 0, 0);

	if(pixelsChanged==0){
		clearInterval(fadeOutImageInterval);	
		alert("we are done fading out");
	}
}

function grayScaleImage(){
	for (var i = 0; i < pixelLen; i += 4) {
		var brightness = 0.33 * pixelData[i] + 0.33 * pixelData[i + 1] + 0.34 * pixelData[i + 2];
		pixelData[i] = brightness; 
		pixelData[i + 1] = brightness; 
		pixelData[i + 2] = brightness; 
	}
	context.putImageData(imageData, 0, 0);	
}

function colorReverseImage(){
	for (var i = 0; i < pixelLen; i += 4) {
		pixelData[i] = 255-pixelData[i];
		pixelData[i + 1] = 255-pixelData[i+1];
		pixelData[i + 2] = 255-pixelData[i+2];
	}
	context.putImageData(imageData, 0, 0);	
}


