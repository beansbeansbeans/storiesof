var state = require('./state');
var mediator = require('./mediator');
var routes = {
  login: require('./routes/login'),
  signup: require('./routes/signup'),
  me: require('./routes/me')
};

module.exports = {
  initialize() {
    Object.keys(routes).forEach(key => routes[key].initialize());

    mediator.subscribe("loaded", () => {
      page.base('/');

      page((context, next) => {
        mediator.publish("route_updated", context);
        next();
      });

      page('/', (context) => {
        if(context.pathname.indexOf("#!") !== -1) {
          page.redirect(context.pathname.slice(3));
        }
      });

      page('login', routes.login.start);
      page('signup', routes.signup.start);
      page('me', routes.me.start);

      page();
    });

  }
};