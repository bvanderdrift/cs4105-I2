Template.home.helpers({
  messages: function(){
    return Messages.find({}, {sort: {createdAt: -1}, limit: Settings.MessageShowCount});
  }
});

Template.message.helpers({
  xsssecure: function(){
    return Settings.Security.XSSSecure;
  }
});

Template.postMessageForm.events({
  "submit .new-message": function onNewMessage (arg) {
     var messageInputField = $(".message-input");
     var messageInput = messageInputField.val();

     Messages.insert(makeMessage(messageInput));

     messageInputField.val("");

     return false;
  }
});

function makeMessage(text){
  return {
    author: Meteor.user().username,
    message: text,
    createdAt: Date.now()
  }
}