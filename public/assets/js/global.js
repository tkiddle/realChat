//Global JS
var REALCHAT = {} || REALCHAT;


// Chat config
REALCHAT.config = {

	socket : io.connect('/randoChat')

};

function initWySiWyG () {

	var editor = new wysihtml5.Editor("editor", {
		toolbar: "editor-toolbar",
		parserRules: wysihtml5ParserRules
	});

	editor.on("load", function() {
		var composer = editor.composer;
		composer.selection.selectNode(editor.composer.element.querySelector("h1"));
	});

}

// Initialise the classes.
window.onload = function () {

	(function (){

		var joinForm = document.getElementById('user-join'),
			msgForm = document.getElementById('message-form');

		chatJoin = new REALCHAT.Join(joinForm);
		chatMessaging = new REALCHAT.Messaging(msgForm);

		initWySiWyG();

	})();
}