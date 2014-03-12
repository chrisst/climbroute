Routes = new Meteor.Collection('routes');


if (Meteor.isServer) {
  Meteor.startup(function () {
    
    // clear Routes collection
    Routes.remove({});
    
    // import route data
    var routes = {};
    routes = JSON.parse(Assets.getText('routes.json'));
    
    // inset routes in collection
    routes.forEach(function(route) {
      Routes.insert(route);
    });
	
  });
}




if (Meteor.isClient) {
  
  Template.hello.greeting = function() {
    return "Welcome to climbroute.";
  };

  Template.stuff.routes = function() {
    return Routes.find({});
  };
  
  Template.Routes.Route = function() {
    return Routes.find({});
  }

  Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY'
  });
  
}

