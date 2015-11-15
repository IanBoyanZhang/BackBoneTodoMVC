var Model = Backbone.Model.extend({
  defaults: {
    text: "Zombie"
  }
});

var View = Backbone.View.extend({
  tagName: 'li',
  className: 'Zombie',

  template: _.template('<%= text %>'),

  initialize: function() {
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.options.parent, 'close:all', this.close);
  },
  
  events: {
    'click': 'close'
  },

  render: function() {
    this.$el.html( this.template( this.model.toJSON() ) );
    return this;
  },

  close: function() {
//    console.log('Kill: ', this);

    this.remove();
  }
});

var AppView = Backbone.View.extend({
  el: '#app',

  events: {
    'click #add': 'addView',
    'click #remove-all': 'closeAll'
  },

  addView: function() {
    var model = new Model();
    var view = new View({
      model: model,
      parent: this
    });

    $('#bin').append(view.render().el);
  },

  closeAll: function() {
    this.trigger('close:all');
  }
});

$(function() {
  var appView = new AppView();
});
