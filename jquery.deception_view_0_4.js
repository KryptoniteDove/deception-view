;(function($){
    $.fn.extend({         
        deception: function(options) {
            // - Settings list and the default values           
            var defaults = {
                width: this.css('width'), height: this.css('height'), position: this.css('position'),
  			eventTrigger: 'mouseover', interval: 600, pause: 1500, easing: 'linear',
				cursor: 'pointer'
            };
            
            var options = $.extend({}, defaults, options);	 
		 
            return this.each(function() {
            
			// --  Globals
				var o = options;	
				    // Parse width to obtain numbers only for animation
				    o.width = parseInt(o.width, 10); // Must use radix (10 = decimal)
                var obj = $(this); //Assign current element to variable
                var id = randID(6); // Generate a random 8 char string for wrapper so that stylings do not cause conflict
                var wrapperID = "#" + id;    
				// Animation specific
				var stop;
				var timeoutID;

			
			// --- Application Functions
			function randID(max) {
				var text = "";
				var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

					for( var i=0; i < max; i++ )
					text += possible.charAt(Math.floor(Math.random() * possible.length));
						text = "kryptonite-dove-" + text;
					return text;
			}
			
			function styleIt() {
				// Style wrapper				
				$(wrapperID).css({
					'position': o.position,
					'overflow': 'hidden',
					'width': o.width,
					'height': o.height,
					'display': 'block',
					'cursor': o.cursor,
					'float': 'left',	
					'clear': 'both'
				});
					// Style object
					obj.css({
						'position': 'relative',
						'width': o.width*2
					});
					// Style child paragraphs
					$("p", obj).css({
						'width': o.width, 'padding': 0, 'margin': 0
					}); $("p.deception_left", obj).css('float', 'left');
						$("p.deception_right", obj).css('float', 'right');
			}
			
			function deceptionAnimate(display) {
				if(display == 1) {
				   clearTimeout(timeoutID);
					obj.clearQueue().animate({
										'top': 0,
										'left': -o.width 
										}, o.interval, o.easing, function() {
											// Complete
											stop = true;
										});				
				} else if(display == 0) {
					obj.clearQueue().animate({
										'top': 0,
										'left': 0
										}, o.interval, o.easing, function() {
											// Complete
											stop = false;
										});
				} 
			}
	
			
			// ---- Initiate
			function init() {	
				// Deconstruct element into component parts
				var titleText = obj.attr("title");
				var altText = obj.attr("alt");
				var content = obj.text();

				// Add wrapper to prevent jumping
						obj.wrap('<div id="' + id + '" />');				
					// CSS alterations/manipulation
					styleIt();
							// ----- Animate
                  			// Using on so any asynchronously loaded elements 
                  			// after DOM ready will also exibit same behaviour
                  			$(document).on(o.eventTrigger, wrapperID, function() {
	                  			deceptionAnimate(1);
							});
							$(document).on('mouseout', wrapperID, function() {
								if (stop == true) {
									timeoutID = window.setTimeout(function() {deceptionAnimate(0);}, o.pause);
								} else {
									deceptionAnimate(0);
								}
							});     					
			}
				
			// Call
	        init();

	  
            });
        }
    });
})(jQuery);
