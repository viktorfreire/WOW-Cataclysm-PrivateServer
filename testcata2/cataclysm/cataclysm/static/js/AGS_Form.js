/* 
   	AGS_Form // Form widget
	Version: 	0.1dev
	For:  		Alea Guild System - Default website template
	Author:		Robin Radic
	Date: 		20/04/2012
*/
;(function ( $, window, document, undefined ) {
    $.widget( "custom.AGS_Form" , {

        //Options to be used as defaults
        options: {
            validate: 			true,
			validateOptions:{
				email:			true,
				password:		true,
				date:			true,
				character: {
					enabled:	true,
					name:		'#character_name',
					realm:		'#character_realm'
				}
			},
			ajax:				false,
			style: {
				radio:			true,
				select:			true,
				checkbox:		true
			},
			smileyPath: 		site_uri(STATIC_URL+'imagenes/smileys/'),
			captcha_url:		site_uri(STATIC_URL+'captcha.php'),
			success: 			null
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
			if(this.options.validate)
				head.js(STATIC_URL+"js/jquery/validate.js");
			
			if(this.options.style.radio || this.options.style.select || this.options.style.checkbox)
				head.js(STATIC_URL+"js/jquery/jstyling.js");
			
			head.js(STATIC_URL+"js/AGS_Tooltip.js");
			head.ready(callback);
		},
		
		_bindElements: function(){
			var that = this;
			
			// Re-route the form submit
			this.element.submit(function(){
				return that._submitForm();
			});
			// class="agsButton"
			
			this.element.find('button[type="submit"]').each(function(index, Element){
				head.js(STATIC_URL+'js/jquery/ui/jquery.ui.button.min.js', function(){
					$(Element).button();
				});						
			}); //.button();
			
			this.element.find('input[type="file"]').each(function(index, Element){
				head.js(STATIC_URL+'js/jquery/ui/jquery.ui.button.min.js', function(){
					$(Element).button();
				});						
			}); //.file();
			
			// Captcha
			this.element.find('div.captcha').each(function(index, Element){
				head.js(
					site_uri(STATIC_URL+"js/jquery/ui/jquery.ui.draggable.min.js"),
					site_uri(STATIC_URL+"js/jquery/ui/jquery.ui.droppable.min.js"),
					site_uri(STATIC_URL+"js/jquery/captcha.js"),
					function(){
						that._captcha(Element);	
					}
				);						
			});

			
			// BBcoder
			this.element.find('textarea.bbcode').each(function(index, Element){
				head.js(site_uri(STATIC_URL+'js/AGS_BBCode.js'), function(){
					$(Element).AGS_BBCode();				
				});
			});
			
			// Placeholder
			this.element.find('input[placeholder]').each(function(index, Element){
				that.placeholder(Element);				
			});	
			
			// Realm autocomplete field
			var realms = this.element.find('input[type="realm"]');
			if(realms.length > 0)
			{
				head.js(site_uri(STATIC_URL+'js/jquery/ui/jquery.ui.autocomplete.min.js'), function(){				
					$.ajax({
							url: "http://" + $.AGS_Config.guild.region + ".battle.net/api/wow/realm/status",
							dataType: "jsonp",
							crossDomain: true,
							jsonp: 'jsonp',
							success: function( data ) {
								var realmlist = new Array();
								for(i=0; i<data.realms.length; i++)
								{
									var add = {
										value: data.realms[i].name,
										name:  data.realms[i].name
									}
									
									realmlist.push(add);
								}
								
								realms.each(function(index, Element){
									that.realmlist( Element, realmlist);
								});
							}
						});
				});
			}
			
			this.element.find('textarea[limit]').each(function(index, Element){
				that.limiter(Element);
			});
			// Date
			this.element.find('input[class="date"]').each(function(index, Element){
				head.js(site_uri(STATIC_URL+'js/jquery/ui/jquery.ui.datepicker.min.js'), function(){
					that.date(Element);
				});
			});
			// Date time
			
			// Date
			this.element.find('input[class="location"]').each(function(index, Element){
				head.js(site_uri(STATIC_URL+'js/jquery/ui/jquery.ui.autocomplete.min.js'), function(){				
					that.location(Element);
				});
			});
			// Date time
			
			this.element.find('input[type="password"]').each(function(index, Element){
				that.password(Element);
			});
			
			if(this.options.style.select)
				$.jStyling.createSelect(this.element.find('select'));
				
			if(this.options.style.checkbox)
				$.jStyling.createCheckbox(this.element.find('input[type=checkbox]'));
			
			if(this.options.style.radio)
				$.jStyling.createRadio(this.element.find('input[type=radio]'));
			
			this.element.find('input[title], select[title], textarea[title]').AGS_Tooltip({
				position: {
					target: 'topRight',
					tooltip: 'bottomLeft'
				}
		  	});
			
			this.element.find('textarea.smileys').each(function(index, Element){
				head.js(site_uri(STATIC_URL+'js/jquery/ui/jquery.ui.slider.min.js'), site_uri(STATIC_URL+"js/jquery/insertatcarat.js"), function(){
					that.textareaSmileys(Element);				
				});
			});
			
		},
		
		_submitForm: function() {				
			if(this.options.validate == false && this.options.ajax == false)
			{
				return true;
			}
			else if(this.options.validate == true && this.options.ajax == false)
			{
				return this._validateForm();
			}
		},
		
		
		_captcha: function(element){
			var element = $(element);
			var that = this;
			element.captcha({
				captchaDir: 	STATIC_URL+"imagenes/jquery/captcha/",  
	   			url: 			that.options.captcha_url,  
	   			formId: 		that.element.attr('id')	
			});					
		},
		
		_validateForm: function(){
			var validator = this.element.validate({
				//errorContainer: container,
				//errorLabelContainer: $("ol", container),
				//wrapper: 'li',
				//meta: "validate",
				onsubmit: false
			});
			this.element.find('input[type=password]').rules("add", {
				 required: true,
				 minlength: 5,
				 maxlength: 20
			});
			this.element.find('input[class=date]').rules("add", {
				 required: true,
				 date: true
			});
			
			this.element.find('input[type=email]').rules("add", {
				 required: true,
				 email: true
			});
			
			if(this.options.validateOptions.character.enabled)
			{
				var name = this.element.find(this.options.validateOptions.character.name);
				var realm = this.element.find(this.options.validateOptions.character.realm);
				
				if(name.val() == 'undefined' || realm.val() == 'undefined')
					return false;
				
				var isValidCharacter = $.AGS_Wow.isValidCharacter(name.val(), realm.val());
				
				if(isValidCharacter == false)
				{
					// Let the validator say it's not valid
					name.rules('add', {
						 required: true,
						 maxlength: 1,
						 messages: {
						   required: "You did not fill in a character",
						   maxlength: "Your character could not be found on battle.net"
						 }
					});
				}
			}
			
			valid = validator.form();
			if(valid == false){
				$.AGS_Message('error', 'Submit failed', 'You did not complete the form correctly, review the errors and adjust them', 5000);
			}
			return false;
		},
		
		textareaSmileys: function( element ) {
			element = $(element);
			var that = this;
			var shown = false;
			var container = $(document.createElement('div'));			
			var handle = $(document.createElement('div'));
			var smileys = $(document.createElement('div'));
			var slider = $(document.createElement('div'));
			var conveyor = $(document.createElement('div'));
			
			
			// Add properties and such
			container.addClass('smileyBox');
			smileys.addClass('smileys');
			handle.addClass('smileyHandle');
			slider.addClass('slider');
			conveyor.addClass('conveyor');
			handle.html('Smileys');	
			
			mt = 0;
			if($.browser.msie)
				mt = 2;
			else if($.browser.mozilla)
				mt = 4
			else if($.browser.chrome)
				mt = 3;
			else
				mt = 3;
				
			container.css('margin-top', "-" + mt + "px");
			
			smileys.append(conveyor);
			
			container
				.append(handle)
				.append(smileys)
				.append(slider);		
				
			
			element.after(container);
			
			// Get smileys and append them
			$.ajax({
				url: STATIC_URL+'exampledata.php?what=smileys',
				method: 'get',
				type: 'json',
				success: function(data){
					data = JSON.parse(data);
					for(var i = 0; i < data.smileys.length; i++)
						addSmileyContainer(data.smileys[i].text, data.smileys[i].image);
					
					// create slider stuff
					var containers = conveyor.find('figure');
					conveyor.css("width", containers.length * parseInt(containers.css("width")));  
					smileys.css('width', ((element.width() - 40)  ) + 'px');
					
					slider.slider({
						
						max: (containers.length * parseInt(containers.css("width"))) - parseInt(smileys.css("width")),
						slide: function(e, ui) {  
							conveyor.css("left", "-" + ui.value + "px");  
					    }  
					});
				}
			});			
			
			// Bind stuff
			handle.click(function(e){
				if(shown) // Close
				{
					handle.html('Smileys');
					container.animate({
						width: '70px',
						height: '22px'
					}, 300, false, function(){
						if(typeof $.colorbox != 'undefined'){
							$.colorbox.resize()
						}
					});
					
					shown = false;
				}
				else // Open
				{
					handle.html('X');
					
					container.animate({
						width: element.width() - 40,
						height: '120px'
					}, 300, false, function(){
						smileys.css('width', (container.width() ) + 'px');
						
						if(typeof $.colorbox != 'undefined'){
							$.colorbox.resize()
						}
						
					});
					
					shown = true;					
				}
			});
			addSmileyContainer = function(text, imageName){
				var smileyContainer = $(document.createElement('figure'));
				var smileyImage = $(document.createElement('img'));
				var smileyText = $(document.createElement('fcaption'));
				smileyImage.attr('src', that.options.smileyPath + imageName);
				smileyContainer.addClass('smileyContainer');
				smileyText.html(text);
				smileyContainer.append(smileyText);
				smileyContainer.append(smileyImage);
				conveyor.append(smileyContainer);
				
				smileyContainer.click(function(){
					element.insertAtCaret(text);
				});
			}
		},
		limiter: function( element ){
			element = $(element);
			var field1 = $(document.createElement('input'));
			var field2 = $(document.createElement('input'));
			var css = {
				'text-align': 'center',
				'width': '50px'
			}

			field2.val(element.attr('limit'));
			field2.css(css);
			field1.css(css);
			
			element.after(field2).after("/").after(field1);
			
			element.keyup(function(e){
				field1.val(element.val().length);
			});
			element.keydown(function(e){
				if(element.val().length >= element.attr('limit') && e.which != 8)
					return false;
				
			});
		},
		password: function ( element ){
			element = $(element);
			var shown = false;
			var statusDiv = $(document.createElement('div'));
			var statusText = $(document.createElement('span'));
			var confirmPassword = $(document.createElement('input'));
			confirmPassword.attr('type', 'password');
			confirmPassword.css('margin-bottom', '5px');
			statusDiv.addClass('password-status');
			statusDiv.width(element.width() - 35);
			element.keyup(function(){
				if(element.val().length > 0 && shown == false)
				{
					
					element.after(confirmPassword);
					element.after(statusDiv);
					statusDiv.append(statusText);
					confirmPassword.keyup(function(){
						if(confirmPassword.val() == element.val()){
							confirmPassword.css('border', '1px solid #090');	
						} else {
							confirmPassword.css('border', '1px solid #F00');
						}
					});
					shown = true;
				}
				else if(shown == true && element.val().length > 0)
				{
					var strengthLevel = getStrength(element.val(), 5);
					var text;
					var color;
					if(strengthLevel == 0){
						text = 'Invalid';
						color = '#990000';
					} else if(strengthLevel == 1){
						text = 'Invalid';
						color = '#FF0000';							
					} else if(strengthLevel == 2){
						text = 'Unsecure';
						color = '#FF0000';						
					} else if(strengthLevel == 3){
						text = 'Medium';
						color = '#990000';						
					} else if(strengthLevel == 4){
						text = 'Ok';
						color = '#99FF00';						
					} else if(strengthLevel == 5){
						text = 'Good';
						color = '#00FF00';						
					}
					statusText.html(text);
					statusText.css('color', color);
				}
			});
			
			getStrength = function (value, minLength) {
				var score = 0;
				if (value.length < minLength) {
					return score
				} else {
					score = Math.min(15, (score + (value.length) * 2));
				}
				if (value.match(/[a-z]/)) score += 1;
				if (value.match(/[A-Z]/)) score += 5;
				if (value.match(/\d+/)) score += 5;
				if (value.match(/(.*[0-9].*[0-9].*[0-9])/)) score += 7;
				if (value.match(/.[!,@,#,$,%,^,&,*,?,_,~]/)) score += 5;
				if (value.match(/(.*[!,@,#,$,%,^,&,*,?,_,~].*[!,@,#,$,%,^,&,*,?,_,~])/)) score += 7;
				if (value.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) score += 2;
				if (value.match(/([a-zA-Z])/) && value.match(/([0-9])/)) score += 3;
				if (value.match(/([a-zA-Z0-9].*[!,@,#,$,%,^,&,*,?,_,~])|([!,@,#,$,%,^,&,*,?,_,~].*[a-zA-Z0-9])/)) score += 3;
				return Math.min(5, Math.ceil(score / 10));
			}
		},
		
		location: function (element){
			element = $(element);
			element.autocomplete({
				source: function( request, response ) {
					$.ajax({
						url: "http://ws.geonames.org/searchJSON",
						dataType: "jsonp",
						data: {
							featureClass: "P",
							style: "full",
							maxRows: 12,
							name_startsWith: request.term
						},
						success: function( data ) {
							response( $.map( data.geonames, function( item ) {
								return {
									label: item.name + (item.adminName1 ? ", " + item.adminName1 : "") + ", " + item.countryName,
									value: item.name + (item.adminName1 ? ", " + item.adminName1 : "") + ", " + item.countryName
								}
							}));
						}
					});
				},
				minLength: 2,
				delay: 0
			});
		},
		
		date: function( element ){
			element = $(element);
			element.attr('readonly', true);
			element.datepicker({ 
				changeYear: true ,
				yearRange: '1910',
				dateFormat: 'yy-mm-dd'
			});
		},
		
		realmlist: function( element, realms ) {
			element = $(element);
			element.autocomplete({
				source: realms,
				minLength: 1,
				delay: 0
			});				
		},
		
        placeholder: function ( element ) {
			element = $(element);
			element.val(element.attr('placeholder'));
			element.css('color', '#333');
			element.click(function(e){
				if(element.val() == element.attr('placeholder'))
				{
					element.val('');
					element.css('color', '#CCC');
				}
			})
			.focus(function(e){
				element.css('color', '#CCC');
			}).focusout(function(e){
				if(element.val().length == 0)
					element.css('color', '#333');
			});
        },

        methodA: function ( event ) {
            this._trigger('dataChanged', event, {
                key: value
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