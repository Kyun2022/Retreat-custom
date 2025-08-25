<?php
/*
Template Name: 私たちについて
*/
?>
<?php get_header(); ?>

<main>
  <?php get_template_part('parts/hero'); ?>

  <?php get_template_part('parts/breadcrumb'); ?>


  <!-- sub-aboutUs -->
  <section class="sub-aboutUs under-aboutUs">
    <figure class="sub-aboutUs__decoration"><img
        src="<?php echo esc_url(get_theme_file_uri()); ?>/assets/images/common/bird.webp" alt="鳥の群れが飛んでいる様子"></figure>
    <div class="sub-aboutUs__inner inner">
      <div class="sub-aboutUs__images">
        <figure class="sub-aboutUs__image-sky sub-aboutUs__image-sky--md-none">
          <img src="<?php echo esc_url(get_theme_file_uri()); ?>/assets/images/common/about-pc_1.webp"
            alt="使い込まれた焚き火台上で焚き火をしている様子">
        </figure>
        <figure class="sub-aboutUs__image-sea">
          <img src="<?php echo esc_url(get_theme_file_uri()); ?>/assets/images/common/about-pc_2.webp"
            alt="湖畔のそばでキャンプをしている様子">
        </figure>
      </div>
      <div class="sub-aboutUs__container">
        <div class="sub-aboutUs__title-block">
          <h2 class="sub-aboutUs__sub-title">Dive&nbsp;splash<br>into<br>serenity</h2>
        </div>
        <div class="sub-aboutUs__meta">
          <p class="sub-aboutUs__text text">
            当キャンプ場では、澄んだ空気と豊かな緑に囲まれ、日常から離れたひとときをお楽しみいただけます。初心者からベテランまで、誰もが楽しめるアクティビティやリラックスできる環境を提供しています。 自然の中で心と体をリフレッシュし、新しい発見と感動の瞬間を体験してください。さあ、自然があなたを待っています！
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- ギャラリー -->
  <section class="gallery under-gallery">
    <figure class="gallery__decoration gallery__decoration--md-none">
      <img src="<?php echo esc_url(get_theme_file_uri()); ?>/assets/images/common/bird.webp" alt="鳥の群れが飛んでいる様子">
    </figure>
    <div class="gallery__inner inner">
      <div class="gallery_title title title--center">
        <p class="title__text">gallery</p>
        <h2 class="title__sub-text">フォト</h2>
      </div>

      <div class="gallery__container">
        <?php
        $repeat_item = SCF::get_option_meta('gallery_options', 'gallery_lists');
        foreach ($repeat_item as $index => $fields) {
          $image_url = wp_get_attachment_image_src($fields['gallery_item'], 'full');
        ?>
          <figure class="gallery__image" data-micromodal-trigger="js-modal<?php echo $index + 1; ?>">
            <img src="<?php echo $image_url[0]; ?>" alt="キャンプの際、撮影された6シーンの様子">
          </figure>
        <?php
        }
        ?>
      </div>
      <div class="gallery__modal">
        <?php
        $repeat_item = SCF::get_option_meta('gallery_options', 'gallery_lists');
        foreach ($repeat_item as $index => $fields) {
          $image_url = wp_get_attachment_image_src($fields['gallery_item'], 'full');
        ?>
          <div class="modal modal--slide" id="js-modal<?php echo $index + 1; ?>" aria-hidden="true">
            <div class="modal__overlay" tabindex="-1" data-micromodal-close>
              <div class="modal__image" role="dialog" aria-modal="true">
                <img src="<?php echo $image_url[0]; ?>" alt="キャンプの際、撮影された6シーンの様子" data-micromodal-close />
              </div>
            </div>
          </div>
        <?php
        }
        ?>
      </div>
    </div>

    </div>
  </section>
</main>

<?php get_footer(); ?>