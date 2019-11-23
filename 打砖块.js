var x=100;
var y=50;
var x_ban=280;
var x_ball=295;
var y_ban=1;
var y_ball=5;
var speed_x=10;
var speed_y=-10;
var angle=1/3*Math.PI;
var a,c; //a判断球是否发出,c判断是否停止
var b=0;//控制鼠标有效点击次数
var m; //控制Interval
var mouse = {x:0,y:0};
var BR;
var arr_crash=[0];

//找id和class
var $=function(id,classname){
	if(id!=0&&classname==0){
		return document.getElementById(id);
	}else if(id==0&&classname!=0){
		return document.getElementsByClassName(classname);
	}
}

//删除数组某一元素
function removeByValue(arr, val) {
   for(var i = 0; i < arr.length; i++) {
    if(arr[i] == val) {
     arr.splice(i, 1);
     break;
    }
   }
 }
 
 //sleep
 function Sleep(delay){
	 var start=(new Date()).getTime();
	 while((new Date()).getTime() - start < delay){
		 continue;
	 }
 }

//鼠标 copy的
function getMouse(element) {
	element.addEventListener("mousemove",function (e) {
	var x_,y_;
	var e = e||window.event;
  
	x_ = e.pageX;/*鼠标指针的位置相对于文档的左边缘*/
	y_ = e.pageY;/*同理，相对于文档的上边缘*/
	
	x_ -= element.offsetLeft;
	/*offsetLeft是离其最近的已经定位的元素，如果没有就相对于body元素计算*/
	y_ -= element.offsetTop;
	mouse.x = x_;
	mouse.y = y_;
},false);
return mouse;
}

function Initiate_br(){   //砖块只需初始化一次，因为砖块是不断减少的，只需删除相应节点就行
	//砖块
	var num=1;
	for(i=1;i<7;i++){
		for(j=1;j<11;j++){
			var br=document.createElement("div");
			br.setAttribute("class",'br');
			br.setAttribute('id','br'+num);
			br.style.position='absolute';
			br.style.top=y+(i-1)*30+"px";
			br.style.left=x+(j-1)*40+"px";
			br.style.height=28+"px";
			br.style.width=38+"px";
			br.style.background='black';
			$('main',0).appendChild(br);
			num+=1;
		}
	}
}

function Initiate_other(){
	//板子
	var ban=document.createElement("div");
	$('main',0).appendChild(ban);
	ban.setAttribute('id','ban');
	ban.style.width=50;
	ban.style.height=4;
	ban.style.background="black";
	ban.style.left=x_ban+"px";
	ban.style.bottom=y_ban+"px";
	ban.style.position="absolute";
	
	//球
	var ball=document.createElement("div");
	$('main',0).appendChild(ball);
	ball.setAttribute('id','ball');
	ball.style.position="absolute";
	ball.style.width=20;
	ball.style.height=20;
	ball.style.background="red";
	ball.style.bottom=y_ball+"px";
	ball.style.left=x_ball+"px";
	ball.style.borderRadius="10px";
}

//矫正
function Rectify(){
	if($('ball',0).offsetLeft>580){
		x_ball=580;
	}
	if($('ball',0).offsetLeft<0){
		x_ball=0;
	}
	if($('ball',0).offsetTop>580){
		//alert('gameover');
		//y_ball+=10;
		//location.reload(); 
		y_ball=0;
	}
	if($('ball',0).offsetTop<0){
		y_ball=580;
	}
	if(y_ball<5&&x_ball>x_ban&&x_ball<x_ban+50){ //球打板时
		y_ball=5;
	}
}

function Run(){
	if(y_ball==5&&x_ball>x_ban&&x_ball<x_ban+50){ 
		speed_y*=(-1);
		Sleep(20);
	}
	
	if($('ball',0).offsetTop>580){
		speed_y*=(-1);
		Sleep(20);
	}
	
	
	if($('ball',0).offsetLeft<0){
		speed_x*=(-1);
		Sleep(20);
	}
	
	if($('ball',0).offsetTop<0){
		speed_y*=(-1);
		Sleep(20);
	}
	
	if($('ball',0).offsetLeft>580){
		speed_x*=(-1);
		Sleep(20);
	}
	
	x_ball=x_ball+speed_x*Math.cos(angle);
	y_ball=y_ball+speed_y*Math.sin(angle);
		
	Rectify();
	Crash();
	Refash_other();
	a=1;
}

