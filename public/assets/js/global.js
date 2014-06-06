var REALCHAT = {} || REALCHAT;

// Store the socket
REALCHAT.config = {

	socket : io.connect('/randoChat')

};

// Initialise text editor
function initTextEditor () {

	var editor = new wysihtml5.Editor("editor", {
		toolbar: "editor-toolbar",
		parserRules: wysihtml5ParserRules
	});
}

// Initialise chat classes.
window.onload = function () {

	(function (){

		var joinForm = document.getElementById('user-join'),
			msgForm = document.getElementById('message-form');

		chatJoin = new REALCHAT.Join(joinForm);
		chatMessaging = new REALCHAT.Messaging(msgForm);

		initTextEditor();

	})();
};