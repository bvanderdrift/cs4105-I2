Template.loginButtons.helpers({
	currentUser: function(){
		return getCurrentUser();
	}
});

Template.loginButtons.events({
	"click .log-in": function(arg){
		var username = $(".username-input").val();
		var password = $(".password-input").val();

		Meteor.call("loginRequest", username, password, function(err, response){
			if(err){
				console.log(err);
			}

			if(!response.success){
				showResponse(response.response);
			}else{
				loginWithSucces(response.response);
			}
		});



		return false;
	},

	"click .register": function(arg){
		var username = $(".username-input").val();
		var password = $(".password-input").val();

		Meteor.call("registerRequest", username, password, function(err, response){
			if(err){
				console.log(err);
			}

			if(!response.success){
				showResponse(response.response);
			}else{
				loginWithSucces(response.response);
			}
		});

		return false;
	}
});

function showResponse(text){
	$(".login-response").text(text);
}

function loginWithSucces(user){
	setCurrentUser(user);
}