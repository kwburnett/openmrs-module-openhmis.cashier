define(
	[
		'lib/jquery',
		'lib/underscore',
		'lib/backbone',
		'lib/i18n',
		'lib/backbone-forms'
	],
	function($, _, Backbone, __) {

		// Use <? ?> for template tags.
		_.templateSettings = {
			evaluate:  /<\?(.+?)\?>/g,
			interpolate: /<\?=(.+?)\?>/g
		};
		
		var openhmis = window.openhmis || {};
		openhmis.templates = {};
				
		openhmis.error = function(data) {
			var o = $.parseJSON(data.responseText).error;
			if (o.detail.indexOf("ContextAuthenticationException") !== -1)
				window.location.reload();
			else
				alert("Message: " + o.message + "\n" + "Code: " + o.code + "\n" + "Detail: " + o.detail);
		}
		
		// Use uuid for id
		Backbone.Model.prototype.idAttribute = 'uuid';
		
		// OpenMRS-specific delete functions
		//
		// Add retire function for models
		Backbone.Model.prototype.retire = function(options) {
			options = options ? _.clone(options) : {};
			if (options.reason !== undefined)
				options.url = this.url() + "?reason=" + encodeURIComponent(options.reason);
		
			if (this.isNew()) {
				return false;
			}
		
			var model = this;
			var success = options.success;
			options.success = function(resp) {
				model.set('retired', true);
				model.trigger('retired', model);
				if (success) {
					success(model, resp);
				} else {
					model.trigger('sync', model, resp, options);
				}
			};
		
			options.error = Backbone.wrapError(options.error, model, options);
			var xhr = (this.sync || Backbone.sync).call(this, 'delete', this, options);
			return xhr;
		}
		
		// Add purge function for models
		Backbone.Model.prototype.purge = function(options) {
			options = options ? options : {};
			options.url = this.url() + "?purge=true";
			Backbone.Model.prototype.destroy.call(this, options);
		}
		
		Backbone.Model.prototype.isRetired = function() {
			return this.get('retired') || this.get('voided');
		}
		
		Backbone.Model.prototype.getDataType = function () {
			if (this.get('retired') !== undefined)
				return 'metadata';
			if (this.get('voided') !== undefined)
				return 'data';
			return 'unknown';
		}
		
		/**
		 * Template helper function
		 *
		 * Fetches a template from a remote URI unless it has been previously fetched
		 * and cached.
		 */
		Backbone.View.prototype.tmplFileRoot = openhmis.config.wwwUrlRoot + 'template/';
		Backbone.View.prototype.getTemplate = function(tmplFile, tmplSelector) {
			tmplFile = tmplFile ? tmplFile : this.tmplFile;
			tmplSelector = tmplSelector ? tmplSelector : this.tmplSelector;
			var view = this;
			if (openhmis.templates[tmplFile] === undefined) {
				var uri = view.tmplFileRoot === undefined ? tmplFile : view.tmplFileRoot + tmplFile;
				$.ajax({
					url: uri,
					async: false,
					dataType: "html",
					success: function(data, status, jq) {
						openhmis.templates[tmplFile] = $("<div/>").html(data);
					}
				});
			}
			var template = _.template($(openhmis.templates[tmplFile]).find(tmplSelector).html());
			var augmentedTemplate = function(context) {
				if (context !== undefined) {
					context.__ = context.__ ? context.__ : __;
					context.helpers = context.helpers ? context.helpers : Backbone.Form.helpers
				}
				return template(context);
			}
			return augmentedTemplate;
		}
		
		return openhmis;
	}
)