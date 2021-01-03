
var slide1 ;
var slide2 ;
var slide3 ;
var slide4 ;

function init(){
	slide1 = document.getElementById('slide1');
	slide1.style.top = "10px";
	slide1.style["MozTransform"] = "scale(0.2)";
		
	setTimeout(slide1_step2,1500);
	
}

function slide1_step2(){
	slide1.style["MozTransform"] = "rotate(120deg)";
	slide1.style.opacity = 0;
	slide2_step1();
}

function slide2_step1(){
	slide2 = document.getElementById('slide2');
	slide2.style.top = "30px";
	slide2.style.left = "50px";
	slide2.style["MozTransform"] = "scale(0.22) rotate(-6deg)";
		
}