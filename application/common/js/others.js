function qtCode(){
    new Window({url: "http://chart.apis.google.com/chart?chs=250x250&cht=qr&chl="+location.href+"&chld=L|1&choe=UTF-8", className: "mac_os_x", width:300, height:300,title: "     手机条码软件扫描下图继续浏览  " }).showCenter();
}

function mark(contextPath){  
    new Window({url: contextPath +"/common/bookmark.jsp", className: "mac_os_x", width:300, height:100,title: "  将本主题收藏如下站点  " }).showCenter();
}

function onlinesInf(contextPath){
    try{
        if(typeof(Window) != "undefined"){
           var onlineWindow = new Window({className: "mac_os_x", width:350, height:150, title: " 当前登录用户 "});
           onlineWindow.setURL(contextPath +"/onlineInfo.jsp");
           onlineWindow.showCenter();
        }
    }catch(e){}
}

 
function overlay(curobj, subobjstr, opt_position){
if (document.getElementById){
var subobj=document.getElementById(subobjstr)
subobj.style.display=(subobj.style.display!="block")? "block" : "none"
var xpos=getposOffset(curobj, "left")+((typeof opt_position!="undefined" && opt_position.indexOf("right")!=-1)? -(subobj.offsetWidth-curobj.offsetWidth) : 0) 
var ypos=getposOffset(curobj, "top")+((typeof opt_position!="undefined" && opt_position.indexOf("bottom")!=-1)? curobj.offsetHeight : 0)
subobj.style.left=xpos+"px"
subobj.style.top=ypos+"px"
return false
}
else
return true
}


function goToAnotherPageREST(contextPath, count)
{
	var page = document.getElementById("pageToGo").value * 1;

	if (!isNaN(page) && page > 0) {	 
	    var ttt = (page-1) * count;
	    if (ttt != 0)	    	
		   var path = contextPath + "/" + ttt;
	    else
	    	var path = contextPath ;
		document.location = path;
	}
	
} 

function goToAnotherPage(contextPath, count)
{
	var page = document.getElementById("pageToGo").value * 1;

	if (!isNaN(page) && page > 0) {
	    var mychar = "?";
	    if (contextPath.toLowerCase().indexOf("?") > -1)
	      mychar = "&";
		var path = contextPath + mychar + "count=" + count + "&start=" + ((page-1) * count) ;
		document.location = path;
	}
	
} 


function addfavorite( title) {
 var url = location.href;
 if (document.all) {
   window.external.addFavorite(url,title); 
 }else if (window.sidebar) {
   window.sidebar.addPanel(title, url, ""); 
 }else{
   alert('Press ctrl+D to bookmark ');
 }
}

var timeout = 1;
var startDiaglog = false;  
var scontent;

function openInfoDiag(content) {  
      scontent = content;       
      Dialog.info(scontent + "  计时：" +  timeout + " 秒   ",
               {width:260, height:150, showProgress: true});
      setTimeout(infoTimeOut, 1000);
      startDiaglog = true;   
}
   
function infoTimeOut() {  
      if (startDiaglog){
         if (timeout > 4)
            infoDiagClose();
         else
            timeout++;  
            Dialog.setInfoMessage(scontent + "  计时：" +  timeout + " 秒  ");
            setTimeout(infoTimeOut, 1000) ;
      }
}
   
function setDiagInfo(content){
      scontent = content;
}
   
function infoDiagClose(){
     if (startDiaglog){
        Dialog.closeInfo();
        startDiaglog = false;
        timeout = 1;
     }
}

var popupW;
function openPopUpWindow(wtitlename, url){
    if (popupW == null) {       
       popupW = new Window({className: "mac_os_x", width:600, height:380, title: wtitlename}); 
       popupW.setURL(url);
       popupW.showCenter();
	
	    
	   var myObserver = {
        onClose: function(eventName, myW) {    	  
          if (myW == popupW){        	        	
            popupW = null;   
            Windows.removeObserver(this);
          }
        }
       }
     Windows.addObserver(myObserver);
     } 
 }     

function copyToClipboard(obj){
  try{
    if (!document.execCommand()) return;  
    
    var e = $(obj);
	e.select();
	document.execCommand("Copy");
	document.execCommand("Paste");
  }catch(e){}
	
}

  var newMessageW;
  function popUpNewMessageWithID(ID){
     if( readCookie(ID) == "disable")
        return;
     popUpNewMessage();  
  }
  
  function popUpNewMessage(){
   if (newMessageW == null) {
       newMessageW = new Window({className: "mac_os_x", width:250, height:150, title: " Have a Message "}); 
       newMessageW.setContent("isNewMessage",false, false);                  
       newMessageW.showCenter();	
       WindowCloseKey.init();
   
       var myObserver = {
        onClose: function(eventName, mywinMessage) {    	  
          if (mywinMessage == newMessageW){        	
            newMessageW = null;
            Windows.removeObserver(this);
          }
        }
      }
      Windows.addObserver(myObserver);  	 
	} else
	  newMessageW.showCenter();
   }     
   
   function clearPopUPWithID(ID){
      createCookie(ID,"",-1);   
      clearPopUP();
   }
  
   function clearPopUP(){
     if (newMessageW != null){   
           newMessageW.close();    
           newMessageW = null;                  
     }     
     $('isNewMessage').innerHTML = "";
  }
  
   function disablePopUPWithID(ID, seconds){       
       createCookie(ID,"disable",seconds);  
       clearPopUP();     
    }
  
  
    

function createCookie(name,value,seconds) {
	var date = new Date();
	if (seconds) 
		date.setTime(date.getTime()+(seconds*1000));
	else
		date.setTime(date.getTime()-10000);

	var expires = "; expires="+date.toGMTString();
	document.cookie = name+"="+value+expires+"; path=/";
}
function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

//below is from autocomplete.js

