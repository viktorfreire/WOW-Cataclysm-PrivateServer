;(function ( $, window, document, undefined ) {
    $.widget( "custom.AGS_Menu" , {
        options: {
			accountbox: $('#account'),
			accountcontent: $('#account_content')		
        },

        _create: function () {
			var that = this;
			// Menu	
			//that.element
			var menu = that.element;
			
			function bindHover(element, selector){
				$(element).parent().hover(function(){
					$(this).find(selector).first().slideDown(200);
				}, function(){
					$(this).find(selector).first().hide();
				});
			}
			menu.find('ul > li ul').each(function(index, element) {
				bindHover(element, 'ul');
			});
			menu.find('ul > li div').each(function(index, element) {
				bindHover(element, 'div');
			});
			menu.find('ul > li > ul ul').parent().addClass('sub');
			menu.find('ul > li > ul div').parent().addClass('sub');
			menu.find('span').parent().parent().find('ul').first().css('top', '-40px');
			menu.find('li.sub').each(function(index, element) {
				
				var bg1 = $(element).css('background-image');
				if(bg1 != null)
				{
					$(element).css('background-image', bg1 + ', url('+STATIC_URL+'imagenes/menu/sub.png)');
					$(element).css('background-position', '7px 7px, right 12px');
				}
				else
				{
					$(element).css('background-image', 'url('+STATIC_URL+'imagenes/menu/sub.png)');
					$(element).css('background-position', 'right');
					
				}
				
			});

			
			// Account box
			that.options.accountbox.click(function(){
				var boxState = that.options.accountcontent.css('display');
				if(boxState == 'none')
					that.options.accountcontent.fadeIn(400);
				else
					that.options.accountcontent.fadeOut(300);
			});
        },

        destroy: function () {
            $.Widget.prototype.destroy.call(this);
        },

		

        // Respond to any changes the user makes to the
        // option method
        _setOption: function ( key, value ) {
            switch (key) {
            case "someValue":
                //this.options.someValue = doSomethingWith( value );
                break;
            default:
                //this.options[ key ] = value;
                break;
            }

            // For UI 1.8, _setOption must be manually invoked
            // from the base widget
            $.Widget.prototype._setOption.apply( this, arguments );
            // For UI 1.9 the _super method can be used instead
            // this._super( "_setOption", key, value );
        }
    });

})( jQuery, window, document );
