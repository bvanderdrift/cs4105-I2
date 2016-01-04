Template.home.helpers({
  messages: function(){
    return Messages.find({}, {sort: {createdAt: -1}, limit: Settings.MessageShowCount});
  },
  currentUser: function(){
    return getCurrentUser();
  }
});

Template.message.helpers({
  currentUser: function(){
    return getCurrentUser();
  },
  mayShow: function(){
    return (getCurrentUser() && getCurrentUser().isAdmin) || !this.hidden;
  }
});

Template.message.events({
  "click .hide-message": function(arg){
    Meteor.call("toggleHideMessage", this._id, getCurrentUser()._id);
  }
});

Template.postMessageForm.events({
  "submit .new-message": function onNewMessage (arg) {
     var messageInputField = $(".message-input");
     var messageInput = messageInputField.val();

     Meteor.call("makeMessage", getCurrentUser()._id, messageInput);

     messageInputField.val("");

     return false;
  }
});

Template.adminControls.events({
  "click .delete-messages": function(){
    Meteor.call("clearMessages", getCurrentUser()._id);
  },
  "click .reset-system": function(){
    Meteor.call("resetSystem", getCurrentUser()._id);
    setCurrentUser(undefined);
  },
  "click .hide-messages": function(){
    Meteor.call("setHideAllMessages", getCurrentUser()._id, true);
  },
  "click .show-messages": function(){
    Meteor.call("setHideAllMessages", getCurrentUser()._id, false);
  }
});