var AutoComplete=Class.create();
AutoComplete.prototype={
Version:'1.3.0',
REQUIRED_PROTOTYPE:'1.6.0',
initialize:function(id,param){
this.PROTOTYPE_CHECK();
this.fld=$(id);
if(!this.fld){
throw("AutoComplete requires a field id to initialize");}
this.sInp="";
this.nInpC=0;
this.aSug=[];
this.iHigh=0;
this.options=param?param:{};
var k,def={
valueSep:null,
minchars:1,
meth:"get",
varname:"input",
className:"autocomplete",
timeout:3000,
delay:500,
offsety:-5,
shownoresults:true,
noresults:"No results were found.",
maxheight:250,
cache:true,
maxentries:25,
onAjaxError:null,
setWidth:false,
minWidth:100,
maxWidth:200,
useNotifier:true};
for(k in def){
if(typeof(this.options[k])!=typeof(def[k]))
this.options[k]=def[k];}
if(this.options.useNotifier){
this.fld.addClassName('ac_field');}
var p=this;
this.fld.onkeypress=function(ev){return p.onKeyPress(ev);};
this.fld.onkeyup=function(ev){return p.onKeyUp(ev);};
this.fld.onblur=function(ev){p.resetTimeout();return true;};
this.fld.setAttribute("AutoComplete","off");},
convertVersionString:function(versionString){
var r=versionString.split('.');
return parseInt(r[0])*100000+parseInt(r[1])*1000+parseInt(r[2]);},
PROTOTYPE_CHECK:function(){
if((typeof Prototype=='undefined')||(typeof Element=='undefined')||(typeof Element.Methods=='undefined')||(this.convertVersionString(Prototype.Version)<
this.convertVersionString(this.REQUIRED_PROTOTYPE)))
throw("AutoComplete requires the Prototype JavaScript framework >= "+
this.REQUIRED_PROTOTYPE);},
onKeyPress:function(e){
if(!e)e=window.event;
var key=e.keyCode||e.wich;
switch(key){
case Event.KEY_RETURN:
this.setHighlightedValue();
Event.stop(e);
break;
case Event.KEY_TAB:
this.setHighlightedValue();
break;
case Event.KEY_ESC:
this.clearSuggestions();
break;}
return true;},
onKeyUp:function(e){
if(!e)e=window.event;
var key=e.keyCode||e.wich;
if(key==Event.KEY_UP||key==Event.KEY_DOWN){
this.changeHighlight(key);
Event.stop(e);}
else this.getSuggestions(this.fld.value);
return true;},
getSuggestions:function(val){
if(val==this.sInp)return false;
if($(this.acID))$(this.acID).remove();
this.sInp=val;
if(val.length<this.options.minchars){
this.aSug=[];
this.nInpC=val.length;
return false;}
var ol=this.nInpC;
this.nInpC=val.length?val.length:0;
var l=this.aSug.length;
if(this.options.cache&&(this.nInpC>ol)&&l&&(l<this.options.maxentries)){
var arr=new Array();
for(var i=0;i<l;i++){
try{if (this.aSug[i].value.toLowerCase().indexOf(val.toLowerCase()) != -1)
        {
  				arr.push(this.aSug[i]);
        }}catch(e){}
}
this.aSug=arr;
this.createList(this.aSug);}else{
var p=this;
clearTimeout(this.ajID);
this.ajID=setTimeout(function(){p.doAjaxRequest(p.sInp)},this.options.delay);}
document.helper=this;
return false;},
getLastInput:function(str){
var ret=str;
if(undefined !=this.options.valueSep){
var idx=ret.lastIndexOf(this.options.valueSep);
ret=idx==-1?ret:ret.substring(idx+1,ret.length);}
return ret;},
doAjaxRequest:function(input){
if(input!=this.fld.value)
return false;
this.sInp=this.getLastInput(this.sInp);
if(typeof this.options.script=='function')
var url=this.options.script(encodeURIComponent(this.sInp));
else
var url=this.options.script+this.options.varname+'='+encodeURIComponent(this.sInp);
if(!url)return false;
var p=this;
var m=this.options.meth;
if(this.options.useNotifier){
this.fld.removeClassName('ac_field');
this.fld.addClassName('ac_field_busy');};
var options={
method:m,
onSuccess:function(req){
if(p.options.useNotifier){
p.fld.removeClassName('ac_field_busy');
p.fld.addClassName('ac_field');};
p.setSuggestions(req,input);},
onFailure:(typeof p.options.onAjaxError=='function')?function(status){
if(p.options.useNotifier){
p.fld.removeClassName('ac_field_busy');
p.fld.addClassName('ac_field');}
p.options.onAjaxError(status)}:
function(status){
if(p.options.useNotifier){
p.fld.removeClassName('ac_field_busy');
p.fld.addClassName('ac_field');}
alert("AJAX error: "+status);}}
new Ajax.Request(url,options);},
setSuggestions:function(req,input){
if(input!=this.fld.value)
return false;
this.aSug=[];
if(this.options.json){
var jsondata=eval('('+req.responseText+')');
this.aSug=jsondata.results;}else{
var results=req.responseXML.getElementsByTagName('results')[0].childNodes;
for(var i=0;i<results.length;i++){
if(results[i].hasChildNodes())
this.aSug.push({'id':results[i].getAttribute('id'),'value':results[i].childNodes[0].nodeValue,'info':results[i].getAttribute('info')});}}
this.acID='ac_'+this.fld.id;
this.createList(this.aSug);},
createDOMElement:function(type,attr,cont,html){
var ne=document.createElement(type);
if(!ne)
return 0;
for(var a in attr)
ne[a]=attr[a];
var t=typeof(cont);
if(t=="string"&&!html)
ne.appendChild(document.createTextNode(cont));
else if(t=="string"&&html)
ne.innerHTML=cont;
else if(t=="object")
ne.appendChild(cont);
return ne;},
createList:function(arr){
if($(this.acID))$(this.acID).remove();
this.killTimeout();
if(arr.length==0&&!this.options.shownoresults)return false;
var div=this.createDOMElement('div',{id:this.acID,className:this.options.className});
var hcorner=this.createDOMElement('div',{className:'ac_corner'});
var hbar=this.createDOMElement('div',{className:'ac_bar'});
var header=this.createDOMElement('div',{className:'ac_header'});
header.appendChild(hcorner);
header.appendChild(hbar);
div.appendChild(header);
var ul=this.createDOMElement('ul',{id:'ac_ul'});
var p=this;
if(arr.length==0&&this.options.shownoresults){
var li=this.createDOMElement('li',{className:'ac_warning'},this.options.noresults);
ul.appendChild(li);}else{
for(var i=0,l=arr.length;i<l;i++){
var val=arr[i].value;
var st=val.toLowerCase().indexOf(this.sInp.toLowerCase());
var output=val.substring(0,st)+'<em>'+val.substring(st,st+this.sInp.length)+'</em>'+val.substring(st+this.sInp.length);
var span=this.createDOMElement('span',{},output,true);
if(arr[i].info!=''){
var br=this.createDOMElement('br',{});
span.appendChild(br);
var small=this.createDOMElement('small',{},arr[i].info);
span.appendChild(small);}
var a=this.createDOMElement('a',{href:'#'});
var tl=this.createDOMElement('span',{className:'tl'},'&nbsp;',true);
var tr=this.createDOMElement('span',{className:'tr'},'&nbsp;',true);
a.appendChild(tl);
a.appendChild(tr);
a.appendChild(span);
a.name=i+1;
a.onclick=function(){
p.setHighlightedValue();
return false;};
a.onmouseover=function(){
p.setHighlight(this.name);};
var li=this.createDOMElement('li',{},a);
ul.appendChild(li);}}
div.appendChild(ul);
var fcorner=this.createDOMElement('div',{className:'ac_corner'});
var fbar=this.createDOMElement('div',{className:'ac_bar'});
var footer=this.createDOMElement('div',{className:'ac_footer'});
footer.appendChild(fcorner);
footer.appendChild(fbar);
div.appendChild(footer);
var pos=this.fld.cumulativeOffset();
div.style.left=pos[0]+"px";
div.style.top=pos[1]+this.fld.offsetHeight+"px";
var w=(
this.options.setWidth&&this.fld.offsetWidth<this.options.minWidth)?this.options.minWidth:(
this.options.setWidth&&this.fld.offsetWidth>this.options.maxWidth)?this.options.maxWidth:
this.fld.offsetWidth;
div.style.width=w+"px";
div.onmouseover=function(){p.killTimeout()};
div.onmouseout=function(){p.resetTimeout()};
document.getElementsByTagName("body")[0].appendChild(div);
this.iHigh=1;
this.setHighlight(1);
this.toID=setTimeout(
function(){
p.clearSuggestions()},this.options.timeout);},
changeHighlight:function(key){
var list=$("ac_ul");
if(!list)
return false;
var n;
n=(key==Event.KEY_DOWN||key==Event.KEY_TAB)?this.iHigh+1:this.iHigh-1;
n=(n>list.childNodes.length)?list.childNodes.length:((n<1)?1:n);
this.setHighlight(n);},
setHighlight:function(n){
var list=$('ac_ul');
if(!list)return false;
if(this.iHigh>0)this.clearHighlight();
this.iHigh=Number(n);
list.childNodes[this.iHigh-1].className='ac_highlight';
this.killTimeout();},
clearHighlight:function(){
var list=$('ac_ul');
if(!list)return false;
if(this.iHigh>0){
list.childNodes[this.iHigh-1].className='';
this.iHigh=0;}},
setHighlightedValue:function(){
if(this.iHigh){
if(!this.aSug[this.iHigh-1])return;
if(undefined !=this.options.valueSep){
var str=this.getLastInput(this.fld.value);
var idx=this.fld.value.lastIndexOf(str);
str=this.aSug[this.iHigh-1].value+this.options.valueSep;
this.sInp=this.fld.value=idx==-1?str:this.fld.value.substring(0,idx)+str;}else{
var str=this.getLastInput(this.fld.value);
var idx=this.fld.value.lastIndexOf(str);
str=this.aSug[this.iHigh-1].value;
this.sInp=this.fld.value=idx==-1?str:this.fld.value.substring(0,idx)+str;}
this.fld.focus();
if(this.fld.selectionStart)
this.fld.setSelectionRange(this.sInp.length,this.sInp.length);
this.clearSuggestions();
if(typeof this.options.callback=='function')
this.options.callback(this.aSug[this.iHigh-1]);}},
killTimeout:function(){
clearTimeout(this.toID);},
resetTimeout:function(){
this.killTimeout();
var p=this;
this.toID=setTimeout(
function(){
p.clearSuggestions();},p.options.timeout);},
clearSuggestions:function(){
this.killTimeout();
if($(this.acID)){
this.fadeOut(300,function(){
$(this.acID).remove();});}},
fadeOut:function(milliseconds,callback){
this._fadeFrom=1;
this._fadeTo=0;
this._afterUpdateInternal=callback;
this._fadeDuration=milliseconds;
this._fadeInterval=50;
this._fadeTime=0;
var p=this;
this._fadeIntervalID=setInterval(
function(){
p._changeOpacity()},this._fadeInterval);},
_changeOpacity:function(){
if(!$(this.acID)){
this._fadeIntervalID=clearInterval(this._fadeIntervalID);
return;}
this._fadeTime+=this._fadeInterval;
var ieop=Math.round((this._fadeFrom+((this._fadeTo-this._fadeFrom)*(this._fadeTime/this._fadeDuration)))*100)
var op=ieop/100;
var el=$(this.acID);
if(el.filters){
try{
el.filters.item("DXImageTransform.Microsoft.Alpha").opacity=ieop;}catch(e){
el.style.filter='progid:DXImageTransform.Microsoft.Alpha(opacity='+ieop+')';}}else{
el.style.opacity=op;}
if(this._fadeTime>=this._fadeDuration){
clearInterval(this._fadeIntervalID);
if(typeof this._afterUpdateInternal=='function')
this._afterUpdateInternal();}}}
//above is from autocomplete.js
//below is from tooltip.js
TooltipManager = {
		  options: {cssClassName: 'tooltip', delayOver: 200, delayOut: 1000, shiftX: 2, shiftY: 2,
		            className: 'alphacube', width: 200, height: null, 
		            draggable: false, minimizable: false, maximizable: false, showEffect: Element.show, hideEffect: Element.hide},
		  ajaxInfo: null,
		  elements: null,
		  showTimer: null,
		  hideTimer: null,

		  init: function(cssClassName, ajaxInfo, tooltipOptions) {
		    TooltipManager.options = Object.extend(TooltipManager.options, tooltipOptions || {});
		    //dele by banq
		    //cssClassName = TooltipManager.options.cssClassName || "tooltip";
		    TooltipManager.ajaxInfo = ajaxInfo;
		    TooltipManager.elements = $$("." + cssClassName);
		    TooltipManager.elements.each(function(element) {
		      element = $(element)
		      var info = TooltipManager._getInfo(element);
		      if (info.ajax) {
		        element.ajaxId = info.id;
		        element.ajaxInfo = ajaxInfo;
		        element.frameWidth = tooltipOptions.width;
		        element.frameHeight = tooltipOptions.height;;
		      }
		      else {
		        element.tooltipElement = $(info.id);        
		      }
		      element.observe("mouseover", TooltipManager._mouseOver);
		      element.observe("mouseout", TooltipManager._mouseOut);
		    });
		    Windows.addObserver(this);
		  },
		  
		  addHTML: function(element, tooltipElement) {
		    element = $(element);
		    tooltipElement = $(tooltipElement);
		    element.tooltipElement = tooltipElement;
		    
		    element.observe("mouseover", TooltipManager._mouseOver);
		    element.observe("mouseout", TooltipManager._mouseOut);
		  },
		  
		  addAjax: function(element, ajaxInfo) {
		    element = $(element);
		    element.ajaxInfo = ajaxInfo;
		    element.observe("mouseover", TooltipManager._mouseOver);
		    element.observe("mouseout", TooltipManager._mouseOut);    
		  },
		//add by banq    
		  addAjax: function(element, ajaxInfo, width, height) {  	
		  
		    element = $(element);
		    element.ajaxInfo = ajaxInfo;    
		    element.frameWidth = width;
		    element.frameHeight = height;
		   
		    element.observe("mouseover", TooltipManager._mouseOver);
		    element.observe("mouseout", TooltipManager._mouseOut);

		  },    
		        
		    
		  addURL: function(element, url, width, height) {
		    element = $(element);
		    element.url = url;
		    element.frameWidth = width;
		    element.frameHeight = height;
		    element.observe("mouseover", TooltipManager._mouseOver);
		    element.observe("mouseout", TooltipManager._mouseOut);    
		  },
		    
		  close: function() {
		    if (TooltipManager.tooltipWindow)
		      TooltipManager.tooltipWindow.hide();
		  },
		  
		  preloadImages: function(path, images, extension) {
		    if (!extension)
		      extension = ".gif";
		      
		    //preload images
		    $A(images).each(function(i) {
		      var image = new Image(); 
		      image.src= path + "/" + i + extension; 
		    });
		  },
		  
		  _showTooltip: function(element) {
		    if (this.element == element)
		      return;
		    // Get original element
		    while (element && (!element.tooltipElement && !element.ajaxInfo && !element.url)) 
		      element = element.parentNode;
		    this.element = element;
		    
		    TooltipManager.showTimer = null;
		    if (TooltipManager.hideTimer)
		      clearTimeout(TooltipManager.hideTimer);
		    
		    var position = Position.cumulativeOffset(element);
		    var dimension = element.getDimensions();

		    if (! this.tooltipWindow)
		      this.tooltipWindow = new Window("__tooltip__", TooltipManager.options);
		      
		    this.tooltipWindow.hide();
		    this.tooltipWindow.setLocation(position[1] + dimension.height + TooltipManager.options.shiftY, position[0] + TooltipManager.options.shiftX);

		    Event.observe(this.tooltipWindow.element, "mouseover", function(event) {TooltipManager._tooltipOver(event, element)});
		    Event.observe(this.tooltipWindow.element, "mouseout", function(event) {TooltipManager._tooltipOut(event, element)});
		    
		    
		    // Reset width/height for computation
		    this.tooltipWindow.height = TooltipManager.options.height;
		    this.tooltipWindow.width = TooltipManager.options.width;

		    // Ajax content
		    if (element.ajaxInfo) {
		      //add by banq
		      if (element.frameWidth){    	 	  
		    	    this.tooltipWindow.height = element.frameHeight;
		            this.tooltipWindow.width = element.frameWidth;
		      }
		      
		      var p = element.ajaxInfo.options.parameters;
		      var saveParam = p;
		      
		      // Set by CSS
		      if (element.ajaxId) {
		        if (p)
		          p += "&" + element.ajaxId;
		        else
		          p =   element.ajaxId;
		      }
		      element.ajaxInfo.options.parameters = p || "";
		      this.tooltipWindow.setHTMLContent("");
		      //this.tooltipWindow.setAjaxContent(element.ajaxInfo.url, element.ajaxInfo.options);
		      //add by banq
		      this.tooltipWindow.setAjaxContent(element.ajaxInfo.url, element.ajaxInfo.options, false, false);      
		      element.ajaxInfo.options.parameters = saveParam;    
		    } 
		    // URL content
		    else if (element.url) {
		      this.tooltipWindow.setURL(element.url);
		      this.tooltipWindow.setSize(element.frameWidth, element.frameHeight);

		      // Set tooltip size
		      this.tooltipWindow.height = element.frameHeight;
		      this.tooltipWindow.width = element.frameWidth;
		      //add by banq
		      this.tooltipWindow.setLocation(element.offsetTop + TooltipManager.options.shiftY, element.offsetLeft + TooltipManager.options.shiftX);
		 
		    }
		    // HTML content
		    else
		      this.tooltipWindow.setHTMLContent(element.tooltipElement.innerHTML);

		    if (!element.ajaxInfo) {      
		      this.tooltipWindow.show();
		      this.tooltipWindow.toFront();
		      this.tooltipWindow.updateHeight();
		    }
		  },
		  
		   _refreshheight: function(element) {
		   alert("hello");
		    if (this.tooltipWindow) {
		      this.tooltipWindow.updateHeight();
		  
		    }
		  },
		  
		  _hideTooltip: function(element) {
		    if (this.tooltipWindow) {
		      this.tooltipWindow.hide();
		      this.element = null;
		    }
		  },
		  
		  _mouseOver: function (event) {
		    var element = Event.element(event);
		    if (TooltipManager.showTimer) 
		      clearTimeout(TooltipManager.showTimer);
		    
		    TooltipManager.showTimer = setTimeout(function() {TooltipManager._showTooltip(element)}, TooltipManager.options.delayOver)
		  },
		  
		  _mouseOut: function(event) {
		    var element = Event.element(event);
		    if (TooltipManager.showTimer) {
		      clearTimeout(TooltipManager.showTimer);
		      TooltipManager.showTimer = null;
		      return;
		    }
		    if (TooltipManager.tooltipWindow)
		      TooltipManager.hideTimer = setTimeout(function() {TooltipManager._hideTooltip(element)}, TooltipManager.options.delayOut)
		  },
		  
		  _tooltipOver: function(event, element) {
		    if (TooltipManager.hideTimer) {
		      clearTimeout(TooltipManager.hideTimer);
		      TooltipManager.hideTimer = null;
		    }
		  },
		  
		  _tooltipOut: function(event, element) {
		    if (TooltipManager.hideTimer == null)
		      TooltipManager.hideTimer = setTimeout(function() {TooltipManager._hideTooltip(element)}, TooltipManager.options.delayOut)
		  },
		  
		  _getInfo: function(element) {
		    // Find html_ for static content
		    var id = element.className.split(' ').detect(function(name) {return name.indexOf("html_") == 0});
		    var ajax = true;
		    if (id)
		      ajax = false;
		    else 
		      // Find ajax_ for ajax content
		      id = element.className.split(' ').detect(function(name) {return name.indexOf("ajax_") == 0});
		    
		    id = id.substr(id.indexOf('_')+1, id.length)
		    return id ? {ajax: ajax, id: id} : null;
		  }
		  
		};

