<!DOCTYPE html>
<html lang="<?php language_attributes(); ?>">

<head>
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="format-detection" content="telephone=no">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <?php wp_head(); ?>
</head>

<!-- ローディング -->
<?php if (is_front_page()) : ?>

  <body class="<?php body_class(); ?>">
    <?php wp_body_open(); ?>
    <div class="loading ">
      <div class="loading__container">
        <span class="opening__mask"></span>
        <div class="loading__title ">
          <h2 class="loading__title-text">ADVENTURE</h2>
          <p class="loading__title-subtext">splash&nbsp;into&nbsp;serenity</p>
        </div>
      </div>
    </div>
  <?php endif; ?>


  <!-- ヘッダー -->
  <header class="header js-header">
    <div class="header__inner">
      <h1 class="header__logo">
        <a href="<?php echo esc_url(home_url('/')); ?>">
          <img src="<?php echo get_theme_file_uri(); ?>/assets/images/common/logo_1.webp" alt="retreatのロゴ">
        </a>
      </h1>
      <nav class="header__nav header__nav--md-none">
        <ul class="header__items">
          <li class="header__item">
            <a href="<?php echo esc_url(home_url('campaign')); ?>">campaign</a>
          </li>
          <li class="header__item">
            <a href="<?php echo esc_url(home_url('about-us')); ?>">about</a>
          </li>
          <li class="header__item">
            <a href="<?php echo esc_url(home_url('information')); ?>">information</a>
          </li>
          <li class="header__item">
            <a href="<?php echo esc_url(home_url('blog')); ?>">blog</a>
          </li>
          <li class="header__item">
            <a href="<?php echo esc_url(home_url('voice')); ?>">voice</a>
          </li>
          <li class="header__item">
            <a href="<?php echo esc_url(home_url('price')); ?>">price</a>
          </li>
          <li class="header__item header__item--big">
            <a href="<?php echo esc_url(home_url('faq')); ?>">faq</a>
          </li>
          <li class="header__item">
            <a href="<?php echo esc_url(home_url('contact')); ?>">contact</a>
          </li>
        </ul>
      </nav>

      <!-- ハンバーガーメニュー -->
      <div class="header__hamburger hamburger hamburger--md-show js-hamburger">
        <span></span>
        <span></span>
        <span></span>
      </div>

      <!-- ドロワーメニュー -->
      <div class="header__drawer drawer-menu drawer-menu--all-close js-drawerMenu">
        <div class="drawer-menu__inner inner">
          <div class="drawer-menu__container-left">
            <div class="drawer-menu__contents">
              <p class="drawer-menu__list-name"><a href="<?php echo esc_url(home_url('campaign')); ?>">キャンペーン</a></p>
              <ul class="drawer-menu__items">
                <li class="drawer-menu__item"><a href="<?php echo esc_url(home_url('campaign#campaign1')); ?>">星空観察と天体観測</a></li>
                <li class="drawer-menu__item"><a href="<?php echo esc_url(home_url('campaign#campaign2')); ?>">初心者講習</a></li>
                <li class="drawer-menu__item"><a href="<?php echo esc_url(home_url('campaign#campaign3')); ?>">アウトドアフォト</a></li>
              </ul>
            </div>
            <div class="drawer-menu__contents">
              <p class="drawer-menu__list-name"><a href="<?php echo esc_url(home_url('about-us')); ?>">私たちについて</a></p>
            </div>
            <div class="drawer-menu__contents">
              <p class="drawer-menu__list-name"><a href="<?php echo esc_url(home_url('information')); ?>">キャンプイベント情報</a>
              </p>
              <ul class="drawer-menu__items">
                <li class="drawer-menu__item"><a href="<?php echo esc_url(home_url('information#tab_panel-1')); ?>">野外料理教室</a></li>
                <li class="drawer-menu__item"><a href="<?php echo esc_url(home_url('information#tab_panel-3')); ?>">ワークショップ</a></li>
                <li class="drawer-menu__item"><a href="<?php echo esc_url(home_url('information#tab_panel-2')); ?>">サバイバル講習</a></li>
              </ul>
            </div>
            <div class="drawer-menu__contents">
              <p class="drawer-menu__list-name"><a href="<?php echo esc_url(home_url('blog')); ?>">ブログ</a></p>
            </div>
          </div>
          <div class="drawer-menu__container-right">
            <div class="drawer-menu__contents">
              <p class="drawer-menu__list-name"><a href="<?php echo esc_url(home_url('voice')); ?>">お客様の声</a></p>
            </div>
            <div class="drawer-menu__contents">
              <p class="drawer-menu__list-name"><a href="<?php echo esc_url(home_url('price')); ?>">料金一覧</a></p>
            </div>
            <div class="drawer-menu__contents">
              <ul class="drawer-menu__items">
                <li class="drawer-menu__item"><a href="<?php echo esc_url(home_url('price#price1')); ?>">ライセンス講習</a>
                </li>
                <li class="drawer-menu__item"><a href="<?php echo esc_url(home_url('price#price2')); ?>">初心者講習</a>
                </li>
                <li class="drawer-menu__item"><a href="<?php echo esc_url(home_url('price#price3')); ?>">アウトドアフォトグラフィー</a>
                </li>
              </ul>
            </div>
            <div class="drawer-menu__contents">
              <p class="drawer-menu__list-name"><a href="<?php echo esc_url(home_url('faq')); ?>">よくある質問</a></p>
            </div>
            <div class="drawer-menu__contents">
              <p class="drawer-menu__list-name"><a href="<?php echo esc_url(home_url('sitemap')); ?>">サイトマップ</a></p>
            </div>
            <div class="drawer-menu__contents">
              <p class="drawer-menu__list-name"><a href="<?php echo esc_url(home_url('privacypolicy')); ?>">プライバシー<br class="u-mobile">ポリシー</a>
              </p>
            </div>
            <div class="drawer-menu__contents">
              <p class="drawer-menu__list-name"><a href="<?php echo esc_url(home_url('terms-of-service')); ?>">利用規約</a></p>
            </div>
            <div class="drawer-menu__contents">
              <p class="drawer-menu__list-name"><a href="<?php echo esc_url(home_url('contact')); ?>">お問い合わせ</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>