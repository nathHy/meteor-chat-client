
if (Meteor.isClient) {
  Meteor.subscribe('messages')
  Meteor.subscribe('channels')
  Meteor.subscribe('userData')
  Template.chatHistory.helpers({
    messageHistory : function() {
      return Messages.find();
    }
  });
  Template.users.helpers({
    users : function() {
      console.log(Meteor.users.find())
      return Meteor.users.find();
    }
  });
  Template.channels.helpers({
    channels : function() {
      return Channels.find();
    }
  });

  Template.user.helpers({
    currentUser : function() {
      return Meteor.user().username;
    }
  })

  Template.messageBox.events({
    'keypress input': function() {
      if (event.charCode == 13) {
            event.stopPropagation();
            var msg = $('.input-message').val();
            // $('.chatHistory').append("<div><span class='message'>Author:<span>" + $('.input-message').val() + '</span></span></div>');
            console.log("Appending " + msg)
            Meteor.call('insertMessage',{
                                        username:Meteor.user().username,
                                        message:msg
                                        // channel:
                                      });
            // Messages.insert({greeting:"hello"});
            $('.chatHistory').scrollTop($('.chatHistory')[0].scrollHeight)

            $('.chatHistory').val("");
            return false;
        }
    }
  });

  Template.sideBar.events({
    'click .create-button' : function() {
      event.stopPropagation();
      console.log("Create a new channel!")
      var data = {}
      Meteor.call("createChannel",data)
    }
  })


   Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });
}