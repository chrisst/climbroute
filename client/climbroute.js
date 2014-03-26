Gyms = new Meteor.Collection('gyms');
Routes = new Meteor.Collection('routes');


if (Meteor.isServer) {
  Meteor.startup(function () {
    
    if (Routes.find().fetch().length == 0) {
      // clear Routes collection
      Routes.remove({});
      
      // import route data
      var routes = {};
      routes = JSON.parse(Assets.getText('routes.json'));
      
      // insert routes in collection
      routes.forEach(function(route) {
        Routes.insert(route);
      });
    }
    
    if (Gyms.find().fetch().length == 0) {
        Gyms.remove({});
        var gyms = {};
        gyms = JSON.parse(Assets.getText('gyms.json'));
        gyms.forEach(function(gym) {
           Gyms.insert(gym); 
        });
    }
	
  });
}




if (Meteor.isClient) {
  
  Meteor.Router.add({
    '/': 'home',
    '/about': 'about',
    '/users': 'users',
    '/contact': 'contact'
  });

  
  Template.hello.greeting = function() {
    return "Welcome to climbroute.";
  };
  
  Template.Routes.Route = function() {
    return Routes.find({});
  }
  
  Template.Gyms.Gym = function() {
    return Gyms.find({});
  }
  
  Template.Routes.events = {
    'click .add': function(e) {
      e.preventDefault();

      var name   = $('.name').val();
      var rating = $('.rating').val();
      var setter = $('.setter').val();
      
      if (name.length > 0 && rating.length > 0 && setter.length > 0 ) {
        Routes.insert({"name":name,"rating":rating,"setter":setter});
        $('input').val('');
      }
    },
    'click .remove': function(e) {
      e.preventDefault();
      var route_id = this._id;
      Routes.remove(route_id);
    }
  }

  Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY'
  });
  
  Template.pager.current = function() {
    return Meteor.Router.page();  
  };
  
  
  
}

