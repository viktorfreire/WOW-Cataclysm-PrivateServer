;(function ( $, window, document, undefined ) {
    $.widget( "custom.AGS_" , {
        options: {
					
        },

        _create: function () {
			var that = this;
			
			that._loadScripts(function(){
				//that._bindElements();
			});
        },

        destroy: function () {
            $.Widget.prototype.destroy.call(this);
        },
		
		_loadScripts: function(callback){
			//head.js("/js/jquery/captcha.js");
			//head.ready(callback);
		},
		
		_bindElements: function(){
						
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
