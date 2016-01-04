if(Meteor.isClient){
	Accounts.ui.config({
		passwordSignupFields: "USERNAME_ONLY"
	});
}

if(Meteor.isServer){
	//Server stuff
}
