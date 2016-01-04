Template.home.helpers({
  messages: function(){
    return Messages.find({});
  }
});

Template.message.helpers({
  xsssecure: function(){
    return Settings.Security.XSSSecure;
  }
})