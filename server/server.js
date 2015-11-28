if (Meteor.isServer) {
  Meteor.startup(function () {
    if (Messages.find().count() <=10) {
    	Accounts.createUser({
    		username:'nathan',
    		password:'password'
    	});
    for (var i = 10; i >= 0; i--) {
    	var time=new Date;
    	time.toJSON;
    	var fakeuser=Fake.user({fields:['fullname','email']});
    	// console.log(fakeuser);
		Messages.insert({
			username:fakeuser.fullname,
			message:Fake.sentence(10),
			timestamp:time
		});
		Channels.insert({
			name:Fake.word()
		})
		Accounts.createUser({
				username:fakeuser.fullname,
				password:Fake.word(),
				email:fakeuser.email
			});
			// Users.insert({
			// 	username:Fake.user({fields:['fullname']}).fullname,
			// 	created:new Date,
			// 	password:Fake.word()
			// })
		}
	}
  });
 
  Meteor.publish("messages", function () {
    return Messages.find();
  });
  Meteor.publish("channels", function () {
    return Channels.find();
  });
  Meteor.publish("userData", function () {
    return Meteor.users.find();
  });

  Meteor.methods({
  	insertMessage : function (data) {
  		username = data.username
  		message  = data.message
  		channel  = data.channel
  		console.log(channel)
  		console.log(Channels.findOne({name:channel}))
  		if (Channels.find({name:channel}) == undefined) return false;
  		var obj = {
  			message:message,
  			channel:channel,
  			username:username,
  			timestamp:new Date
  		}

  		Messages.insert(obj)
  	},
  	createChannel : function (data) {
  		data = {name:Fake.word()};
  		Channels.insert(data);
  	}

  })


}