function Refash_other(){     //只需要不断刷新板子和球
	$('main',0).removeChild($('ball',0));
	$('main',0).removeChild($('ban',0));
	Initiate_other();
}	

//未开始时板子和球移动
function Move(){
	if(mouse.x>575){
		x_ban=550;
	}else if(mouse.x<25){
		x_ban=0;
	}else{
		x_ban=mouse.x-25;
	}
	
	if(a!=1){
		x_ball=x_ban+15;
	}
	Refash_other();
}

//剩余砖块
var arr_rest=[];
for(i=1;i<=60;i++){arr_rest.push(i)};
function Sub(){
	for(i=0;i<arr_rest.length;i++){
		for(j=0;j<arr_crash.length;j++){
			if(arr_rest[i]==arr_crash[j]){
				removeByValue(arr_rest,arr_rest[i]);
			}
		}
	}
}

//球撞砖
function Crash()
{
	var BALL=$('ball',0);
	for(k=0;k<arr_rest.length;k++){
		var i=arr_rest[k];
		BR=$('br'+i,0);
		if(arr_crash.indexOf(i)<0){
			//向上击
			if(BALL.offsetTop<BR.offsetTop+28 && BALL.offsetTop>BR.offsetTop && BALL.offsetLeft+10>BR.offsetLeft && BALL.offsetLeft+10<BR.offsetLeft+38){
				y_ball=600-BR.offsetTop-28-20+1;
				speed_y*=-1;
				Sleep(10);
				//$('main',0).removeChild(BR);
				arr_crash.push(i);
			}
			
			//向右击
			if(BALL.offsetTop+10<BR.offsetTop+28 && BALL.offsetTop+10>BR.offsetTop && BALL.offsetLeft+20>BR.offsetLeft && BALL.offsetLeft+20<BR.offsetLeft+38){
				x_ball=BR.offsetLeft-20+1;
				speed_x*=-1;
				//$('main',0).removeChild(BR);
				arr_crash.push(i);
			}
			
			//向下击
			if(BALL.offsetTop+20<BR.offsetTop+28 && BALL.offsetTop+20>BR.offsetTop && BALL.offsetLeft+10>BR.offsetLeft && BALL.offsetLeft+10<BR.offsetLeft+38){
				y_ball=600-	BR.offsetTop-1;
				speed_y*=-1;
			//	$('main',0).removeChild(BR);
				arr_crash.push(i);
			}
			
			//向左击
			if(BALL.offsetTop+10<BR.offsetTop+28 && BALL.offsetTop+10>BR.offsetTop && BALL.offsetLeft>BR.offsetLeft && BALL.offsetLeft<BR.offsetLeft+38){
				x_ball=BR.offsetLeft+38-1;
				speed_x*=-1;
				//$('main',0).removeChild(BR);
				arr_crash.push(i);
			}
			if(!($('ball',0).offsetTop>BR.offsetTop+28) && !($('ball',0).offsetTop+20<BR.offsetTop) && !($('ball',0).offsetLeft+20<BR.offsetLeft) && !($('ball',0).offsetLeft>BR.offsetLeft+38)){
				
				Sleep(10);
				$('main',0).removeChild(BR);
				arr_crash.push(i);
				Sub();
			}
		}
	}
}

document.addEventListener("mousemove", 
	function () {
	$('haha',0).innerHTML = "鼠标当前坐标为：（" + mouse.x + "," + mouse.y + "）";
	},
	false);
			
document.body.onclick=function(event){
	if((event.button==0 && b!=1) ||(c==1 && b==1)){
		m=setInterval("Run()",20);
		b=1;
	}
	
}

document.onkeydown=function(event){
		switch(event.keyCode){
			case 32:clearInterval(m);c=1;break;
	}
	
}
