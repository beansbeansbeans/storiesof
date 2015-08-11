var api = require('../api');
var mediator = require('../mediator');

module.exports = {
  initialize() {

  },
  start() {
    mediator.subscribe("window_click", (e) => {
      if(e.target.getAttribute("id") === "signup-button") {
        e.preventDefault();
        var form = d.gbID("signup-form");
        api.post('/signup', {
          username: form.querySelector('[name="username"]').value,
          email: form.querySelector('[name="email"]').value,
          password: form.querySelector('[name="password"]').value
        }, (data) => {
          if(data.success) {
            console.log("SIGNED UP");
            page.show('/', null, false);
          } else {
            console.log("FAILED TO SIGN UP");
            // render error message
          }
          console.log(data);
        });
      }
    });
  }
};