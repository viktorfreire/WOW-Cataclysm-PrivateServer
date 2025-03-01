;(function ( $, window, document, undefined ) {
    $.widget( "custom.AGS_Roster" , {
        options: {
			guild: {
				name: 		$.AGS_Config.guild.name,
				region: 	$.AGS_Config.guild.region,
				realm: 		$.AGS_Config.guild.realm
			},
			columns: {
				name: true,
				rank: false,
				level: true,
				class: false
			},
			columnsHTML: {
				name: 'Name',
				rank: 'Rank',
				level: 'Level',
				class: 'Class'
			},
			fieldMarkup: { // Available variables: {name}, {rank_id}, {rank_name} (if defined), {level}, {class}
				name: '{name}',
				rank: {
					r0: 'Alt',
					r1: 'Friend',
					r2: 'Casual',
					r3: 'Core'
				},
				level: '{level}',
				class: '{class}'
			}
        },

        _create: function () {
			var that = this;
			var thead = $(document.createElement('thead'));
			var thead_tr = $(document.createElement('tr'));
			if(that.options.columns.name == true){
				var th_name = $(document.createElement('th'));
				th_name.html(that.options.columnsHTML.name);
				thead_tr.append(th_name);
			}
			if(that.options.columns.rank == true){
				var th_rank = $(document.createElement('th'));
				th_rank.html(that.options.columnsHTML.rank);
				thead_tr.append(th_rank);
			}
			if(that.options.columns.level == true){
				var th_level = $(document.createElement('th'));
				th_level.html(that.options.columnsHTML.level);
				thead_tr.append(th_level);
			}
			if(that.options.columns.class == true){
				var th_class = $(document.createElement('th'));
				th_class.html(that.options.columnsHTML.class);
				thead_tr.append(th_class);
			}
			
			var tbody = $(document.createElement('tbody'));
			thead.append(thead_tr);			
			that.element.append(thead);
			that.element.append(tbody);
			
			that.element.dataTable( {
				"bProcessing": true,
				"sAjaxSource": "http://" + that.options.guild.region + ".battle.net/api/wow/guild/" + that.options.guild.realm + "/" + that.options.guild.name + "?fields=members&jsonp=?",
				"fnServerData": that._fnServerObjectToArray(  )
			} );
        },

        destroy: function () {
            $.Widget.prototype.destroy.call(this);
        },

		_fnServerObjectToArray: function ( )
		{			
			var that = this;
			return function ( sSource, aoData, fnCallback ) {
				getClassNameById = function(classes, id){
					for( var i = 0; i < classes.length; i++ ){
						if(classes[i].id == id){
							return classes[i].name;
						}
					}
				}
				$.ajax({
					dataType: 'json',
					type:		'POST',
					url:		site_uri(STATIC_URL+'data/wowapi/character_classes.txt'),
					success:	function( data ){
						classes = data.classes;
						var r = [];
						$.ajax( {
							"dataType": 'jsonp',
							"type": "POST",
							"url": sSource,
							"data": aoData,
							"success": function (json) {
								var a = [];
								for ( var i=0, iLen=json.members.length ; i<iLen ; i++ ) {
									var classname = getClassNameById(classes, json.members[i].character.race);
									row = Array();
									if(that.options.columns.name == true){
										row.push(json.members[i].character.name);
									}else if(that.options.columns.level == true){
										row.push(json.members[i].character.level);
									}
									a.push(row);
								}
								json.aaData = a;
								fnCallback(json);
								
								
							}
						} );
					}
					
				});
			}
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
