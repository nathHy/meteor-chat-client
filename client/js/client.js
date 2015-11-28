if (Meteor.isClient) {
  Messages = Meteor.subscribe('messages')
  Template.chatHistory.helpers({
    messageHistory : function() {
      return Messages.find();
    }
  });
  Template.users.helpers({
    users : function() {
      return [
              {user: "name1"},
              {user: "name2"},
              {user: "name3"},
              {user: "name4"},
             ]
    }
  });
  Template.channels.helpers({
    channels : function() {
      return [
              {name: "channel1",unread:"1"},
              {name: "channel2",unread:"2"},
              {name: "channel3",unread:"3"},
              {name: "channel4",unread:"4"},
             ]
    }
  });

  Template.messageBox.events({
    'keypress input': function() {
      if (event.charCode == 13) {
            event.stopPropagation();
            var msg = $('.input-message').val();
            // $('.chatHistory').append("<div><span class='message'>Author:<span>" + $('.input-message').val() + '</span></span></div>');
            Messages.insert({text:msg})
            Messages.insert({greeting:"hello"});
            $('.chatHistory').scrollTop($('.chatHistory')[0].scrollHeight)

            $('.chatHistory').val("");
            return false;
        }
    }
  });


   Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });
}