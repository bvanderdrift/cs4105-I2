if(Meteor.isClient){
	var currentUserDep = new Deps.Dependency;

	Session.set("currentUser", null);

	getCurrentUser = function(){
		currentUserDep.depend();
		return Session.get("currentUser");
	}

	setCurrentUser = function(user){
		Session.set("currentUser", user);
		currentUserDep.changed();
	}
}

if(Meteor.isServer){
	//Server stuff
}
