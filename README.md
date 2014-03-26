jquery-socialize
================

A plugin to add social buttons to any html tag (1 or more at once) with the current URL as link for the like buttons or adding the URL of the image.
There are a lot of things that can be configured:

<pre>
var  settings = jQuery.extend({
       	   networks:['facebook','plus','pin','twitter'],
       	   // the default social buttons that will be shown, the order is that used appending:true, 
       	   //if false, the buttons are inserted after the tag, perfect for img tags
          	/*****Example:&lt;div id="layersocialized"&gt;&lt;/div&gt;&lt;div class="postSocialContent"&gt;&lt;!--buttons--&gt;&lt;/div&gt;<br /> //if true, you append the code to a tag<br /> &lt;div id="layersocialized"&gt;&lt;div class="postSocialContent"&gt;&lt;!--buttons are inside the tag--&gt;&lt;/div&gt;&lt;/div&gt;
          	*********/
          	big: false, //for big buttons, mark as true
			attrURL:'', // if empty, the URL of the buttons would be current page (window.location.href) 
			//if not empty, it would take the value of the attribute you specify
			//for an image, you must specify 'src', for a link would be 'href'
			//the frequent values are or '' or 'src'
			rerender:false, //in case you don't see the buttons, try assigning true to rerender.
			initscripts:true,//this installs the scripts of the social networks you use
			fbHTML:"", //you can change the HTML used for fb, the only thing you must include is {location_href} for the URL
			plusHTML:"", //you can change the HTML used for gplus, the only thing you must include is {location_href} for the URL
			pinHTML:"", //you can change the HTML used for pin, the only thing you must include is {location_href} for the URL
			twitterHTML:"", //you can change the HTML used for twitter, the only thing you must include is {location_href} for the URL
			fbcode: 1, //this is an extra option, to use HTML5 option of facebook code instead of iframe code
			//1: it's HTML5 code, 2: it's iframe code
			language: 'es_ES', //this is for example for facebook button			
		}, options );
</pre>
