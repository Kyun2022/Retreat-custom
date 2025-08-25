<?php get_header(); ?>
<main>
  <!-- mv -->
  <section class="mv">
    <div class="mv__inner mv__body">
      <!-- Swiper -->
      <div class="swiper mv__slider js-mv-slider">
        <div class="swiper-wrapper mv__items">
          <?php
          $mvPC = get_field('mvPC', 556); // PCの画像配列
          $mvSP = get_field('mvSP', 556); // SPの画像491配列
          $i = 1;
          foreach ($mvPC as $image):
            if ($mvPC['mvPC' . $i] && $mvSP['mvSP' . $i]) :
          ?>
              <div class="swiper-slide mv__item">
                <picture>
                  <!-- URLの場合 PC-->
                  <source srcset="<?php echo esc_url($mvPC['mvPC' . $i]); ?>" media="(min-width: 768px)" alt="mvの画像" />
                  <!-- URLの場合 SP-->
                  <img src="<?php echo esc_url($mvSP['mvSP' . $i]); ?>" alt="mvの画像" />
                </picture>
              </div>
          <?php $i += 1;
            endif;
          endforeach; ?>

        </div>
      </div>
      <div class="mv__title ">
        <h2 class="mv__title-text ">ADVENTURE</h2>
        <p class="mv__title-subtext ">splash&nbsp;into&nbsp;serenity</p>
      </div>
    </div>
  </section>

  <!-- campaign -->
  <section class="campaign top-campaign">
    <div class="campaign__inner ">
      <div class="campaign__title title title--center">
        <p class="title__text">campaign</p>
        <h2 class="title__sub-text">キャンペーン</h2>
      </div>
      <!-- Swiper -->
      <div class="swiper campaign__slider slider js-campaign-slider">
        <div class="swiper-wrapper slider__items">
          <?php
          $args = array(
            "post_type" => "campaign",
            "posts_per_page" => -1,
            "orderby" => "rand",
          );

          //配列で指定した内容で、記事情報を取得
          $campaign_query = new WP_Query($args);
          ?>
          <!-- 取得した記事情報の表示 -->
          <?php if ($campaign_query->have_posts()) : ?>
            <!-- ↓ ループ開始 ↓ -->
            <?php while ($campaign_query->have_posts()) : $campaign_query->the_post(); ?>
              <!-- ここに投稿がある場合の記述 -->
              <article class="swiper-slide slider__item">
                <figure class="slider__image">
                  <?php if (has_post_thumbnail()) : ?>
                    <?php the_post_thumbnail('full'); ?>
                  <?php else : ?>
                    <img src="<?php echo esc_url(get_theme_file_uri()); ?>/assets/images/common/noimage.webp"
                      alt="noimage画像" />
                  <?php endif; ?>
                </figure>
                <div class="slider__body">
                  <?php
                  $taxonomy_terms = get_the_terms($post->ID, 'campaign_category');
                  if (!empty($taxonomy_terms)) {
                    $limit = 5;
                    $count = 0;
                    foreach ($taxonomy_terms as $taxonomy_term) {
                      if ($count < $limit) {
                        echo '<p class="slider__label">' . esc_html($taxonomy_term->name) . '</p>';
                        $count++;
                      } else {
                        break;
                      }
                    }
                  }
                  ?>
                  <h3 class="slider__title">
                    <!-- タイトル20文字制限 -->
                    <?php echo wp_trim_words(get_the_title(), 20, '...'); ?>
                  </h3>
                  <div class="slider__meta">
                    <?php $price_groups = get_field('campaign_price_group'); ?>
                    <h4 class="slider__sub-title">
                      <?php echo esc_html($price_groups['campaign-money-text']); ?>
                    </h4>
                    <div class="slider__price-unit">
                      <?php if ($price_groups['campaign-old-price']) : ?>
                        <p class="slider__old-price slider__old-price--layout">
                          &#165;<?php echo number_format($price_groups['campaign-old-price']); ?>
                        </p>
                      <?php endif; ?>
                      <p class="slider__new-price">
                        &#165;<?php echo number_format($price_groups['campaign-new-price']); ?>
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            <?php endwhile;
            wp_reset_postdata();  ?>
        </div>
      <?php else : ?>
        <!-- ここに投稿がない場合の記述 -->
        <p>記事が投稿されていません</p>
      <?php endif; ?>
      </div>
      <!-- 前後の矢印 -->
      <div class="slider__button">
        <div class="slider__nextButton slider__nextButton--md-none"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path fill="currentColor" d="M8.664 11.635q-.339 0-.578-.233q-.24-.234-.24-.578t.238-.575t.589-.23q.335 0 .562.234q.227.233.227.577t-.23.575t-.568.23m4.66 0q-.345 0-.575-.233q-.23-.234-.23-.578t.233-.575t.578-.23t.575.234t.23.577t-.234.575t-.578.23m.508-7.371q.286 1.577 1.388 2.758t2.62 1.774q-.339-1.702-1.393-2.812q-1.054-1.211-2.615-1.72M12.06 4q-1.785-.012-3.29.945T6.537 7.538q.25.077.49.096t.51.02q1.842.03 3.424-.897q1.581-.928 2.406-2.565q-.327-.096-.654-.144Q12.388 4 12.06 4M8.329 15.96q-1.518-.927-2.423-2.496T5 10q0-2.931 2.034-4.966Q9.067 3 11.997 3t4.967 2.034T19 10q0 1.896-.906 3.465t-2.423 2.495l-.738-.72q1.401-.78 2.25-2.177q.848-1.397.817-3.111v-.058q-1.517-.448-2.722-1.461t-1.905-2.43q-1.146 1.326-2.727 2.025t-3.334.614q-.27 0-.548-.028q-.28-.03-.548-.087q-.108.371-.162.727Q6 9.609 6 10q0 1.701.845 3.08q.846 1.38 2.222 2.16zm3.575 6.444l-3.308-3.308l3.308-3.288l.688.708l-2.075 2.08h4.887v1h-4.887l2.075 2.1zm1.463-18.212" />
          </svg></div>
        <div class="slider__prevButton slider__prevButton--md-none"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path fill="currentColor" d="M15.327 11.635q-.335 0-.562-.233q-.226-.234-.226-.578t.229-.575t.568-.23t.579.234q.239.233.239.577t-.238.575t-.589.23m-4.657 0q-.345 0-.575-.233q-.23-.234-.23-.578t.234-.575t.578-.23t.574.234t.23.577t-.233.575t-.578.23M19 10q0 1.764-.799 3.247t-2.12 2.434q-.246.177-.444.136t-.32-.2q-.12-.16-.124-.348q-.002-.188.174-.315q1.2-.806 1.917-2.096Q18 11.568 18 10q0-.391-.054-.746q-.054-.356-.162-.727q-.269.058-.548.087q-.278.028-.548.028q-1.754.085-3.334-.614q-1.581-.7-2.727-2.024q-.7 1.415-1.905 2.429T6 9.894v.058q-.03 1.573.698 2.879q.729 1.306 1.935 2.117q.176.133.174.321q-.003.189-.124.348q-.122.16-.32.2t-.444-.136q-1.321-.952-2.12-2.434T5 10q0-2.931 2.034-4.966Q9.067 3 11.997 3t4.967 2.034T19 10m-5.517 9.596H9.096q-.212 0-.356-.144t-.144-.356t.144-.356t.356-.144h4.387l-1.74-1.721q-.141-.146-.134-.357t.154-.357t.344-.146t.343.146l2.37 2.37q.241.247.241.577t-.242.573L12.45 22.05q-.148.146-.345.146t-.343-.146t-.153-.357t.133-.357z" />
          </svg></div>
      </div>
      <div class="campaign__button">
        <button class="button"
          onclick="location.href='<?php echo esc_url(home_url('campaign')); ?>'">View&nbsp;more</button>
      </div>
    </div>
  </section>

  <!-- aboutUs -->
  <section class="aboutUs top-aboutUs">
    <div class="aboutUs__inner inner">
      <div class="aboutUs__title title title--center">
        <p class="title__text">about&nbsp;us</p>
        <h2 class="title__sub-text">私たちについて</h2>
      </div>
      <div class="aboutUs__images">
        <figure class="aboutUs__image-sky">
          <img src="<?php echo get_theme_file_uri(); ?>/assets/images/common/about-pc_1.webp"
            alt="使い込まれた焚き火台上で焚き火をしている様子">
        </figure>
        <figure class="aboutUs__image-sea">
          <img src="<?php echo get_theme_file_uri(); ?>/assets/images/common/about-pc_2.webp"
            alt="湖畔のそばでキャンプをしている様子">
        </figure>
      </div>
      <div class="aboutUs__container">
        <div class="aboutUs__title-block">
          <h2 class="aboutUs__sub-title">Dive&nbsp;splash<br>into<br>serenity</h2>
        </div>
        <div class="aboutUs__meta">
          <p class="aboutUs__text text">
            当キャンプ場では、澄んだ空気と豊かな緑に囲まれ、日常から離れたひとときをお楽しみいただけます。初心者からベテランまで、誰もが楽しめるアクティビティやリラックスできる環境を提供しています。
            自然の中で心と体をリフレッシュし、新しい発見と感動の瞬間を体験してください。さあ、自然があなたを待っています！
          </p>
          <div class="aboutUs__button">
            <button class="button"
              onclick="location.href='<?php echo esc_url(home_url('about-us')); ?>'">View&nbsp;more<span
                class="button__arrow"></span></button>
          </div>
        </div>
      </div>
    </div>
    <figure class="aboutUs__decoration aboutUs__decoration--md-none"><img
        src="<?php echo get_theme_file_uri(); ?>/assets/images/common/campfire.webp" alt="焚き火がもくもくと燃えている様子"></figure>
  </section>

  <!-- information -->
  <section class="information top-information">
    <div class="information__inner inner">
      <div class="information__title title title--center">
        <p class="title__text">information</p>
        <h2 class="title__sub-text">キャンプイベント情報</h2>
      </div>
      <div class="information__container">
        <figure class="information__image js-slideColor">
          <img src="<?php echo get_theme_file_uri(); ?>/assets/images/common/information-pc.webp" alt="キャンプサイトの様子">
        </figure>
        <div class="information__body">
          <div class="information__header">
            <h3 class="information__sub-title">野外料理教室</h3>
          </div>
          <div class="information__meta">
            <p class="information__text text">
              野外料理教室では、自然の中での料理の楽しさを体験できます。ダッチオーブンやキャンプ用バーナーを使い、簡単で美味しいアウトドア料理を学びまし初心者でも安心して参加できるよう、基本から丁寧に教えます。新鮮な食材を使い、仲間と一緒に作る料理は格別の味です。ぜひ、自然の中での料理の魅力を感じてください！ </p>
          </div>
          <div class="information__button">
            <button class="button"
              onclick="location.href='<?php echo esc_url(home_url('information')); ?>'">View&nbsp;more</button>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- blog -->
  <section class="blog top-blog">
    <div class="blog__bgImage blog__bgImage--md-none"><img
        src="<?php echo get_theme_file_uri(); ?>/assets/images/common/forest.webp" alt="キャンプサイト内の森林の様子"></div>
    <figure class="blog__decoration blog__decoration--md-none"><img
        src="<?php echo get_theme_file_uri(); ?>/assets/images/common/bird.webp" alt="鳥の群れが飛んでいる様子"></figure>
    <div class="blog__inner inner">
      <div class="blog__title title title--center">
        <p class="title__text title__text--white">blog</p>
        <h2 class="title__sub-text title__sub-text--white">ブログ</h2>
      </div>
      <div class="blog__container">
        <?php
        $args = array(
          "post_type" => "post",
          "posts_per_page" => 3,
          "orderby" => "rand",
        );
        //配列で指定した内容で、記事情報を取得
        $blog_query = new WP_Query($args);
        ?>
        <!-- 取得した記事情報の表示 -->
        <?php if ($blog_query->have_posts()) : ?>
          <div class="blog__cards blog-cards">
            <!-- ↓ ループ開始 ↓ -->
            <?php while ($blog_query->have_posts()) : $blog_query->the_post(); ?>
              <!-- ここに投稿がある場合の記述 -->
              <article class="blog-cards__item card">
                <a href="<?php the_permalink(); ?>">
                  <figure class="card__image card__image--hover">
                    <?php if (has_post_thumbnail()) : ?>
                      <?php the_post_thumbnail('full', array()); ?>
                    <?php else : ?>
                      <img src="<?php echo esc_url(get_theme_file_uri()); ?>/assets/images/common/noimage.webp"
                        alt=" noimage画像" />
                    <?php endif; ?>
                  </figure>
                  <div class="card__body">
                    <div class="card__header">
                      <time datetime="<?php echo get_the_date('Y-m-d'); ?>"
                        class="card__date"><?php echo get_the_date('Y.m.d'); ?></time>
                      <h3 class="card__title">
                        <!-- タイトル40文字制限 -->
                        <?php echo wp_trim_words(get_the_title(), 60, '...'); ?>
                      </h3>
                    </div>
                    <div class="card__meta">
                      <p class="card__text text">
                        <!-- 本文40文字制限 -->
                        <?php echo wp_trim_words(get_the_content(), 80, '...'); ?>
                      </p>
                    </div>
                  </div>
                </a>
              </article>
            <?php endwhile;
            wp_reset_postdata(); ?>
          </div>
        <?php else : ?>
          <!-- ここに投稿がない場合の記述 -->
          <p>記事が投稿されていません</p>
        <?php endif; ?>

        <div class="blog__button">
          <button class="button" onclick="location.href='<?php echo esc_url(home_url('blog')); ?>'">View&nbsp;more</button>
        </div>
      </div>
    </div>
  </section>

  <!-- voice -->
  <section class="voice top-voice">
    <figure class="voice__top-decoration voice__top-decoration--md-none"><img
        src="<?php echo get_theme_file_uri(); ?>/assets/images/common/bird.webp" alt="鳥の群れが飛んでいる様子"></figure>
    <div class="voice__inner inner">
      <div class="voice__title title title--center">
        <p class="title__text">voice</p>
        <h2 class="title__sub-text">お客様の声</h2>
      </div>

      <div class="voice__container boxes">
        <div class="boxes__items">
          <?php
          $args = array(
            "post_type" => "voice",
            "posts_per_page" => 2,
            "orderby" => "rand",
          );

          //配列で指定した内容で、記事情報を取得
          $voice_query = new WP_Query($args);
          ?>
          <!-- 取得した記事情報の表示 -->
          <?php if ($voice_query->have_posts()) : ?>
            <!-- ↓ ループ開始 ↓ -->
            <?php while ($voice_query->have_posts()) : $voice_query->the_post(); ?>
              <!-- ここに投稿がある場合の記述 -->
              <article class="boxes__item box">
                <div class="box__container">
                  <div class="box__header">
                    <div class="box__wrapper">
                      <p class="box__gender">
                        <?php the_field("voice-age"); ?>代&#040;<?php the_field("voice-gender") ?>&#041;
                      </p>
                      <?php
                      $taxonomy_terms = get_the_terms($post->ID, 'voice_category');
                      if (!empty($taxonomy_terms)) {
                        $limit = 5;
                        $count = 0;
                        foreach ($taxonomy_terms as $taxonomy_term) {
                          if ($count < $limit) {
                            echo '<span class="box__label">' . esc_html($taxonomy_term->name) . '</span>';
                            $count++;
                          } else {
                            break;
                          }
                        }
                      }
                      ?>
                    </div>
                    <h3 class="box__title">
                      <!-- タイトル40文字制限 -->
                      <?php echo wp_trim_words(get_the_title(), 22, '...'); ?>
                    </h3>
                  </div>
                  <figure class="box__image js-slideColor">
                    <?php if (has_post_thumbnail()) : ?>
                      <?php the_post_thumbnail('full'); ?>
                    <?php else : ?>
                      <img src="<?php echo esc_url(get_theme_file_uri()); ?>/assets/images/common/noimage.webp"
                        alt="noimage画像" />
                    <?php endif; ?>
                  </figure>
                </div>
                <div class="box__meta">
                  <p class="box__text text"><?php echo (get_field("voice-text")); ?></p>
                </div>
              </article>
            <?php endwhile;
            wp_reset_postdata(); ?>
        </div>
      <?php else : ?>
        <!-- ここに投稿がない場合の記述 -->
        <p>記事が投稿されていません</p>
      <?php endif; ?>
      </div>

      <div class="voice__button">
        <button class="button" onclick="location.href='<?php echo esc_url(home_url('voice')); ?>'">View&nbsp;more</button>
      </div>
    </div>
    <figure class="voice__bottom-decoration voice__bottom-decoration--md-none"><img
        src="<?php echo get_theme_file_uri(); ?>/assets/images/common/lantern.webp" alt="煌々と光っているランタン"></figure>
  </section>

  <!-- price -->
  <section class="price top-price">
    <div class="price__inner inner">
      <div class="prive__title title title--center">
        <p class="title__text">price</p>
        <h2 class="title__sub-text">料金一覧</h2>
      </div>
      <div class="price__container">
        <picture class="price__images js-slideColor">
          <source srcset="<?php echo get_theme_file_uri(); ?>/assets/images/common/price-pc.webp"
            media="(min-width:768px)">
          <img src="<?php echo get_theme_file_uri(); ?>/assets/images/common/price-sp.webp" alt="鳥の群れが飛んでいる様子">
        </picture>
        <ul class="price__menu">
          <li class="price__items">
            <h3 class="price__header">ライセンス講習</h3>
            <?php
            $license_fields = SCF::get_option_meta('price_options', 'license_lists');
            foreach ($license_fields as $license_field_name => $license_value) {
              $license_content = esc_html($license_value['license_content']);
              $license_subContent = esc_html($license_value['license_subContent']);
              $license_price = esc_html($license_value['license_price']);
            ?>
              <?php if ($license_content && $license_subContent && $license_price) : ?>
                <dl class="price__item">
                  <dt class="price__label"><?php echo $license_content; ?><?php echo $license_subContent; ?></dt>
                  <dd class="price__text">
                    &#165;<?php
                          $license_prices = number_format($license_price);
                          echo $license_prices;
                          ?>
                  </dd>
                </dl>
              <?php endif; ?>
            <?php } ?>
          </li>
          <li class="price__items">
            <h3 class="price__header">初心者講習</h3>
            <?php
            $experience_fields = SCF::get_option_meta('price_options', 'experience_lists');
            foreach ($experience_fields as $experience_field) {
              $experience_content = esc_html($experience_field['experience_content']);
              $experience_subContent = esc_html($experience_field['experience_subContent']);
              $experience_price = esc_html($experience_field['experience_price']);
            ?>
              <?php if ($experience_content && $experience_subContent && $experience_price) : ?>
                <dl class="price__item">
                  <dt class="price__label"><?php echo $experience_content; ?><?php echo $experience_subContent; ?></dt>
                  <dd class="price__text">
                    &#165;<?php
                          $experience_prices = number_format($experience_price);
                          echo $experience_prices;
                          ?>
                  </dd>
                </dl>
              <?php endif; ?>
            <?php } ?>
          </li>
          <li class="price__items">
            <h3 class="price__header">アウトドアフォトグラフィー</h3>
            <?php
            $fan_fields = SCF::get_option_meta('price_options', 'fan_lists');
            foreach ($fan_fields as $fan_field) {
              $fan_content = esc_html($fan_field['fan_content']);
              $fan_subContent = esc_html($fan_field['fan_subContent']);
              $fan_price = esc_html($fan_field['fan_price']);
            ?>
              <?php if ($fan_content && $fan_subContent && $fan_price) : ?>
                <dl class="price__item">
                  <dt class="price__label"><?php echo $fan_content; ?><?php echo $fan_subContent; ?></dt>
                  <dd class="price__text">
                    &#165;<?php
                          $fan_prices = number_format($fan_price);
                          echo $fan_prices;
                          ?>
                  </dd>
                </dl>
              <?php endif; ?>
            <?php } ?>
          </li>
          <li class="price__items">
            <h3 class="price__header">星空観察と天体観測</h3>
            <?php
            $special_fields = SCF::get_option_meta('price_options', 'special_lists');
            foreach ($special_fields as $special_field) {
              $special_content = esc_html($special_field['special_content']);
              $special_subContent = esc_html($special_field['special_subContent']);
              $special_price = esc_html($special_field['special_price']);
            ?>
              <?php if ($special_content && $special_subContent && $special_price) : ?>
                <dl class="price__item">
                  <dt class="price__label"><?php echo $special_content; ?><?php echo $special_subContent; ?></dt>
                  <dd class="price__text">
                    &#165;<?php
                          $special_prices = number_format($special_price);
                          echo $special_prices;
                          ?>
                  </dd>
                </dl>
              <?php endif; ?>
            <?php } ?>
          </li>
        </ul>
      </div>
      <div class="price__button">
        <button class="button" onclick="location.href='<?php echo esc_url(home_url('price')); ?>'">View&nbsp;more</button>
      </div>
    </div>
    <figure class="price__decoration price__decoration--md-none"><img
        src="<?php echo get_theme_file_uri(); ?>/assets/images/common/bird.webp" alt="鳥の群れが飛んでいる様子"></figure>
  </section>

  <?php get_footer();  ?>