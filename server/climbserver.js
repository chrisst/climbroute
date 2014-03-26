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