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
    const id = parseInt(getProductId(), 10);
    const product = products.find(p => p.id === id);

    if (!product) {
      document.body.innerHTML = '<h2>Product not found</h2>';
      return;
    }

    const sizesObj = product.sizes;
    const dollarPrice = Math.ceil(product.price * 0.024);
    const itemImgWrap = document.querySelector('.item-img-wrap');
    const readyDelver = document.querySelector('.ready-deliver');

    // Все таблицы размеров
    const tables = {
      tee: document.getElementById('sizes-tee'),
      shorts: document.getElementById('sizes-shorts'),
      tank: document.getElementById('sizes-tank'),
    };

    // Скрыть все таблицы
    Object.values(tables).forEach(table => {
      if (table) table.style.display = 'none';
    });

    // Показать нужную таблицу по типу
    const activeTable = tables[product.type];
    if (!activeTable) {
      console.warn(`Нет таблицы для типа ${product.type}`);
      return;
    }
    activeTable.style.display = '';

    // Очистить таблицу (оставляем заголовок)
    while (activeTable.rows.length > 1) {
      activeTable.deleteRow(1);
    }

    // Вспомогательная функция для создания ячейки с текстом + ' см'
    function createTd(value) {
      const td = document.createElement('td');
      td.textContent = value !== undefined ? value + ' см' : '-';
      return td;
    }

    // Заполнение строк в зависимости от типа
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

    // Картинки
    const isMobile = window.matchMedia('(max-width: 1000px)').matches;
    itemImgWrap.innerHTML = '';

    if (!isMobile) {
      // На ПК просто показываем картинки как раньше
      product.images.forEach(img => {
        const imgEl = document.createElement('img');
        imgEl.src = img;
        imgEl.alt = product.name;
        itemImgWrap.appendChild(imgEl);
      });
    } else {
      // На мобилке создаём Swiper-слайдер
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

      // Добавляем пагинацию и стрелки в контейнер
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

    document.querySelector('#img-modal .close').addEventListener('click', () => {
      document.getElementById('img-modal').style.display = 'none';
      enableScroll();
    });

    let zoomSwiper;

    document.addEventListener('click', e => {
      const target = e.target;
      if (target.tagName === 'IMG' && target.closest('.swiper-slide')) {
        const modal = document.getElementById('img-modal');
        const wrapper = document.getElementById('modal-swiper-wrapper');
        disableScroll();

        // Очистить предыдущие слайды
        wrapper.innerHTML = '';

        // Получаем список всех изображений в галерее
        const allImgs = [...document.querySelectorAll('.swiper-slide img')];
        const clickedSrc = target.src;

        // Создаем слайды
        allImgs.forEach(img => {
          const slide = document.createElement('div');
          slide.classList.add('swiper-slide');
          slide.innerHTML = `
        <div class="swiper-zoom-container">
          <img src="${img.src}" alt="">
        </div>`;
          wrapper.appendChild(slide);
        });

        modal.style.display = 'flex';

        // Инициализировать Swiper с zoom
        if (zoomSwiper) zoomSwiper.destroy(true, true);

        zoomSwiper = new Swiper('.zoom-swiper', {
  zoom: true,
  loop: true,
  slidesPerView: 1,
  spaceBetween: 10,
  resistanceRatio: 0, // 💡 минимизирует сопротивление на краях
  initialSlide: allImgs.findIndex(img => img.src === clickedSrc),
  pagination: {
    el: '.zoom-swiper .swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.zoom-swiper .swiper-button-next',
    prevEl: '.zoom-swiper .swiper-button-prev',
  },
  on: {
  touchStart() {
    const zoomEl = document.querySelector('.zoom-swiper .swiper-slide-active .swiper-zoom-container');
    const img = zoomEl?.querySelector('img');
    if (!zoomEl || !img) return;

    const scale = zoomSwiper.zoom.scale || 1;

    if (scale <= 1) {
      zoomSwiper.allowTouchMove = true;
      return;
    }

    const zoomRect = zoomEl.getBoundingClientRect();
    const imgRect = img.getBoundingClientRect();

    const scrollableX = imgRect.width > zoomRect.width;
    const scrollableY = imgRect.height > zoomRect.height;

    // 💡 Если хотя бы в одну сторону есть возможность двигать, запрещаем свайп
    if (scrollableX || scrollableY) {
      zoomSwiper.allowTouchMove = false;
    } else {
      zoomSwiper.allowTouchMove = true;
    }
  }
}

});



      }
    });

    // Закрытие
    document.querySelector('#img-modal .close').addEventListener('click', () => {
      document.getElementById('img-modal').style.display = 'none';
      if (zoomSwiper) zoomSwiper.destroy(true, true);
    });




    // Статус готовности
    readyDelver.classList.toggle('active', product.ready);

    // Название, цена, размеры
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
  })
  .catch(() => {
    document.body.innerHTML = '<h2>Error loading product</h2>';
  });
