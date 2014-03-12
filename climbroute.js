var Routes = new Meteor.Collection('routes');


if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    Routes.insert({name: 'Route 1'});
    Routes.insert({name: 'Route 2'});
    
    Meteor.publish('routes', function() {
	  return Routes.find();
	});
	
  });
}


if (Meteor.isClient) {
  Template.hello.greeting = function () {
    return "Welcome to climbroute.";
  };

  Template.hello.events({
    'click input': function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  });
  
  
  Meteor.subscribe('routes');
  console.log(Routes.find().fetch()); // synchronous!

  Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY'
  });
}

