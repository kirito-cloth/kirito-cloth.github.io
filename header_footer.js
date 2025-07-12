import { disableScroll, enableScroll } from '/openMenu.js';


document.addEventListener('DOMContentLoaded', () => {
  const header = document.createElement('header');
  header.innerHTML = `
        <div class="content">
          <button class="hamburger" id="hamburger">
                <span></span>
                <span></span>
                <span></span>
            </button>
            <nav class="noto-sans-header">                
                <a href="/us.html" class="underline-animated">Про нас</a>
                <a href="" class="underline-animated">Написати нам</a>
                <div class="dropdown">
                    <span class="dropdown-title">Бренди</span>
                    <div class="dropdown-menu">
                        <a href="/catalog/?brand=Balenciaga" class="dd noto-sans-dd">Balenciaga</a>
                        <a href="/catalog/?brand=Vetements" class="dd noto-sans-dd">Vetements</a>
                        <a href="/catalog/?brand=Rick+Owens" class="dd noto-sans-dd">Rick Owens</a>
                        <a href="/catalog/?brand=Acne+Studios" class="dd noto-sans-dd">Acne Studios</a>
                        <a href="/catalog/?brand=Maison+Margiela" class="dd noto-sans-dd">Maison Margiela</a>
                        <a href="/catalog/?brand=Enfants+Riches+Deprimes" class="dd noto-sans-dd">Enfants Riches Deprimes</a>
                        <a href="/catalog/?brand=Project+GR" class="dd noto-sans-dd">Project GR</a>
                        <a href="/catalog/?brand=Number+Nine" class="dd noto-sans-dd">Number Nine</a>
                        <a href="/catalog/?brand=Mastermind" class="dd noto-sans-dd">Mastermind</a>
                        <a href="/catalog/?brand=Undercover" class="dd noto-sans-dd">Undercover</a>
                    </div>
                </div>
                <div class="dropdown">
                    <span class="dropdown-title">Категорії</span>
                    <div class="dropdown-menu">
                        <a href="/catalog/?type=tee" class="dd noto-sans-dd">Футболки</a>
                        <a href="/catalog/?type=tank" class="dd noto-sans-dd">Майки</a>
                        <a href="/catalog/?type=shorts" class="dd noto-sans-dd">Шорти</a>
                    </div>
                </div>
                <a href="https://kirito-sneakers.com" class="underline-animated">Кросівки</a>
            </nav>
            <a href="/" class="logo">
                <img src="/img/logotype.svg" alt="Kirito Cloth logotype">
            </a>
            <div class="header-buttons">
                <button class="labelforsearch">
                    <svg class="searchIcon" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"></path></svg>
                </button>
                <div class="dropdown noto-sans-header">
                    <span class="dropdown-title montserrat-light">
                        UA
                        <svg class="arrow-icon" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24">
                            <path d="M12 17.414 3.293 8.707l1.414-1.414L12 14.586l7.293-7.293 1.414 1.414L12 17.414z"/>
                        </svg>
                    </span>
                    <div class="dropdown-menu lang">
                        <a data-lang='ru' class="montserrat-light underline-animated dd">RU</a>
                        <a data-lang='en' class="montserrat-light underline-animated dd">EN</a>
                    </div>
                </div>
                <a href="/catalog/?favorites=true" class="saved-icon" id="favorite-link">
                <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" fill="#000000">
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                    <g id="SVGRepo_iconCarrier"> 
                        <path d="M0 0h48v48H0z" fill="none"></path> 
                        <g id="Shopicon"> 
                            <path d="M14,4c-2.2,0-4,1.8-4,4v36l14-8l14,8V8c0-2.2-1.8-4-4-4H14z"></path> 
                        </g> 
                    </g>
                </svg>
            </a>
            </div>
        </div>
        <div class="search-wrapper">
            <form id="global-search-form">
                <input type="text" id="global-search-input" placeholder="Пошук по товарам і брендам">
                <button type="submit" id="global-search-btn" class="main-btn animated">Знайти</button>
            </form>
        </div>

    `;

  const footer = document.createElement('footer');
  footer.innerHTML = `
        <div class="footer-wrapper">
            <div class="icons">
                <img src="/img/kirito_logo.png" alt="Kirito Brand Logo" class="kirito-logo">
                <div class="social-media">
                    <a href="" class="animated">
                        <img src="/img/icons/instagram.svg" alt="">
                    </a>
                    <a href="" class="animated">
                        <img src="/img/icons/telegram.svg" alt="">
                    </a>
                    <a href="" class="animated">
                        <img src="/img/icons/tiktok.svg" alt="">
                    </a>
                </div>
            </div>
            <div class="footer-info-wrap">
              <div class="info">
                  <h4 class="noto-sans-dd-title">МЕНЮ</h4>
                  <a href="/" class="noto-sans-dd">Головна</a>
                  <a href="/catalog/" class="noto-sans-dd">Каталог</a>
                  <a href="/us.html" class="noto-sans-dd">Про нас</a>
              </div>
              <div class="info">
                  <h4 class="noto-sans-dd-title">СЕРВІС</h4>
                  <a href="/us.html#us-product" class="noto-sans-dd">Про наш продукт</a>
                  <a href="/us.html#us-payment" class="noto-sans-dd">Оплата</a>
                  <a href="/us.html#us-delivery" class="noto-sans-dd">Доставка</a>
                  <a href="/us.html#us-referal" class="noto-sans-dd">Реферальна система та знижки</a>
              </div>
              <div class="info">
                  <h4 class="noto-sans-dd-title">КОНТАКТИ</h4>
                  <a href="https://t.me/kirito_ls" class="noto-sans-dd">Telegram</a>
                  <a href="" class="noto-sans-dd">Instagram</a>
              </div>
              <div class="info">
                  <h4 class="noto-sans-dd-title">МОВА</h4>
                  <a href="" class="noto-sans-dd">Українська</a>
                  <a href="" class="noto-sans-dd">Російська</a>
                  <a href="" class="noto-sans-dd">Англійська</a>
              </div>
            </div>
        </div>

    `;

  const overlayElem = document.createElement('div');
  overlayElem.classList.add('overlay');
  document.body.prepend(overlayElem);

  const main = document.querySelector('main');
  if (!main) return;

  const menuHTML = `
    <div class="mobile-menu" id="mobile-menu">
      <div class="menu-wrap-title">
        <div>
          <p class="noto-sans-dd-title">Меню</p>
        </div>
        <button id="close-menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="4" y1="4" x2="20" y2="20" stroke="black" stroke-width="2" stroke-linecap="round" />
            <line x1="20" y1="4" x2="4" y2="20" stroke="black" stroke-width="2" stroke-linecap="round" />
          </svg>
        </button>
      </div>
      <div class="menu-wrap">
        <div class="menu-btns-wrap">
          <button class="menu-wrap-button" data-filter-group-id="menu-about-us">
            <div>
              <p class="noto-sans-item-details-content">Про нас</p>
              <span class="outfit-item-size menu-wrap-button-choice"></span>
            </div>
            <img src="/img/arrow.svg" alt="">
          </button>
          <a href="https://t.me/kirito_ls" class="menu-wrap-button" data-filter-group-id="menu-group-brand">
            <div>
              <p class="noto-sans-item-details-content">Написати нам</p>
              <span class="outfit-item-size menu-wrap-button-choice"></span>
            </div>
            <img src="/img/arrow.svg" alt="">
          </a>
          <button class="menu-wrap-button" data-filter-group-id="menu-brands">
            <div>
              <p class="noto-sans-item-details-content">Бренди</p>
              <span class="outfit-item-size menu-wrap-button-choice"></span>
            </div>
            <img src="/img/arrow.svg" alt="">
          </button>
          <button class="menu-wrap-button" data-filter-group-id="menu-categories">
            <div>
              <p class="noto-sans-item-details-content">Категорії</p>
              <span class="outfit-item-size menu-wrap-button-choice"></span>
            </div>
            <img src="/img/arrow.svg" alt="">
          </button>
          <a href="https://kirito-sneakers.com" class="menu-wrap-button" data-filter-group-id="menu-group-price">
            <div>
              <p class="noto-sans-item-details-content">Кросівки</p>
              <span class="outfit-item-size menu-wrap-button-choice"></span>
            </div>
            <img src="/img/arrow.svg" alt="">
          </a>
          <button class="menu-wrap-button" data-filter-group-id="menu-language">
            <div>
              <p class="noto-sans-item-details-content">Мова</p>
              <span class="outfit-item-size menu-wrap-button-choice"></span>
            </div>
            <img src="/img/arrow.svg" alt="">
          </button>
        </div>
      </div>
    </div>

    <div>
      <div class="filter-group" id="menu-about-us">
        <div class="menu-wrap-title">
          <div>
            <p class="noto-sans-dd-title">Про нас</p>
          </div>
          <button class="close-filter-group">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="4" y1="4" x2="20" y2="20" stroke="black" stroke-width="2" stroke-linecap="round" />
              <line x1="20" y1="4" x2="4" y2="20" stroke="black" stroke-width="2" stroke-linecap="round" />
            </svg>
          </button>
        </div>
        <div class="menu-wrap">
          <a href="/us.html#us-product" class="menu-wrap-button">
            <div>
              <p class="noto-sans-item-details-content">Про наш продукт</p>
              <span class="outfit-item-size menu-wrap-button-choice"></span>
            </div>
            <img src="/img/arrow.svg" alt="">
          </a>
          <a href="/us.html#us-payment" class="menu-wrap-button">
            <div>
              <p class="noto-sans-item-details-content">Оплата</p>
              <span class="outfit-item-size menu-wrap-button-choice"></span>
            </div>
            <img src="/img/arrow.svg" alt="">
          </a>
          <a href="/us.html#us-delivery" class="menu-wrap-button">
            <div>
              <p class="noto-sans-item-details-content">Доставка</p>
              <span class="outfit-item-size menu-wrap-button-choice"></span>
            </div>
            <img src="/img/arrow.svg" alt="">
          </a>
          <a href="/us.html#us-referal" class="menu-wrap-button">
            <div>
              <p class="noto-sans-item-details-content">Реферальна система та знижки</p>
              <span class="outfit-item-size menu-wrap-button-choice"></span>
            </div>
            <img src="/img/arrow.svg" alt="">
          </a>
        </div>
      </div>

      <div class="filter-group" id="menu-brands">
        <div class="menu-wrap-title">
          <div>
            <p class="noto-sans-dd-title">Бренди</p>
          </div>
          <button class="close-filter-group">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="4" y1="4" x2="20" y2="20" stroke="black" stroke-width="2" stroke-linecap="round" />
              <line x1="20" y1="4" x2="4" y2="20" stroke="black" stroke-width="2" stroke-linecap="round" />
            </svg>
          </button>
        </div>
        <div class="menu-wrap">
          <a href="/catalog/?brand=Balenciaga" class="menu-wrap-button">
            <div>
              <p class="noto-sans-item-details-content">Balenciaga</p>
              <span class="outfit-item-size menu-wrap-button-choice"></span>
            </div>
            <img src="/img/arrow.svg" alt="">
          </a>
          <a href="/catalog/?brand=Vetements" class="menu-wrap-button">
            <div>
              <p class="noto-sans-item-details-content">Vetements</p>
              <span class="outfit-item-size menu-wrap-button-choice"></span>
            </div>
            <img src="/img/arrow.svg" alt="">
          </a>
          <a href="/catalog/?brand=Rick+Owens" class="menu-wrap-button">
            <div>
              <p class="noto-sans-item-details-content">Rick Owens</p>
              <span class="outfit-item-size menu-wrap-button-choice"></span>
            </div>
            <img src="/img/arrow.svg" alt="">
          </a>
          <a href="/catalog/?brand=Acne+Studios" class="menu-wrap-button">
            <div>
              <p class="noto-sans-item-details-content">Acne Studios</p>
              <span class="outfit-item-size menu-wrap-button-choice"></span>
            </div>
            <img src="/img/arrow.svg" alt="">
          </a>
          <a href="/catalog/?brand=Maison+Margiela" class="menu-wrap-button">
            <div>
              <p class="noto-sans-item-details-content">Maison Margiela</p>
              <span class="outfit-item-size menu-wrap-button-choice"></span>
            </div>
            <img src="/img/arrow.svg" alt="">
          </a>
          <a href="/catalog/?brand=Enfants+Riches+Deprimes" class="menu-wrap-button">
            <div>
              <p class="noto-sans-item-details-content">Enfants Riches Deprimes</p>
              <span class="outfit-item-size menu-wrap-button-choice"></span>
            </div>
            <img src="/img/arrow.svg" alt="">
          </a>
          <a href="/catalog/?brand=Project+GR" class="menu-wrap-button">
            <div>
              <p class="noto-sans-item-details-content">Project GR</p>
              <span class="outfit-item-size menu-wrap-button-choice"></span>
            </div>
            <img src="/img/arrow.svg" alt="">
          </a>
          <a href="/catalog/?brand=Number+Nine" class="menu-wrap-button">
            <div>
              <p class="noto-sans-item-details-content">Number Nine</p>
              <span class="outfit-item-size menu-wrap-button-choice"></span>
            </div>
            <img src="/img/arrow.svg" alt="">
          </a>
          <a href="/catalog/?brand=Mastermind" class="menu-wrap-button">
            <div>
              <p class="noto-sans-item-details-content">Mastermind</p>
              <span class="outfit-item-size menu-wrap-button-choice"></span>
            </div>
            <img src="/img/arrow.svg" alt="">
          </a>
          <a href="/catalog/?brand=Undercover" class="menu-wrap-button">
            <div>
              <p class="noto-sans-item-details-content">Undercover</p>
              <span class="outfit-item-size menu-wrap-button-choice"></span>
            </div>
            <img src="/img/arrow.svg" alt="">
          </a>
        </div>
      </div>

      <div class="filter-group" id="menu-categories">
        <div class="menu-wrap-title">
          <div>
            <p class="noto-sans-dd-title">Категорії</p>
          </div>
          <button class="close-filter-group">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="4" y1="4" x2="20" y2="20" stroke="black" stroke-width="2" stroke-linecap="round" />
              <line x1="20" y1="4" x2="4" y2="20" stroke="black" stroke-width="2" stroke-linecap="round" />
            </svg>
          </button>
        </div>
        <div class="menu-wrap">
          <a href="/catalog/?type=tee" class="menu-wrap-button">
            <div>
              <p class="noto-sans-item-details-content">Футболки</p>
              <span class="outfit-item-size menu-wrap-button-choice"></span>
            </div>
            <img src="/img/arrow.svg" alt="">
          </a>
          <a href="/catalog/?type=tank" class="menu-wrap-button">
            <div>
              <p class="noto-sans-item-details-content">Майки</p>
              <span class="outfit-item-size menu-wrap-button-choice"></span>
            </div>
            <img src="/img/arrow.svg" alt="">
          </a>
          <a href="/catalog/?type=shorts" class="menu-wrap-button">
            <div>
              <p class="noto-sans-item-details-content">Шорти</p>
              <span class="outfit-item-size menu-wrap-button-choice"></span>
            </div>
            <img src="/img/arrow.svg" alt="">
          </a>
        </div>
      </div>

      <div class="filter-group" id="menu-language">
        <div class="menu-wrap-title">
          <div>
            <p class="noto-sans-dd-title">Мова</p>
          </div>
          <button class="close-filter-group">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="4" y1="4" x2="20" y2="20" stroke="black" stroke-width="2" stroke-linecap="round" />
              <line x1="20" y1="4" x2="4" y2="20" stroke="black" stroke-width="2" stroke-linecap="round" />
            </svg>
          </button>
        </div>
        <div class="menu-wrap">
          <a href="/catalog/?type=tee" class="menu-wrap-button">
            <div>
              <p class="noto-sans-item-details-content">Українська</p>
              <span class="outfit-item-size menu-wrap-button-choice"></span>
            </div>
            <img src="/img/arrow.svg" alt="">
          </a>
          <a href="/catalog/?type=tank" class="menu-wrap-button">
            <div>
              <p class="noto-sans-item-details-content">Російська</p>
              <span class="outfit-item-size menu-wrap-button-choice"></span>
            </div>
            <img src="/img/arrow.svg" alt="">
          </a>
          <a href="/catalog/?type=shorts" class="menu-wrap-button">
            <div>
              <p class="noto-sans-item-details-content">Англійська</p>
              <span class="outfit-item-size menu-wrap-button-choice"></span>
            </div>
            <img src="/img/arrow.svg" alt="">
          </a>
        </div>
      </div>
    </div>
  `;

  main.insertAdjacentHTML('afterbegin', menuHTML);



  document.body.prepend(header)
  document.body.append(footer)

  const form = document.getElementById('global-search-form');
  const input = document.getElementById('global-search-input');
  const labelBtn = document.querySelector('.labelforsearch')
  const overlay = document.querySelector('.overlay');
  const hamburger = document.querySelector('#hamburger');
  const closeMenuBtn = document.querySelector('#close-menu');

  function setupFooterAccordion() {
    const infos = document.querySelectorAll('.footer-info-wrap .info');

    infos.forEach(info => {
      info.addEventListener('click', () => {
        if (window.innerWidth < 1000) {
          info.classList.toggle('open');
        }
      });
    });
  }

  setupFooterAccordion();

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1000) {
      document.querySelectorAll('.footer-info-wrap .info').forEach(info => {
        info.classList.remove('open');
      });
    }
  });


  document.querySelectorAll('.menu-wrap-button').forEach(button => {
    button.addEventListener('click', () => {
      // Получаем id из data-атрибута кнопки
      const targetId = button.getAttribute('data-filter-group-id');
      if (!targetId) return;

      // Находим элемент с этим id
      const targetElement = document.getElementById(targetId);
      if (!targetElement) return;
      targetElement.classList.add('active');

    });
  });

  document.querySelectorAll('.close-filter-group').forEach(button => {
    button.addEventListener('click', () => {
      const filterGroup = button.closest('.filter-group');
      if (filterGroup) filterGroup.classList.remove('active');

    });
  });

  function closeMenu() {
    document.querySelector('#mobile-menu').classList.remove('active');
    document.querySelector('.overlay').classList.remove('active');
    enableScroll();
  }

  closeMenuBtn.addEventListener('click', () => {
    closeMenu();
  })

  let lastScroll = 0;

  window.addEventListener('scroll', () => {

    const currentScroll = window.pageYOffset;

    if (currentScroll > lastScroll && currentScroll > 100) {
      header.classList.add('hide');
    } else {
      header.classList.remove('hide');
    }

    lastScroll = currentScroll;
  });

