Meteor.methods({
	clearMessages: function(){
		clearMessages();
	},

	clearUsers: function(){
		clearUsers();
	},

	clearAll: function(){
		clearAll();
	}
});

function clearUsers(){
	Meteor.users.remove({});
}

function clearMessages(){
	Messages.remove({});
}

function clearAll(){
	clearUsers();
	clearMessages();
}