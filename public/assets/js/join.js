// Join JS - Handeles users joining the chat application


// Define the Join class
REALCHAT.Join = function (form) {

	var self = this; 

	self.form = form;

	self.formHandler(self.form);

};

// Form Handler needs to be decoupled
REALCHAT.Join.prototype.formHandler = function (form) {

	var self = this;

	var	nickNameEle = form.elements[0],	
		emailAddEle = form.elements[1],		
		submitButton = form.elements[2];	

	form.onsubmit = function (e) {

		formValues = {
			nickname : nickNameEle.value,
			email : emailAddEle.value
		};

		// Add the user to the chat
		self.emitHandler('join', formValues, function () {
			$('#join').fadeOut( function () {
				$('#chat').fadeIn();
			});
		});

		// Store the user data in the dom
		self.onHandler('user-data', function (data) {
			$('#chat').data(data);
		});

		e.preventDefault();
	};
}

// Socket.io emit handler
REALCHAT.Join.prototype.emitHandler = function (name, values, callback) {

	REALCHAT.config.socket.emit(name, values);

	if (typeof callback == 'function') {
		callback();
	}

	return;
};

// Socket.io on handler
REALCHAT.Join.prototype.onHandler = function (name, callback) {
	
	REALCHAT.config.socket.on(name, function (data) {

		if (typeof callback == 'function') {
				callback(data);
		}

	});
};

	