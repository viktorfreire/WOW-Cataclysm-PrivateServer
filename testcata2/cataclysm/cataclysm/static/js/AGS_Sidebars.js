;(function ( $, window, document, undefined ) {
    $.widget( "custom.AGS_Sidebars" , {
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
			head.js(STATIC_URL+"js/jquery/ui/jquery.ui.sortable.min.js");
			head.js(STATIC_URL+"js/jquery/ui/jquery.ui.draggable.min.js"); 
			head.js(STATIC_URL+"js/jquery/scrollpane.js");
			head.js(STATIC_URL+"js/AGS_Dialog.js");			
			head.ready(callback);
		},
		
		_bindElements: function(){
			var that = this;
			var sidebars = that.element;			

			// Shoutbox scroller
			sidebars.find('.shoutbox > ul').slimScroll({
				size: '7px',
				alwaysVisible: true
			});
			// Sidebar sorting / saving into cookie
			sidebars
				.sortable({
					placeholder: 	"highlight-drop",
					items: 			'section',
					handle: 		'header',
					update: 		function(event, ui) {
										var order = $(this).sortable('toArray').join();
										$.cookie("sidebarsOrder", order,  { expires: 363 });
									},
					change: 		function(event, ui) {
										$('.highlight-drop').height( ui.item.height() );
									}
				})
				.disableSelection();	
					
				// Lets order them based on cookie, if its there
				var sidebarsOrder = $.cookie('sidebarsOrder');
				if(sidebarsOrder)
				{
					$(sidebarsOrder.split(',')).each(function(index, id) {
						$('#' + id).appendTo(sidebars);
					});
				}
			
			// Add shoutbox message
			sidebars.find('.shoutbox a.button1').each(function() {
				$(this).AGS_Dialog({ type: 'form'});
			});

			// Delete shoutbox confirmation
			sidebars.find('.shoutbox .deleteable').each(function(){
				$(this).AGS_Tooltip({ 
					content: 'Delete this message by clicking it', 
					position: {	
				 		my: 'center right',
				 		at: 'center left'
					}
				});
				
				$(this).AGS_Dialog({ type: 'confirm', confirmText: 'Are you sure you want to delete this message?'});
				
			});
			
			// Fadelist (progress / recruitment)
			sidebars.find('.fadeList li').each(function(){
				var li = $(this);
				var div = li.find('div').first();		
				
				li.mouseover(function(){
					div.stop(true, true).fadeIn();	
					div.fadeIn(200);
				});
				li.mouseout(function(){
					
					div.stop(true, true).fadeIn();
					div.fadeOut(400);
				});
				
			});			
			
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
