	(function ( $ ) {

		$.fn.socialize = function( options ) {

        var  settings = jQuery.extend({
       	   networks:['facebook','plus','pin','twitter'], // the default social buttons that will be shown, the order is that used
          	appending:true, //if false, the buttons are inserted after the tag, perfect for img tags
          	/*****Example:
					<div id="layersocialized"></div><div class="postSocialContent"><!--buttons--></div>
				//if true, you  append the code to a tag
				<div id="layersocialized"><div class="postSocialContent"><!--buttons are inside the tag--></div></div>
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

        var socialObj=this;	
        var socialpart,socialpartHTML;

        function _initialize()
        {
        	socialpart='<div class="postSocialContent">';
        	var layout;
        	for (index = 0; index < settings.networks.length; ++index) 
        	{
        		switch(settings.networks[index])
        		{

        			case 'facebook':
        			layout=settings.big?"box_count":"button_count";
        			if(settings.fbcode==1)
        			{
        				settings.fbHTML=settings.fbHTML!=""?settings.fbHTML:'<div class="fb-like" data-href="{location_href}" data-layout="'+layout+'" data-action="like" data-show-faces="false" data-share="false"></div>';
        			}else{
        				settings.fbHTML=settings.fbHTML!=""?settings.fbHTML:'<span class="socialBtn fb"><iframe id="framefb" src="https://www.facebook.com/plugins/like.php?locale='+settings.language+'&href={location_href}&amp;layout="'+layout+'"&amp;show_faces=false&amp;width=500&amp;action=like&amp;font&amp;colorscheme=light&amp;height=23" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:103px; height:23px;" allowTransparency="true"></iframe></span>';
        			}
        			socialpart+=settings.fbHTML;
        			break;
        			case 'plus':
        			layout=settings.big? ' data-size="tall" ': '';
        			settings.plusHTML=settings.plusHTML!=""?settings.plusHTML:'<span class="socialBtn plus"><div class="g-plusone" href="{location_href}" '+layout+'></div></span>';		
        			socialpart+=settings.plusHTML;		
        			break;
        			case 'pin':
        			layout=settings.big?' data-pin-config="above" data-pin-height="28" ':' data-pin-config="beside" ';
        			settings.pinHTML=settings.pinHTML!=""?settings.pinHTML:'<span class="socialBtn pin"> <a href="//www.pinterest.com/pin/create/button/?url={location_href}&media={location_href}&description=Next%20stop%3A%20Pinterest" data-pin-do="buttonPin"  '+layout+'><img src="//assets.pinterest.com/images/pidgets/pinit_fg_en_rect_gray_20.png" /></a></span>';
        			socialpart+=settings.pinHTML;
        			break;
        			case 'twitter':
        			layout=settings.big? ' data-count="vertical" ':' data-count="horizontal" ';
        			settings.twitterHTML=settings.twitterHTML!=""?settings.twitterHTML:'<span class="socialBtn twit"><a href="https://twitter.com/share" class="twitter-share-button"  data-url="{location_href}"'+layout+'>Tweet</a></span>';
        			socialpart+=settings.twitterHTML; 		
        			break;
        		}


        	}

        	socialpart+='</div>';


        	socialObj.each(function()
        	{


        		if(settings.attrURL!="")
        		{

							//we verify if the image or href has the protocol and domain name, so that it can be shared

							currentURL= window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
							nameURL=$(this).attr(settings.attrURL);
							var urlRegex =/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;

							var parts=nameURL.match(urlRegex)

							nameURL=!parts && nameURL.substr(0,1)!="/"?"/"+nameURL:nameURL;

							nameURL=!parts?currentURL+nameURL:nameURL;

						}
						else
						{

							nameURL=window.location.href
						}


						socialpartHTML= socialpart.replace(/{location_href}/g, nameURL); 
						

						if(settings.appending)
						{
							$(this).append(socialpartHTML);
						}
						else
						{
							$(this).after(socialpartHTML);
						}

					});

        	if(settings.rerender){
        		for (index = 0; index < settings.networks.length; ++index) 
        		{
        			switch(settings.networks[index])
        			{
        				case 'facebook':
        				FB.XFBML.parse();
        				break;
        				case 'plus':
        				gapi.plusone.go("postSocialContent");
        				break;
        				case 'pin':
        				window.parsePinBtns();
        				break;
        				case 'twitter':
        				twttr.widgets.load();
        				break;
        			}
        		}

        	}
        }


        function addScript(id,thesrc)
        {
        	d=document;
        	s='script';
        	var js, fjs = d.getElementsByTagName(s)[0];
        	if (d.getElementById(id)) return;
        	js = d.createElement(s); js.id = id;
        	js.src = thesrc;
        	if(id=="pinterest-js"){
        		js.setAttribute("data-pin-build","parsePinBtns");
        	}
        	fjs.parentNode.insertBefore(js, fjs);

        }
        function _initScripts(){
        	if(settings.initscripts)
        	{

        		for (index = 0; index < settings.networks.length; ++index) 
        		{
        			switch(settings.networks[index])
        			{
        				case 'facebook':
        				if(settings.fbcode==1)
        				{ //for iframe code it is not needded
        					addScript('facebook-jssdk',"//connect.facebook.net/"+settings.language+"/all.js#xfbml=1&appId=234771123267870");
        				}
        				break;
        				case 'plus':
        				addScript('google-js','//apis.google.com/js/plusone.js');
        				break;
        				case 'pin':
        				addScript('pinterest-js',"//assets.pinterest.com/js/pinit.js");
        				break;
        				case 'twitter':
        				addScript('twitter-js','//platform.twitter.com/widgets.js');
        				break;
        			}
        		}
        	}
        }

        _initScripts();
        _initialize();


        return;
    };

}( jQuery ));
