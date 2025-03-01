site_uri = function (url){
	return $.AGS_Config.site.url + url;
}



loadScript = function(url, options) {

  // allow user to set any option except for dataType, cache, and url
  options = $.extend(options || {}, {
    dataType: "script",
    cache: true,
    url: url
  });

  // Use $.ajax() since it is more flexible than $.getScript
  // Return the jqXHR object so we can chain callbacks
  return jQuery.ajax(options);
};
/*
$.cachedScript("ajax/test.js").done(function(script, textStatus) {
  console.log( textStatus );
});
*/