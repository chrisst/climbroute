Gyms = new Meteor.Collection('gyms');
Routes = new Meteor.Collection('routes');

if (Meteor.isClient) {
  
  // PAGE ROUTER
  Meteor.Router.add({
    '/': 'home',
    '/about': 'about',
    '/users': 'users',
    '/contact': 'contact',
    '/gyms': 'gyms',
    '/gym/:id': function(id) {
      Session.set('gymId',id);
      return 'gym';
    },
    '/route/:id': function(id) {
      Session.set('routeId',id);
      return 'route';
    },
    '/user/:id': function(id) {
      Session.set('userId',id);
      return 'user';
    }
  });
  
  
  // GREETING EXAMPLE
  Template.hello.greeting = function() {
    return "Welcome to ClimbRoute!";
  };
  
  
   // ACCOUNTS
  Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY'
  });
  
  
  // ROUTES
  Template.route.thisRoute = function() {
    return Routes.findOne({'_id': Session.get('routeId').replace(/"/g,'')});
  }
  
  Template.route.lastGym = function() {
    return Gyms.findOne({'_id': Session.get('gymId').replace(/"/g,'')});
  }
  
  Template.route.events = {
    'click #save-route': function() {
      var name   = $('#inputRouteName').val();
      var rating = $('#inputRating').val();
      var setter = $('#inputSetter').val();
      
      if (name.length > 0 && rating.length > 0 && setter.length > 0 ) {
        Routes.update({'_id':Session.get('routeId').replace(/"/g,'')}, {$set: {"name":name,"rating":rating,"setter":setter}});
      }
    }
  }
  
  /*
  Template.route.events = {
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
  */
  
  
  
  // GYMS
  Template.gyms.allGyms = function() {
    return Gyms.find({});
  }
  
  Template.gym.thisGym = function() {
    return Gyms.findOne({'_id': Session.get('gymId').replace(/"/g,'')});
  }
  
  Template.gym.thisRoute = function(id) {
    return Routes.findOne({'_id':id});
  }
  
  Template.gym.events = {
    'click #save-new-route': function() {
      var name   = $('#inputRouteName').val();
      var rating = $('#inputRating').val();
      var setter = $('#inputSetter').val();
      
      if (name.length > 0 && rating.length > 0 && setter.length > 0 ) {
        var newRoute = Routes.insert({"name":name,"rating":rating,"setter":setter});
        Gyms.update({'_id': Session.get('gymId').replace(/"/g,'')}, {$push: {'routes':newRoute}});
        //$('#editModal input').val('');
      }
    },
    'click .remove-route': function() {
      var routeId = this._id;
      var gym = Gyms.findOne({'routes':routeId});
      var gymRoutes = gym.routes;
      var gymId = gym._id;
      console.log(gymRoutes);
      $.each(gymRoutes, function(i,route) {
        console.log(route);
        if (!!route.match(routeId)) gymRoutes.splice(i,i);
      });
      Gyms.update({'_id':gymId}, {$set: {'routes':gymRoutes}});
      console.log(Gyms.findOne({'routes':routeId}).routes);
      //Routes.remove({'_id':this._id});
    }
  }

}

