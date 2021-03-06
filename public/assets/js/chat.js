// Messaging constructor
REALCHAT.Messaging = function (form) {

	var self = this;

	self.form = form;

	self.newMessage(self.form);
};

REALCHAT.Messaging.prototype.newMessage = function (form) {

	var self = this;

	form.onsubmit = function (e) {
		
		var $msgEle = $(form).find('textarea'),
			$msg = $msgEle.val();		

		if($msg) {
		
			REALCHAT.config.socket.emit('new-message', $msg);
		}
		
		e.preventDefault();
			
	};

	REALCHAT.config.socket.on('publish-message', function (data) {
		self.publishMessage(data);
		$(form)[0].reset();
	});

};

REALCHAT.Messaging.prototype.publishMessage = function (data) {

	var self = this;

	var $dialog = $('#dialog'),
		message = self.messageTemplate(data);

		$(message).appendTo($dialog).hide().fadeIn();

		$("#dialog").animate({ scrollTop: $('#dialog')[0].scrollHeight}, 1000);
		
		return;
};

REALCHAT.Messaging.prototype.messageTemplate = function (data, msgCount) {
	
	var self = this;

	var	user = $('#chat').data('user'),
		msgClass = user.uid === data.uid ? 'me' : 'you';
		html = '<div class="message ' + msgClass + ' ">',
		avatarUrl = data.avatar ? data.avatar : '/assets/images/avatar.jpg',
		nickname = user.uid === data.uid ? 'You' : data.nickname;

	html += '<img src="' + avatarUrl + '" class="img-circle user-avatar"/>';

	if (!data.action) {
		html += '<span class="nickname">' + nickname + '</span>';
	}
	
	html += '<div class="message-content">' + data.message + '</div>';
	html += '</div>'

	return html;
};



