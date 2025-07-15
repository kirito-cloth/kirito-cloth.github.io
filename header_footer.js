import { disableScroll, enableScroll } from '/openMenu.js';
import { getCurrentLang, getLangLabel, withLangPrefix, setupLangSwitcher } from '/langUtils.js';

const lang = getCurrentLang();


document.addEventListener('DOMContentLoaded', () => {
  const translations = {
    ua: {
      about: 'Про нас',
      contact: 'Написати нам',
      brands: 'Бренди',
      categories: 'Категорії',
      tee: 'Футболки',
      tank: 'Майки',
      shorts: 'Шорти',
      sneakers: 'Кросівки',
      searchPlaceholder: 'Пошук по товарам і брендам',
      find: 'Знайти',
      lang: 'Мова',
      ua: 'Українська',
      ru: 'Російська',
      en: 'Англійська',
      menu: 'Меню',
      delivery: 'Доставка',
      payment: 'Оплата',
      product: 'Про наш продукт',
      referal: 'Реферальна система та знижки',
      service: 'Сервіс',
      main: 'Головна',
      catalog: 'Каталог',
      contacts: 'Контакти'
    },
    ru: {
      about: 'О нас',
      contact: 'Связаться с нами',
      brands: 'Бренды',
      categories: 'Категории',
      tee: 'Футболки',
      tank: 'Майки',
      shorts: 'Шорты',
      sneakers: 'Кроссовки',
      searchPlaceholder: 'Поиск по товарам и брендам',
      find: 'Найти',
      lang: 'Язык',
      ua: 'Украинский',
      ru: 'Русский',
      en: 'Английский',
      menu: 'Меню',
      delivery: 'Доставка',
      payment: 'Оплата',
      product: 'О нашем продукте',
      referal: 'Реферальная система и скидки',
      service: 'Сервис',
      main: 'Главная',
      catalog: 'Каталог',
      contacts: 'Контакты'
    },
    en: {
      about: 'About Us',
      contact: 'Contact Us',
      brands: 'Brands',
      categories: 'Categories',
      tee: 'T-shirts',
      tank: 'Tank',
      shorts: 'Shorts',
      sneakers: 'Sneakers',
      searchPlaceholder: 'Search products and brands',
      find: 'Find',
      lang: 'Language',
      ua: 'Ukrainian',
      ru: 'Russian',
      en: 'English',
      menu: 'Menu',
      delivery: 'Delivery',
      payment: 'Payment',
      product: 'About our product',
      referal: 'Referral system & discounts',
      service: 'Service',
      main: 'Home',
      catalog: 'Catalog',
      contacts: 'Contacts'
    }
  };

  const header = document.createElement('header');
  header.innerHTML = `
        <div class="content">
          <button class="hamburger" id="hamburger">
                <span></span>
                <span></span>
                <span></span>
            </button>
            <nav class="noto-sans-header">                
                <a href="${withLangPrefix('/us.html')}" class="underline-animated" data-i18n="about"></a>
                <a target="_blank" href="https://t.me/kirito_ls" class="underline-animated" data-i18n="contact"></a>
                <div class="dropdown">
                    <span class="dropdown-title" data-i18n="brands"></span>
                    <div class="dropdown-menu">
                        <a href="${withLangPrefix('/catalog/?brand=Balenciaga')}" class="dd noto-sans-dd">Balenciaga</a>
                        <a href="${withLangPrefix('/catalog/?brand=Vetements')}" class="dd noto-sans-dd">Vetements</a>
                        <a href="${withLangPrefix('/catalog/?brand=Rick+Owens')}" class="dd noto-sans-dd">Rick Owens</a>
                        <a href="${withLangPrefix('/catalog/?brand=Acne+Studios')}" class="dd noto-sans-dd">Acne Studios</a>
                        <a href="${withLangPrefix('/catalog/?brand=Maison+Margiela')}" class="dd noto-sans-dd">Maison Margiela</a>
                        <a href="${withLangPrefix('/catalog/?brand=Enfants+Riches+Deprimes')}" class="dd noto-sans-dd">Enfants Riches Deprimes</a>
                        <a href="${withLangPrefix('/catalog/?brand=Project+GR')}" class="dd noto-sans-dd">Project GR</a>
                        <a href="${withLangPrefix('/catalog/?brand=Number+Nine')}" class="dd noto-sans-dd">Number Nine</a>
                        <a href="${withLangPrefix('/catalog/?brand=Mastermind')}" class="dd noto-sans-dd">Mastermind</a>
                        <a href="${withLangPrefix('/catalog/?brand=Undercover')}" class="dd noto-sans-dd">Undercover</a>
                    </div>
                </div>
                <div class="dropdown">
                    <span class="dropdown-title" data-i18n="categories"></span>
                    <div class="dropdown-menu">
                        <a href="${withLangPrefix('/catalog/?type=tee')}" class="dd noto-sans-dd" data-i18n="tee"></a>
                        <a href="${withLangPrefix('/catalog/?type=tank')}" class="dd noto-sans-dd" data-i18n="tank"></a>
                        <a href="${withLangPrefix('/catalog/?type=shorts')}" class="dd noto-sans-dd" data-i18n="shorts"></a>
                    </div>
                </div>
                <a target="_blank" href="https://kirito-sneakers.com" class="underline-animated" data-i18n="sneakers"></a>
            </nav>
            <a href="${withLangPrefix('/')}" class="logo">
                <img src="/img/logotype.svg" alt="Kirito Cloth logotype">
            </a>
            <div class="header-buttons">
                <button class="labelforsearch">
                    <svg class="searchIcon" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"></path></svg>
                </button>
                <div class="dropdown noto-sans-header">
                    <span id="active-lang-label" class="dropdown-title montserrat-light">
                        UA
                        <svg class="arrow-icon" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24">
                            <path d="M12 17.414 3.293 8.707l1.414-1.414L12 14.586l7.293-7.293 1.414 1.414L12 17.414z"/>
                        </svg>
                    </span>
                    <div class="dropdown-menu lang">
                        <a data-lang='' class="montserrat-light dd">UA</a>
                        <a data-lang='ru' class="montserrat-light dd">RU</a>
                        <a data-lang='en' class="montserrat-light dd">EN</a>
                    </div>
                </div>
                <a href="${withLangPrefix('/catalog/?favorites=true')}" class="saved-icon" id="favorite-link">
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
                <input type="text" id="global-search-input" placeholder="" data-i18n="searchPlaceholder">
                <button type="submit" id="global-search-btn" class="main-btn animated" data-i18n="find"></button>
            </form>
        </div>

    `;

  const footer = document.createElement('footer');
  footer.innerHTML = `
        <div class="footer-wrapper">
            <div class="icons">
                <a href="${withLangPrefix('/')}">
                  <img src="/img/kirito_logo.png" alt="Kirito Brand Logo" class="kirito-logo">
                </a>
                <div class="social-media">
                    <a target="_blank" href="https://www.instagram.com/kirito_cloth/" class="animated">
                        <img src="/img/icons/instagram.svg" alt="instagram">
                    </a>
                    <a target="_blank" href="https://t.me/kirito_cloth" class="animated">
                        <img src="/img/icons/telegram.svg" alt="telegram">
                    </a>
                    <a target="_blank" href="https://www.tiktok.com/@kirito_sneakers" class="animated">
                        <img src="/img/icons/tiktok.svg" alt="tiktok">
                    </a>
                </div>
            </div>
            <div class="footer-info-wrap">
              <div class="info">
                  <h4 class="noto-sans-dd-title" data-i18n="menu"></h4>
                  <a href="${withLangPrefix('/')}" class="noto-sans-dd" data-i18n="main"></a>
                  <a href="${withLangPrefix('/catalog/')}" class="noto-sans-dd" data-i18n="catalog"></a>
                  <a href="${withLangPrefix('/us.html')}" class="noto-sans-dd" data-i18n="about"></a>
              </div>
              <div class="info">
                  <h4 class="noto-sans-dd-title" data-i18n="service"></h4>
                  <a href="${withLangPrefix('/us.html#us-product')}" class="noto-sans-dd" data-i18n="product"> </a>
                  <a href="${withLangPrefix('/us.html#us-payment')}" class="noto-sans-dd" data-i18n="payment"></a>
                  <a href="${withLangPrefix('/us.html#us-delivery')}" class="noto-sans-dd" data-i18n="delivery"></a>
                  <a href="${withLangPrefix('/us.html#us-referal')}" class="noto-sans-dd" data-i18n="referal"></a>
              </div>
              <div class="info">
                  <h4 class="noto-sans-dd-title" data-i18n="contacts"></h4>
                  <a target="_blank" href="https://t.me/kirito_ls" class="noto-sans-dd">Telegram</a>
                  <a target="_blank" href="https://www.instagram.com/kirito_cloth/" class="noto-sans-dd">Instagram</a>
              </div>
              <div class="info">
                  <h4 class="noto-sans-dd-title" data-i18n="lang"></h4>
                  <a data-lang='' class="noto-sans-dd" data-i18n="ua"></a>
                  <a data-lang='ru' class="noto-sans-dd" data-i18n="ru"></a>
                  <a data-lang='en' class="noto-sans-dd" data-i18n="en"></a>
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
          <p class="noto-sans-dd-title" data-i18n="menu"></p>
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
              <p class="noto-sans-item-details-content" data-i18n="about"></p>
              <span class="outfit-item-size menu-wrap-button-choice"></span>
            </div>
            <img src="/img/arrow.svg" alt="">
          </button>
          <a target="_blank" href="https://t.me/kirito_ls" class="menu-wrap-button" data-filter-group-id="menu-group-brand">
            <div>
              <p class="noto-sans-item-details-content" data-i18n="contact"></p>
              <span class="outfit-item-size menu-wrap-button-choice"></span>
            </div>
            <img src="/img/arrow.svg" alt="">
          </a>
          <button class="menu-wrap-button" data-filter-group-id="menu-brands">
            <div>
              <p class="noto-sans-item-details-content" data-i18n="brands"></p>
              <span class="outfit-item-size menu-wrap-button-choice"></span>
            </div>
            <img src="/img/arrow.svg" alt="">
          </button>
          <button class="menu-wrap-button" data-filter-group-id="menu-categories">
            <div>
              <p class="noto-sans-item-details-content" data-i18n="categories"></p>
              <span class="outfit-item-size menu-wrap-button-choice"></span>
            </div>
            <img src="/img/arrow.svg" alt="">
          </button>
          <a target="_blank" href="https://kirito-sneakers.com" class="menu-wrap-button" data-filter-group-id="menu-group-price">
            <div>
              <p class="noto-sans-item-details-content" data-i18n="sneakers"></p>
              <span class="outfit-item-size menu-wrap-button-choice"></span>
            </div>
            <img src="/img/arrow.svg" alt="">
          </a>
          <button class="menu-wrap-button" data-filter-group-id="menu-language">
            <div>
              <p class="noto-sans-item-details-content" data-i18n="lang"></p>
              <span class="outfit-item-size menu-wrap-button-choice"></span>
            </div>
            <img src="/img/arrow.svg" alt="">
          </button>
        </div>
      </div>
      <div class="social-media">
                <a target="_blank" href="https://www.instagram.com/kirito_cloth/" class="animated">
                    <img src="/img/icons/instagram.svg" alt="">
                </a>
                <a target="_blank" href="https://t.me/kirito_cloth" class="animated">
                    <img src="/img/icons/telegram.svg" alt="">
                </a>
                <a target="_blank" href="https://www.tiktok.com/@kirito_sneakers" class="animated">
                    <img src="/img/icons/tiktok.svg" alt="">
                </a>
            </div>
    </div>

    <div>
      <div class="filter-group" id="menu-about-us">
        <div class="menu-wrap-title">
          <div>
            <p class="noto-sans-dd-title" data-i18n="about"></p>
          </div>
          <button class="close-filter-group">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="4" y1="4" x2="20" y2="20" stroke="black" stroke-width="2" stroke-linecap="round" />
              <line x1="20" y1="4" x2="4" y2="20" stroke="black" stroke-width="2" stroke-linecap="round" />
            </svg>
          </button>
        </div>
        <div class="menu-wrap">
          <a href="${withLangPrefix('/us.html#us-product')}" class="menu-wrap-button">
            <div>
              <p class="noto-sans-item-details-content" data-i18n="product"></p>
              <span class="outfit-item-size menu-wrap-button-choice"></span>
            </div>
            <img src="/img/arrow.svg" alt="">
          </a>
          <a href="${withLangPrefix('/us.html#us-payment')}')}" class="menu-wrap-button">
            <div>
              <p class="noto-sans-item-details-content" data-i18n="payment"></p>
              <span class="outfit-item-size menu-wrap-button-choice"></span>
            </div>
            <img src="/img/arrow.svg" alt="">
          </a>
          <a href="${withLangPrefix('/us.html#us-delivery')}')}" class="menu-wrap-button">
            <div>
              <p class="noto-sans-item-details-content" data-i18n="delivery"></p>
              <span class="outfit-item-size menu-wrap-button-choice"></span>
            </div>
            <img src="/img/arrow.svg" alt="">
          </a>
          <a href="${withLangPrefix('/us.html#us-referal')}')}" class="menu-wrap-button">
            <div>
              <p class="noto-sans-item-details-content" data-i18n="referal"></p>
              <span class="outfit-item-size menu-wrap-button-choice"></span>
            </div>
            <img src="/img/arrow.svg" alt="">
          </a>
        </div>
      </div>

      <div class="filter-group" id="menu-brands">
        <div class="menu-wrap-title">
          <div>
            <p class="noto-sans-dd-title" data-i18n="brands"></p>
          </div>
          <button class="close-filter-group">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="4" y1="4" x2="20" y2="20" stroke="black" stroke-width="2" stroke-linecap="round" />
              <line x1="20" y1="4" x2="4" y2="20" stroke="black" stroke-width="2" stroke-linecap="round" />
            </svg>
          </button>
        </div>
        <div class="menu-wrap">
          <a href="${withLangPrefix('/catalog/?brand=Balenciaga')}')}" class="menu-wrap-button">
            <div>
              <p class="noto-sans-item-details-content">Balenciaga</p>
              <span class="outfit-item-size menu-wrap-button-choice"></span>
            </div>
            <img src="/img/arrow.svg" alt="">
          </a>
          <a href="${withLangPrefix('/catalog/?brand=Vetements')}')}" class="menu-wrap-button">
            <div>
              <p class="noto-sans-item-details-content">Vetements</p>
              <span class="outfit-item-size menu-wrap-button-choice"></span>
            </div>
            <img src="/img/arrow.svg" alt="">
          </a>
          <a href="${withLangPrefix('/catalog/?brand=Rick+Owens')}')}" class="menu-wrap-button">
            <div>
              <p class="noto-sans-item-details-content">Rick Owens</p>
              <span class="outfit-item-size menu-wrap-button-choice"></span>
            </div>
            <img src="/img/arrow.svg" alt="">
          </a>
          <a href="${withLangPrefix('/catalog/?brand=Acne+Studios')}')}" class="menu-wrap-button">
            <div>
              <p class="noto-sans-item-details-content">Acne Studios</p>
              <span class="outfit-item-size menu-wrap-button-choice"></span>
            </div>
            <img src="/img/arrow.svg" alt="">
          </a>
          <a href="${withLangPrefix('/catalog/?brand=Maison+Margiela')}')}" class="menu-wrap-button">
            <div>
              <p class="noto-sans-item-details-content">Maison Margiela</p>
              <span class="outfit-item-size menu-wrap-button-choice"></span>
            </div>
            <img src="/img/arrow.svg" alt="">
          </a>
          <a href="${withLangPrefix('/catalog/?brand=Enfants+Riches+Deprimes')}')}" class="menu-wrap-button">
            <div>
              <p class="noto-sans-item-details-content">Enfants Riches Deprimes</p>
              <span class="outfit-item-size menu-wrap-button-choice"></span>
            </div>
            <img src="/img/arrow.svg" alt="">
          </a>
          <a href="${withLangPrefix('/catalog/?brand=Project+GR')}')}" class="menu-wrap-button">
            <div>
              <p class="noto-sans-item-details-content">Project GR</p>
              <span class="outfit-item-size menu-wrap-button-choice"></span>
            </div>
            <img src="/img/arrow.svg" alt="">
          </a>
          <a href="${withLangPrefix('/catalog/?brand=Number+Nine')}')}" class="menu-wrap-button">
            <div>
              <p class="noto-sans-item-details-content">Number Nine</p>
              <span class="outfit-item-size menu-wrap-button-choice"></span>
            </div>
            <img src="/img/arrow.svg" alt="">
          </a>
          <a href="${withLangPrefix('/catalog/?brand=Mastermind')}')}" class="menu-wrap-button">
            <div>
              <p class="noto-sans-item-details-content">Mastermind</p>
              <span class="outfit-item-size menu-wrap-button-choice"></span>
            </div>
            <img src="/img/arrow.svg" alt="">
          </a>
          <a href="${withLangPrefix('/catalog/?brand=Undercover')}')}" class="menu-wrap-button">
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
            <p class="noto-sans-dd-title" data-i18n="categories"></p>
          </div>
          <button class="close-filter-group">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="4" y1="4" x2="20" y2="20" stroke="black" stroke-width="2" stroke-linecap="round" />
              <line x1="20" y1="4" x2="4" y2="20" stroke="black" stroke-width="2" stroke-linecap="round" />
            </svg>
          </button>
        </div>
        <div class="menu-wrap">
          <a href="${withLangPrefix('/catalog/?type=tee')}" class="menu-wrap-button">
            <div>
              <p class="noto-sans-item-details-content" data-i18n="tee"></p>
              <span class="outfit-item-size menu-wrap-button-choice"></span>
            </div>
            <img src="/img/arrow.svg" alt="">
          </a>
          <a href="${withLangPrefix('/catalog/?type=tank')}" class="menu-wrap-button">
            <div>
              <p class="noto-sans-item-details-content" data-i18n="tank"></p>
              <span class="outfit-item-size menu-wrap-button-choice"></span>
            </div>
            <img src="/img/arrow.svg" alt="">
          </a>
          <a href="${withLangPrefix('/catalog/?type=shorts')}" class="menu-wrap-button">
            <div>
              <p class="noto-sans-item-details-content" data-i18n="shorts"></p>
              <span class="outfit-item-size menu-wrap-button-choice"></span>
            </div>
            <img src="/img/arrow.svg" alt="">
          </a>
        </div>
      </div>

      <div class="filter-group" id="menu-language">
        <div class="menu-wrap-title">
          <div>
            <p class="noto-sans-dd-title" data-i18n="lang"></p>
          </div>
          <button class="close-filter-group">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="4" y1="4" x2="20" y2="20" stroke="black" stroke-width="2" stroke-linecap="round" />
              <line x1="20" y1="4" x2="4" y2="20" stroke="black" stroke-width="2" stroke-linecap="round" />
            </svg>
          </button>
        </div>
        <div class="menu-wrap">
          <a data-lang='' class="menu-wrap-button">
            <div>
              <p class="noto-sans-item-details-content" data-i18n="ua"></p>
              <span class="outfit-item-size menu-wrap-button-choice"></span>
            </div>
            <img src="/img/arrow.svg" alt="">
          </a>
          <a data-lang='ru' class="menu-wrap-button">
            <div>
              <p class="noto-sans-item-details-content" data-i18n="ru"></p>
              <span class="outfit-item-size menu-wrap-button-choice"></span>
            </div>
            <img src="/img/arrow.svg" alt="">
          </a>
          <a data-lang='en' class="menu-wrap-button">
            <div>
              <p class="noto-sans-item-details-content" data-i18n="en"></p>
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

  const activeLangSpan = document.getElementById('active-lang-label');
  if (activeLangSpan) {
    activeLangSpan.childNodes[0].nodeValue = getLangLabel(lang) + ' '; // добавляем пробел перед svg
  }


  function setupFooterAccordion() {
    const infos = document.querySelectorAll('.footer-info-wrap .info');

    infos.forEach(info => {
      info.addEventListener('click', () => {
        if (window.innerWidth < 1000) {
          // Если уже открыт другой — закрываем его
          infos.forEach(other => {
            if (other !== info) {
              other.classList.remove('open');
            }
          });

          // Переключаем текущий
          info.classList.toggle('open');
        }
      });
    });
  }

  function applyTranslations(lang) {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[lang] && translations[lang][key]) {
        el.textContent = translations[lang][key];
      }
    });

    // Отдельно: placeholder
    const searchInput = document.getElementById('global-search-input');
    if (searchInput && translations[lang].searchPlaceholder) {
      searchInput.placeholder = translations[lang].searchPlaceholder;
    }
  }



  setupFooterAccordion();
  const langLinks = document.querySelectorAll('a[data-lang]');

  langLinks.forEach(link => {
    link.addEventListener('click', () => {
      const selectedLang = link.getAttribute('data-lang');
      const currentPath = window.location.pathname;

      // Разбиваем путь: ['', 'folder', 'index.html'] или ['', 'ru', 'folder', 'index.html']
      const pathParts = currentPath.split('/').filter(p => p); // удаляем пустые части

      // Проверим, есть ли уже префикс языка (например, ru или en)
      const supportedLangs = ['ru', 'en'];
      if (supportedLangs.includes(pathParts[0])) {
        pathParts[0] = selectedLang; // заменяем язык
      } else {
        pathParts.unshift(selectedLang); // добавляем язык в начало
      }

      // Собираем новый путь
      const newPath = '/' + pathParts.join('/');
      window.location.href = newPath;
    });
  });


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



  function closeSearch() {
    enableScroll();
    document.querySelector('header').classList.remove('search');
    overlay.classList.remove('active')
  }

  labelBtn.addEventListener('click', (e) => {
    e.preventDefault(); // если нужно предотвратить дефолтное действие
    disableScroll();
    document.querySelector('header').classList.add('search');
    overlay.classList.add('active');

    const input = document.getElementById('global-search-input');
    if (input) input.focus();
  });


  overlay.addEventListener('click', () => {
    closeSearch();
    closeMobileMenu();

    // Закрыть все открытые .filter-group
    document.querySelectorAll('.filter-group.active').forEach(group => {
      group.classList.remove('active');
    });
  });
  if (!form || !input) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = input.value.trim();

    const currentUrl = window.location.pathname;
    const params = new URLSearchParams(window.location.search);

    if (!query) {
      params.delete('search');

      if (currentUrl.includes('/catalog')) {
        window.location.href = `${currentUrl}?${params.toString()}`;
      } else {
        window.location.href = withLangPrefix('/catalog');
      }
      return;
    }

    params.set('search', query);

    if (currentUrl.includes('/catalog')) {
      window.location.href = `${currentUrl}?${params.toString()}`;
    } else {
      window.location.href = withLangPrefix(`/catalog/?search=${encodeURIComponent(query)}`);
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

  applyTranslations(lang);

  setupLangSwitcher();
})