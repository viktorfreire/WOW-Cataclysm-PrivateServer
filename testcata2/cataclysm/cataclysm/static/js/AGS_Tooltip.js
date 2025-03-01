;(function ( $, window, document, undefined ) {
    $.widget( "custom.AGS_Tooltip" , {
        options: {
			style: {
				classes: 'ui-tooltip-shadow',
				widget: true 
			},
			position: {	
				 my: 'top left',
				 at: 'right bottom'
			},
			type: 'normal' // normal, wow_item, wow_character, ags_user
        },
        _create: function () {
			var that = this;
			that._loadScripts(function(){
				that._bindElements();
			});
        },

        destroy: function () {
            $.Widget.prototype.destroy.call(this);
        },
		
		_loadScripts: function(callback){			
			head.js(site_uri(STATIC_URL+"js/jquery/qtip.js"));			
			head.ready(callback);
		},
		
		_bindElements: function(){
			var that = this;

			that.element.qtip(that.options);
		
		},
		
		_wow_item: function () {
			$.AGS_Wow.getItem();
			
		},
        _setOption: function ( key, value ) {
            switch (key) {
            case "someValue":
                //this.options.someValue = doSomethingWith( value );
                break;
            default:
                //this.options[ key ] = value;
                break;
            }
			
            $.Widget.prototype._setOption.apply( this, arguments );
        }
    });

})( jQuery, window, document );
