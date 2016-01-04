Messages = new Mongo.Collection('Messages');

Messages.allow({
	insert() { return false; },
	update() { return false; },
	remove() { return false; },
});

Messages.deny({
	insert() { return true; },
	update() { return true; },
	remove() { return true; },
});

//Publications

if(Meteor.isClient){
	Meteor.subscribe('chatMessages');
}

if(Meteor.isServer){
	Users = new Mongo.Collection('Users');
	
	Meteor.publish('chatMessages', () => {
		return Messages.find({});
	});
}