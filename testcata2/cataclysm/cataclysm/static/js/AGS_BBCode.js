;(function ( $, window, document, undefined ) {
    $.widget( "custom.AGS_BBCode" , {
        options: {
			bold: 			true,
			italic: 		true,
			underline:		true,
			size:			true,
			toc:			true,
			h1:				true,
			h2:				true,
			h3:				true,
			h4:				true,
			item:			true,
			link:			true,
			image:			true,
			color:			true,
			youtube:		true,
			file:			true,
			quote:			true,
			blizzquote:		true
        },

        _create: function () {
			var that = this;
			
			//that._loadScripts(function(){
				that._bindElements();
			//});
        },

        destroy: function () {
            $.Widget.prototype.destroy.call(this);
        },
		
		_loadScripts: function(callback){
			//head.js("/js/jquery/captcha.js");
			head.ready(callback);
		},
		
		_bindElements: function(){
			var that = this;
			var container = $(document.createElement('div'));
			
			container.addClass('bbcodeBox');
			container.css({ 'width': that.element.width() - 40 + 'px' });
			
			mt = 0;
			if($.browser.msie)
				mt = 11;
			else if($.browser.mozilla)
				mt = 11;
			else if($.browser.chrome)
				mt = 11;
			else
				mt = 11;
				
			container.css('margin-bottom', "-" + mt + "px");
			
			if(this.options.bold){
				var bold = $(document.createElement('div'));
				bold.addClass('bbcodeButton');
				bold.html('B');
				bold.css('font-weight', 'bold');
				bold.click(function(){ that._addTags('[b]','[/b]'); });
			}
			
			if(this.options.italic){
				var italic = $(document.createElement('div'));
				italic.addClass('bbcodeButton');
				italic.html('I');
				italic.click(function(){ that._addTags('[i]','[/i]'); });
			}
			
			if(this.options.underline){
				var underline = $(document.createElement('div'));
				underline.addClass('bbcodeButton');
				underline.html('U');
				underline.css('text-decoration', 'underline');
				underline.click(function(){ that._addTags('[i]','[/i]'); });				
			}
			
			if(this.options.size){
				var size = $(document.createElement('div'));
				size.addClass('bbcodeButton');
				size.html('Size');			
				size.click(function(){ that._addTags('[i]','[/i]'); });
			}
			
			if(this.options.toc){
				var toc = $(document.createElement('div'));
				toc.addClass('bbcodeButton');
				toc.html('TOC');
				toc.click(function(){ that._addTag('[toc]'); });
			}
			
			if(this.options.h1){
				var h1 = $(document.createElement('div'));
				h1.addClass('bbcodeButton');
				h1.html('H1');
				h1.click(function(){ that._addTags('[h1]','[/h1]'); });
			}
			
			if(this.options.h2){
				var h2 = $(document.createElement('div'));
				h2.addClass('bbcodeButton');
				h2.html('H2');
				h2.click(function(){ that._addTags('[h2]','[/h2]'); });
			}
			
			if(this.options.h3){
				var h3 = $(document.createElement('div'));
				h3.addClass('bbcodeButton');
				h3.html('H3');
				h3.click(function(){ that._addTags('[h3]','[/h3]'); });
			}
			
			if(this.options.h4){
				var h4 = $(document.createElement('div'));
				h4.addClass('bbcodeButton');
				h4.html('H4');
				h4.click(function(){ that._addTags('[h4]','[/h4]'); });
			}
			
			if(this.options.item){
				var item = $(document.createElement('div'));
				item.addClass('bbcodeButton');
				item.html('Item');
				item.click(function(){ that._addTags('[i]','[/i]'); });
			}
			
			if(this.options.link){
				var link = $(document.createElement('div'));
				link.addClass('bbcodeButton');
				link.html('Link');
				link.click(function(){ that._addTags('[i]','[/i]'); });
			}
			
			if(this.options.image){
				var picture = $(document.createElement('div'));
				picture.addClass('bbcodeButton');
				picture.html('Image');
				picture.click(function(){ that._addTags('[i]','[/i]'); });
			}
			
			if(this.options.color){
				var color = $(document.createElement('div'));
				color.addClass('bbcodeButton');
				color.html('Color');
				color.click(function(){ that._addTags('[i]','[/i]'); });
			}
			
			if(this.options.youtube){
				var youtube = $(document.createElement('div'));
				youtube.addClass('bbcodeButton');
				youtube.html('Youtube');
				youtube.click(function(){ that._addTags('[i]','[/i]'); });
			}
			
			if(this.options.file){
				var file = $(document.createElement('div'));
				file.addClass('bbcodeButton');
				file.html('File');
				file.click(function(){ that._addTags('[i]','[/i]'); });
			}
			
			if(this.options.quote){
				var quote = $(document.createElement('div'));
				quote.addClass('bbcodeButton');
				quote.html('Quote');
				quote.click(function(){ that._addTags('[i]','[/i]'); });
			}
			
			if(this.options.blizzquote){
				var blizzquote = $(document.createElement('div'));
				blizzquote.addClass('bbcodeButton');
				blizzquote.html('Blizzquote');
				blizzquote.click(function(){ that._addTags('[i]','[/i]'); });
			}
			
			
			container.append(bold, italic, underline, size, toc, h1, h2, h3, h4, item, link, picture, color, youtube, file, quote, blizzquote);
			
			that.element.before(container);	
			
							
		},
		
		_size: function(){
		},
		
		_url: function(){
		},
		
		_image: function(){
		},
		_addTag: function(tag){
			
		},
		_addTags: function(tag1, tag2){
			var textarea = this.element.get(0);
			// Code for IE
			if ($.browser.msie) 
			{
				textarea.focus();
				var sel = document.selection.createRange();
				sel.text = tag1 + sel.text + tag2;
			}
		   else 
			{  // Code for Mozilla Firefox
				var len = textarea.value.length;
				var start = textarea.selectionStart;
				var end = textarea.selectionEnd;
				var scrollTop = textarea.scrollTop;
				var scrollLeft = textarea.scrollLeft;
				var sel = textarea.value.substring(start, end);
				var rep = tag1 + sel + tag2;
				
				textarea.value =  textarea.value.substring(0,start) + rep + textarea.value.substring(end,len);
				textarea.scrollTop = scrollTop;
				textarea.scrollLeft = scrollLeft;			
			}
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
