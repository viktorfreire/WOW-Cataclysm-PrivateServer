(function( $ ) {
	$.AGS_Message = function(type, title, text, duration){
		var message = $('#message');
		message.find('h3').html(title);
		message.find('p').html(text);
		var image = message.find('div > div img');
		
		var picturePath = null;
		switch(type){
			case "success":
				picturePath = STATIC_URL+'imagenes/buttons/ok.png';
				break;
			case "error":
				picturePath = STATIC_URL+'imagenes/buttons/error.png';
				break;
			case "info":
				picturePath = STATIC_URL+'imagenes/buttons/info.png';
				break;
			
		}
		
		image.attr('src', picturePath);
		
		fadeOut = function(){
			message.stop(true, true).fadeIn();
			message.stop(true, true).fadeOut();
			message.fadeOut(400);			
		}
		
		fadeIn = function(){
			message.stop(true, true).fadeOut();
			message.fadeIn(1000);	
			$('html, body').animate({
				scrollTop: message.offset().top - 20
			}, 500, function(){
				if(duration != null){
					setTimeout(function(){ fadeOut() }, duration);	
				}
			});
		}
		
		message.find('.close-button').click(function(e){
			e.preventDefault();
			fadeOut();
		});	
		
		fadeIn();	
	}	
}) (jQuery);