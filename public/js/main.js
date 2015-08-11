var state = require('./state');
var mediator = require("./mediator");
var util = require('./util');
var api = require('./api');
var router = require('./router');

if(window.location.hostname === "localhost") {
  api.setURL("http://localhost:5500");
} else {
  api.setURL("http://storiesof-49778.onmodulus.net");
}

window.addEventListener("click", (e) => {
  mediator.publish("window_click", e);
});

window.addEventListener("DOMContentLoaded", () => {
  mediator.subscribe("route_updated", (context) => {
    var path = context.path.split('/')[0],
      partial = d.qs("#" + path + '-template');

    d.body.setAttribute("data-active-route", path);

    if(partial) {
      d.qs("#content").innerHTML = partial.innerHTML;
    }
  });

  router.initialize();

  mediator.publish("loaded");
  d.documentElement.classList.remove('loading');
});