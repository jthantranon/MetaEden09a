function EdenGlass(context) {
	
	
	var self = this;
	/////////////
	// initialize
	/////////////
	this.checkCSS();
	this.checkMinContainer();
	
	////////////
	// variables
	////////////
	this.context = context || 'body';
	this.template = '\
			<div class="glassHeader">\
		        <div class="centerWrap">\
		            <div class="glassCenter">\
		                <div class="innertube"><img src="img/glass/topBorderCenter.png" width="100%" height="10"></div>\
		            </div>\
		        </div> \
		        <div class="glassLeft">\
		            <div class="innertube"><img src="img/glass/topBorderLeft.png" width="10" height="10"></div>\
		        </div>  \
		        <div class="glassRight">\
		            <div class="innertube"><img src="img/glass/topBorderRight.png" width="10" height="10"></div>\
		        </div>   \
			</div>\
		  <div class="glassTitle">The Title</div>\
		  <div class="glassReflection"></div>\
		  <div class="glassMinButton"></div>\
		<div class="glassCloseButton"></div>\
		  <div class="glassTabWrapper">\
		      <div class="glassTabsLeft"></div>\
		      <div class="glassTabsRightWrapper">\
		          <div class="glassTabsRight"></div>\
		      </div>\
		  </div>\
		    <div class="glassContent">\
		    </div>';
	
	
	
	////////////////////////
	// initialization events
	////////////////////////
	
	$('.glassWrapper').livequery(function(){
		var context = $(this).children('.glassContent');
		$(this).resizable({alsoResize:context});
	});
	
	$('.glassWrapper').livequery(function(){
		$(this).draggable({handle:'.glassTabWrapper'});
	});
	
	$('.glassMinButton').livequery('click',function(){
		var context = $(this).parent();
		var id = $(context).attr('id');
		self.minimize(id);		
	});
	
	$('.glassMinBar').livequery('click',function(){
		var id = $(this).attr('id');
		$(this).remove();
		self.maximize(id);		
	});
	
	
} // end constructor


EdenGlass.prototype.checkCSS = function() {
	if(!$('link[href="css/EdenGlass.css"]').length) {
		$('head').append('<link href="css/EdenGlass.css" rel="stylesheet" type="text/css">');
	};
};

EdenGlass.prototype.checkMinContainer = function() {
	var mycontext = 'body';
	var mytemplate = '<div class="glassMinContainer"></div>';
	
	if(!$('.glassMinContainer').length) {
		$(mycontext).append(mytemplate);
	};
};


EdenGlass.prototype.create = function(args){
	if(args && args.id) {
		
		var context = args.context || "body";
		var content = args.content || "";
		var xpos = args.xpos || 100;
		var ypos = args.ypos || 100;
		var title = args.title || "Unknown Glass";
		var name = args.name || args.id + "Glass";
		var id = args.id;
		var kid = args.kid;
		var gClass = args.gClass;
		var dClass = args.id;
		
		// set ID for template
		var wrapperStart = '<div class="glassWrapper" id="' + id + '">';
		var wrapperEnd = '</div>';
		
		// apply template
		var tmpl = wrapperStart + this.template + wrapperEnd;
		$(context).append(tmpl);
		
		// set title
		//alert($('#'+id).children('.glassTitle').text());
		$('#'+id).children('.glassTitle').text(title);
		
		// add content
		$('#'+id).children('.glassContent').empty();
		$('#'+id).children('.glassContent').html(content);
		
		// set starting location
		$('#'+id).css({"left":xpos,"top":ypos});
		
		// set name
		$('#'+id).attr('data-name',name);
		
		// add default class (important for sheets)
		$('#'+id).addClass(dClass);
		
		// add class (important for sheets)
		$('#'+id).addClass(gClass);
		
		// add class (important for sheets)
		$('#'+id).addClass(kid);
		
	} else {
		console.log("error EdenGlass.create() - incorrect arguments provided");
	};
};



EdenGlass.prototype.title = function(id,newTitle) {
	if(id && newTitle) {
		$('#'+id).children('.glassTitle').text(newTitle);
		
	} else {
		console.log("error EdenGlass.title() - incorrect arguments provided");
	};
	
};


EdenGlass.prototype.append = function(id,content) {
	$('#'+id).children('.glassContent').append(content);	
};

EdenGlass.prototype.clear = function(id) {
	$('#'+id).children('.glassContent').empty();
};

EdenGlass.prototype.destroy = function(id) {
	$('#'+id).remove();
};

EdenGlass.prototype.reattr = function(id,context,content) {
	$('#'+id).find(context).empty();
	$('#'+id).find(context).append(content);	
};

EdenGlass.prototype.destroy = function(id) {
	$('#'+id).remove();	
};

EdenGlass.prototype.hide = function(id) {
	$('#'+id).hide();
};

