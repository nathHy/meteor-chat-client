Messages = new Mongo.Collection('messages');
Messages.insert({greeting:"hello"},function(){});
if (Meteor.isServer) {
  Meteor.startup(function () {
    
  });
 
  Meteor.publish("messages", function () {
    return Messages.find();
  });
}
