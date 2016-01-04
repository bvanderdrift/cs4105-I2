Template.home.helpers({
  messages: function(){
    return Messages.find({}, {sort: {createdAt: -1}, limit: Settings.MessageShowCount});
  },
  currentUser: function(){
    return getCurrentUser();
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
    author: getCurrentUser().username,
    message: text,
    createdAt: Date.now()
  }
}