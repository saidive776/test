$(document).ready(function() {	
	
	$(window).load(function(){
		$('#preloader').fadeOut(500, function(){ $('#preloader').hide(); } );
	});
	let lAV = '.ar-wa-discover';	
	let searchDebounceTimer;
	function stopFeaturedAppsSwiper() {
		if ($('.featured-apps-slider').length) {
			featuredAppsSwiper.autoplay.stop();
		}
	}
	function sCLaLC(viewNavClass, contentType) {
		$('.ar-wa-view-nav-item').removeClass('ar-wa-view-nav-item-active');
		$('.ar-wa-view-nav-item.' + viewNavClass).addClass('ar-wa-view-nav-item-active');
		$('.ar-wa-discover, .ar-wa-games, .ar-wa-apps').hide();
		$('.' + contentType).html('<div class="content-loader-w"><div class="ball-scale-multiple"><div></div><div></div><div></div></div></div>').show();
		lC(contentType.replace('ar-wa-', ''), '.' + contentType);
	}
	$('.stw-view-all').on('click', function() {
		stopFeaturedAppsSwiper();
		const viewMapping = {
			'stw-view-all-apps': {
				viewNavClass: 'nav-apps',
				contentType: 'ar-wa-apps'
			},
			'stw-view-all-games': {
				viewNavClass: 'nav-games',
				contentType: 'ar-wa-games'
			}
		};
		for (const className in viewMapping) {
			if ($(this).hasClass(className)) {
				const { viewNavClass, contentType } = viewMapping[className];
				sCLaLC(viewNavClass, contentType);
				break;
			}
		}
	});
	$('.ar-wa-view-nav-item').on('click', function() {
		if ($(this).hasClass('ar-wa-view-nav-item-active')) {
			return;
		}
		if ($('#cloned-appdet-c-top').length) {
			$('#cloned-appdet-c-top').remove();
		}
        $('.ar-wa-view-nav-item').removeClass('ar-wa-view-nav-item-active');
        $(this).addClass('ar-wa-view-nav-item-active');
        let vtS = '';
        $('.ar-wa-discover, .ar-wa-games, .ar-wa-apps').hide();
        if ($(this).hasClass('nav-discover')) {
			vtS = '.ar-wa-discover';
			$('.ar-wa-discover').show();
			if($('.featured-apps-slider').length){
				featuredAppsSwiper.update();
				featuredAppsSwiper.autoplay.start();
			}            
        } else if ($(this).hasClass('nav-games')) {
			vtS = '.ar-wa-games';
			stopFeaturedAppsSwiper();	
            $('.ar-wa-games').html('<div class="content-loader-w"><div class="ball-scale-multiple"><div></div><div></div><div></div></div></div>').show();
            lC('games', '.ar-wa-games');
        } else if ($(this).hasClass('nav-apps')) {
			vtS = '.ar-wa-apps';
			stopFeaturedAppsSwiper();
            $('.ar-wa-apps').html('<div class="content-loader-w"><div class="ball-scale-multiple"><div></div><div></div><div></div></div></div>').show();        
            lC('apps', '.ar-wa-apps');
        }
        if (vtS) {
            lAV = vtS;
            $('.ar-wa-discover, .ar-wa-games, .ar-wa-apps, .ar-wa-search, .ar-wa-det').hide();
            $(vtS).show();
        }
    });
	$('#search-input').on('keyup', function() {
		clearTimeout(searchDebounceTimer);
        let sQ = $(this).val().trim();
        if (sQ.length > 0) {
            searchDebounceTimer = setTimeout(function() {
				stopFeaturedAppsSwiper();
                $('.ar-wa-discover, .ar-wa-games, .ar-wa-apps, .ar-wa-det').hide(); // Hide other views                
                $('.ar-wa-search').show();
				$('#search-query').text(sQ);
                $('#search-results').html('<div class="content-loader-w"><div class="ball-scale-multiple"><div></div><div></div><div></div></div></div>');
                pfS(sQ);
            }, 600);
        } else {
            $('.ar-wa-search').hide();
			$('.ar-wa-det').empty().hide();
			if ($('#cloned-appdet-c-top').length) {
				$('#cloned-appdet-c-top').remove();
			}
            $(lAV).show();
			if($('.featured-apps-slider').length) {
				featuredAppsSwiper.update();
				featuredAppsSwiper.autoplay.start();
			}
        }
    });
    $('#close-search').on('click', function() {
        $('#search-input').val('');
		$('#search-query').text('');
        $('.ar-wa-search').hide();
		$('.ar-wa-det').empty().hide();
		if ($('#cloned-appdet-c-top').length) {
			$('#cloned-appdet-c-top').remove();
		}
        $(lAV).show();
		if($('.featured-apps-slider').length) {
			featuredAppsSwiper.update();
			featuredAppsSwiper.autoplay.start();
		}
    });
    function lC(category, container) {
        $.ajax({
            url: 'includes/gc.php',
            type: 'POST',
            data: { 'category': category },
            success: function(response) {
                if(response.trim() === '' || response.includes('No category specified')) {
					$(container).html('<div class="empty-content">No ' + category + ' found</div>');
				} else {
					$(container).html(response).show();
					$(container).append('<div class="lc-spacer"></div>');
				}
            },
            error: function(xhr, status, error) {
                console.error("AJAX Error: ", xhr.responseText);
				$(container).html('<div class="error-message">Error loading content</div>');
            }
        });
    }
	if($('.featured-apps-slider').length){
		var featuredAppsSwiper = new Swiper('.featured-apps-slider', {
			loop: true,
			autoplay: {
				delay: 2500,
				disableOnInteraction: false,
				pauseOnMouseEnter: true
			},
			speed: 500,
			slidesPerView: 2,
			centeredSlides: true,
			spaceBetween: 30,
			pauseOnMouseEnter: true,
			 breakpoints: {
				1024: {
					slidesPerView: 2,
					spaceBetween: 30
				},
				320: {
					slidesPerView: 1,
					spaceBetween: 10
				}
			  }
		});
	}
	function scrollToTop() {
		$('html, body').animate({
			scrollTop: 0
		}, 200);
	}
	$c_s_m = ".proccessing-msg";
	let iAL = false;
	$(document).on('click', '.lit', function(){
		if (iAL) {
			console.log("Please wait.");
			return;
		}
		var appid = $(this).data('appid');
		if (appid) {
			iAL = true;
			if ($('#cloned-appdet-c-top').length) {
				$('#cloned-appdet-c-top').remove();
			}
			scrollToTop();
			$.ajax({
				url: 'includes/ad.php',
				type: 'POST',
				data: { id: appid },
				dataType: 'json',
				success: function(data) {
					if (data.error) {
						console.log("Error from server: ", data.error);
					} else {
						dAD(data);
						$('.ar-wa-discover, .ar-wa-games, .ar-wa-apps, .ar-wa-search').hide(); // Hide other views
						$('.ar-wa-det').empty().show();						
					}
					iAL = false;
				},
				error: function(xhr, status, error) {
					console.log("AJAX Error: ", xhr.responseText);
					iAL = false;
				}
			});
		} else {
			console.log("App Error");
		}
	});
	function decodeHtml(html) {
		var txt = document.createElement("textarea");
		txt.innerHTML = html;
		return txt.value;
	}
	function dAD(appData) {
		gS( "psf_1", function(src) {
		let r = Math.random().toString(36).substring(7);
		$('.ar-wa-det').append('<div id="h'+r+'" class="animated slideInUp anifa"></div>');
		let app_img_src = appData.app_img_src;
		let app_bg_img_src = appData.app_bg_img_src;
		let app_name = appData.app_name;
		let app_shortname = appData.app_name;
		let app_author = appData.app_author || '';
		let app_rating = appData.app_rating || '';
		let app_size = appData.app_size || '';
		let app_description = appData.app_description || '';
		let app_downloads = appData.app_downloads || '';
		let app_platforms = appData.app_os;
		let app_badge = appData.app_badge;
		let app_duration = appData.app_duration;
		let app_category = appData.app_category;
		let app_category_l = appData.category_label;
		let app_locker_url = appData.app_locker_url;
		let app_locker_url_ios = appData.app_locker_url_ios;
		$( '#h'+r ).html(src);
		if (app_bg_img_src) {
            $('.appdet-container-bg', '#h' + r).css('background-image', 'url(' + app_bg_img_src + ')');
        } else {
            $('.appdet-container-bg', '#h' + r).css('background-image', 'url(' + app_img_src + ')').addClass('bg-blur');
        }
		$('.appdet-icon', '#h'+r).attr('src', app_img_src);
		if(app_badge) {
			$('.appdet-badge').html('<div class="appdet-badge-b">'+app_badge+'</div>');
		}
		if(app_author) {
			$('.appdet-c-meta-val-author').text(app_author);
		}
		if(app_downloads) {
			$('.appdet-c-meta-val-downloads').text(app_downloads);
		}
		if(app_size) {
			$('.appdet-c-meta-val-size').text(app_size);
		}
		if(app_rating) {
			let formattedRating = parseFloat(app_rating).toFixed(1);
			$('.appdet-c-meta-val-rating').text(formattedRating);
		}
		$('.appdet-c-meta-val-os').html(buildPlatformHTML(app_platforms));
		$('.appdet-c-meta-category-icon').html(buildCatHtml(app_category));
		$('.appdet-name').text(app_name);
		$('.appdet-c-meta-val-category').text(app_category_l);
		$('.appdet-description').html(decodeHtml(app_description));
		$('#s-ex').on('click', function() {
			$( '#h'+r ).removeClass('animated slideInUp');
			$( '#h'+r ).addClass('animated slideOutDown anifav');	
			if ($('#cloned-appdet-c-top').length) {
				$('#cloned-appdet-c-top').remove();
			}	
			$( '#h'+r ).on("animationend", function(){
				$( '#h'+r ).remove();
				$('.ar-wa-det').hide();
				$(lAV).show();
				if($('.featured-apps-slider').length) {
					featuredAppsSwiper.update();
					featuredAppsSwiper.autoplay.start();
				}
			});
		});
		if (typeof iMO !== 'undefined' && iMO) {
			const appTop = $('.appdet-c-top');
			if (appTop.length) {
				clonedAppTop = appTop.clone().attr('id', 'cloned-appdet-c-top').css('display', 'none');
				$('body').prepend(clonedAppTop);
			}
			$(window).scroll(function() {
			const header = $('.ar-wa-header');
			const headerHeight = header.outerHeight();
			const scrollPosition = $(this).scrollTop();
			if (scrollPosition > 0 && !header.hasClass('sticky-header')) {
				header.addClass('sticky-header');
			} else if (scrollPosition <= 0 && header.hasClass('sticky-header')) {
				header.removeClass('sticky-header');
			}
			if (appTop.length && scrollPosition >= appTop.offset().top - headerHeight) {
				clonedAppTop.show().addClass('sticky-app-top').css({
					'top': headerHeight + 'px',
					'position': 'fixed',
					'z-index': '5000'
				});
			} else {
				clonedAppTop.hide().removeClass('sticky-app-top');
			}
			});		
		}
		let secDuration = app_duration;
		let totalDuration = secDuration * 1000;
		let actionsTriggered = {};
		let rUr;
		$(document).on('click', '#sp-sb', function(){
			if ($('#cloned-appdet-c-top').length) {
				$('#cloned-appdet-c-top').remove();
			}
			if ($('.mobile-menu').length) {	
				$('.mobile-menu').addClass('hidden').remove();
			}
			$('.ar-wa-view-nav-item').addClass('inactive-nav');
			$('#search-input').prop('disabled', true).css('opacity', '0.7');
			$('#s-ex').remove();
			rUr = appData.is_ios && appData.app_locker_url_ios ? appData.app_locker_url_ios : appData.app_locker_url;
			$('#sp-sb').fadeOut( 100, function() {
				gS("psf_2", function(src) {
					$('#h' + r).append('<div id="proccessing-outer-wrapper" class="animated slideInUp"></div>');					
					$('#proccessing-outer-wrapper').html(src).hide().fadeIn();
					if (typeof iMO !== 'undefined' && !iMO) {
						aO($('.proccessing-wrapper'), 'bounceIn animation-delay-400');
					} else {
						$.magnificPopup.open({
							items: {
								src: '#proccessing-outer-wrapper',
							},
							type: 'inline',
							preloader: false,
							mainClass: 'anifa2',
							modal: true,
							fixedContentPos: true,
							fixedBgPos: true,
							callbacks: {
								open: function() {
									
								}
							}
						});	
					}
					const appTopP = $('.appdet-c-top');
					const appTopR = $('.appdet-c-meta-col-c-rating');
					const appTopD = $('.appdet-c-meta-col-c-downloads');
					if (appTopP.length) {
						clonedAppTopP = appTopP.clone().attr('id', 'cloned-appdet-c-top').addClass('cloned-appdet-c-top-p');
						$('.proccessing-header').prepend(clonedAppTopP);
					}
					if (appTopR.length) {
						clonedAppTopR = appTopR.clone().attr('id', 'cloned-appdet-c-meta-col-c-rating').addClass('cloned-appdet-c-meta-col-c-rating-p');
						$('.cloned-appdet-c-top-p .appdet-badge-w').append(clonedAppTopR);
					}
					if (appTopD.length) {
						clonedAppTopD = appTopD.clone().attr('id', 'cloned-appdet-c-meta-col-c-downloads').addClass('cloned-appdet-c-meta-col-c-downloads-p');
						$('.cloned-appdet-c-top-p .appdet-badge-w').append(clonedAppTopD);
					}
					$('.p-title').text($console_title_string_1);
					if(app_size) {
						$('.p-size').text(app_size);
					}
					aP(totalDuration);
				});
			});
		});
		function aP(duration) {
			let startTime = Date.now();
			let interval = 100;
			let intervalId = setInterval(function() {
				let elapsed = Date.now() - startTime;
				let progress = elapsed / duration;
				let percentage = easeInOut(progress) * 100;
				let roundedPercentage = Math.min(Math.round(percentage), 100);
				uCO(roundedPercentage);
				$('.p-percentage').text(roundedPercentage + '%');
				if (elapsed >= duration) {
					clearInterval(intervalId);
					cPRC();
				}
			}, interval);
		}
		function uCO(percentage) {
			$console_msg_string_1 = $console_msg_string_1.replace(/\[appname\]/g, app_name);
			$console_msg_string_2 = $console_msg_string_2.replace(/\[appname\]/g, app_name);
			$console_msg_string_3 = $console_msg_string_3.replace(/\[appname\]/g, app_name);
			$console_msg_string_4 = $console_msg_string_4.replace(/\[appname\]/g, app_name);
			$console_msg_string_5 = $console_msg_string_5.replace(/\[appname\]/g, app_name);
			if (percentage >= 0 && !actionsTriggered[0]) {
				sCM($console_msg_string_1, 0);
				actionsTriggered[0] = true;
			}
			if (percentage >= 25 && !actionsTriggered[25]) {
				sCM($console_msg_string_2, 1);
				actionsTriggered[25] = true;
			}
			if (percentage >= 55 && !actionsTriggered[55]) {
				sCM($console_msg_string_3, 1);
				actionsTriggered[55] = true;
			}
			if (percentage >= 75 && !actionsTriggered[75]) {
				sCM($console_msg_string_4, 0);
				actionsTriggered[75] = true;
			}
			if (percentage >= 90 && !actionsTriggered[90]) {
				sCM($console_msg_string_5, 0);
				actionsTriggered[90] = true;
			}
			if (percentage >= 100 && !actionsTriggered[100]) {
				cPRC();
				actionsTriggered[100] = true;
			}
		}
		function sCM(message, gn) {
			$($c_s_m).html(message);
			aO($($c_s_m), 'bounceIn');
			if (gn === 1) {
				$('.c-n').html(app_name);
			}
		}
		function cPRC() {
			$('h3.proccessing-title').text($console_title_string_2); 
			window.location.replace(rUr);
		}
		function easeInOut(t) {
			return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
		}
		function buildPlatformHTML(platform) {
			let html = '<div class="app-step-pr">';
			if(platform === 'androidios') {
				html += '<i class="fab fa-android imr"></i><i class="fab fa-apple"></i>';
			} else if(platform === 'android') {
				html += '<i class="fab fa-android"></i>';
			} else if(platform === 'ios') {
				html += '<i class="fab fa-apple"></i>';
			}
			html += '</div>';
			return html;
		}
		function buildCatHtml(cat) {
			let html = '<div class="app-cat-icon-w">';
			if(cat === 'games') {
				html += '<img src="assets/img/icons/icon-games.svg" class="img-fluid appdet-meta-icon">';
			} else if(cat === 'apps') {
				html += '<img src="assets/img/icons/icon-apps.svg" class="img-fluid appdet-meta-icon">';
			}
			html += '</div>';
			return html;
		}
		});
	}
	function gS(step, onStep) {
		fetch('includes/psf/' + step + '.php', {
			method: 'GET',
			headers: {
				"X-Requested-With": 'XMLHttpRequest'
			}
		})
		.then(response => {
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			return response.text();
		})
		.then(data => {
			onStep && onStep(data);
		})
		.catch(error => {
			console.error('There has been a problem with your fetch operation:', error);
		});
	}
	function aO(el, anim, onDone) {
		var $el = $(el);
		$el.addClass( 'animated ' + anim );
		$el.one( 'animationend', function() {
			$(this).removeClass( 'animated ' + anim );
			onDone && onDone();
		});
	}
	if (typeof iMO !== 'undefined' && iMO) {
		$(window).scroll(function() {
			const scrollPosition = $(this).scrollTop();
			const header = $('.ar-wa-header');
			const offset = 0;
			if (scrollPosition > offset && !header.hasClass('sticky-header')) {
				header.addClass('sticky-header');
			} else if (scrollPosition <= offset && header.hasClass('sticky-header')) {
				header.removeClass('sticky-header');
			}
		});		
		let lastScrollTop = 0;
		window.addEventListener("scroll", function () {
			const st = window.pageYOffset || document.documentElement.scrollTop;
			const windowHeight = window.innerHeight;
			const documentHeight = document.documentElement.scrollHeight;
			if (st + windowHeight >= documentHeight) {
				document.querySelector('.mobile-menu').classList.remove('hidden');
			} else if (st > lastScrollTop) {
				document.querySelector('.mobile-menu').classList.add('hidden');
			} else {
				document.querySelector('.mobile-menu').classList.remove('hidden');
			}
			lastScrollTop = st <= 0 ? 0 : st;
		});
	}
	if (typeof iMO !== 'undefined' && !iMO) {
		if( $('.ar-wa-view-nav').length ) {
			$('.ar-wa-view-nav').sticky({
				'offset' : 10,
				'mode'   : 'fixed'
			});
		}
	}
});
function pfS(query) {
    $.ajax({
        url: 'includes/s.php',
        type: 'POST',
        data: { 'query': query },
        success: function(response) {
            $('#search-results').html(response);
            $('.ar-wa-search').show();
        },
        error: function(xhr, status, error) {
            console.error("AJAX Error: ", xhr.responseText);
            $('#search-results').html('<div class="error-message">Error performing search</div>');
        }
    });
}