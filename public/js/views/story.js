var h = require('virtual-dom/h');
var api = require('../api');
var mediator = require('../mediator');
var view = require('../view');
var state = require('../state');

var storyState = {};

class storyView extends view {
  start(ctx) {
    super.start();

    api.get('/story/' + ctx.params.id, (error, data) => {
      storyState.story = data.data;
      this.updateState();
    });
  }

  render() {
    if(!storyState.story) { return h('div'); }

    var userDisplay, edit;

    if(!storyState.story.hideIdentity) {
      userDisplay = h('div.user', storyState.story.user.username);
    }

    if(state.get('user') && state.get('user')._id === storyState.story.user._id) {
      edit = h('div.edit', [
        h('div', 'Add an entry!')
      ]);
    }

    return h('div#story-view', [
      h('div.title', 'It is a story!!!!!'),
      userDisplay,
      edit,
      storyState.story.entries.map((entry) => {
        return h('div.entry', [
          h('div.date', moment.utc(entry.date, 'X').format('YYYY')),
          h('div.feeling', entry.feeling),
          h('div.notes', entry.notes)
        ]);
      })
    ]);
  }
}

module.exports = new storyView();