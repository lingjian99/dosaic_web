
var dot = new Array(); 
var ctx;
var imgData=new Array(100*120).fill(0);

var block = 7;
var imgArr = new Array();

var w = 100;   //image width
var h = 120;  //image height
var flag=new Array(100).fill(0).map(v=>new Array(120).fill(0));
var currentData = new Array();
    var reversed = false;
    var th=1;

window.onload=(function(){

    for(var i=0;i<h;i++){


        currentData[i] = new Array();
        for(var j=0;j<w;j++){
            //(x,y) is the location, (vx, vy) is ???, (ax, ay) is ???, (nx, ny) is ????
            currentData[i][j] = {x:Math.random()*100,y:Math.random()*120,vx:0,vy:0,ax:.16-Math.random()*.08,ay:.16-Math.random()*.1,nx:.4+Math.random()*.08,ny:.3+Math.random()*.2};
        }
    }



    const canvas=document.getElementById("resizeDiv");
    ctx=canvas.getContext("2d");
    const canvas_hiden = $('canvas_hiden');
    const ctx_hiden = canvas_hiden.getContext('2d');        
    
    /*
        block size is 7*7, create an array of 7 blocks for 7 dots whose diameters are 1, 2, 3, 4, 5, 6 7;
    */
    for(i=0; i < 7; i++){
        circle(ctx_hiden, 3 + i * 7, 3, 0.5 + i * 0.5);
        dot[i] = ctx_hiden.getImageData(i * 7, 0, 7, 7);         
    }

   
    const originalImage=document.getElementById("original_image");
    ctx.drawImage(originalImage,50,0, 700, 840);
    sendRequest();
    
}); // end $(function(){});

//////////////////////////////////////////
//crash start

function run(){
    let bottom = 150;
    ctx.clearRect(0,0,800,1400);
    if(!reversed){
        if(th<h) th++;
        for(var i=0;i<h;i++){
            for(var j=0;j<w;j++){

                var target = {x:j, y:i};
                var current = currentData[i][j];
                if(i<th)
                {
                    var xdiff = target.x - current.x;
                    var ydiff = target.y - current.y;
                    if(Math.abs(xdiff)<1) {
                        current.x = target.x;
                    } else {
                        current.x += (target.x - current.x) * current.ax * Math.sqrt(th/2);
                    }
                    if(Math.abs(ydiff)<1) {
                        current.y = target.y;
                    } else {
                        current.y += (target.y - current.y) * current.ay * Math.sqrt(th/2);
                    }
                }
                ctx.putImageData(dot[imgData[i*100+j]], current.x * block + 50, current.y * block);
            }
        }
    } else {
        for(var i=0;i<h;i++){
            for(var j=0;j<w;j++){
                var current = currentData[i][j];
                current.x+=current.vx;
                current.y+=current.vy;
                
                if(current.y>=bottom){
                    current.y = bottom;
                    current.vy = -current.ny * current.vy;
                    if(Math.abs(current.vy) <= 2) {
                        current.vy = 0;
                    }
                    current.vx *= current.nx;
                    if(Math.abs(current.vx)<=1) current.vx = 0;
                } else {
                    current.vy+=1;
                }
                //context.putImageData(imgData[img[i][j]], current.x * block, current.y * block);
                ctx.putImageData(dot[imgData[i*100+j]], current.x * block + 50, current.y * block); 
            }
        }
    }

}

function onClick(){
    reversed = !reversed;
    if(intl==null){
        intl=setInterval(run, 40);
    }
    if(reversed){
        for(var i=0;i<h;i++){
            for(var j=0;j<w;j++){
                var current = currentData[i][j];
                current.vx = (Math.random()-Math.random())*10;
                current.vy = -Math.random()*10;

            }
        }
    } else {
        th=1;
               
    }
}

//crash end
////////////////////////////////////////
function circle(ctx, x, y, r){

    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 360, false);

    ctx.fill();//画实心圆
    ctx.closePath();
}



function sendRequest() {

    var xhr = new XMLHttpRequest();
    //设置xhr请求的超时时间
    xhr.timeout = 3000;
    //设置响应返回的数据格式
    xhr.responseType = "text";
    //创建一个 post 请求，采用异步
    xhr.open('GET', '/dosaic', true);
    //注册相关事件回调处理函数
    xhr.onload = function(e) { 
      if(this.status == 200||this.status == 304){
        // TODO document why this block is empty
      
          
      }
    };
    xhr.ontimeout = function(e) {
           // TODO document why this function is empty
          
         };
    xhr.onerror = function(e) { 

    };
    xhr.upload.onprogress = function(e) { 

    };
    
    // 这行是关键！
    //将响应数据按照纯文本格式来解析，字符集替换为用户自己定义的字符集
    xhr.overrideMimeType('text/plain; charset=x-user-defined');

    xhr.onreadystatechange = function(e) {
        if (this.readyState == 4 && this.status == 200) {
        //通过 responseText 来获取图片文件对应的二进制字符串
            var binStr = this.responseText;
        //然后自己再想方法将逐个字节还原为二进制数据
            for (var i = 0, len = binStr.length; i < len; ++i) {
                var c = binStr.charCodeAt(i);
                imgData[i]=parseInt(c & 0xff);  //约定数据长度为100*120；
            }
            showResult();
        }
    };
  
    //发送数据
    xhr.send();
}

