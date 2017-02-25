!function(){def("HeightWatcher")({init:function(t,s,i){this.element=t,this.minHeight=i,this.p=s,this.draw(),$(window).on("resize",this.draw.bind(this))},draw:function(){var t=$(window).height();$(this.element).show(),$(this.element).css("height",t-this.element.offsetTop-64+"px");for(var s in this.p)this.p[s].canvas.width=$(window).width(),this.p[s].canvas.height=$(window).height()/2,this.p[s].reset()}});var t=5,s=100,i=100,r=4,n={x:.6,y:.5},o=10;def("vpoint")({init:function(t,i,r,n,o){this.x=parseInt(t),this.y=parseInt(i),this.radius=r,this.color=n,this.colorNum=o,this.targetX=parseInt(this.x+s*Math.random()-s/2),this.targetY=parseInt(this.y+s*Math.random()-s/2),this.currentX=this.x,this.currentY=this.y,this.fromX=this.x,this.fromY=this.y,this.lines=[]},move:function(){var i=!1,r=!1;Math.abs(this.currentX-this.fromX)>Math.abs(this.targetX-this.currentX)?i=!0:this.targetX>this.currentX?this.currentX=this.currentX+1/t:this.targetX<this.currentX&&(this.currentX=this.currentX-1/t),Math.abs(this.currentY-this.fromY)>Math.abs(this.targetY-this.currentY)?r=!0:this.targetY>this.currentY?this.currentY=this.currentY+1/t:this.targetY<this.currentY&&(this.currentY=this.currentY-1/t),r&&i&&(this.fromX=this.currentX,this.fromY=this.currentY,this.targetX=parseInt(this.x+s*Math.random()-s/2),this.targetY=parseInt(this.y+s*Math.random()-s/2))}}),def("Particles")({init:function(t,s,i,r){this.opt=r,this.num=t,this.canvas=s,this.d=i;var n="rgba(205,205,205,1)";this.mousestart=!1;var o=this;this.canvas.onmouseover=function(t){o.mousestart=!0,o.mousePos={x:t.offsetX,y:t.offsetY,color:n}},this.canvas.onmousemove=function(t){o.mousestart=!0,o.mousePos={x:t.offsetX,y:t.offsetY,color:n}},this.canvas.onmouseleave=function(){o.mousestart=!1,o.mousePos=null},this.ctx=s.getContext("2d"),this.points=this.createPoints(t,s.width-20,s.height-20)},reset:function(){var t="rgba(205,205,205,1)";this.mousestart=!1;var s=this;this.canvas.onmouseover=function(i){s.mousestart=!0,s.mousePos={x:i.offsetX,y:i.offsetY,color:t}},this.canvas.onmousemove=function(i){s.mousestart=!0,s.mousePos={x:i.offsetX,y:i.offsetY,color:t}},this.canvas.onmouseleave=function(){s.mousestart=!1,s.mousePos=null},i=this.canvas.width/10,r=this.canvas.width/300,this.ctx=this.canvas.getContext("2d"),this.points=this.createPoints(this.num,this.canvas.width-20,this.canvas.height-20),this.draw()},genPoints:function(t,s,i,n,o){for(var h=s/r,a=i/r,e=[],c=0;r>c;c++)for(var u=r;u>=c;u--){var m=parseInt(50*Math.random()+200),f="rgba("+m+","+m+","+m+",1)";e.push(this.d?new vpoint(h*c+20*Math.random()-10,i-(a*u+20*Math.random()-10),Math.random()+2,f,m):new vpoint(n-(h*c+20*Math.random()-10),o-(a*(r-u)+20*Math.random()-10),Math.random()+2,f,m))}var d=e.slice();for(var v in d)for(var l=0;2>l;l++)m=parseInt(50*Math.random()+200),f="rgba("+m+","+m+","+m+",1)",e.push(new vpoint(d[v].x+200*Math.random()-100,d[v].y+200*Math.random()-100,Math.random()+2,f,m));return e},createPoints:function(t,s,r){var h=this.genPoints(t,s*n.x,r*n.y,s,r);for(var a in h){var e=h.slice(),c=h[a];e.sort(function(t,s){var i=t.x-c.x,r=t.y-c.y,n=s.x-c.x,o=s.y-c.y;return i*i+r*r>n*n+o*o});for(var u=0;u<e.length&&!(c.lines.length>3);u++)e[u].lines&&e[u].lines.length>3||e[u].y<c.y&&Math.pow(e[u].y-c.y,2)+Math.pow(e[u].x-c.x,2)<i*i&&c.lines.push(e[u])}for(var u=0;o>u;u++){var m=parseInt(50*Math.random()+200),f="rgba("+m+","+m+","+m+",1)",d=Math.random(),v=Math.random();h.push(new vpoint(d*s,v*r,Math.random()+2,f,m))}return h},draw:function(){this.clear(),this.drawPoints(),this.drawLines()},drawPoints:function(){for(var t in this.points){var s=this.points[t];s.move(),this.ctx.beginPath(),this.ctx.fillStyle=s.color,this.ctx.arc(s.currentX,s.currentY,s.radius,0,2*Math.PI,!0),this.ctx.fill()}this.mousestart&&(this.ctx.beginPath(),this.ctx.fillStyle=this.mousePos.color,this.ctx.arc(this.mousePos.x,this.mousePos.y,2,0,2*Math.PI,!0),this.ctx.fill())},drawLines:function(){var t=[];for(var s in this.points){this.mousestart&&Math.abs(this.points[s].x-this.mousePos.x)<i&&Math.abs(this.points[s].y-this.mousePos.y)<i&&t.push({from:this.points[s],to:{currentX:this.mousePos.x,currentY:this.mousePos.y,color:this.mousePos.color}});for(var r in this.points[s].lines)this.drawLine(this.points[s],this.points[s].lines[r])}if(this.mousestart)for(var n in t)this.drawLine(t[n].from,t[n].to)},drawLine:function(t,s){this.ctx.beginPath();var i=this.ctx.createLinearGradient(0,0,0,150);i.addColorStop(0,t.color),i.addColorStop(.5,s.color),this.ctx.strokeStyle=i,this.ctx.moveTo(t.currentX,t.currentY),this.ctx.lineTo(s.currentX,s.currentY),this.ctx.stroke()},clear:function(){this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)},start:function(){this.isStop=!1,this.loop()},loop:function(){this.draw(),this.isStop||window.requestAnimationFrame(this.loop.bind(this))},stop:function(){this.isStop=!0}})}(),$(function(){var t=$(window);$("#m-first").before('<canvas id = "canvas-background-1" style="position: absolute;z-index: 0;" width="'+t.width()+'" height="'+t.height()+'"></canvas>'),$("#m-first").after('<canvas id = "canvas-background-2" style="position: absolute;right:0;bottom:0;z-index: 0;" width="'+t.width()+'" height="'+t.height()+'"></canvas>');{var s=new Particles(80,$("#canvas-background-1")[0],!0),i=new Particles(80,$("#canvas-background-2")[0],!1);new HeightWatcher($("#m-first")[0],[s,i],100)}s.start(),i.start()});