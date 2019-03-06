import _ from 'underscore';
import Backbone from 'backbone';

module.exports = Backbone.View.extend({
  template: _.template(`
  <div class="<%= pfx %>title">
    <i class="<%= pfx %>caret-icon"></i>
    <%= label %>
  </div>
  <div class="<%= pfx %>items-c"></div>
  `),

  events: {},

  initialize(o = {}, config = {}) {
    this.config = config;
    const pfx = this.config.pStylePrefix || '';
    this.pfx = pfx;
    this.caretR = 'fa fa-caret-right';
    this.caretD = 'fa fa-caret-down';
    this.iconClass = `${pfx}caret-icon`;
    this.activeClass = `${pfx}open`;
    this.className = `${pfx}item-category`;
    this.events[`click .${pfx}title`] = 'toggle';
    this.listenTo(this.model, 'change:open', this.updateVisibility);
    this.delegateEvents();
  },

  updateVisibility() {
    if (this.model.get('open')) this.open();
    else this.close();
  },

  open() {
    this.el.className = `${this.className} ${this.activeClass}`;
    this.getIconEl().className = `${this.iconClass} ${this.caretD}`;
    this.getItemsEl().style.display = '';
  },

  close() {
    this.el.className = this.className;
    this.getIconEl().className = `${this.iconClass} ${this.caretR}`;
    this.getItemsEl().style.display = 'none';
  },

  toggle() {
    var model = this.model;
    model.set('open', !model.get('open'));
  },

  getIconEl() {
    if (!this.iconEl) {
      this.iconEl = this.el.querySelector('.' + this.iconClass);
    }

    return this.iconEl;
  },

  getItemsEl() {
    if (!this.blocksEl) {
      this.blocksEl = this.el.querySelector('.' + this.pfx + 'items-c');
    }

    return this.blocksEl;
  },

  append(el) {
    this.getItemsEl().appendChild(el);
  },

  render() {
    this.el.innerHTML = this.template({
      pfx: this.pfx,
      label: this.model.get('label')
    });
    this.el.className = this.className;
    this.$el.css({ order: this.model.get('order') });
    this.updateVisibility();
    return this;
  }
});
