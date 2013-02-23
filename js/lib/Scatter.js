$(document).ready(function() {
	console.debug('Test Begin');
	Glass = new EdenGlass();
	OpenSesh();
	$.getJSON("/cic/immigration",function(data){
		if (data.tutorial == 0){
			$.getScript('/js/tutorial.js',function(){
				t = new Tutorial('English',data);
				id = 'tutorial0';
				console.debug(t);
				Glass.create({id:id,title:t.zeroTitle,context:'body'});
				Glass.append(id, t.zeroContent+' ');
				Glass.aSubmitButton(id, 'Dismiss', 'dTutorialZero');
				$('#dTutorialZero').on('click',function(){
					Glass.destroy(id);
					$.post('/cic/incTutorial',function(data){
						console.debug(data);
					});
				});
			});
			console.debug(data);
		}
		
		//Glass.ActualizeHUD({muse:data},'CMuse');
		//Glass.ActualizeHUD({muse:data},'CNode');
		//Glass.ActualizeCNodeProfile({muse:data});
		
		console.debug(data);
	});
		
	//$('.chatWrapper').fadeTo(3000, 1);	
	
	$('#scatter').keypress(function(e) {
	    if(e.which == 13) {
	    	word = $(this).val()
	    	xmax = window.innerWidth
	    	ymax = window.innerHeight
	    	fontSize = Math.floor((Math.random()*80)+16)
	    	$('body').append("<div id='"+word.replace(/ /g,'')+"' style='position:absolute;font-size:"+fontSize+"' hidden>"+word+"</div>");
	    	divWidth = $('#'+word.replace(/ /g,'')).width()
	    	divHeight = $('#'+word.replace(/ /g,'')).height()
	    	x = Math.floor((Math.random()*(window.innerWidth-divWidth))+1)
	    	y = Math.floor((Math.random()*(window.innerHeight-divHeight))+1)
	    	$('#'+word.replace(/ /g,'')).css({'left':x,'top':y}).show();
	    	$(this).val('');
	    }
	});
	
	console.debug('Test End');
});


