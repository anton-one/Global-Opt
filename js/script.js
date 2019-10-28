$(function () {

	// Плавный скролл по якорной ссылки
	$('a[href^="#"]').click(function () {
		var target = $(this).attr('href');
		$('html, body').animate({
			scrollTop: $(target).offset().top
		}, 800);
		return false;
	});
	//

	// Слик слайдер
	$('.reviews-carousel').slick({
		speed: 1200,
		adaptiveHeight: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		prevArrow: '<button type="button" class="slick-prev"><img src="img/reviews/l.png"></button>',
		nextArrow: '<button type="button" class="slick-next"><img src="img/reviews/r.png"></button>',
		responsive: [{
			breakpoint: 992,
			settings: {
				dots: false,
				arrows: true
			}
		}]
	});
	//

	// Fixed Burger
	var burger = $("#nav-toggle"),
		introH = $("#advantages").innerHeight(),
		scrollOffset = $(window).scrollTop();

	checkScroll(scrollOffset);

	$(window).on("scroll", function () {
		scrollOffset = $(this).scrollTop();

		checkScroll(scrollOffset);
	});

	function checkScroll(scrollOffset) {
		if (scrollOffset >= introH) {
			burger.addClass("fixed");
		} else {
			burger.removeClass("fixed");
		}
	}
	//

	// OffCanvas Menu - Выезжающее меню
	var menuTrigger = $('#nav-toggle'),
		nav = $('#nav'),
		closeButton = nav.find('.nav__close'),
		siteBody = $('body'),
		mainContents = $('section, footer');

	// open-close menu by clicking on the menu icon (открыть-закрыть меню, нажав на значок меню)
	menuTrigger.on('click', function (e) {
		e.preventDefault();
		menuTrigger.toggleClass('active');
		siteBody.toggleClass('menu-is-open');
	});

	// close menu by clicking the close button (закрыть меню, нажав кнопку закрытия)
	closeButton.on('click', function (e) {
		e.preventDefault();
		menuTrigger.trigger('click');
	});

	// close menu clicking outside the menu itself (закрыть меню, щелкнув за пределами самого меню)
	siteBody.on('click', function (e) {
		if (!$(e.target).is('#nav, #nav-toggle, #nav-toggle span')) {
			menuTrigger.removeClass('active');
			siteBody.removeClass('menu-is-open');
		}
	});
	//




	/* Модальное окно */
	var popupsToggle = document.querySelectorAll('#open-popup'),
		popupClose = document.querySelectorAll('.close__modal');

	popupsToggle.forEach(function (item) {
		item.addEventListener('click', function () {
			var popupName = item.getAttribute('data-popup');
			document.getElementById(popupName).style.display = "block";
		});
	});

	popupClose.forEach(function (item) {
		item.addEventListener('click', function () {
			var popup = item.closest('.popup');
			popup.style.display = "none";
		});
	});
	window.onclick = function (e) {
		if (e.target.classList.contains('popup')) {
			e.target.style.display = "none";
		}
	};


	//Отправка с формы и смена модальных окон
	$('form').submit(function (e) {
		e.preventDefault();
		$.ajax({
			type: "POST",
			url: "mailer/smart.php",
			data: $(this).serialize()
		}).done(function () {
			$(this).find("input").val("");
			$('#popup1, #popup2').fadeOut();
			$('#popup3').fadeIn('slow');

			$('form').trigger('reset');
		});
		return false;
	});
	//











});