document.getElementById('search-button').addEventListener('click', () => {
  disableScroll();
  document.querySelector('header').classList.add('search');
  overlay.classList.add('active');

  const input = document.getElementById('global-search-input');
  input.focus(); // теперь Safari даст фокус
});



  function closeSearch() {
    enableScroll();
    document.querySelector('header').classList.remove('search');
    overlay.classList.remove('active')
  }

  labelBtn.addEventListener('click', () => {
    openSearch();
  })

  overlay.addEventListener('click', () => {
    closeSearch();
    closeMobileMenu();
  });
  if (!form || !input) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = input.value.trim();

    if (!query) {
      const currentUrl = window.location.pathname;
      const params = new URLSearchParams(window.location.search);

      params.delete('search');

      if (currentUrl.includes('/catalog')) {
        window.location.href = `${currentUrl}?${params.toString()}`;
      } else {
        window.location.href = `/catalog`;
      }
      return;
    }


    const currentUrl = window.location.pathname;
    const params = new URLSearchParams(window.location.search);

    params.set('search', query);

    if (currentUrl.includes('/catalog')) {
      // Уже на странице каталога — просто обновим URL с сохранением других фильтров
      window.location.href = `${currentUrl}?${params.toString()}`;
    } else {
      // На другой странице — переход на каталог
      window.location.href = `/catalog/?search=${encodeURIComponent(query)}`;
    }
  });

  hamburger.addEventListener('click', () => {
    openMobileMenu();
  })

  function openMobileMenu() {
    disableScroll();
    document.querySelector('#mobile-menu').classList.add('active');
    overlay.classList.add('active')
  }

  function closeMobileMenu() {
    enableScroll();
    document.querySelector('#mobile-menu').classList.remove('active');
    overlay.classList.remove('active')
  }

})