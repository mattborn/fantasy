(function ($) {

	var Player = Backbone.Model.extend({
		defaults: {
			team: '',
			fp_rank: 0
		},
		parse: function (r) {
			r.rank = parseInt(r.rank);
			return r;
		}
	});

	var Players = Backbone.Collection.extend({
		model: Player,
		url: '/rankings-espn.json',
		comparator: function (item) {
			return parseInt(item.get('rank'));
		},
		initialize: function () {
			this.on('request', this.moreRequests);
			_.bindAll(this, 'fantasypros');
		},
		moreRequests: function () {
			$.ajax({
				url: '/rankings-fantasypros.json',
				complete: this.fantasypros
			});
		},
		fantasypros: function (response) {

			var update = _.map(this.models, function (model) {
				var a = model.toJSON()
					b = _.find(response.responseJSON, function (b) {
						return a.name === b.name;
					}) || {};

				a.fp_rank = parseInt(b.rank) || 0;
				a.fp_position = b.position;

				return a;
			});

			this.set(update);
			this.trigger('reset', this);
		}
	});

	var Draft = Backbone.View.extend({
		initialize: function () {
			this.collection.on('reset', this.render, this);
			this.collection.fetch();
		},
		render: function () {
			console.log('Draft:render', this.collection.toJSON());
			_.each(this.collection.toJSON(), function (p) {
				$('.players').append(_.template('<li><%= name %> <%= position %> <%= team %> <%= points %> FPR <%= fp_rank %></li>', p));
			});
		}
	});

	window.draft = new Draft({collection: new Players});

})(jQuery);