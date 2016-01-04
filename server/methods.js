Meteor.methods({
	clearMessages: function(){
		clearMessages();
	},

	clearUsers: function(){
		clearUsers();
	},

	clearAll: function(){
		clearAll();
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
			var newUser = {
				username: username,
				password: newPassword
			}

			Users.insert(newUser);

			return generateResponse(true, filterPassword(Users.findOne({username: username})));
		}
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