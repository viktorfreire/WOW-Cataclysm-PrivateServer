;(function ( $, window, document, undefined ) {
    $.widget( "custom.AGS_Wowtip" , {
        options: {
					
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
			//head.js(site_uri("js/AGS_Tooltip.js"));
			head.ready(callback);
		},
		
		_bindElements: function(){
			var that = this;
			alert('asdf');
			this.element.AGS_Tooltip({
				content: 'asdfasdf'
			});
		},

        destroy: function () {
            $.Widget.prototype.destroy.call(this);
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
