//helpful resources:
// https://developer.mozilla.org/en/WebGL/Getting_started_with_WebGL
// http://learningwebgl.com/lessons/lesson01/index.html
// http://www.youtube.com/watch?v=me3BviH3nZc
// http://dev.opera.com/articles/view/raw-webgl-part1-getting-started/

var gl;
function init(){
	var c = document.getElementById('myCanvas');
	gl = c.getContext("webgl") || c.getContext("experimental-webgl");
	gl.clearColor(0.99,0.92,0.72,1.0); 
	gl.clear(gl.COLOR_BUFFER_BIT);
	
}