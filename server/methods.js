Meteor.methods({
	makeMessage: function(userid, text){
		makeMessage(userid, text);
	},

	clearMessages: function(userid){
		if(isAdmin(userid)){
			clearMessages();
		}
	},

	toggleHideMessage: function(messageid, userid){
		if(isAdmin(userid)){
			toggleHideMessage(messageid);
		}
	},

	setHideAllMessages: function(userid, hide){
		if(isAdmin(userid)){
			setHideAllMessages(hide);
		}
	},

	resetSystem: function(userid){
		if(isAdmin(userid)){
			clearAll();
		}
	},

	loginRequest: function(username, password){
		var findPassword = Settings.Security.encryptPasswords ? md5(password) : password;

		var user = Users.findOne({
			username: username,
			password: findPassword
		});

		if(!user){
			return generateResponse(false, "Could not find a user with this username/password combination");
		}else{
			user = filterPassword(user);
			return generateResponse(true, user);
		}
	},

	registerRequest: function(username, password){
		var newPassword = Settings.Security.encryptPasswords ? md5(password) : password;

		var user = Users.findOne({
			username: username
		});

		if(user){
			return generateResponse(false, "User with this username already exists");
		}else{
			user = createUser(username, newPassword);

			return generateResponse(true, filterPassword(user));
		}
	}
});

function clearUsers(){
	Users.remove({});
}

function clearMessages(){
	Messages.remove({});
}

function clearAll(){
	clearUsers();
	clearMessages();
}

function createUser(username, password){
	//First registered user is an admin
	var isAdmin = (Users.find({}).count() == 0);

	var newUser = {
		username: username,
		password: password,
		isAdmin: isAdmin
	}

	Users.insert(newUser);
	return Users.findOne({username: username});
}

function generateResponse(success, response){
	return {
		success: success,
		response: response
	}
}

function filterPassword(user){
	delete user.password;
	return user;
}

function isAdmin(userid){
	var user = Users.findOne({_id: userid});
	return user && user.isAdmin;
}

function toggleHideMessage(messageid){
	var message = Messages.findOne({_id: messageid});
	Messages.update(messageid, {$set: {hidden: !message.hidden}});
}

function setHideAllMessages(hide){
	Messages.update({}, {$set: {hidden: hide}}, {multi:true});
}

function makeMessage(userid, text){
	var user = Users.findOne({_id: userid});

	var message = {
	    author: user.username,
	    message: text,
	    createdAt: Date.now(),
	    hidden: false
  	};

  	Messages.insert(message);
}