EdenGlass.prototype.show = function(id) {
	$('#'+id).show();
};

EdenGlass.prototype.minimize = function(id) {
	$('#'+id).hide();
	var minTitle = $('#'+id).children('.glassTitle').text();
	$('.glassMinContainer').append('<div class="glassMinBar" id="' + id +'">' + minTitle + '<div class="glassMaxButton"></div></div>');
};

EdenGlass.prototype.maximize = function(id) {
	$('#'+id).show();	
};

var dragArgs = {revert: false,helper: 'clone',appendTo: '#wholepage',containment: 'DOM',zIndex: 1500,cancel: false, delay: 250};

function gAppend(id,appendage){
	var thereturn = $('.'+id).children('.glassContent').append(appendage); 
	return thereturn;
};

function gcAppendForm(id,appendage){
	var thereturn = $('.'+id).find('.'+id+'Form').append(appendage); 
	return thereturn;
};

function gcAppend(container,appendage){
	var thereturn = $('.'+container).append(appendage); 
	return thereturn;
};

function attrAppend(id,appendage){
	var thereturn = $('.mIcon'+id).attr(appendage); 
	return thereturn;
}

function actionAttrAppend(id,appendage){
	var thereturn = $('.'+id).attr(appendage); 
	return thereturn;
}

function gfAppendCList(id,listdata){
	
}

EdenGlass.prototype.aCheckList = function(id,list){
	//alert(list);
	$('#'+id).children('.glassContent').children('#'+id+'Form').append(
			"<fieldset name='actions'>" +
			"<h1>Actions</h1>" +
			"</fieldset>"
		);
		$.each(list,function(){
			$('#'+id).children('.glassContent').children('#'+id+'Form').children('fieldset').append(
				"<input type='checkbox' id='"+this+"' name='"+this+"' value='"+this+"'>" + this
			);
		});
};

EdenGlass.prototype.remove = function(id,context) {
	$('#'+id).find('.'+context).remove();
};

EdenGlass.prototype.clear = function(id,context) {
	$('#'+id).find('.'+context).empty();
};

EdenGlass.prototype.aBreak = function(id){
	gAppend(id,"<br>");
};

EdenGlass.prototype.aObj = function(container,tMedo) {
	gcAppend(container,"<input type='button' id='mIcon"+tMedo.kid+"' class='mIcon"+tMedo.kid+"'>");
	attrAppend(tMedo.kid,{class:'obj mIcon mIcon'+tMedo.kid,value:tMedo.name,title:tMedo.kid,'data-name':tMedo.name,'data-metakind':tMedo.metakind,'data-metaid':tMedo.metaid});
	$('.mIcon').draggable(dragArgs);
	if (tMedo.ytlink){attrAppend(tMedo.kid,{'data-ytlink':tMedo.ytlink});}
};

EdenGlass.prototype.aSOO = function(tMedo) {
	var kid = tMedo.kid;
	var name = tMedo.name;
	var kind = tMedo.metakind;
	var id = tMedo.metaid;
	var thereturn = "<input type='button' id='mIcon"+kid+"' class='obj mIcon mIcon"+kid+"' value='"+name+"' title='"+kid+"' data-name='"+name+"' data-metakind='"+kind+"' data-metaid='"+id+"'>"; 
	return  thereturn;
};

EdenGlass.prototype.aMeta = function(id,tMedo) {
	gcAppend(id,"<input type='button' id='mIcon"+tMedo.kid+"' class='mIcon"+tMedo.kid+"'>");
	attrAppend(tMedo.kid,{class:'obj mIcon mIcon'+tMedo.kid,value:tMedo.name,title:tMedo.kid,'data-name':tMedo.name,'data-metakind':tMedo.metakind,'data-metaid':tMedo.metaid});
	$('.mIcon').draggable(dragArgs);
	if (tMedo.ytlink){attrAppend(tMedo.kid,{'data-ytlink':tMedo.ytlink});}
};

EdenGlass.prototype.replace = function(context,content) {
	$('body').find('.'+context).html(content);
};

EdenGlass.prototype.reData = function(context,appendage) {
	$('body').find('.'+context).html("<p>"+appendage+"</p>");
};

EdenGlass.prototype.rObj = function(tKID) {
	$('body').find('.mIcon'+tKID).remove();
};

EdenGlass.prototype.aContainer = function(id,container,contID){
	gAppend(id,
			"<div title='"+container+"'><h1>"+container+"</h1><span id='"+contID+"' class='"+contID+" "+container+"'></span></div>");
};

EdenGlass.prototype.aForm = function(id){
	gAppend(id,
			"<form id='"+id+"Form' class='"+id+"Form'></form>");
};

