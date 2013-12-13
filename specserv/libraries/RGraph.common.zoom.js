
if(typeof(RGraph)=='undefined')RGraph={isRGraph:true,type:'common'};RGraph.Zoom=function(e)
{e=RGraph.FixEventObject(e);if(e&&e.target&&e.target.__canvas__){var canvas=e.target.__canvas__;}else if(e&&e.target&&e.target.__object__){var canvas=e.target.__object__.canvas;e.stopPropagation();}
if(!canvas){var registry_canvas=RGraph.Registry.Get('chart.contextmenu').__canvas__;if(registry_canvas){var canvas=registry_canvas;}}
var context=canvas.getContext('2d');var obj=canvas.__object__;var dataurl=canvas.toDataURL();var tmp=canvas;var coords=RGraph.getCanvasXY(canvas);var factor=obj.Get('chart.zoom.factor')-1;var x=coords[0];var y=coords[1];var img=document.createElement('img');img.className='RGraph_zoomed_canvas';img.style.border='1px solid #ccc';img.style.width=canvas.width+'px';img.style.height=canvas.height+'px';img.style.position='absolute';img.style.left=x+'px';img.style.top=y+'px';img.style.backgroundColor='white';img.style.opacity=obj.Get('chart.zoom.fade.in')?0:1;img.style.zIndex=99;img.src=dataurl;document.body.appendChild(img);__zoomedimage__=img;__zoomedimage__.obj=obj;img.onclick=function(e)
{e=RGraph.FixEventObject(e);e.stopPropagation();return false;}
var width=parseInt(canvas.width);var height=parseInt(canvas.height);var frames=obj.Get('chart.zoom.frames');var delay=obj.Get('chart.zoom.delay');if(obj.Get('chart.zoom.hdir')=='center'){for(var i=1;i<=frames;++i){var newWidth=width*factor*(i/frames)+width;var rightHandEdge=x+canvas.width;var newLeft=(x+(canvas.width/2))-(newWidth/2);setTimeout("__zoomedimage__.style.width = '"+String(newWidth)+"px'; __zoomedimage__.style.left = '"+newLeft+"px'",i*delay);}}else if(obj.Get('chart.zoom.hdir')=='left'){for(var i=1;i<=frames;++i){var newWidth=width*factor*(i/frames)+width;var rightHandEdge=x+canvas.width;var newLeft=rightHandEdge-newWidth;setTimeout("__zoomedimage__.style.width = '"+String(newWidth)+"px'; __zoomedimage__.style.left = '"+newLeft+"px'",i*delay);}}else{for(var i=1;i<=frames;++i){var newWidth=width*factor*(i/frames)+width;setTimeout("__zoomedimage__.style.width = '"+String(newWidth)+"px'",i*delay);}}
if(obj.Get('chart.zoom.vdir')=='up'){for(var i=1;i<=frames;++i){var newHeight=(height*factor*(i/frames))+height;var bottomEdge=y+canvas.height;var newTop=bottomEdge-newHeight;setTimeout("__zoomedimage__.style.height = '"+String(newHeight)+"px'; __zoomedimage__.style.top = '"+newTop+"px'",i*delay);}}else if(obj.Get('chart.zoom.vdir')=='center'){for(var i=1;i<=frames;++i){var newHeight=(height*factor*(i/frames))+height;var bottomEdge=(y+(canvas.height/2))+(newHeight/2);var newTop=bottomEdge-newHeight;setTimeout("__zoomedimage__.style.height = '"+String(newHeight)+"px'; __zoomedimage__.style.top = '"+newTop+"px'",i*delay);}}else{for(var i=1;i<=frames;++i){setTimeout("__zoomedimage__.style.height = '"+String(height*factor*(i/frames)+height)+"px'",i*delay);}}
if(obj.Get('chart.zoom.fade.in')){for(var i=1;i<=frames;++i){setTimeout("__zoomedimage__.style.opacity = "+Number(i/frames),i*(delay/2));}}
if(obj.Get('chart.zoom.shadow')){for(var i=1;i<=frames;++i){setTimeout("__zoomedimage__.style.boxShadow = 'rgba(128,128,128,"+Number(i/frames)/2+") 0 0 25px'",i*delay);setTimeout("__zoomedimage__.style.MozBoxShadow = 'rgba(128,128,128,"+Number(i/frames)/2+") 0 0 25px'",i*delay);setTimeout("__zoomedimage__.style.WebkitBoxShadow = 'rgba(128,128,128,"+Number(i/frames)/2+") 0 0 25px'",i*delay);}}
var div=document.createElement('DIV');div.style.backgroundColor='white';div.style.opacity=0;div.style.position='fixed';div.style.top=0;div.style.left=0;div.style.width=(screen.width+100)+'px';div.style.height=(screen.height+100)+'px';div.style.zIndex=98;div.onclick=div.oncontextmenu=function(e)
{return RGraph.HideZoomedCanvas(e);}
div.origHeight=div.style.height;document.body.appendChild(div);__zoomedbackground__=div;for(var i=1;i<=frames;++i){setTimeout("__zoomedbackground__.style.opacity = "+(Number(i/frames)*0.8),i*(delay/2));}
RGraph.FireCustomEvent(obj,'onzoom');}