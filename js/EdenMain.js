$(document).ready(function() {
	console.debug('Test Begin');
	
	function GenBtnMaker(id,value,context){
		var context = context || $('body');
		context.append("<input type='button' id='"+id+"' value='"+value+"'>");
	};
	
	function DotSplitter(string){
		return string.split('.')
	}
	
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
		
		var vitalsHUD = Glass.ActualizeHUD({muse:data},'CMuse');
		var nodeHUD = Glass.ActualizeHUD({muse:data},'CNode');
		
		GenBtnMaker('Test','Place CityHall',vitalsHUD);
		GenBtnMaker('MuseumRemove','Remove CityHall',vitalsHUD);
		
//		vitalsHUD.append('test');
//		nodeHUD.append('test');
		
		console.debug(data);
		
		$.each(data.OtherMusesHere,function(){
			var split = DotSplitter(this);
			var id = split[0];
			var name = split[1];
			GenBtnMaker('MuseIcon'+id,name)
		});
		
		$.each(data.OrbsHere,function(){
			var split = DotSplitter(this);
			var id = split[0];
			var name = split[1];
			GenBtnMaker('OrbIcon'+id,name)
		});
		
	});
		
	$('.chatWrapper').fadeTo(3000, 1);	
	
	
	
	function aStack(name,floors,x,y,xl,yl){
		y = y * -2.5
		x = x * -2.5
		var xl = xl || '1';
		var yl = yl || '1';
		makeBuilding('models/base.json', 'models/floor.json', 'models/crown.json', floors, new THREE.Vector3(xl,1,yl), scene, new THREE.Vector3(y,0,x),name);
		//alert(buildingGroup.getChildByName(name));
	};
	
	$('body').on('click','#Test',function() {
		aStack('CityHall','6','0','0','2','2');
	});
	
	
	aStack('east','1','1','0');
	aStack('west','1','-1','0');
	aStack('north','1','0','1');
	aStack('south','1','0','-1');
	aStack('Museum','1','0','-2','2','2');
	
	$('body').on('click','#MuseumRemove',function() {
		//alert(buildingGroup.getChildByName('Museum'));
		buildingGroup.remove(buildingGroup.getChildByName('CityHall'));
	});
	
	console.debug('Test End');
});


