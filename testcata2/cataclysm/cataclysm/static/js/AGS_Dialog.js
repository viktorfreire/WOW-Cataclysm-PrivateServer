/* 
   	AGS_Dialog // battle.net WoW API Fetcher
	For:  Alea Guild System 1.0
	By:   Robin Radic
	Date: 20/04/2012
*/
;(function ( $, window, document, undefined ) {
    $.widget( "custom.AGS_Dialog" , {
        options: {
			type: 'info', // confirm, info, form, prompt
			modal: true,
			confirmText: 'Are you sure?',
			promptCallback: null
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
			if(this.options.type == 'form'){
				head.js(STATIC_URL+"js/jquery/colorbox.js");
				head.js(STATIC_URL+"js/jquery/easydrag.js");
			} else {
				head.js(STATIC_URL+"js/jquery/ui/jquery.ui.draggable.min.js");
				head.js(STATIC_URL+"js/jquery/ui/jquery.ui.resizable.min.js");
				head.js(STATIC_URL+"js/jquery/ui/jquery.ui.button.min.js");
				head.js(STATIC_URL+"js/jquery/ui/jquery.ui.dialog.min.js");
			}
			head.ready(callback);
		},
		
		_bindElements: function(){
			var that = this;
			var options = {};
			
			if(that.options.type == 'info')
			{
				$(this.element.attr('href')).css('display', 'none');
			}
			else if(that.options.type == 'form')
			{
				that.element.colorbox({inline:true,scrolling:false, width:940});
			} 
			else 
			{
				this.element.click(function(e){
					e.preventDefault();
					if(that.options.type == 'info'){
						that._createInfoDialog();					
					}
					else if(that.options.type == 'confirm'){
						that._createConfirmDialog();
					}
				});
			}
		},
		
		_createInfoDialog: function(){
			var that = this;
			var element = $(this.element.attr('href'));
			var options = {};
			options.modal = this.options.modal;
			options.buttons = {
				Ok: function(){ element.dialog( "close" ); }
			}
			element.dialog(options);			
		},
		
		_createConfirmDialog: function(){
			var that = this;
			var element = $(document.createElement('div'));
			element.attr('id', 'AGS_Dialog');
			element.html(that.options.confirmText);
			
			var options = {};
			options.modal = this.options.modal;
			options.title = 'Confirm';
			options.confirmed = function(){ window.location.href = that.element.attr('href'); }
			options.buttons = {
				"Confirm": function(){ element.dialog( "close" ); options.confirmed(); that.destroy(); },
				"Cancel": function(){ element.dialog( "close" );  that.destroy();}
			}			
			element.dialog(options);			
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
