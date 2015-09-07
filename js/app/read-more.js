'use strict';

(function ($) {

	var moreButton = $('.read-more-button'),
	    //array containing all .read-more-buttons
	text = moreButton.html(),
	    //.read-more-button inner html, should be "Read more"
	altText = moreButton.data('alt-text'); //alternate text ("Read less") to be set after displaying .read-more text

	//on first load, hide read-more buttons and fade out text inside
	$(window).load(function () {
		moreButton.each(function () {
			$(this).toggleClass("hidden");
			$(this).next('.read-more').children().fadeOut();
		});
	});

	//on a click event of a read-more button:
	//	if read-more section is hidden: slide toggle the read-more section and
	//		fade text in. Text has to be faded in after slidetoggle is complete
	//		to avoid reflow of CSS columns caused by changing height of containing
	//		element during slidetoggle animation
	//	if read-more section is showing: fade text out, use a promise to check when fadeOut
	//		is complete, then slidetoggle. The promise helps avoid a problem of the
	//		slidetoggle animation bouncing and not completing
	//	html text of the read-more button is changed on each click

	moreButton.click(function (event) {

		var target = $(event.target),
		    more = target.next('.read-more'),
		    moreChildren = more.children(),
		    animSpeed = 200; //animation speed

		if (target.html() === text) {
			more.slideToggle(animSpeed).promise().done(function () {
				target.html(altText);
				moreChildren.fadeIn(animSpeed);
			});
		} else {
			moreChildren.fadeOut(animSpeed).promise().done(function () {
				more.slideToggle(animSpeed);
				target.html(text);
			});
		}
	}); //on moreButton click event
})(jQuery);
