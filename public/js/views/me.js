var h = require('virtual-dom/h');
var api = require('../api');
var mediator = require('../mediator');
var view = require('../view');
var sparklineSubview = require('./subviews/sparkline');
var snippet = require('./subviews/snippet');

var meState = {
  active: 'stories',
  user: {}
};

class meView extends view {
  start() {
    super.start();

    _.bindAll(this, 'handleClick');

    api.get('/me', (err, data) => {
      meState.user = data.data;
      this.updateState();
    }, false);    

    mediator.subscribe("window_click", this.handleClick);
  }

  handleClick(e) {
    var toggle = e.target.getAttribute("data-toggle");
    if(toggle) {
      meState.active = toggle;
      this.updateState();
    }
  }

  stop() {
    super.stop();
    mediator.unsubscribe("window_click", this.handleClick);
  }

  render() {
    var stories = [];

    if(!_.isEmpty(meState.user)) {
      if(meState.active === 'stories') {
        stories = meState.user.stories.map((d, i) => {
          return snippet.render(d, i);
        });
      } else {
        stories = meState.user.likes.map((d, i) => {
          return snippet.render(d, i);
        });
      }      
    }

    return h('div#me-view', {
      dataset: { active: meState.active }
    }, [
      h('div.your-stories', {
        dataset: { toggle: 'stories' }
      }, 'YOUR STORIES'),
      h('div.your-likes', {
        dataset: { toggle: 'likes' }
      }, 'YOUR LIKES'),
      h('div.stories', stories)
    ]);
  }
}

module.exports = new meView();