EdenGlass.prototype.aData = function(id,label,dataname,appendage){
	gAppend(id,
			"<div><h1>"+label+"</h1><span class='"+dataname+"'>"+
			"<p>" + appendage + "</p></span></div>");
};

EdenGlass.prototype.aField = function(id,label,fieldID,fieldName){ //Depcricated, Use aFormField
	gAppend(id,
			"<h1>"+label+"</h1>"+
			"<input id='"+fieldID+"' name='"+fieldName+"' type='text'><br>");
};

EdenGlass.prototype.aFormField = function(id,longname,shortname){
	gcAppendForm(id,
			"<h1>"+longname+"</h1>"+
			"<input id='"+id+"Form"+shortname+"' name='"+shortname+"' type='text'><br>");
};

EdenGlass.prototype.aFormFieldD = function(id,longname,shortname,value){ //Depcricated, Use aFormField
	gcAppendForm(id,
			"<h1>"+longname+"</h1>"+
			"<input id='"+id+"Form"+shortname+"' name='"+shortname+"' type='text' value='"+value+"' disabled><br>");
};

EdenGlass.prototype.aSubmitButton = function(id,btnText,fieldID){
	gAppend(id,
			"<input value='"+btnText+"' id='"+fieldID+"' type='button' class='button'>");
};

EdenGlass.prototype.aAction = function(container,tMedo,action){
	var act =  action.replace(/ /g,'');
	gcAppend(container,"<input type='button' id='"+tMedo.kid+act+"' class='"+tMedo.kid+act+"'>");
	actionAttrAppend(tMedo.kid+act,{class:'action btnaction '+tMedo.kid+act,value:action,title:tMedo.kid+act,'data-name':tMedo.name,'data-metakind':tMedo.metakind,'data-metaid':tMedo.metaid,'data-action':act});
};


function idLabelDataHTML(id){
	return function(label,data){
		$('.'+id).children('.glassContent').append("<div><h1>"+label+"</h1><span class='"+label+"'><p>" + data + "</p></span></div>");
	}
}

function idAppendBasic(id,meta){
	kid = meta.kid;
	name = meta.name;
	info = meta.info;
	node = meta.node;
	tLabelDataHTML = idLabelDataHTML(id);
	return function(data){
		if (data == name){
			tLabelDataHTML('Name',name);
		}
		if (data == info){
			tLabelDataHTML('Info',info);
		}
		if (data == node){
			tLabelDataHTML('Node',node);
		}
	}
};

EdenGlass.prototype.ActualizeHUD = function(args,profileType){
	if(args.muse && profileType) {
		if (profileType == 'CMuse'){
			var name = args.muse.name;
			var id = args.muse.kid+'HUD';
			var kid = args.muse.kid;
			var context = "body";
			var xpos = 10;
			var ypos = 10;
			var title = 'Vitals';
			var info = args.muse.info
			var tAppendBasic = idAppendBasic(id, args.muse); 
		} else if (profileType == 'CNode'){
			var name = args.muse.nodeMeta.name;
			var id = args.muse.nodeMeta.kid+'HUD';
			var kid = args.muse.nodeMeta.kid;
			var context = "body";
			var xpos = 400;
			var ypos = 10;
			var title = 'This Node';
			var info = args.muse.nodeMeta.info
			var tAppendBasic = idAppendBasic(id, args.muse.nodeMeta); 
		}
		
		// set ID for template
		var wrapperStart = '<div class="glassWrapper" id="' + id + '">';
		var wrapperEnd = '</div>';
		
		// apply template
		var tmpl = wrapperStart + this.template + wrapperEnd;
		$(context).append(tmpl);
		// set title
		$('#'+id).children('.glassTitle').text(title);
		
		// set starting location
		$('#'+id).css({"left":xpos,"top":ypos});
		
		// set name
		$('#'+id).attr('data-name',name);
		
		// add default class (important for sheets)
		$('#'+id).addClass(id);
		$('#'+id).addClass(kid);
		
		tAppendBasic(name);
		tAppendBasic(info);
		tAppendBasic(node);
		
		var glassContent = $('#'+id).children('.glassContent').attr('id',id+'Content');
		
		return $('#'+id+'Content');
		
	} else {
		console.log("error EdenGlass.create() - incorrect arguments provided");
	};
};
/////////////////////////////////////////
// testing and examples
/////////////////////////////////////////
//
//// make a new glassmaking shop
//myglass = new MEGlass();
//
//// do stuff with it
//myglass.create({id:500, title:"Wasp", context:'body'});
//myglass.create({id:550});
//myglass.title(550,"This Bomb Shiznitz");
//myglass.append(500,"<h1>Content:</h1><p>There is none</p>");
//myglass.append(550,"<h1>Content:</h1><p>550 Content...</p>");
//myglass.append(500,"<h1>Moar Content:</h1><p>New 500 Content...</p>");