/* 
   	AGS_Wow // Battle.net World of Warcraft API data fetcher
	Version: 	0.1dev
	For:  		Alea Guild System - Default website template
	Author:		Robin Radic
	Date: 		20/04/2012
*/
$.AGS_Wow = {
	url: 				'http://' + $.AGS_Config.guild.region + '.battle.net/api/wow/',
	update_data_url: 	site_uri(STATIC_URL+'exampledata.php?what=updatewowdata&region=' + $.AGS_Config.guild.region),
	data_url: 			site_uri(STATIC_URL+'data/wowapi/'),
	wowhead_url:		'http://www.wowhead.com/item={item_name}&xml',
	
	updateWoWData: function(){
		$.ajax({
			url: this.update_data_url,
			method: 'get',
			success: function(){
				
			}
		});
	},
	
	getCharacter: function(name, realm, fields, callback){
		this._fetchApiData(this.url + 'character/' + realm + '/' + name + '/?jsonp=?&fields=' + fields, callback);
	},
	isValidCharacter: function(name, realm){
		var response = this._fetchApiDataResponse(this.url + 'character/' + realm + '/' + name + '/?jsonp=?');
		if(response.status == 'nok')
			return false;
		
		return true;
	},
	getItemByName: function(name){
		var fetch_url = this.wowhead_url.replace('{item_name}', name);
		$.ajax({
			url: fetch_url,
			type: 'GET',
			dataType: "xml",
			success: function(res) {
				alert(res);
			}
		});
	},
	_fetchApiData: function(fetchURL, callback){
		$.ajax({
			url: fetchURL,
			dataType: 'jsonp',
			crossDomain: true,
			jsonp: 'jsonp',
			success: callback
		});			
	},
	_fetchApiDataResponse: function(fetchURL){
		return $.ajax({
			url: fetchURL,
			dataType: 'jsonp',
			crossDomain: true,
			jsonp: 'jsonp'
		}).responseText();	
	}
};