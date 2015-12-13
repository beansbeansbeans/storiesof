var h = require('virtual-dom/h');
var mediator = require('../mediator');
var view = require('../view');

class aboutView extends view {
  start() {
    super.start();
  }

  stop() {
    super.stop();
  }

  render() {
    return h('div#about-view', [
      h('div.main', [
        h('h1', 'About'),
        h('div.subtitle', 'This is a concept for a social network.'),
        h('div.description', "We use social media to project the best versions of ourselves to the world. This means that when we're unhappy, it can feel like we're alone in our experience."),
        h('div.description', "STORIES aims to address this problem. The site is: "),
        h('div.description', [
          h('span.bold', '(1) A tool for people to share their feelings, good or bad. '),
          h('span', "The site is composed of posts in which users grade their feelings at a particular moment on a scale of one to 100. A user's posts over time form a story of their feelings. Text is optional, and users can post anonymously. This way, a post is simply an acknowledgment of a user's feelings.")
        ]),
        h('div.description', [
          h('span.bold', "(2) A searchable database of people's feelings. "),
          h('span', [
            h('span', "When we're unhappy it can feel like we'll never bounce back. What if in those moments we could browse stories of people recovering from their unhappiness? STORIES features a graphical "),
            h('a', { href: '/search' }, 'search'),
            h('span', ' tool that allows users to draw the ups and downs of their experience and find stories whose trajectories match. This way, users can find stories of, for example, people bouncing back from periods of unhappiness, which may give insight into their own experiences.')
          ])
        ])
      ])
    ]);
  }
}

module.exports = new aboutView();