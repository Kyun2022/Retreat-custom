  <!-- contact -->
  <?php if (!is_page(array('contact', 'thanks')) && !is_404()) : ?>
    <section class="contact">
      <figure class="contact__decoration">
        <img src="<?php echo get_theme_file_uri(); ?>/assets/images/common/bird.webp" alt="鳥の群れが飛んでいる様子">
      </figure>
      <div class="contact__inner inner">
        <div class="contact__container">
          <div class="contact__info">
            <div class="contact__logo-block">
              <figure class="contact__logo">
                <a href="<?php echo esc_url(home_url('/')); ?>">
                  <img src="<?php echo get_theme_file_uri(); ?>/assets/images/common/logo_2.webp" alt="retreatのロゴ">
                </a>
              </figure>
            </div>
            <div class="contact__wrapper">
              <div class="contact__map">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d46845.749288520026!2d137.8225278720227!3d34.66920298982231!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x601ae3dd9d48070d%3A0x4bd9167b2e1200ef!2z6Z2Z5bKh55yM56OQ55Sw5biC!5e0!3m2!1sja!2sjp!4v1735712151022!5m2!1sja!2sjp" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
              </div>
              <ul class="contact__items">
                <li class="contact__item">静岡県磐田市100-1</li>
                <li class="contact__item">TEL:0120-000-0000</li>
                <li class="contact__item">営業時間:8:30-22:00</li>
                <li class="contact__item">定休日:毎週月曜日</li>
              </ul>
            </div>
          </div>
          <div class="contact__action">
            <div class="contact__title title title--center">
              <p class="title__text title__text--big">contact</p>
              <h2 class="title__sub-text title__sub-text--layout">お問い合わせ</h2>
              <p class="title__emphasis">ご予約・お問い合わせはコチラ</p>
              <div class="title__button">
                <button class="button"
                  onclick="location.href='<?php echo esc_url(home_url('contact')); ?>'">Contact</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  <?php endif; ?>
  </main>

  <!-- footer -->
  <footer class="footer" id="footer">
    <div class="footer__inner inner">
      <div class="footer__top-container">
        <h1 class="footer__logo"> <a href="<?php echo esc_url(home_url('/')); ?>">
            <img src="<?php echo get_theme_file_uri(); ?>/assets/images/common/logo_1.webp" alt="retreatのロゴ">
          </a>
        </h1>
        <div class="footer__sns-block">
          <div class="footer__sns-facebook">
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
              <img src="<?php echo get_theme_file_uri(); ?>/assets/images/common/FacebookLogo.png" alt="フェイスブック会社のロゴ">
            </a>
          </div>
          <div class="footer__sns-instagram">
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
              <img src="<?php echo get_theme_file_uri(); ?>/assets/images/common/InstagramLogo.png" alt="インスタグラム会社のロゴ">
            </a>
          </div>
        </div>
      </div>
      <div class="footer__menu footer-menu">
        <div class="footer-menu__container-left">
          <div class="footer-menu__sub-container--left1">
            <div class="footer-menu__contents">
              <p class="footer-menu__list-name">
                <a href="<?php echo esc_url(get_post_type_archive_link('campaign')); ?>">キャンペーン</a>
              </p>
              <ul class="footer-menu__items">
                <?php
                $category_slugs = array('license', 'fan', 'experience');
                foreach ($category_slugs as $slug) :
                  $term = get_term_by('slug', $slug, 'campaign_category');
                  if (!$term) continue;
                ?>
                  <li class="footer-menu__item">
                    <a href="<?php echo esc_url(get_term_link($term, 'campaign_category')); ?>">
                      <?php echo esc_html($term->name); ?>
                    </a>
                  </li>
                <?php endforeach; ?>
              </ul>
            </div>
            <div class="footer-menu__contents">
              <p class="footer-menu__list-name"><a href="<?php echo esc_url(home_url('about-us')); ?>">私たちについて</a></p>
            </div>
          </div>
          <div class="footer-menu__sub-container--right1">
            <div class="footer-menu__contents">
              <p class="footer-menu__list-name footer-menu__list-name--space"><a
                  href="<?php echo esc_url(home_url('information')); ?>">キャンプイベント情報</a>
              </p>
              <ul class="footer-menu__items">
                <li class="footer-menu__item">
                  <a href="<?php echo esc_url(home_url('information#tab_panel-1')); ?>">野外料理教室 </a>
                </li>
                <li class="footer-menu__item">
                  <a href="<?php echo esc_url(home_url('information#tab_panel-2')); ?>">ワークショップ</a>
                </li>
                <li class="footer-menu__item">
                  <a href="<?php echo esc_url(home_url('information#tab_panel-3')); ?>">サバイバル講習</a>
                </li>
              </ul>
            </div>
            <div class="footer-menu__contents">
              <p class="footer-menu__list-name"><a href="<?php echo esc_url(home_url('blog')); ?>">ブログ</a></p>
            </div>
          </div>
        </div>
        <div class="footer-menu__container-right">
          <div class="footer-menu__sub-container--left2">
            <div class="footer-menu__contents">
              <p class="footer-menu__list-name"><a href="<?php echo esc_url(home_url('voice')); ?>">お客様の声</a></p>
            </div>
            <div class="footer-menu__contents">
              <p class="footer-menu__list-name"><a href="<?php echo esc_url(home_url('price')); ?>">料金一覧</a></p>
              <ul class="footer-menu__items">
                <li class="footer-menu__item"><a href="<?php echo esc_url(home_url('price#price1')); ?>">ライセンス講習</a>
                </li>
                <li class="footer-menu__item"><a href="<?php echo esc_url(home_url('price#price2')); ?>">初心者講習</a>
                </li>
                <li class="footer-menu__item"><a href="<?php echo esc_url(home_url('price#price3')); ?>">アウトドアフォトグラフィー</a>
                </li>
                <li class="footer-menu__item"><a href="<?php echo esc_url(home_url('price#price4')); ?>">星空観察と天体観測</a>
                </li>
              </ul>
            </div>
          </div>
          <div class="footer-menu__sub-container--right2">
            <div class="footer-menu__contents">
              <p class="footer-menu__list-name footer-menu__list-name--space">
                <a href="<?php echo esc_url(home_url('faq')); ?>">よくある質問</a>
              </p>
            </div>
            <div class="footer-menu__contents">
              <p class="footer-menu__list-name footer-menu__list-name--space">
                <a href="<?php echo esc_url(home_url('sitemap')); ?>">サイトマップ</a>
              </p>
            </div>
            <div class="footer-menu__contents">
              <p class="footer-menu__list-name">
                <a href="<?php echo esc_url(home_url('privacypolicy')); ?>">プライバシー<br class="u-mobile">ポリシー</a>
              </p>
            </div>
            <div class="footer-menu__contents">
              <p class="footer-menu__list-name">
                <a href="<?php echo esc_url(home_url('terms-of-service')); ?>">利用規約</a>
              </p>
            </div>
            <div class="footer-menu__contents">
              <p class="footer-menu__list-name">
                <a href="<?php echo esc_url(home_url('contact')); ?>">お問い合わせ</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer__copyright">
      <p class="footer__copyright-text">
        Copyright&nbsp;&copy;&nbsp;2021&nbsp;-&nbsp;<?php echo wp_date("Y"); ?>&nbsp;Retreat&nbsp;LLC.&nbsp;All&nbsp;Rights&nbsp;Reserved.
      </p>
    </div>
  </footer>
  <?php wp_footer(); ?>
  <div id="pageTop"><a href="./index.html"><svg width="70" height="70" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" color="currentColor">
          <path d="M2 12c0 5.523 4.477 10 10 10s10-4.477 10-10S17.523 2 12 2S2 6.477 2 12" />
          <path d="M10 11c.579.317 1.265.5 2 .5s1.421-.183 2-.5M9.007 7H9m6 0h-.007" />
        </g>
      </svg></a></div>

  </body>

  </html>