Routes = new Meteor.Collection('routes');


if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    
  });
}


if (Meteor.isClient) {
  Template.hello.greeting = function () {
    return "Welcome to climbroute.";
  };

  Template.stuff.routes = function(){
    console.log(Routes.find({}));
    return Routes.find({});
  };

  Template.hello.events({
    'click input': function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  });

  Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY'
  });
}

