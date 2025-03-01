// This script binds all plugins, widgets and other scripts for the AGS template
$(function(){
	// Needed for website, don't edit :)
	var browser = $.browser;
	if(browser.msie && browser.version < 9)
		alert('You are using Internet Explorer ' + browser.version + '. This browser is out of date and will not display this website properly. Please upgrade to version 9.0 or switch to Mozilla Firefox or Google Chrome');
	
	var Body = $('body');
	
	Body.find('.AGS_Menu').AGS_Menu();
	Body.find('a[title]').AGS_Tooltip();
	
	// Example bindings, free to edit
	Body.find('.AGS_Form').each(function(index, Element){
		head.js(site_uri(STATIC_URL+"js/AGS_Form.js"), function(){
			$(Element).AGS_Form();
		});		
	});
	
	Body.find('#sidebars').each(function(index, Element){
		loadcss(site_uri(STATIC_URL+"css/frontpage.css"));
		head.js(site_uri(STATIC_URL+"js/AGS_Sidebars.js"), function(){			
			$(Element).AGS_Sidebars();
		});			
	});

	Body.find('.datatable').each(function(index, Element){
		loadcss(site_uri(STATIC_URL+"css/jquery/datatables.css"));
		head.js(site_uri(STATIC_URL+'js/jquery/datatable.js'), function(){
			$(Element).dataTable();
		});
	});
		
	Body.find( ".progressbar" ).each(function(index, Element){
		head.js(STATIC_URL+'js/jquery/ui/jquery.ui.progressbar.min.js', function(){
			$(Element).progressbar({ value: 37 });	
		});
	});
	
	Body.find('.wow-item-tooltip').each(function(index, Element) {
        
    });
	
	Body.find('#raidviewer').each(function(index, Element){
		var element = $(Element);
		head.js(site_uri(STATIC_URL+'js/jquery/ui/jquery.ui.sortable.min.js'), function(){
			element.find('.mid > div:first-child ul, .mid > div:nth-child(2) ul').sortable({
				connectWith: ".connected",
				cancel: ".disabled",
				items: "li:not(.disabled)",
				placeholder: "highlight-drop",
				update: function(event, ui) {
					if( ui.sender != null)
					{
						var player_id = ui.item.attr('data-id');
						var from = $(ui.sender).attr('id');
						var to = $(ui.item).parent().attr('id');// available, unavailable, tanks, healers, dps
						//alert('player_id(' + player_id + ')  from(' + from + ')   to css id(' + to + ')');
						
						// Ajax call to update database values
					}
				}
			}).disableSelection();
		});
	});
	
	Body.find('.confirmDialog').AGS_Dialog({ type: 'confirm' });
	Body.find('.infoDialog').AGS_Dialog({ type: 'info' });
	Body.find('.formDialog').AGS_Dialog({ type: 'form' });
	
	Body.find('a[data-wow], span[data-wow]').each(function(){
		head.js(site_uri(STATIC_URL+'js/AGS_Wowtip.js'), function(){
			$(Element).AGS_Wowtip();
		});
	});
	
	head.js(STATIC_URL+'js/jquery/ui/jquery.ui.button.min.js', function(){
			$('.agsButton').button();
			$('.agsButtonIconText').each(function(){
				var user_icon = $(this).attr('rel');
				$(this).button({
					icons: {
						primary: user_icon 
					}
				});
			});
			
	});	
	$('.messageOpenener').click(function(e){
		$.AGS_Message('error', 'There was a error', 'You can not add a comment because you are not logged in');
	});

});