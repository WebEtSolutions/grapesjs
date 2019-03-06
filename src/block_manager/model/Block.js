import Backbone from 'backbone';

module.exports = Backbone.Model.extend({
  defaults: {
    // If true, triggers an 'active' event on dropped component
    activate: 0,
    // If true, the dropped component will be selected
    select: 0,
    // If true, all IDs of dropped component and its style will be changed
    resetId: 0,
    label: '',
    content: '',
    category: '',
    attributes: {}
  }
});
