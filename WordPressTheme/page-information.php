<?php
/*
Template Name: ダイビング情報
*/
?>
<?php get_header(); ?>
<main>
  <?php get_template_part('parts/hero'); ?>

  <?php get_template_part('parts/breadcrumb'); ?>


  <!-- インフォメーション -->
  <div class="sub-information under-information">
    <figure class="sub-information__decoration"><img
        src="<?php echo esc_url(get_theme_file_uri()); ?>/assets/images/common/bird.webp" alt="鳥の群れが飛んでいる様子">
    </figure>
    <div class="sub-information_inner inner">
      <ul class="sub-information__tab info-tab">
        <li class="info-tab__text js-infoTab-trigger is-active" data-category="license">野外<br
            class="info-tab__text--md-show">料理教室</li>
        <li class="info-tab__text js-infoTab-trigger" data-category="fanDiving">ワーク<br
            class="info-tab__text--md-show">ショップ</li>
        <li class="info-tab__text js-infoTab-trigger" data-category="diving">サバイバル<br class="info-tab__text--md-show">講習
        </li>
      </ul>
      <div class="sub-information__items info-content">
        <div class="info-content__item js-infoContent-target is-active" data-target="license" id="tab_panel-1">
          <div class="info-content__wrapper">
            <figure class="info-content__image"><img
                src="<?php echo esc_url(get_theme_file_uri()); ?>/assets/images/common/tab_1.webp" alt="テントのデザインアイコン">
            </figure>
            <div class="info-content__meta">
              <h3 class="info-content__title">野外料理教室</h3>
              <p class="info-content__text text">
                野外料理教室では、自然の中での料理の楽しさを体験できます。ダッチオーブンやキャンプ用バーナーを使い、簡単で美味しいアウトドア料理を学びましょう。<br>
                初心者でも安心して参加できるよう、基本から丁寧に教えます。新鮮な食材を使い、仲間と一緒に作る料理は格別の味です。ぜひ、自然の中での料理の魅力を感じてください！
              </p>
            </div>
          </div>
        </div>
        <div class="info-content__item js-infoContent-target" data-target="fanDiving" id="tab_panel-2">
          <div class="info-content__wrapper">
            <figure class="info-content__image"><img
                src="<?php echo esc_url(get_theme_file_uri()); ?>/assets/images/common/tab_2.webp" alt="ブランケットのデザインアイコン">
            </figure>
            <div class="info-content__meta">
              <h3 class="info-content__title">ワークショップ</h3>
              <p class="info-content__text text">
                テント設営ワークショップでは、初心者でも安心してテントを扱えるように、設営から撤収までの基本を学びます。<br>
                テントの選び方や場所の選定、ペグの打ち方など、実践的なスキルをプロが丁寧に指導します。自然の中で快適に過ごすためのコツを身につけ、キャンプの楽しさをさらに広げましょう。キャンプ初心者の方も大歓迎です！
              </p>
            </div>
          </div>
        </div>
        <div class="info-content__item js-infoContent-target" data-target="diving" id="tab_panel-3">
          <div class=" info-content__wrapper">
            <figure class="info-content__image"><img
                src="<?php echo esc_url(get_theme_file_uri()); ?>/assets/images/common/tab_3.webp" alt="3枚の写真のアイコン">
            </figure>
            <div class="info-content__meta">
              <h3 class="info-content__title">サバイバル講習</h3>
              <p class="info-content__text tex5">
                サバイバル講習では、自然の中で役立つ基本的なサバイバル技術を学びます。水の浄化方法、簡易シェルターの作り方、方向の見つけ方など、緊急時に備えた知識をプロが丁寧に指導します。実践的なスキルを身につけることで、自然環境での自信と安全性が向上します。初心者の方でも参加しやすい内容で、アウトドアの楽しさをさらに深めましょう。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</main>
<?php get_footer(); ?>