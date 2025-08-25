'use strict';

jQuery(function ($) {
	// この中であればWordpressでも「$」が使用可能になる

	/* --------------------------------------------
  /* ハンバーガーメニュー
  /* -------------------------------------------- */
	// ハンバーガー
	$('.js-hamburger').on('click', function () {
		if ($('.js-hamburger').hasClass('is-open')) {
			$('.js-drawerMenu').fadeOut();
			$(this).removeClass('is-open');
			$('body').removeClass('active');
		} else {
			$('.js-drawerMenu').fadeIn();
			$(this).addClass('is-open');
			$('body').addClass('active');
		}
	});

	/* --------------------------------------------
  /* スクロールした際の動きを関数でまとめる
  /* ------------------------------------------ */
	function PageTopAnime() {
		const scroll = $(window).scrollTop(); //スクロール値を取得
		if (scroll >= 200) {
			//200pxスクロールしたら
			$('#pageTop').removeClass('DownMove'); // DownMoveというクラス名を除去して
			$('#pageTop').addClass('UpMove'); // UpMoveというクラス名を追加して出現
		} else {
			//それ以外は
			if ($('#pageTop').hasClass('UpMove')) {
				//UpMoveというクラス名が既に付与されていたら
				$('#pageTop').removeClass('UpMove'); //  UpMoveというクラス名を除去し
				$('#pageTop').addClass('DownMove'); // DownMoveというクラス名を追加して非表示
			}
		}

		const wH = window.innerHeight; //画面の高さを取得
		const footerPos = $('#footer').offset().top; //footerの位置を取得
		if (scroll + wH >= footerPos + 10) {
			const pos = scroll + wH - footerPos + 10; //スクロールの値＋画面の高さからfooterの位置＋10pxを引いた場所を取得し
			$('#pageTop').css('bottom', pos); //#pageTopに上記の値をCSSのbottomに直接指定してフッター手前で止まるようにする
		} else {
			//それ以外は
			if ($('#pageTop').hasClass('UpMove')) {
				//UpMoveというクラス名がついていたら
				$('#pageTop').css('bottom', '10px'); // 下から10pxの位置にページリンクを指定
			}
		}
	}

	/* --------------------------------------------
  /* スクロール
  /* -------------------------------------------- */
	// 画面をスクロールをしたら動かしたい場合の記述
	$(window).on('scroll', function () {
		PageTopAnime(); /* スクロールした際の動きの関数を呼ぶ*/
	});

	// ページが読み込まれたらすぐに動かしたい場合の記述
	$(window).on('load', function () {
		PageTopAnime(); /* スクロールした際の動きの関数を呼ぶ*/
	});

	// #pageTopをクリックした際の設定
	$('#pageTop').click(function () {
		$('body,html').animate(
			{
				scrollTop: 0, //ページトップまでスクロール
			},
			500,
		); //ページトップスクロールの速さ。数字が大きいほど遅くなる
		return false; //リンク自体の無効化
	});

	// スクロールするとロゴの色変更
	$(function () {
		$(window).on('scroll', function () {
			const sliderHeight = $('.mv').height();
			if (sliderHeight - 30 < $(this).scrollTop()) {
				$('.js-header').addClass('headerColorScroll');
			} else {
				$('.js-header').removeClass('headerColorScroll');
			}
		});
	});
	$(function () {
		// 別ページの場合は以下
		const urlHash = location.hash;
		if (urlHash) {
			$('body,html').stop().scrollTop(0);
			setTimeout(function () {
				// ヘッダー固定の場合はヘッダーの高さを数値で入れる、固定でない場合は0
				const headerHight = 130;
				const target = $(urlHash);
				const position = target.offset().top - headerHight;
				$('body,html').stop().animate(
					{
						scrollTop: position,
					},
					400,
				);
			}, 100);
		}
	});

	// ページ内スクロール
	$('a[href^="#"]').click(function () {
		const speed = 600;
		const href = $(this).attr('href');
		const target = $(href == '#' || href == '' ? 'html' : href);
		const position = target.offset().top;
		$('body,html').animate(
			{
				scrollTop: position,
			},
			speed,
			'swing',
		);
		return false;
	});

	/* --------------------------------------------
  /* ローディングアニメーション
  /* -------------------------------------------- */
	window.addEventListener('load', () => {
		// トップページの判定を緩和（WordPressの場合、様々なパスパターンがあるため）
		if (window.location.pathname === '/' || document.body.classList.contains('home') || document.body.classList.contains('front-page')) {
			const hasLoadedBefore = localStorage.getItem('hasLoadedBefore');
			const mainContent = document.querySelector('.l-main, main, [role="main"], .main-content, #main');

			// メインコンテンツが存在する場合のみ初期設定を行う
			if (mainContent) {
				// 初期状態でメインコンテンツを非表示に
				gsap.set(mainContent, {
					autoAlpha: 0
				});

				if (!hasLoadedBefore) {
					window.scrollTo(0, 0);
					document.body.classList.add('no-scroll');
					const loadingElement = document.querySelector('.loading');

					if (loadingElement) {
						loadingElement.style.display = 'block';
						loadingElement.classList.add('loading--active');

						// タイムラインの設定
						const openingTL = gsap.timeline({
							defaults: { ease: 'power4.out' },
							onComplete: () => {
								document.body.classList.add('loading--completed');
								// サイト全体で一度だけローディングを表示するためのフラグを設定
								localStorage.setItem('hasLoadedBefore', 'true');

								// ローディング要素のフェードアウトとメインコンテンツのフェードイン
								const finalTL = gsap.timeline({
									onComplete: () => {
										loadingElement.classList.remove('loading--active');
										loadingElement.style.display = 'none';
										document.body.classList.remove('no-scroll');
									}
								});

								finalTL
									.to(loadingElement, {
										autoAlpha: 0,
										duration: 0.5
									})
									.fromTo(mainContent,
										{
											autoAlpha: 0,
											y: 20
										},
										{
											autoAlpha: 1,
											y: 0,
											duration: 1,
											ease: 'power2.out'
										},
										'-=0.3'
									);
							},
						});

						// 初期状態の設定
						const titleText = loadingElement.querySelector('.loading__title-text');
						const titleSubtext = loadingElement.querySelector('.loading__title-subtext');
						const loadingTitle = loadingElement.querySelector('.loading__title');
						const loadingOverlay = loadingElement.querySelector('.opening__mask');

						// 背景色とテキストカラーの設定
						if (loadingElement) {
							loadingElement.style.backgroundColor = '#408F95';
						}
						if (loadingOverlay) {
							loadingOverlay.style.backgroundColor = '#408F95';
						}
						if (titleText) {
							titleText.style.color = '#ffffff';
						}
						if (titleSubtext) {
							titleSubtext.style.color = '#ffffff';
						}

						if (titleText && titleSubtext) {
							gsap.set([titleText, titleSubtext], {
								y: 50,
								autoAlpha: 0
							});
						}

						if (loadingTitle) {
							gsap.set(loadingTitle, {
								clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
							});
						}

						// アニメーションの実行
						if (loadingOverlay) {
							openingTL
								.fromTo(loadingOverlay,
									{
										opacity: 0,
										scale: 1.2
									},
									{
										opacity: 1,
										scale: 1,
										duration: 1.8,
										ease: 'power2.out'
									}
								)
								.fromTo(titleText,
									{
										y: 50,
										autoAlpha: 0
									},
									{
										y: 0,
										autoAlpha: 1,
										duration: 1.2,
										ease: 'back.out(1.7)'
									}
								)
								.fromTo(titleSubtext,
									{
										y: 30,
										autoAlpha: 0
									},
									{
										y: 0,
										autoAlpha: 1,
										duration: 1,
										ease: 'back.out(1.7)'
									},
									'-=0.8'
								)
								.to(loadingTitle, {
									clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
									duration: 1.5,
									ease: 'power4.inOut'
								})
								.to(loadingOverlay, {
									yPercent: -100,
									duration: 1.2,
									ease: 'power2.inOut'
								}, '-=0.5');
						}
					}
				} else {
					// 2回目以降の訪問ではローディングをスキップしてメインコンテンツを表示
					const loadingElement = document.querySelector('.loading');
					if (loadingElement) {
						loadingElement.style.display = 'none';
					}
					document.body.classList.remove('no-scroll');
					gsap.to(mainContent, {
						autoAlpha: 1,
						y: 0,
						duration: 1,
						ease: 'power2.out'
					});
				}
			}
		}
	});

	/* --------------------------------------------
  /* Swiper
  /* -------------------------------------------- */
	const swiper = new Swiper('.js-mv-slider', {
		loop: true,
		allowTouchMove: false,
		effect: 'fade',
		speed: 3000,
		autoplay: {
			delay: 3000,
		},
	});

	/* --------------------------------------------
  /* Swiper-card
  /* -------------------------------------------- */
	const mySwiperWrapper = document.querySelector('.swiper-wrapper');
	const horizonSlider = new Swiper('.js-campaign-slider', {
		loop: true,
		effect: 'slide',
		disableOnInteraction: false,
		// 矢印をクリックしても自動再生を止めない
		slidesPerView: 1.26,
		breakpoints: {
			768: {
				slidesPerView: 3.29,
				spaceBetween: 30,
			},
			1024: {
				slidesPerView: 3.49,
				spaceBetween: 40,
			},
		},
		spaceBetween: 24,
		speed: 2000,
		autoplay: {
			delay: 1000,
		},
		// 前後の矢印
		navigation: {
			prevEl: '.slider__prevButton',
			nextEl: '.slider__nextButton',
		},
	});

	/* --------------------------------------------
  /* 背景色アニメーション
  /* -------------------------------------------- */
	// 要素の取得とスピードの設定
	const box = $('.js-slideColor'),
		speed = 600;

	//.js-slideColorの付いた全ての要素に対して下記の処理を行う
	box.each(function () {
		$(this).append('<div class="is-view"></div>');
		const color = $(this).find($('.is-view')),
			image = $(this).find('img');
		let counter = 0;
		image.css('opacity', '0');
		color.css('width', '0%');
		//inviewを使って背景色が画面に現れたら処理をする
		color.on('inview', function () {
			if (counter === 0) {
				$(this)
					.delay(300)
					.animate(
						{
							width: '100%',
						},
						speed,
						function () {
							image.css('opacity', '1');
							$(this).css({
								left: '0',
								right: 'auto',
							});
							$(this).animate(
								{
									width: '0%',
								},
								speed,
							);
						},
					);
				counter = 1;
			}
		});
	});

	/* --------------------------------------------
  /* about us
  /* -------------------------------------------- */
	MicroModal.init({
		awaitCloseAnimation: true,
		awaitOpenAnimation: true,
		disableScroll: true,
	});

	/* --------------------------------------------
  /* タブメニュー
  /* -------------------------------------------- */
	const $js_tab = $('.js-infoTab-trigger');
	const $js_tab_target = $('.js-infoContent-target');
	const cls = 'is-active';
	$js_tab.on('click', function () {
		const this_category = $(this).data('category');
		$js_tab.removeClass(cls);
		$(this).addClass(cls);
		$js_tab_target.removeClass(cls);
		$js_tab_target.each(function () {
			const target_data = $(this).data('target');
			if (this_category === target_data) {
				$(this).addClass(cls);
			}
		});
	});

	/* --------------------------------------------
  /* タブへダイレクトリンクの実装
  /* -------------------------------------------- */
	$(function () {
		//リンクからハッシュを取得
		let hash = location.hash;
		hash = (hash.match(/^#tab_panel-\d+$/) || [])[0];
		//リンクにハッシュが入っていればtabNameに格納
		let tabName;
		if ($(hash).length) {
			tabName = hash.slice(1);
		} else {
			tabName = 'tab_panel-1';
		}
		//コンテンツ非表示・タブを非アクティブ
		$('.js-infoTab-trigger').removeClass('is-active');
		$('.js-infoContent-target').removeClass('is-active');
		//何番目のタブかを格納
		const tabNo = $('.js-infoContent-target#' + tabName).index();
		//コンテンツ表示
		$('.js-infoContent-target').eq(tabNo).addClass('is-active');
		//タブのアクティブ化
		$('.js-infoTab-trigger').eq(tabNo).addClass('is-active');
	});

	/* --------------------------------------------
  /* アーカイブ　月別リンク
  /* -------------------------------------------- */
	$(document).ready(function () {
		$('.js-archive-item--open').on('click', function (e) {
			e.preventDefault();
			const $subItems = $(this).next('.js-subItems--close');
			$subItems.slideToggle(300);
			$(this).toggleClass('is-open');
		});
	});

	/* --------------------------------------------
  /* FAQ アコーディオン
  /* -------------------------------------------- */
	$(function () {
		// タイトルをクリックすると
		$('.js-faqAccordion-title').on('click', function () {
			// クリックした次の要素を開閉
			$(this).next().slideToggle(300);
			// タイトルにopenクラスを付け外しして矢印の向きを変更
			$(this).toggleClass('open', 300);
		});
	});

	/* --------------------------------------------
  /* コンタクトページ　バリデーション
  /* -------------------------------------------- */
	//送信ボタンを押した時のみバリデーションメッセージ表示
	$('.form-submit').click(function () {
		$('.wpcf7-form-control-wrap').addClass('is-show');
		$('.js-errorMessage').addClass('is-show');
	});

	// ◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️
	// section スクロールトリガー
	// ◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️
	const sections = document.querySelectorAll('.section');
	sections.forEach((section) => {
		const pin = section.querySelector('.section__pin');
		const height = section.getBoundingClientRect().height;

		gsap.set(pin, {
			height: height,
		});

		ScrollTrigger.create({
			trigger: section,
			start: 'bottom bottom',
			// わかりやすいようにマーカーを表示。本番環境では削除してください！
			markers: true,
			onEnter: () => {
				gsap.set(pin, {
					position: 'fixed',
					top: 'auto',
					bottom: 0,
					left: 0,
				});
			},
			onLeaveBack: () => {
				gsap.set(pin, {
					position: 'absolute',
					top: 0,
					bottom: 'auto',
					left: 0,
				});
			},
		});
	});

	/*/////////////  終了  ////////////////*/
});