//above is from tooltip.js
//below is from effects.js
String.prototype.parseColor=function(){var A="#";if(this.slice(0,4)=="rgb("){var _=this.slice(4,this.length-1).split(","),$=0;do A+=parseInt(_[$]).toColorPart();while(++$<3)}else if(this.slice(0,1)=="#"){if(this.length==4)for($=1;$<4;$++)A+=(this.charAt($)+this.charAt($)).toLowerCase();if(this.length==7)A=this.toLowerCase()}return(A.length==7?A:(arguments[0]||this))};Element.collectTextNodes=function(_){return $A($(_).childNodes).collect(function($){return($.nodeType==3?$.nodeValue:($.hasChildNodes()?Element.collectTextNodes($):""))}).flatten().join("")};Element.collectTextNodesIgnoreClass=function(_,A){return $A($(_).childNodes).collect(function($){return($.nodeType==3?$.nodeValue:(($.hasChildNodes()&&!Element.hasClassName($,A))?Element.collectTextNodesIgnoreClass($,A):""))}).flatten().join("")};Element.setContentZoom=function(_,A){_=$(_);_.setStyle({fontSize:(A/100)+"em"});if(Prototype.Browser.WebKit)window.scrollBy(0,0);return _};Element.getInlineOpacity=function(_){return $(_).style.opacity||""};Element.forceRerendering=function(_){try{_=$(_);var A=document.createTextNode(" ");_.appendChild(A);_.removeChild(A)}catch(B){}};Array.prototype.call=function(){var $=arguments;this.each(function(_){_.apply(this,$)})};var Effect={_elementDoesNotExistError:{name:"ElementDoesNotExistError",message:"The specified DOM element does not exist, but is required for this effect to operate"},tagifyText:function(_){if(typeof Builder=="undefined")throw("Effect.tagifyText requires including script.aculo.us' builder.js library");var A="position:relative";if(Prototype.Browser.IE)A+=";zoom:1";_=$(_);$A(_.childNodes).each(function($){if($.nodeType==3){$.nodeValue.toArray().each(function(B){_.insertBefore(Builder.node("span",{style:A},B==" "?String.fromCharCode(160):B),$)});Element.remove($)}})},multiple:function(_,B){var D;if(((typeof _=="object")||(typeof _=="function"))&&(_.length))D=_;else D=$(_).childNodes;var C=Object.extend({speed:0.1,delay:0},arguments[2]||{}),A=C.delay;$A(D).each(function(_,$){new B(_,Object.extend(C,{delay:$*C.speed+A}))})},PAIRS:{"slide":["SlideDown","SlideUp"],"blind":["BlindDown","BlindUp"],"appear":["Appear","Fade"]},toggle:function(_,A){_=$(_);A=(A||"appear").toLowerCase();var B=Object.extend({queue:{position:"end",scope:(_.id||"global"),limit:1}},arguments[2]||{});Effect[_.visible()?Effect.PAIRS[A][1]:Effect.PAIRS[A][0]](_,B)}},Effect2=Effect;Effect.Transitions={linear:Prototype.K,sinoidal:function($){return(-Math.cos($*Math.PI)/2)+0.5},reverse:function($){return 1-$},flicker:function($){var $=((-Math.cos($*Math.PI)/4)+0.75)+Math.random()/4;return($>1?1:$)},wobble:function($){return(-Math.cos($*Math.PI*(9*$))/2)+0.5},pulse:function($,_){_=_||5;return(Math.round(($%(1/_))*_)==0?(($*_*2)-Math.floor($*_*2)):1-(($*_*2)-Math.floor($*_*2)))},none:function($){return 0},full:function($){return 1}};Effect.ScopedQueue=Class.create();Object.extend(Object.extend(Effect.ScopedQueue.prototype,Enumerable),{initialize:function(){this.effects=[];this.interval=null},_each:function($){this.effects._each($)},add:function(_){var A=new Date().getTime(),$=(typeof _.options.queue=="string")?_.options.queue:_.options.queue.position;switch($){case"front":this.effects.findAll(function($){return $.state=="idle"}).each(function($){$.startOn+=_.finishOn;$.finishOn+=_.finishOn});break;case"with-last":A=this.effects.pluck("startOn").max()||A;break;case"end":A=this.effects.pluck("finishOn").max()||A;break}_.startOn+=A;_.finishOn+=A;if(!_.options.queue.limit||(this.effects.length<_.options.queue.limit))this.effects.push(_);if(!this.interval)this.interval=setInterval(this.loop.bind(this),15)},remove:function($){this.effects=this.effects.reject(function(_){return _==$});if(this.effects.length==0){clearInterval(this.interval);this.interval=null}},loop:function(){var A=new Date().getTime();for(var _=0,$=this.effects.length;_<$;_++)this.effects[_]&&this.effects[_].loop(A)}});Effect.Queues={instances:$H(),get:function($){if(typeof $!="string")return $;if(!this.instances[$])this.instances[$]=new Effect.ScopedQueue();return this.instances[$]}};Effect.Queue=Effect.Queues.get("global");Effect.DefaultOptions={transition:Effect.Transitions.sinoidal,duration:1,fps:100,sync:false,from:0,to:1,delay:0,queue:"parallel"};Effect.Base=function(){};Effect.Base.prototype={position:null,start:function(options){function codeForEvent(_,$){return((_[$+"Internal"]?"this.options."+$+"Internal(this);":"")+(_[$]?"this.options."+$+"(this);":""))}if(options.transition===false)options.transition=Effect.Transitions.linear;this.options=Object.extend(Object.extend({},Effect.DefaultOptions),options||{});this.currentFrame=0;this.state="idle";this.startOn=this.options.delay*1000;this.finishOn=this.startOn+(this.options.duration*1000);this.fromToDelta=this.options.to-this.options.from;this.totalTime=this.finishOn-this.startOn;this.totalFrames=this.options.fps*this.options.duration;eval("this.render = function(pos){ "+"if(this.state==\"idle\"){this.state=\"running\";"+codeForEvent(options,"beforeSetup")+(this.setup?"this.setup();":"")+codeForEvent(options,"afterSetup")+"};if(this.state==\"running\"){"+"pos=this.options.transition(pos)*"+this.fromToDelta+"+"+this.options.from+";"+"this.position=pos;"+codeForEvent(options,"beforeUpdate")+(this.update?"this.update(pos);":"")+codeForEvent(options,"afterUpdate")+"}}");this.event("beforeStart");if(!this.options.sync)Effect.Queues.get(typeof this.options.queue=="string"?"global":this.options.queue.scope).add(this)},loop:function(A){if(A>=this.startOn){if(A>=this.finishOn){this.render(1);this.cancel();this.event("beforeFinish");if(this.finish)this.finish();this.event("afterFinish");return}var _=(A-this.startOn)/this.totalTime,$=Math.round(_*this.totalFrames);if($>this.currentFrame){this.render(_);this.currentFrame=$}}},cancel:function(){if(!this.options.sync)Effect.Queues.get(typeof this.options.queue=="string"?"global":this.options.queue.scope).remove(this);this.state="finished"},event:function($){if(this.options[$+"Internal"])this.options[$+"Internal"](this);if(this.options[$])this.options[$](this)},inspect:function(){var $=$H();for(property in this)if(typeof this[property]!="function")$[property]=this[property];return"#<Effect:"+$.inspect()+",options:"+$H(this.options).inspect()+">"}};Effect.Parallel=Class.create();Object.extend(Object.extend(Effect.Parallel.prototype,Effect.Base.prototype),{initialize:function($){this.effects=$||[];this.start(arguments[1])},update:function($){this.effects.invoke("render",$)},finish:function($){this.effects.each(function(_){_.render(1);_.cancel();_.event("beforeFinish");if(_.finish)_.finish($);_.event("afterFinish")})}});Effect.Event=Class.create();Object.extend(Object.extend(Effect.Event.prototype,Effect.Base.prototype),{initialize:function(){var $=Object.extend({duration:0},arguments[0]||{});this.start($)},update:Prototype.emptyFunction});Effect.Opacity=Class.create();Object.extend(Object.extend(Effect.Opacity.prototype,Effect.Base.prototype),{initialize:function(_){this.element=$(_);if(!this.element)throw(Effect._elementDoesNotExistError);if(Prototype.Browser.IE&&(!this.element.currentStyle.hasLayout))this.element.setStyle({zoom:1});var A=Object.extend({from:this.element.getOpacity()||0,to:1},arguments[1]||{});this.start(A)},update:function($){this.element.setOpacity($)}});Effect.Move=Class.create();Object.extend(Object.extend(Effect.Move.prototype,Effect.Base.prototype),{initialize:function(_){this.element=$(_);if(!this.element)throw(Effect._elementDoesNotExistError);var A=Object.extend({x:0,y:0,mode:"relative"},arguments[1]||{});this.start(A)},setup:function(){this.element.makePositioned();this.originalLeft=parseFloat(this.element.getStyle("left")||"0");this.originalTop=parseFloat(this.element.getStyle("top")||"0");if(this.options.mode=="absolute"){this.options.x=this.options.x-this.originalLeft;this.options.y=this.options.y-this.originalTop}},update:function($){this.element.setStyle({left:Math.round(this.options.x*$+this.originalLeft)+"px",top:Math.round(this.options.y*$+this.originalTop)+"px"})}});Effect.MoveBy=function(_,A,$){return new Effect.Move(_,Object.extend({x:$,y:A},arguments[3]||{}))};Effect.Scale=Class.create();Object.extend(Object.extend(Effect.Scale.prototype,Effect.Base.prototype),{initialize:function(_,A){this.element=$(_);if(!this.element)throw(Effect._elementDoesNotExistError);var B=Object.extend({scaleX:true,scaleY:true,scaleContent:true,scaleFromCenter:false,scaleMode:"box",scaleFrom:100,scaleTo:A},arguments[2]||{});this.start(B)},setup:function(){this.restoreAfterFinish=this.options.restoreAfterFinish||false;this.elementPositioning=this.element.getStyle("position");this.originalStyle={};["top","left","width","height","fontSize"].each(function($){this.originalStyle[$]=this.element.style[$]}.bind(this));this.originalTop=this.element.offsetTop;this.originalLeft=this.element.offsetLeft;var $=this.element.getStyle("font-size")||"100%";["em","px","%","pt"].each(function(_){if($.indexOf(_)>0){this.fontSize=parseFloat($);this.fontSizeType=_}}.bind(this));this.factor=(this.options.scaleTo-this.options.scaleFrom)/100;this.dims=null;if(this.options.scaleMode=="box")this.dims=[this.element.offsetHeight,this.element.offsetWidth];if(/^content/.test(this.options.scaleMode))this.dims=[this.element.scrollHeight,this.element.scrollWidth];if(!this.dims)this.dims=[this.options.scaleMode.originalHeight,this.options.scaleMode.originalWidth]},update:function(_){var $=(this.options.scaleFrom/100)+(this.factor*_);if(this.options.scaleContent&&this.fontSize)this.element.setStyle({fontSize:this.fontSize*$+this.fontSizeType});this.setDimensions(this.dims[0]*$,this.dims[1]*$)},finish:function($){if(this.restoreAfterFinish)this.element.setStyle(this.originalStyle)},setDimensions:function(A,_){var $={};if(this.options.scaleX)$.width=Math.round(_)+"px";if(this.options.scaleY)$.height=Math.round(A)+"px";if(this.options.scaleFromCenter){var B=(A-this.dims[0])/2,C=(_-this.dims[1])/2;if(this.elementPositioning=="absolute"){if(this.options.scaleY)$.top=this.originalTop-B+"px";if(this.options.scaleX)$.left=this.originalLeft-C+"px"}else{if(this.options.scaleY)$.top=-B+"px";if(this.options.scaleX)$.left=-C+"px"}}this.element.setStyle($)}});Effect.Highlight=Class.create();Object.extend(Object.extend(Effect.Highlight.prototype,Effect.Base.prototype),{initialize:function(_){this.element=$(_);if(!this.element)throw(Effect._elementDoesNotExistError);var A=Object.extend({startcolor:"#ffff99"},arguments[1]||{});this.start(A)},setup:function(){if(this.element.getStyle("display")=="none"){this.cancel();return}this.oldStyle={};if(!this.options.keepBackgroundImage){this.oldStyle.backgroundImage=this.element.getStyle("background-image");this.element.setStyle({backgroundImage:"none"})}if(!this.options.endcolor)this.options.endcolor=this.element.getStyle("background-color").parseColor("#ffffff");if(!this.options.restorecolor)this.options.restorecolor=this.element.getStyle("background-color");this._base=$R(0,2).map(function($){return parseInt(this.options.startcolor.slice($*2+1,$*2+3),16)}.bind(this));this._delta=$R(0,2).map(function($){return parseInt(this.options.endcolor.slice($*2+1,$*2+3),16)-this._base[$]}.bind(this))},update:function($){this.element.setStyle({backgroundColor:$R(0,2).inject("#",function(A,B,_){return A+(Math.round(this._base[_]+(this._delta[_]*$)).toColorPart())}.bind(this))})},finish:function(){this.element.setStyle(Object.extend(this.oldStyle,{backgroundColor:this.options.restorecolor}))}});Effect.ScrollTo=Class.create();Object.extend(Object.extend(Effect.ScrollTo.prototype,Effect.Base.prototype),{initialize:function(_){this.element=$(_);this.start(arguments[1]||{})},setup:function(){Position.prepare();var $=Position.cumulativeOffset(this.element);if(this.options.offset)$[1]+=this.options.offset;var _=window.innerHeight?window.height-window.innerHeight:document.body.scrollHeight-(document.documentElement.clientHeight?document.documentElement.clientHeight:document.body.clientHeight);this.scrollStart=Position.deltaY;this.delta=($[1]>_?_:$[1])-this.scrollStart},update:function($){Position.prepare();window.scrollTo(Position.deltaX,this.scrollStart+($*this.delta))}});Effect.Fade=function(_){_=$(_);var A=_.getInlineOpacity(),B=Object.extend({from:_.getOpacity()||1,to:0,afterFinishInternal:function($){if($.options.to!=0)return;$.element.hide().setStyle({opacity:A})}},arguments[1]||{});return new Effect.Opacity(_,B)};Effect.Appear=function(_){_=$(_);var A=Object.extend({from:(_.getStyle("display")=="none"?0:_.getOpacity()||0),to:1,afterFinishInternal:function($){$.element.forceRerendering()},beforeSetup:function($){$.element.setOpacity($.options.from).show()}},arguments[1]||{});return new Effect.Opacity(_,A)};Effect.Puff=function(A){A=$(A);var _={opacity:A.getInlineOpacity(),position:A.getStyle("position"),top:A.style.top,left:A.style.left,width:A.style.width,height:A.style.height};return new Effect.Parallel([new Effect.Scale(A,200,{sync:true,scaleFromCenter:true,scaleContent:true,restoreAfterFinish:true}),new Effect.Opacity(A,{sync:true,to:0})],Object.extend({duration:1,beforeSetupInternal:function($){Position.absolutize($.effects[0].element)},afterFinishInternal:function($){$.effects[0].element.hide().setStyle(_)}},arguments[1]||{}))};Effect.BlindUp=function(_){_=$(_);_.makeClipping();return new Effect.Scale(_,0,Object.extend({scaleContent:false,scaleX:false,restoreAfterFinish:true,afterFinishInternal:function($){$.element.hide().undoClipping()}},arguments[1]||{}))};Effect.BlindDown=function(_){_=$(_);var A=_.getDimensions();return new Effect.Scale(_,100,Object.extend({scaleContent:false,scaleX:false,scaleFrom:0,scaleMode:{originalHeight:A.height,originalWidth:A.width},restoreAfterFinish:true,afterSetup:function($){$.element.makeClipping().setStyle({height:"0px"}).show()},afterFinishInternal:function($){$.element.undoClipping()}},arguments[1]||{}))};Effect.SwitchOff=function(_){_=$(_);var A=_.getInlineOpacity();return new Effect.Appear(_,Object.extend({duration:0.4,from:0,transition:Effect.Transitions.flicker,afterFinishInternal:function($){new Effect.Scale($.element,1,{duration:0.3,scaleFromCenter:true,scaleX:false,scaleContent:false,restoreAfterFinish:true,beforeSetup:function($){$.element.makePositioned().makeClipping()},afterFinishInternal:function($){$.element.hide().undoClipping().undoPositioned().setStyle({opacity:A})}})}},arguments[1]||{}))};Effect.DropOut=function(A){A=$(A);var _={top:A.getStyle("top"),left:A.getStyle("left"),opacity:A.getInlineOpacity()};return new Effect.Parallel([new Effect.Move(A,{x:0,y:100,sync:true}),new Effect.Opacity(A,{sync:true,to:0})],Object.extend({duration:0.5,beforeSetup:function($){$.effects[0].element.makePositioned()},afterFinishInternal:function($){$.effects[0].element.hide().undoPositioned().setStyle(_)}},arguments[1]||{}))};Effect.Shake=function(A){A=$(A);var _={top:A.getStyle("top"),left:A.getStyle("left")};return new Effect.Move(A,{x:20,y:0,duration:0.05,afterFinishInternal:function($){new Effect.Move($.element,{x:-40,y:0,duration:0.1,afterFinishInternal:function($){new Effect.Move($.element,{x:40,y:0,duration:0.1,afterFinishInternal:function($){new Effect.Move($.element,{x:-40,y:0,duration:0.1,afterFinishInternal:function($){new Effect.Move($.element,{x:40,y:0,duration:0.1,afterFinishInternal:function($){new Effect.Move($.element,{x:-20,y:0,duration:0.05,afterFinishInternal:function($){$.element.undoPositioned().setStyle(_)}})}})}})}})}})}})};Effect.SlideDown=function(_){_=$(_).cleanWhitespace();var B=_.down().getStyle("bottom"),A=_.getDimensions();return new Effect.Scale(_,100,Object.extend({scaleContent:false,scaleX:false,scaleFrom:window.opera?0:1,scaleMode:{originalHeight:A.height,originalWidth:A.width},restoreAfterFinish:true,afterSetup:function($){$.element.makePositioned();$.element.down().makePositioned();if(window.opera)$.element.setStyle({top:""});$.element.makeClipping().setStyle({height:"0px"}).show()},afterUpdateInternal:function($){$.element.down().setStyle({bottom:($.dims[0]-$.element.clientHeight)+"px"})},afterFinishInternal:function($){$.element.undoClipping().undoPositioned();$.element.down().undoPositioned().setStyle({bottom:B})}},arguments[1]||{}))};Effect.SlideUp=function(_){_=$(_).cleanWhitespace();var A=_.down().getStyle("bottom");return new Effect.Scale(_,window.opera?0:1,Object.extend({scaleContent:false,scaleX:false,scaleMode:"box",scaleFrom:100,restoreAfterFinish:true,beforeStartInternal:function($){$.element.makePositioned();$.element.down().makePositioned();if(window.opera)$.element.setStyle({top:""});$.element.makeClipping().show()},afterUpdateInternal:function($){$.element.down().setStyle({bottom:($.dims[0]-$.element.clientHeight)+"px"})},afterFinishInternal:function($){$.element.hide().undoClipping().undoPositioned().setStyle({bottom:A});$.element.down().undoPositioned()}},arguments[1]||{}))};Effect.Squish=function($){return new Effect.Scale($,window.opera?1:0,{restoreAfterFinish:true,beforeSetup:function($){$.element.makeClipping()},afterFinishInternal:function($){$.element.hide().undoClipping()}})};Effect.Grow=function(A){A=$(A);var G=Object.extend({direction:"center",moveTransition:Effect.Transitions.sinoidal,scaleTransition:Effect.Transitions.sinoidal,opacityTransition:Effect.Transitions.full},arguments[1]||{}),_={top:A.style.top,left:A.style.left,height:A.style.height,width:A.style.width,opacity:A.getInlineOpacity()},E=A.getDimensions(),F,B,C,D;switch(G.direction){case"top-left":F=B=C=D=0;break;case"top-right":F=E.width;B=D=0;C=-E.width;break;case"bottom-left":F=C=0;B=E.height;D=-E.height;break;case"bottom-right":F=E.width;B=E.height;C=-E.width;D=-E.height;break;case"center":F=E.width/2;B=E.height/2;C=-E.width/2;D=-E.height/2;break}return new Effect.Move(A,{x:F,y:B,duration:0.01,beforeSetup:function($){$.element.hide().makeClipping().makePositioned()},afterFinishInternal:function($){new Effect.Parallel([new Effect.Opacity($.element,{sync:true,to:1,from:0,transition:G.opacityTransition}),new Effect.Move($.element,{x:C,y:D,sync:true,transition:G.moveTransition}),new Effect.Scale($.element,100,{scaleMode:{originalHeight:E.height,originalWidth:E.width},sync:true,scaleFrom:window.opera?1:0,transition:G.scaleTransition,restoreAfterFinish:true})],Object.extend({beforeSetup:function($){$.effects[0].element.setStyle({height:"0px"}).show()},afterFinishInternal:function($){$.effects[0].element.undoClipping().undoPositioned().setStyle(_)}},G))}})};Effect.Shrink=function(A){A=$(A);var E=Object.extend({direction:"center",moveTransition:Effect.Transitions.sinoidal,scaleTransition:Effect.Transitions.sinoidal,opacityTransition:Effect.Transitions.none},arguments[1]||{}),_={top:A.style.top,left:A.style.left,height:A.style.height,width:A.style.width,opacity:A.getInlineOpacity()},D=A.getDimensions(),B,C;switch(E.direction){case"top-left":B=C=0;break;case"top-right":B=D.width;C=0;break;case"bottom-left":B=0;C=D.height;break;case"bottom-right":B=D.width;C=D.height;break;case"center":B=D.width/2;C=D.height/2;break}return new Effect.Parallel([new Effect.Opacity(A,{sync:true,to:0,from:1,transition:E.opacityTransition}),new Effect.Scale(A,window.opera?1:0,{sync:true,transition:E.scaleTransition,restoreAfterFinish:true}),new Effect.Move(A,{x:B,y:C,sync:true,transition:E.moveTransition})],Object.extend({beforeStartInternal:function($){$.effects[0].element.makePositioned().makeClipping()},afterFinishInternal:function($){$.effects[0].element.hide().undoClipping().undoPositioned().setStyle(_)}},E))};Effect.Pulsate=function(_){_=$(_);var D=arguments[1]||{},A=_.getInlineOpacity(),B=D.transition||Effect.Transitions.sinoidal,C=function($){return B(1-Effect.Transitions.pulse($,D.pulses))};C.bind(B);return new Effect.Opacity(_,Object.extend(Object.extend({duration:2,from:0,afterFinishInternal:function($){$.element.setStyle({opacity:A})}},D),{transition:C}))};Effect.Fold=function(A){A=$(A);var _={top:A.style.top,left:A.style.left,width:A.style.width,height:A.style.height};A.makeClipping();return new Effect.Scale(A,5,Object.extend({scaleContent:false,scaleX:false,afterFinishInternal:function($){new Effect.Scale(A,1,{scaleContent:false,scaleY:false,afterFinishInternal:function($){$.element.hide().undoClipping().setStyle(_)}})}},arguments[1]||{}))};Effect.Morph=Class.create();Object.extend(Object.extend(Effect.Morph.prototype,Effect.Base.prototype),{initialize:function(_){this.element=$(_);if(!this.element)throw(Effect._elementDoesNotExistError);var C=Object.extend({style:{}},arguments[1]||{});if(typeof C.style=="string"){if(C.style.indexOf(":")==-1){var B="",A="."+C.style;$A(document.styleSheets).reverse().each(function($){if($.cssRules)cssRules=$.cssRules;else if($.rules)cssRules=$.rules;$A(cssRules).reverse().each(function($){if(A==$.selectorText){B=$.style.cssText;throw $break}});if(B)throw $break});this.style=B.parseStyle();C.afterFinishInternal=function($){$.element.addClassName($.options.style);$.transforms.each(function(_){if(_.style!="opacity")$.element.style[_.style]=""})}}else this.style=C.style.parseStyle()}else this.style=$H(C.style);this.start(C)},setup:function(){function $($){if(!$||["rgba(0, 0, 0, 0)","transparent"].include($))$="#ffffff";$=$.parseColor();return $R(0,2).map(function(_){return parseInt($.slice(_*2+1,_*2+3),16)})}this.transforms=this.style.map(function(C){var D=C[0],A=C[1],B=null;if(A.parseColor("#zzzzzz")!="#zzzzzz"){A=A.parseColor();B="color"}else if(D=="opacity"){A=parseFloat(A);if(Prototype.Browser.IE&&(!this.element.currentStyle.hasLayout))this.element.setStyle({zoom:1})}else if(Element.CSS_LENGTH.test(A)){var _=A.match(/^([\+\-]?[0-9\.]+)(.*)$/);A=parseFloat(_[1]);B=(_.length==3)?_[2]:null}var E=this.element.getStyle(D);return{style:D.camelize(),originalValue:B=="color"?$(E):parseFloat(E||0),targetValue:B=="color"?$(A):A,unit:B}}.bind(this)).reject(function($){return(($.originalValue==$.targetValue)||($.unit!="color"&&(isNaN($.originalValue)||isNaN($.targetValue))))})},update:function(A){var B={},_,$=this.transforms.length;while($--)B[(_=this.transforms[$]).style]=_.unit=="color"?"#"+(Math.round(_.originalValue[0]+(_.targetValue[0]-_.originalValue[0])*A)).toColorPart()+(Math.round(_.originalValue[1]+(_.targetValue[1]-_.originalValue[1])*A)).toColorPart()+(Math.round(_.originalValue[2]+(_.targetValue[2]-_.originalValue[2])*A)).toColorPart():_.originalValue+Math.round(((_.targetValue-_.originalValue)*A)*1000)/1000+_.unit;this.element.setStyle(B,true)}});Effect.Transform=Class.create();Object.extend(Effect.Transform.prototype,{initialize:function($){this.tracks=[];this.options=arguments[1]||{};this.addTracks($)},addTracks:function($){$.each(function($){var _=$H($).values().first();this.tracks.push($H({ids:$H($).keys().first(),effect:Effect.Morph,options:{style:_}}))}.bind(this));return this},play:function(){return new Effect.Parallel(this.tracks.map(function(_){var A=[$(_.ids)||$$(_.ids)].flatten();return A.map(function($){return new _.effect($,Object.extend({sync:true},_.options))})}).flatten(),this.options)}});Element.CSS_PROPERTIES=$w("backgroundColor backgroundPosition borderBottomColor borderBottomStyle "+"borderBottomWidth borderLeftColor borderLeftStyle borderLeftWidth "+"borderRightColor borderRightStyle borderRightWidth borderSpacing "+"borderTopColor borderTopStyle borderTopWidth bottom clip color "+"fontSize fontWeight height left letterSpacing lineHeight "+"marginBottom marginLeft marginRight marginTop markerOffset maxHeight "+"maxWidth minHeight minWidth opacity outlineColor outlineOffset "+"outlineWidth paddingBottom paddingLeft paddingRight paddingTop "+"right textIndent top width wordSpacing zIndex");Element.CSS_LENGTH=/^(([\+\-]?[0-9\.]+)(em|ex|px|in|cm|mm|pt|pc|\%))|0$/;String.prototype.parseStyle=function(){var $=document.createElement("div");$.innerHTML="<div style=\""+this+"\"></div>";var A=$.childNodes[0].style,_=$H();Element.CSS_PROPERTIES.each(function($){if(A[$])_[$]=A[$]});if(Prototype.Browser.IE&&this.indexOf("opacity")>-1)_.opacity=this.match(/opacity:\s*((?:0|1)?(?:\.\d*)?)/)[1];return _};Element.morph=function($,_){new Effect.Morph($,Object.extend({style:_},arguments[2]||{}));return $};["getInlineOpacity","forceRerendering","setContentZoom","collectTextNodes","collectTextNodesIgnoreClass","morph"].each(function($){Element.Methods[$]=Element[$]});Element.Methods.visualEffect=function(_,A,B){s=A.dasherize().camelize();effect_class=s.charAt(0).toUpperCase()+s.substring(1);new Effect[effect_class](_,B);return $(_)};Element.addMethods()
//above is from effects.js