var cols=new Array(100).fill(0);
var count=0;
var intl=null;

function showResult(){
    
    if(count==100) {
        if(intl!=null) clearInterval(intl);
        intl=null;
        document.getElementById("resizeDiv").onclick=onClick;
    }else{
        if(intl==null) intl = setInterval(showResult,20);
        for(let r=0; r<100; r++){  //the no of row;
            let c=parseInt(Math.random()*100);   //c is the number of column

            if(cols[c]<120){
                ctx.putImageData(dot[imgData[cols[c]*100+c]], 50+c*7, cols[c]*7);
                cols[c] = cols[c]+1;
                if(cols[c]==120) count++;
            }
        }        
    }
}


var resizeDiv = document.getElementById('resizeDiv');
    /**
     * Created by taozh on 2017/5/6.
     * taozh1982@gmail.com
    */
var EleResize = {
    _handleResize: function (e) {
        var ele = e.target || e.srcElement;
        var trigger = ele.__resizeTrigger__;
        if (trigger) {
            var handlers = trigger.__z_resizeListeners;
            if (handlers) {
                var size = handlers.length;
                for (var i = 0; i < size; i++) {
                    var h = handlers[i];
                    var handler = h.handler;
                    var context = h.context;
                    handler.apply(context, [e]);
                }
            }
        }
    },
    _removeHandler: function (ele, handler, context) {
        var handlers = ele.__z_resizeListeners;
        if (handlers) {
            var size = handlers.length;
            for (var i = 0; i < size; i++) {
                var h = handlers[i];
                if (h.handler === handler && h.context === context) {
                    handlers.splice(i, 1);
                    return;
                }
            }
        }
    },
    _createResizeTrigger: function (ele) {
        var obj = document.createElement('object');
        obj.setAttribute('style',
            'display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden;opacity: 0; pointer-events: none; z-index: -1;');
        obj.onload = EleResize._handleObjectLoad;
        obj.type = 'text/html';
        ele.appendChild(obj);
        obj.data = 'about:blank';
        return obj;
    },
    _handleObjectLoad: function (evt) {
        this.contentDocument.defaultView.__resizeTrigger__ = this.__resizeElement__;
        this.contentDocument.defaultView.addEventListener('resize', EleResize._handleResize);
    }
};


if (document.attachEvent) {//ie9-10
    EleResize.on = function (ele, handler, context) {
        var handlers = ele.__z_resizeListeners;
        if (!handlers) {
            handlers = [];
            ele.__z_resizeListeners = handlers;
            ele.__resizeTrigger__ = ele;
            ele.attachEvent('onresize', EleResize._handleResize);
        }
        handlers.push({
            handler: handler,
            context: context
        });
    };
    EleResize.off = function (ele, handler, context) {
        var handlers = ele.__z_resizeListeners;
        if (handlers) {
            EleResize._removeHandler(ele, handler, context);
            if (handlers.length === 0) {
                ele.detachEvent('onresize', EleResize._handleResize);
                delete  ele.__z_resizeListeners;
            }
        }
    }
} else {
    EleResize.on = function (ele, handler, context) {
        var handlers = ele.__z_resizeListeners;
        if (!handlers) {
            handlers = [];
            ele.__z_resizeListeners = handlers;

            if (getComputedStyle(ele, null).position === 'static') {
                ele.style.position = 'relative';
            }
            var obj = EleResize._createResizeTrigger(ele);
            ele.__resizeTrigger__ = obj;
            obj.__resizeElement__ = ele;
        }
        handlers.push({
            handler: handler,
            context: context
        });
    };
    EleResize.off = function (ele, handler, context) {
        var handlers = ele.__z_resizeListeners;
        if (handlers) {
            EleResize._removeHandler(ele, handler, context);
            if (handlers.length === 0) {
                var trigger = ele.__resizeTrigger__;
                if (trigger) {
                    trigger.contentDocument.defaultView.removeEventListener('resize', EleResize._handleResize);
                    ele.removeChild(trigger);
                    delete ele.__resizeTrigger__;
                }
                delete  ele.__z_resizeListeners;
            }
        }
    }
}


function closeWindow(){
    window.close();
}

function $(id){
    return document.getElementById(id);
}