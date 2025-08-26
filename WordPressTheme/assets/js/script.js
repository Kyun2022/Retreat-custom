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
    var scroll = $(window).scrollTop(); //スクロール値を取得
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

    var wH = window.innerHeight; //画面の高さを取得
    var footerPos = $('#footer').offset().top; //footerの位置を取得
    if (scroll + wH >= footerPos + 10) {
      var pos = scroll + wH - footerPos + 10; //スクロールの値＋画面の高さからfooterの位置＋10pxを引いた場所を取得し
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
    $('body,html').animate({
      scrollTop: 0 //ページトップまでスクロール
    }, 500); //ページトップスクロールの速さ。数字が大きいほど遅くなる
    return false; //リンク自体の無効化
  });

  // スクロールするとロゴの色変更
  $(function () {
    $(window).on('scroll', function () {
      var sliderHeight = $('.mv').height();
      if (sliderHeight - 30 < $(this).scrollTop()) {
        $('.js-header').addClass('headerColorScroll');
      } else {
        $('.js-header').removeClass('headerColorScroll');
      }
    });
  });
  $(function () {
    // 別ページの場合は以下
    var urlHash = location.hash;
    if (urlHash) {
      $('body,html').stop().scrollTop(0);
      setTimeout(function () {
        // ヘッダー固定の場合はヘッダーの高さを数値で入れる、固定でない場合は0
        var headerHight = 130;
        var target = $(urlHash);
        var position = target.offset().top - headerHight;
        $('body,html').stop().animate({
          scrollTop: position
        }, 400);
      }, 100);
    }
  });

  // ページ内スクロール
  $('a[href^="#"]').click(function () {
    var speed = 600;
    var href = $(this).attr('href');
    var target = $(href == '#' || href == '' ? 'html' : href);
    var position = target.offset().top;
    $('body,html').animate({
      scrollTop: position
    }, speed, 'swing');
    return false;
  });

  /* --------------------------------------------
   /* ローディングアニメーション
   /* -------------------------------------------- */
  window.addEventListener('load', function () {
    // トップページの判定を緩和（WordPressの場合、様々なパスパターンがあるため）
    if (window.location.pathname === '/' || document.body.classList.contains('home') || document.body.classList.contains('front-page')) {
      var hasLoadedBefore = localStorage.getItem('hasLoadedBefore');
      var mainContent = document.querySelector('.l-main, main, [role="main"], .main-content, #main');

      // メインコンテンツが存在する場合のみ初期設定を行う
      if (mainContent) {
        // GSAPが読み込まれているか確認
        if (typeof gsap !== 'undefined') {
          // 初期状態でメインコンテンツを非表示に
          gsap.set(mainContent, {
            autoAlpha: 0
          });
        }
        if (!hasLoadedBefore) {
          window.scrollTo(0, 0);
          document.body.classList.add('no-scroll');
          var loadingElement = document.querySelector('.loading');
          if (loadingElement) {
            loadingElement.style.display = 'block';
            loadingElement.classList.add('loading--active');

            // タイムラインの設定
            var openingTL = gsap.timeline({
              defaults: {
                ease: 'power4.out'
              },
              onComplete: function onComplete() {
                document.body.classList.add('loading--completed');
                // サイト全体で一度だけローディングを表示するためのフラグを設定
                localStorage.setItem('hasLoadedBefore', 'true');

                // ローディング要素のフェードアウトとメインコンテンツのフェードイン
                var finalTL = gsap.timeline({
                  onComplete: function onComplete() {
                    loadingElement.classList.remove('loading--active');
                    loadingElement.style.display = 'none';
                    document.body.classList.remove('no-scroll');
                  }
                });
                finalTL.to(loadingElement, {
                  autoAlpha: 0,
                  duration: 0.5
                }).fromTo(mainContent, {
                  autoAlpha: 0,
                  y: 20
                }, {
                  autoAlpha: 1,
                  y: 0,
                  duration: 1,
                  ease: 'power2.out'
                }, '-=0.3');
              }
            });

            // 初期状態の設定
            var titleText = loadingElement.querySelector('.loading__title-text');
            var titleSubtext = loadingElement.querySelector('.loading__title-subtext');
            var loadingTitle = loadingElement.querySelector('.loading__title');
            var loadingOverlay = loadingElement.querySelector('.opening__mask');

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
              openingTL.fromTo(loadingOverlay, {
                opacity: 0
              }, {
                opacity: 1,
                duration: 1.8,
                ease: 'power2.out'
              }).fromTo(titleText, {
                y: 50,
                autoAlpha: 0
              }, {
                y: 0,
                autoAlpha: 1,
                duration: 1.2,
                ease: 'back.out(1.7)'
              }).fromTo(titleSubtext, {
                y: 30,
                autoAlpha: 0
              }, {
                y: 0,
                autoAlpha: 1,
                duration: 1,
                ease: 'back.out(1.7)'
              }, '-=0.8').to(loadingTitle, {
                clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
                duration: 1.5,
                ease: 'power4.inOut'
              }).to(loadingOverlay, {
                yPercent: -100,
                duration: 1.2,
                ease: 'power2.inOut'
              }, '-=0.5');
            }
          }
        } else {
          // 2回目以降の訪問ではローディングをスキップしてメインコンテンツを表示
          var _loadingElement = document.querySelector('.loading');
          if (_loadingElement) {
            _loadingElement.style.display = 'none';
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
  var swiper = new Swiper('.js-mv-slider', {
    loop: true,
    allowTouchMove: false,
    effect: 'fade',
    speed: 3000,
    autoplay: {
      delay: 3000
    }
  });

  /* --------------------------------------------
   /* Swiper-card
   /* -------------------------------------------- */
  var mySwiperWrapper = document.querySelector('.swiper-wrapper');
  var horizonSlider = new Swiper('.js-campaign-slider', {
    loop: true,
    effect: 'slide',
    disableOnInteraction: false,
    // 矢印をクリックしても自動再生を止めない
    slidesPerView: 1.26,
    breakpoints: {
      768: {
        slidesPerView: 3.29,
        spaceBetween: 30
      },
      1024: {
        slidesPerView: 3.49,
        spaceBetween: 40
      }
    },
    spaceBetween: 24,
    speed: 2000,
    autoplay: {
      delay: 1000
    },
    // 前後の矢印
    navigation: {
      prevEl: '.slider__prevButton',
      nextEl: '.slider__nextButton'
    }
  });

  /* --------------------------------------------
   /* 背景色アニメーション
   /* -------------------------------------------- */
  // 要素の取得とスピードの設定
  var box = $('.js-slideColor'),
    speed = 600;

  //.js-slideColorの付いた全ての要素に対して下記の処理を行う
  box.each(function () {
    $(this).append('<div class="is-view"></div>');
    var color = $(this).find($('.is-view')),
      image = $(this).find('img');
    var counter = 0;
    image.css('opacity', '0');
    color.css('width', '0%');
    //inviewを使って背景色が画面に現れたら処理をする
    color.on('inview', function () {
      if (counter === 0) {
        $(this).delay(300).animate({
          width: '100%'
        }, speed, function () {
          image.css('opacity', '1');
          $(this).css({
            left: '0',
            right: 'auto'
          });
          $(this).animate({
            width: '0%'
          }, speed);
        });
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
    disableScroll: true
  });

  /* --------------------------------------------
   /* タブメニュー
   /* -------------------------------------------- */
  var $js_tab = $('.js-infoTab-trigger');
  var $js_tab_target = $('.js-infoContent-target');
  var cls = 'is-active';
  $js_tab.on('click', function () {
    var this_category = $(this).data('category');
    $js_tab.removeClass(cls);
    $(this).addClass(cls);
    $js_tab_target.removeClass(cls);
    $js_tab_target.each(function () {
      var target_data = $(this).data('target');
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
    var hash = location.hash;
    hash = (hash.match(/^#tab_panel-\d+$/) || [])[0];
    //リンクにハッシュが入っていればtabNameに格納
    var tabName;
    if ($(hash).length) {
      tabName = hash.slice(1);
    } else {
      tabName = 'tab_panel-1';
    }
    //コンテンツ非表示・タブを非アクティブ
    $('.js-infoTab-trigger').removeClass('is-active');
    $('.js-infoContent-target').removeClass('is-active');
    //何番目のタブかを格納
    var tabNo = $('.js-infoContent-target#' + tabName).index();
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
      var $subItems = $(this).next('.js-subItems--close');
      $subItems.slideToggle(300);
      $(this).toggleClass('is-open');
    });
  });

  /* --------------------------------------------
   /* FAQ アコーディオン
   /* -------------------------------------------- */
  $(function () {
    // 初期化：最初のFAQ以外をすべて隠す
    $('.js-faqAccordion-title').each(function (index) {
      var $answer = $(this).next();
      if (index === 0) {
        // 最初の項目は開いた状態で表示
        $(this).addClass('open');
        $answer.show();
      } else {
        // それ以外は隠す
        $(this).removeClass('open');
        $answer.hide();
      }
    });

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
  // 水平スクロール初期化（referenceコードベース）
  // ◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️

  // ◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️
  // 既存のsection スクロールトリガー（.sectionクラス用）
  // ◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️◾️
  var sections = document.querySelectorAll('.section');
  sections.forEach(function (section) {
    var pin = section.querySelector('.section__pin');
    if (pin) {
      // .section__pinが存在する場合のみ実行
      var height = section.getBoundingClientRect().height;
      gsap.set(pin, {
        height: height
      });
      ScrollTrigger.create({
        trigger: section,
        start: 'bottom bottom',
        markers: false,
        // 水平スクロールのマーカーと重複しないよう非表示
        onEnter: function onEnter() {
          gsap.set(pin, {
            position: 'fixed',
            top: 'auto',
            bottom: 0,
            left: 0
          });
        },
        onLeaveBack: function onLeaveBack() {
          gsap.set(pin, {
            position: 'absolute',
            top: 0,
            bottom: 'auto',
            left: 0
          });
        }
      });
    }
  });

  /* --------------------------------------------
   /* GSAPアニメーション
   /* -------------------------------------------- */
  function initGSAPAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      console.log('GSAP or ScrollTrigger not loaded');
      return;
    }
    gsap.registerPlugin(ScrollTrigger);

    // タイトルテキストのタイプライターアニメーション
    var titleTexts = document.querySelectorAll('.title__text, .title__sub-text');
    titleTexts.forEach(function (titleText) {
      var originalText = titleText.textContent;
      var isContactTitle = titleText.closest('.contact');

      // Contactセクションかどうかでアニメーションを分ける
      if (isContactTitle) {
        // Contactセクションは元のタイプライター効果
        ScrollTrigger.create({
          trigger: titleText,
          start: 'top 85%',
          end: 'bottom 15%',
          once: false,
          onEnter: function onEnter() {
            typewriterScrollAnimationWithCursor(titleText, originalText, 0.05);
          },
          onLeave: function onLeave() {
            gsap.to(titleText, {
              autoAlpha: 0,
              duration: 0.4
            });
          },
          onEnterBack: function onEnterBack() {
            typewriterScrollAnimationWithCursor(titleText, originalText, 0.03);
          },
          onLeaveBack: function onLeaveBack() {
            gsap.to(titleText, {
              autoAlpha: 0,
              duration: 0.4
            });
          }
        });
      } else {
        // 他のセクションは左から右への表示
        ScrollTrigger.create({
          trigger: titleText,
          start: 'top 85%',
          end: 'bottom 15%',
          once: false,
          onEnter: function onEnter() {
            typewriterScrollAnimation(titleText, originalText, 0.05);
          },
          onLeave: function onLeave() {
            titleText.style.borderRight = 'none';
            titleText.style.paddingRight = '0';
            titleText.style.border = 'none';
            gsap.to(titleText, {
              autoAlpha: 0,
              duration: 0.4
            });
          },
          onEnterBack: function onEnterBack() {
            typewriterScrollAnimation(titleText, originalText, 0.03);
          },
          onLeaveBack: function onLeaveBack() {
            titleText.style.borderRight = 'none';
            titleText.style.paddingRight = '0';
            titleText.style.border = 'none';
            gsap.to(titleText, {
              autoAlpha: 0,
              duration: 0.4
            });
          }
        });
      }
    });
  }

  /* --------------------------------------------
   /* コンテンツアニメーション（ふわっと表示）
   /* -------------------------------------------- */
  function initContentAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      console.log('GSAP or ScrollTrigger not loaded for content animations');
      return;
    }
    console.log('Content animations initializing...');

    // About us セクション - ふわっとフェードイン
    var aboutUsSection = document.querySelector('.aboutUs');
    console.log('aboutUsSection found:', aboutUsSection);
    if (aboutUsSection) {
      gsap.set(aboutUsSection, {
        opacity: 0,
        y: 20
      });
      ScrollTrigger.create({
        trigger: aboutUsSection,
        start: 'top 85%',
        onEnter: function onEnter() {
          gsap.to(aboutUsSection, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out'
          });
        }
      });
    }

    // Information セクション - ふわっとフェードイン
    var informationSection = document.querySelector('.information');
    if (informationSection) {
      gsap.set(informationSection, {
        opacity: 0,
        y: 20
      });
      ScrollTrigger.create({
        trigger: informationSection,
        start: 'top 85%',
        onEnter: function onEnter() {
          gsap.to(informationSection, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out'
          });
        }
      });
    }

    // Blog セクション - ふわっとフェードイン
    var blogSection = document.querySelector('.blog');
    if (blogSection) {
      gsap.set(blogSection, {
        opacity: 0,
        y: 20
      });
      ScrollTrigger.create({
        trigger: blogSection,
        start: 'top 85%',
        onEnter: function onEnter() {
          gsap.to(blogSection, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out'
          });
        }
      });
    }

    // Voice セクション - ふわっとフェードイン
    var voiceSection = document.querySelector('.voice');
    if (voiceSection) {
      gsap.set(voiceSection, {
        opacity: 0,
        y: 20
      });
      ScrollTrigger.create({
        trigger: voiceSection,
        start: 'top 85%',
        onEnter: function onEnter() {
          gsap.to(voiceSection, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out'
          });
        }
      });
    }

    // Price セクション - ふわっとフェードイン
    var priceSection = document.querySelector('.price');
    if (priceSection) {
      gsap.set(priceSection, {
        opacity: 0,
        y: 20
      });
      ScrollTrigger.create({
        trigger: priceSection,
        start: 'top 85%',
        onEnter: function onEnter() {
          gsap.to(priceSection, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out'
          });
        }
      });
    }

    // Contact セクション - ふわっとフェードイン
    var contactSection = document.querySelector('.contact');
    if (contactSection) {
      gsap.set(contactSection, {
        opacity: 0,
        y: 20
      });
      ScrollTrigger.create({
        trigger: contactSection,
        start: 'top 85%',
        onEnter: function onEnter() {
          gsap.to(contactSection, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out'
          });
        }
      });
    }

    // カード要素のスタガーアニメーション
    var cardContainers = [{
      selector: '.blog__cards',
      cardSelector: '.blog-cards__item'
    }, {
      selector: '.voice__cards',
      cardSelector: '.voice-cards__item'
    }, {
      selector: '.price__contents',
      cardSelector: '.price__content'
    }];
    cardContainers.forEach(function (_ref) {
      var selector = _ref.selector,
        cardSelector = _ref.cardSelector;
      var container = document.querySelector(selector);
      if (container) {
        var cards = container.querySelectorAll(cardSelector);
        console.log("Found ".concat(cards.length, " cards in ").concat(selector));
        if (cards.length > 0) {
          // カードを初期状態に設定
          gsap.set(cards, {
            opacity: 0,
            y: 30,
            x: -20
          });
          ScrollTrigger.create({
            trigger: container,
            start: 'top 85%',
            onEnter: function onEnter() {
              console.log("Animating cards in ".concat(selector));
              gsap.to(cards, {
                opacity: 1,
                y: 0,
                x: 0,
                duration: 0.8,
                ease: 'power2.out',
                stagger: 0.15 // 左から右へ順番に0.15秒ずつ遅れて表示
              });
            }
          });
        }
      }
    });

    // 汎用 - ふわっとフェードイン（.fade-in クラス）
    var fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(function (element) {
      // 既存のスタイルをクリア
      element.style.border = 'none';
      element.style.borderRight = 'none';
      element.style.paddingRight = '0';
      gsap.set(element, {
        opacity: 0,
        y: 15
      });
      ScrollTrigger.create({
        trigger: element,
        start: 'top 90%',
        onEnter: function onEnter() {
          gsap.to(element, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out'
          });
        },
        onLeave: function onLeave() {
          // 完全にクリーンアップ
          element.style.border = 'none';
          element.style.borderRight = 'none';
          element.style.paddingRight = '0';
        }
      });
    });

    // 下層ページアニメーション初期化
    initSubpageAnimations();

    // カードホバーアニメーション強化
    initCardHoverAnimations();
  }

  /* --------------------------------------------
   /* 下層ページアニメーション
   /* -------------------------------------------- */
  function initSubpageAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      return;
    }

    // フロントページでは実行しない
    if (document.body.classList.contains('home') || document.body.classList.contains('front-page')) {
      return;
    }
    console.log('Subpage animations initializing...');

    // 1. ヒーローセクション - 上からスライドイン
    var heroSections = document.querySelectorAll('.hero, .sub-aboutUs, .sub-fv');
    heroSections.forEach(function (hero) {
      var heroContent = hero.querySelector('.hero__content, .sub-aboutUs__content, .sub-fv__content');
      if (heroContent) {
        gsap.set(heroContent, {
          opacity: 0,
          y: -50
        });
        gsap.to(heroContent, {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power2.out',
          delay: 0.5
        });
      }
    });

    // 2. メインコンテンツ - 左右交互スライドイン
    var contentSections = document.querySelectorAll('.about-us__content, .gallery__content, .information__content, .blog__content, .voice__content, .price__content, .faq__content, .contact__content, .sub-voice, .sub-price, .sub-campaign');
    contentSections.forEach(function (section, index) {
      var isEven = index % 2 === 0;
      gsap.set(section, {
        opacity: 0,
        x: isEven ? -50 : 50,
        y: 20
      });
      ScrollTrigger.create({
        trigger: section,
        start: 'top 85%',
        onEnter: function onEnter() {
          gsap.to(section, {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 1,
            ease: 'power2.out'
          });
        }
      });
    });

    // 3. ギャラリー画像 - スケールフェード + ステッガー
    var galleryImages = document.querySelectorAll('.gallery__image, .gallery-modal__image');
    if (galleryImages.length > 0) {
      gsap.set(galleryImages, {
        opacity: 0,
        scale: 0.8
      });
      ScrollTrigger.create({
        trigger: '.gallery',
        start: 'top 80%',
        onEnter: function onEnter() {
          gsap.to(galleryImages, {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: 'back.out(1.7)',
            stagger: 0.1
          });
        }
      });
    }

    // 4. FAQアコーディオン - 順次フェードイン
    var faqItems = document.querySelectorAll('.faq__item, .js-faqAccordion-title');
    if (faqItems.length > 0) {
      gsap.set(faqItems, {
        opacity: 0,
        y: 20
      });
      ScrollTrigger.create({
        trigger: '.faq',
        start: 'top 85%',
        onEnter: function onEnter() {
          gsap.to(faqItems, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            stagger: 0.1
          });
        }
      });
    }

    // 5. Voiceページのボックス - スタガーアニメーション
    var voiceBoxes = document.querySelectorAll('.sub-voice .box');
    if (voiceBoxes.length > 0) {
      gsap.set(voiceBoxes, {
        opacity: 0,
        y: 30,
        x: -20
      });
      ScrollTrigger.create({
        trigger: '.sub-voice .boxes',
        start: 'top 85%',
        onEnter: function onEnter() {
          gsap.to(voiceBoxes, {
            opacity: 1,
            y: 0,
            x: 0,
            duration: 0.8,
            ease: 'power2.out',
            stagger: 0.15
          });
        }
      });
    }

    // 6. Priceページのボックス - スタガーアニメーション
    var priceBoxes = document.querySelectorAll('.sub-price .priceBox__container');
    if (priceBoxes.length > 0) {
      gsap.set(priceBoxes, {
        opacity: 0,
        y: 30,
        x: -20
      });
      ScrollTrigger.create({
        trigger: '.sub-price .priceBox',
        start: 'top 85%',
        onEnter: function onEnter() {
          gsap.to(priceBoxes, {
            opacity: 1,
            y: 0,
            x: 0,
            duration: 0.8,
            ease: 'power2.out',
            stagger: 0.2
          });
        }
      });
    }

    // 7. Campaignページのスライダーアイテム - スタガーアニメーション
    var campaignItems = document.querySelectorAll('.sub-campaign .slider__item');
    if (campaignItems.length > 0) {
      gsap.set(campaignItems, {
        opacity: 0,
        y: 30,
        x: -20
      });
      ScrollTrigger.create({
        trigger: '.sub-campaign .slider',
        start: 'top 85%',
        onEnter: function onEnter() {
          gsap.to(campaignItems, {
            opacity: 1,
            y: 0,
            x: 0,
            duration: 0.8,
            ease: 'power2.out',
            stagger: 0.15
          });
        }
      });
    }

    // 8. コンタクトフォーム - フェードイン
    var contactForm = document.querySelector('.contact__form, .wpcf7-form');
    if (contactForm) {
      gsap.set(contactForm, {
        opacity: 0,
        y: 30
      });
      ScrollTrigger.create({
        trigger: contactForm,
        start: 'top 85%',
        onEnter: function onEnter() {
          gsap.to(contactForm, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out'
          });
        }
      });
    }

    // 6. アーカイブページ - カード類
    var archiveCards = document.querySelectorAll('.archive__item, .campaign__item, .voice__item, .blog__item');
    if (archiveCards.length > 0) {
      gsap.set(archiveCards, {
        opacity: 0,
        y: 30,
        x: -20
      });
      ScrollTrigger.create({
        trigger: '.archive, .campaign, .voice, .blog',
        start: 'top 85%',
        onEnter: function onEnter() {
          gsap.to(archiveCards, {
            opacity: 1,
            y: 0,
            x: 0,
            duration: 0.8,
            ease: 'power2.out',
            stagger: 0.15
          });
        }
      });
    }

    // 7. パンくずナビ - 左からスライドイン
    var breadcrumb = document.querySelector('.breadcrumb, .page-nav');
    if (breadcrumb) {
      gsap.set(breadcrumb, {
        opacity: 0,
        x: -30
      });
      gsap.to(breadcrumb, {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: 'power2.out',
        delay: 0.3
      });
    }

    // 8. ページネーション - フェードイン
    var pagination = document.querySelector('.pagination, .wp-pagenavi');
    if (pagination) {
      gsap.set(pagination, {
        opacity: 0,
        y: 20
      });
      ScrollTrigger.create({
        trigger: pagination,
        start: 'top 90%',
        onEnter: function onEnter() {
          gsap.to(pagination, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out'
          });
        }
      });
    }

    // 9. サイドバー - 右からスライドイン
    var sidebar = document.querySelector('.sidebar, .archive__sidebar');
    if (sidebar) {
      var sidebarItems = sidebar.querySelectorAll('.sidebar__item, .archive__item');
      gsap.set(sidebarItems, {
        opacity: 0,
        x: 30
      });
      ScrollTrigger.create({
        trigger: sidebar,
        start: 'top 85%',
        onEnter: function onEnter() {
          gsap.to(sidebarItems, {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power2.out',
            stagger: 0.1
          });
        }
      });
    }

    // 10. 汎用クラス対応
    var fadeUpElements = document.querySelectorAll('.fade-up');
    fadeUpElements.forEach(function (element) {
      gsap.set(element, {
        opacity: 0,
        y: 30
      });
      ScrollTrigger.create({
        trigger: element,
        start: 'top 90%',
        onEnter: function onEnter() {
          gsap.to(element, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out'
          });
        }
      });
    });
    var slideLeftElements = document.querySelectorAll('.slide-left');
    slideLeftElements.forEach(function (element) {
      gsap.set(element, {
        opacity: 0,
        x: -50
      });
      ScrollTrigger.create({
        trigger: element,
        start: 'top 90%',
        onEnter: function onEnter() {
          gsap.to(element, {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power2.out'
          });
        }
      });
    });
    var slideRightElements = document.querySelectorAll('.slide-right');
    slideRightElements.forEach(function (element) {
      gsap.set(element, {
        opacity: 0,
        x: 50
      });
      ScrollTrigger.create({
        trigger: element,
        start: 'top 90%',
        onEnter: function onEnter() {
          gsap.to(element, {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power2.out'
          });
        }
      });
    });
  }

  /* --------------------------------------------
   /* グローバルクリーンアップ
   /* -------------------------------------------- */
  function cleanupGSAPArtifacts() {
    // 全ての要素からタイプライターのスタイルを削除
    var allElements = document.querySelectorAll('*');
    allElements.forEach(function (element) {
      if (element.style.borderRight && element.style.borderRight.includes('solid')) {
        element.style.borderRight = 'none';
        element.style.paddingRight = '0';
        element.style.border = 'none';
      }
    });
  }

  // スクロール時にクリーンアップを実行
  var cleanupTimeout;
  window.addEventListener('scroll', function () {
    clearTimeout(cleanupTimeout);
    cleanupTimeout = setTimeout(cleanupGSAPArtifacts, 100);
  });

  // GSAP初期化を実行
  initGSAPAnimations();

  // コンテンツアニメーション初期化
  initContentAnimations();

  /* --------------------------------------------
   /* MVタイトルのタイプライター効果
   /* -------------------------------------------- */
  function initTypewriterEffect() {
    if (typeof gsap === 'undefined') {
      console.log('GSAP not loaded');
      return;
    }

    // MVタイトルのタイプライター効果
    var mvTitleText = document.querySelector('.mv__title-text');
    var mvSubtext = document.querySelector('.mv__title-subtext');
    if (mvTitleText && mvSubtext) {
      // 初期状態で完全に非表示にし、テキストもクリア
      gsap.set([mvTitleText, mvSubtext], {
        autoAlpha: 0
      });
      // テキストを事前にクリアして一瞬の表示を防ぐ
      mvTitleText.textContent = '';
      mvSubtext.textContent = '';

      // ローディング完了後に実行
      var startTypewriter = function startTypewriter() {
        // メインタイトルのタイプライター効果
        typewriterAnimation(mvTitleText, 'ADVENTURE', 0.1, function () {
          // メインタイトル完了後にサブテキスト開始
          gsap.to(mvSubtext, {
            autoAlpha: 1,
            duration: 0.3,
            onComplete: function onComplete() {
              typewriterAnimation(mvSubtext, 'splash into serenity', 0.08);
            }
          });
        });
      };

      // ローディング完了を待つ
      if (document.body.classList.contains('loading--completed') || !document.querySelector('.loading') || localStorage.getItem('hasLoadedBefore')) {
        // 既にローディング完了している場合はすぐに実行
        setTimeout(startTypewriter, 500);
      } else {
        // ローディング完了を監視
        var checkLoading = function checkLoading() {
          if (document.body.classList.contains('loading--completed')) {
            setTimeout(startTypewriter, 1000);
          } else {
            setTimeout(checkLoading, 100);
          }
        };
        checkLoading();
      }
    }
  }

  // スクロール用テキスト表示効果（左から右へ + 一文字ずつバウンド）
  function typewriterScrollAnimation(element, text) {
    var speed = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0.05;
    var callback = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    if (!element) return;

    // 完全にスタイルをクリア
    element.style.borderRight = 'none';
    element.style.paddingRight = '0';
    element.style.border = 'none';
    element.innerHTML = '';

    // テキストを一文字ずつspanで囲む
    for (var i = 0; i < text.length; i++) {
      var _char = text[i];
      var span = document.createElement('span');
      span.textContent = _char === ' ' ? "\xA0" : _char; // スペースを非改行スペースに
      span.style.display = 'inline-block';
      span.style.opacity = '0';
      span.style.transform = 'translateY(20px) scale(0.8)';

      // 最初の文字（英字の場合）を茶色に設定
      if (i === 0 && element.classList.contains('title__text') && /[a-zA-Z]/.test(_char)) {
        span.style.color = '#754e1a'; // brown color ($brown)
        span.style.textTransform = 'capitalize';
      }
      element.appendChild(span);
    }
    var chars = element.querySelectorAll('span');
    gsap.set(element, {
      autoAlpha: 1
    });

    // 一文字ずつ順番にバウンドしながら表示
    gsap.to(chars, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.6,
      ease: 'back.out(2.0)',
      // 強いバウンド効果
      stagger: speed * 2,
      // 文字間隔を調整
      onComplete: function onComplete() {
        if (callback) callback();
      }
    });
  }

  // Contact用タイプライター効果（カーソル付き）
  function typewriterScrollAnimationWithCursor(element, text) {
    var speed = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0.05;
    var callback = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    if (!element) return;

    // 既存のテキストをクリア
    element.textContent = '';
    gsap.set(element, {
      autoAlpha: 1
    });

    // カーソルのスタイルを追加（色は要素に応じて調整）
    var isSubText = element.classList.contains('title__sub-text');
    var cursorColor = isSubText ? '#408F95' : '#FFF280';
    element.style.borderRight = "2px solid ".concat(cursorColor);
    element.style.paddingRight = '2px';
    var currentIndex = 0;
    var typewriterInterval;
    var typeNextChar = function typeNextChar() {
      if (currentIndex < text.length) {
        var _char2 = text[currentIndex];
        if (_char2 === ' ') {
          element.innerHTML += '&nbsp;';
        } else {
          element.textContent += _char2;
        }
        currentIndex++;
        typewriterInterval = setTimeout(typeNextChar, speed * 1000);
      } else {
        // タイピング完了後、カーソルを2回点滅させてから削除
        var blinkCount = 0;
        var blinkInterval = setInterval(function () {
          if (element.style.borderRight === '2px solid transparent' || element.style.borderRight === 'transparent') {
            element.style.borderRight = "2px solid ".concat(cursorColor);
          } else {
            element.style.borderRight = '2px solid transparent';
          }
          blinkCount++;
          if (blinkCount >= 4) {
            // 2回点滅
            clearInterval(blinkInterval);
            // 完全にカーソルを削除
            element.style.borderRight = 'none';
            element.style.paddingRight = '0';
            element.style.border = 'none';
            if (callback) callback();
          }
        }, 200);
      }
    };

    // 既存のタイマーをクリア
    if (typewriterInterval) {
      clearTimeout(typewriterInterval);
    }
    typeNextChar();
  }

  // MV用タイプライター効果（カーソル付き）
  function typewriterAnimation(element, text) {
    var speed = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0.1;
    var callback = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    if (!element) return;

    // 既存のテキストをクリア
    element.textContent = '';
    element.style.opacity = '1';
    element.style.visibility = 'visible';

    // カーソルのスタイルを追加
    element.style.borderRight = '2px solid #ffffff';
    element.style.paddingRight = '2px';
    var currentIndex = 0;
    var typeNextChar = function typeNextChar() {
      if (currentIndex < text.length) {
        var _char3 = text[currentIndex];
        // スペースの場合は非改行スペース、&nbsp;の場合も処理
        if (_char3 === ' ') {
          element.innerHTML += '&nbsp;';
        } else if (text.substr(currentIndex, 6) === '&nbsp;') {
          element.innerHTML += '&nbsp;';
          currentIndex += 5; // &nbsp;の分をスキップ
        } else {
          element.textContent += _char3;
        }
        currentIndex++;
        setTimeout(typeNextChar, speed * 1000);
      } else {
        // タイピング完了後、カーソルを点滅させてから消す
        var blinkCount = 0;
        var blinkInterval = setInterval(function () {
          element.style.borderRight = element.style.borderRight === '2px solid transparent' ? '2px solid #ffffff' : '2px solid transparent';
          blinkCount++;
          if (blinkCount >= 6) {
            // 3回点滅
            clearInterval(blinkInterval);
            element.style.borderRight = 'none';
            element.style.paddingRight = '0';

            // コールバック関数があれば実行
            if (callback) callback();
          }
        }, 300);
      }
    };
    typeNextChar();
  }

  // MVタイプライター効果を初期化
  initTypewriterEffect();

  /* --------------------------------------------
   /* カードホバーアニメーション強化
   /* -------------------------------------------- */
  function initCardHoverAnimations() {
    if (typeof gsap === 'undefined') {
      console.log('GSAP not loaded for card animations');
      return;
    }
    var cards = document.querySelectorAll('.card');
    console.log("Found ".concat(cards.length, " cards for hover animation"));
    cards.forEach(function (card, index) {
      var cardImage = card.querySelector('.card__image img');
      var cardBody = card.querySelector('.card__body');
      console.log("Setting up hover for card ".concat(index + 1));

      // 初期状態を設定
      gsap.set(card, {
        y: 0,
        scale: 1
      });
      if (cardImage) {
        gsap.set(cardImage, {
          scale: 1
        });
      }

      // マウスエンター時
      card.addEventListener('mouseenter', function () {
        console.log("Hover enter on card ".concat(index + 1));
        gsap.to(card, {
          y: -12,
          scale: 1.03,
          duration: 0.3,
          ease: 'power2.out'
        });
        if (cardImage) {
          gsap.to(cardImage, {
            scale: 1.1,
            duration: 0.4,
            ease: 'power2.out'
          });
        }
        if (cardBody) {
          gsap.to(cardBody, {
            y: -4,
            duration: 0.3,
            ease: 'power2.out'
          });
        }
      });

      // マウスリーブ時
      card.addEventListener('mouseleave', function () {
        console.log("Hover leave on card ".concat(index + 1));
        gsap.to(card, {
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: 'power2.out'
        });
        if (cardImage) {
          gsap.to(cardImage, {
            scale: 1,
            duration: 0.4,
            ease: 'power2.out'
          });
        }
        if (cardBody) {
          gsap.to(cardBody, {
            y: 0,
            duration: 0.3,
            ease: 'power2.out'
          });
        }
      });
    });
  }

  /*/////////////  終了  ////////////////*/
});