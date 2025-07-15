import { createProductCard } from '/productCard.js';
import { revealOnScroll } from '/scrollReveal.js';
import { disableScroll, enableScroll } from '/openMenu.js';

// Используем глобальную переменную Swiper и модуль Zoom
const { Zoom } = window.Swiper;
const SwiperClass = window.Swiper;
SwiperClass.use([Zoom]);

function getProductId() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

fetch('/products.json')
  .then(res => res.json())
  .then(products => {
    // Сначала получаем id и product
    const id = parseInt(getProductId(), 10);
    const product = products.find(p => p.id === id);

    // Проверяем, найден ли продукт
    if (!product) {
      document.body.innerHTML = '<h2>Product not found</h2>';
      return;
    }

    // Функция для добавления в recently viewed
    function addToRecentlyViewed(productId) {
      if (!productId) return;
      const key = 'recentlyViewed';

      const viewed = JSON.parse(localStorage.getItem(key)) || [];

      const updated = [productId, ...viewed.filter(id => id !== productId)].slice(0, 4);

      localStorage.setItem(key, JSON.stringify(updated));
    }

    // Использование
    addToRecentlyViewed(id);


    const sizesObj = product.sizes;
    const dollarPrice = Math.ceil(product.price * 0.024);
    const itemImgWrap = document.querySelector('.item-img-wrap');
    const readyDelver = document.querySelector('.ready-deliver');
    const modal = document.getElementById('img-modal');
    const wrapper = document.getElementById('modal-swiper-wrapper');

    // Таблицы размеров
    const tables = {
      tee: document.getElementById('sizes-tee'),
      shorts: document.getElementById('sizes-shorts'),
      tank: document.getElementById('sizes-tank'),
    };

    // Скрываем все таблицы
    Object.values(tables).forEach(table => {
      if (table) table.style.display = 'none';
    });

    // Показываем нужную таблицу
    const activeTable = tables[product.type];
    if (!activeTable) {
      console.warn(`Нет таблицы для типа ${product.type}`);
      return;
    }
    activeTable.style.display = '';

    // Очищаем таблицу, кроме заголовка
    while (activeTable.rows.length > 1) {
      activeTable.deleteRow(1);
    }

    // Вспомогательная функция для создания ячейки с текстом + ' см'
    function createTd(value) {
      const td = document.createElement('td');
      td.textContent = value !== undefined ? value + ' cm' : '-';
      return td;
    }

    // Заполняем таблицу размерами
    for (const sizeKey in sizesObj) {
      const sizeData = sizesObj[sizeKey];
      const tr = document.createElement('tr');

      const th = document.createElement('th');
      th.textContent = sizeKey.toUpperCase();
      tr.appendChild(th);

      if (product.type === 'tee') {
        tr.appendChild(createTd(sizeData.length));
        tr.appendChild(createTd(sizeData.chest));
        tr.appendChild(createTd(sizeData.shoulder));
      } else if (product.type === 'shorts') {
        tr.appendChild(createTd(sizeData.length));
        tr.appendChild(createTd(sizeData.waist));
        tr.appendChild(createTd(sizeData.hip));
      } else if (product.type === 'tank') {
        tr.appendChild(createTd(sizeData.length));
        tr.appendChild(createTd(sizeData.chest));
        tr.appendChild(createTd(sizeData.shoulder));
      }

      activeTable.appendChild(tr);
    }

    // Рендер картинок
    const isMobile = window.matchMedia('(max-width: 1000px)').matches;
    itemImgWrap.innerHTML = '';

    if (!isMobile) {
      // ПК — просто выводим картинки
      product.images.forEach(img => {
        const imgEl = document.createElement('img');
        imgEl.src = img;
        imgEl.alt = product.name;
        itemImgWrap.appendChild(imgEl);
      });
    } else {
      // Мобильный Swiper-слайдер
      const swiperContainer = document.createElement('div');
      swiperContainer.classList.add('swiper');

      const swiperWrapper = document.createElement('div');
      swiperWrapper.classList.add('swiper-wrapper');

      product.images.forEach(img => {
        const swiperSlide = document.createElement('div');
        swiperSlide.classList.add('swiper-slide');

        const imgEl = document.createElement('img');
        imgEl.src = img;
        imgEl.alt = product.name;

        swiperSlide.appendChild(imgEl);
        swiperWrapper.appendChild(swiperSlide);
      });

      // Пагинация и навигация
      const paginationEl = document.createElement('div');
      paginationEl.classList.add('swiper-pagination');

      const prevBtn = document.createElement('div');
      prevBtn.classList.add('swiper-button-prev');

      const nextBtn = document.createElement('div');
      nextBtn.classList.add('swiper-button-next');

      swiperContainer.appendChild(paginationEl);
      swiperContainer.appendChild(prevBtn);
      swiperContainer.appendChild(nextBtn);
      swiperContainer.appendChild(swiperWrapper);
      itemImgWrap.appendChild(swiperContainer);

      // Инициализация Swiper
      new Swiper(swiperContainer, {
        loop: true,
        slidesPerView: 1,
        spaceBetween: 10,
        pagination: {
          el: paginationEl,
          clickable: true,
        },
        navigation: {
          nextEl: nextBtn,
          prevEl: prevBtn,
        },
      });
    }

    // Статус готовности товара
    readyDelver.classList.toggle('active', product.ready);

    // Заголовок, цена, размеры
    document.title = product.name;
    document.getElementById('item-title').textContent = product.name;
    document.getElementById('item-price').textContent = `${dollarPrice} $ / ${product.price} ₴`;
    document.getElementById('item-sizes').textContent = Object.keys(sizesObj).map(s => s.toUpperCase()).join(', ');

    // === Same products ===
    const sameContainer = document.querySelector('.same-products-container .cards-container');
    sameContainer.innerHTML = '';
    if (Array.isArray(product.same) && product.same.length > 0) {
      document.querySelector('.same-products-container').classList.add('active');
      const sameProducts = products.filter(p => product.same.includes(p.id));
      sameProducts.forEach(p => sameContainer.appendChild(createProductCard(p)));
    }

    // === Like / Random products ===
    const likeContainer = document.querySelector('.like-products-container .cards-container');
    likeContainer.innerHTML = '';
    function getRandomProducts(arr, n, excludeId) {
      const filtered = arr.filter(p => p.id !== excludeId);
      const result = [];
      const taken = new Set();

      while (result.length < n && result.length < filtered.length) {
        const idx = Math.floor(Math.random() * filtered.length);
        if (!taken.has(idx)) {
          taken.add(idx);
          result.push(filtered[idx]);
        }
      }
      return result;
    }
    const randomProducts = getRandomProducts(products, 4, product.id);
    randomProducts.forEach(p => likeContainer.appendChild(createProductCard(p)));

    revealOnScroll();

    // ================ Модалка с зумом ================

    let zoomSwiper;

    // Для тач-свайпа по модалке
    let touchStartY = 0;
    let touchEndY = 0;
    const swipeThreshold = 50;

    function closeModal() {
      modal.classList.add('hidden');
      setTimeout(() => {
        modal.style.display = 'none';
        modal.classList.remove('hidden');
        if (zoomSwiper) zoomSwiper.destroy(true, true);
        zoomSwiper = null;
        enableScroll();
      }, 300);
    }

    // Свайп
    modal.addEventListener('touchstart', (e) => {
      if (zoomSwiper && zoomSwiper.zoom.scale === 1) {
        touchStartY = e.changedTouches[0].clientY;
      }
    });

    modal.addEventListener('touchend', (e) => {
      if (zoomSwiper && zoomSwiper.zoom.scale === 1) {
        touchEndY = e.changedTouches[0].clientY;
        const diffY = touchEndY - touchStartY;
        if (Math.abs(diffY) > swipeThreshold) {
          closeModal();
        }
      }
    });

    // Скролл
    modal.addEventListener('wheel', (e) => {
      if (zoomSwiper && zoomSwiper.zoom.scale === 1 && e.deltaY > 0) {
        closeModal();
      }
    });

    // Кнопка закрытия
    document.querySelector('#img-modal .close').addEventListener('click', () => {
      closeModal();
    });


    // Клик по картинке - открываем модалку с зумом
    document.addEventListener('click', e => {
      const target = e.target;
      if (target.tagName === 'IMG' && target.closest('.swiper-slide')) {
        disableScroll();

        // Очистить слайды
        wrapper.innerHTML = '';

        // Все картинки в галерее
        const allImgs = [...document.querySelectorAll('.swiper-slide img')];

        allImgs.forEach(img => {
          const slide = document.createElement('div');
          slide.classList.add('swiper-slide');
          slide.innerHTML = `
            <div class="swiper-zoom-container">
              <img src="${img.src}" alt="">
            </div>
          `;
          wrapper.appendChild(slide);
        });

        modal.style.display = 'flex';

        if (zoomSwiper) zoomSwiper.destroy(true, true);

        zoomSwiper = new Swiper('.zoom-swiper', {
          zoom: {
            maxRatio: 3,
          },
          slidesPerView: 1,
          spaceBetween: 10,
          loop: true,
          pagination: {
            el: '.zoom-swiper .swiper-pagination',
            clickable: true,
          },
          navigation: {
            nextEl: '.zoom-swiper .swiper-button-next',
            prevEl: '.zoom-swiper .swiper-button-prev',
          },
          on: {
            zoomChange(swiper, scale, imageEl) {
              const zoomContainer = imageEl.parentElement;
              const containerRect = zoomContainer.getBoundingClientRect();

              const scaledWidth = imageEl.naturalWidth * scale;
              const scaledHeight = imageEl.naturalHeight * scale;

              const containerWidth = containerRect.width;
              const containerHeight = containerRect.height;

              const maxX = (scaledWidth - containerWidth) / 2;
              const maxY = (scaledHeight - containerHeight) / 2;

              const transform = imageEl.style.transform;
              const match = transform.match(/translate\(([-\d.]+)px,\s*([-\d.]+)px\)/);

              if (match) {
                let x = parseFloat(match[1]);
                let y = parseFloat(match[2]);

                x = Math.min(maxX, Math.max(-maxX, x));
                y = Math.min(maxY, Math.max(-maxY, y));

                imageEl.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
              }

              // Управление свайпом и скроллом при зуме
              zoomSwiper.allowTouchMove = scale <= 1;
              if (scale > 1) {
                disableScroll();
              } else {
                enableScroll();
              }
            }
          }
        });


      }
    });
  })
  .catch(() => {
    document.body.innerHTML = '<h2>Error loading product</h2>';
  });
