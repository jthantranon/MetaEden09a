function OpenSesh(){
	var channel;
	var handler;
	var socket;
	$.getJSON('/cic/newSession', function(chantoken) {
        onOpen = function() {
		    console.debug('Session Established...' + chantoken);
		    //Announce('login');
		};
		onClose = function() {
		    console.debug('Session Closed.');
		    //Announce('logoff');
		};
		onMessage = function(msg) {
			pack = JSON.parse(msg.data);
			if (pack.console){
				console.debug('###  ON MESSAGE ###: ' + pack.console);
			} else {
				console.debug('### ON MESSAGE ###: ' + msg.data);
			}
		    //UpdateStatus(pack);
		};
		onError = function() {
		    console.debug('Session Error.');
		};
		openChannel = function() {
		    channel = new goog.appengine.Channel(chantoken);
		    handler = {'onopen': onOpen,'onclose': onClose,'onmessage': onMessage,'onerror': onError};
			socket = channel.open(handler);
			socket.onopen = onOpen;
			socket.onmessage = onMessage;
	};
		 setTimeout(openChannel, 50);
	});
}