;(function ( $, window, document, undefined ) {
    $.widget( "custom.AGS_Captcha" , {
        options: {
		   borderColor: "",  
		   captchaDir: "captcha",  
		   url: "captcha/captcha.php",  
		   formId: "myForm",  
		   text: "Verify that you are a human,<br />drag <span>scissors</span> into the circle.",
		   items: Array("pencil", "scissors", "clock", "heart", "note") 			
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
			head.js("/static/js/jquery/captcha.js");
			head.ready(callback);
		},
		
		_bindElements: function(){
			var that = this;
			var textContainer = $(document.createElement('div'));
			var dragContainer = $(document.createElement('div'));
			var dropContainer = $(document.createElement('div'));
			var rand = $.ajax({ url: options.url,async: false }).responseText;
			var pic = this._randomNumber();
			
			textContainer.addClass('.captcha-text-container');
			dragContainer.addClass('.captcha-drag-container');
			dropContainer.addClass('.captcha-drop-container');
			
			textContainer.html(this.options.text);
			textContainer.find('span').html(this.options.items[pic]);
			
			this.element
				.append(textContainer)
				.append(dragContainer)
				.append(dropContainer);
			
		},
		
		_randomNumber: function() {
			var chars = "01234";
			chars += ".";
			var size = 1;
			var i = 1;
			var ret = "";
				while ( i <= size ) {
					$max = chars.length-1;
					$num = Math.floor(Math.random()*$max);
					$temp = chars.substr($num, 1);
					ret += $temp;
					i++;
				}
			return ret;
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
