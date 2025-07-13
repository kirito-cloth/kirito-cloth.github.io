import { createProductCard } from '/productCard.js';
import { revealOnScroll } from '/scrollReveal.js';
import { getFavorites, setFavorites, toggleFavorite } from '/favorites.js';
import { disableScroll, enableScroll } from '/openMenu.js';

const path = window.location.pathname;
let lang = 'ua'; // язык по умолчанию

if (path.startsWith('/ru')) lang = 'ru';
else if (path.startsWith('/en')) lang = 'en';


const i18n = {
  ua: {
    catalog: 'Каталог товарів',
    favorites: 'Обрані',
    searchResults: (q) => `Результати пошуку "${q}"`,
    loadingError: 'Помилка завантаження товарів',
    noProducts: 'Товарів не знайдено',

    filters: {
      brand: 'Бренд',
      size: 'Розмір',
      type: 'Тип',
      color: 'Колір',
      price: 'Ціна',
      apply: 'Застосувати',
      reset: 'Скинути фільтри',
      show: 'Показати',
    },

    types: {
      tee: 'Футболки',
      tank: 'Майки',
      shorts: 'Шорти',
    }
  },

  ru: {
    catalog: 'Каталог товаров',
    favorites: 'Избранное',
    searchResults: (q) => `Результаты поиска "${q}"`,
    loadingError: 'Ошибка загрузки товаров',
    noProducts: 'Товаров не найдено',

    filters: {
      brand: 'Бренд',
      size: 'Размер',
      type: 'Тип',
      color: 'Цвет',
      price: 'Цена',
      apply: 'Применить',
      reset: 'Сбросить фильтры',
      show: 'Показать',
    },

    types: {
      tee: 'Футболки',
      tank: 'Майки',
      shorts: 'Шорты',
    }
  },

  en: {
    catalog: 'Product Catalog',
    favorites: 'Favorites',
    searchResults: (q) => `Search results for "${q}"`,
    loadingError: 'Failed to load products',
    noProducts: 'No products found',

    filters: {
      brand: 'Brand',
      size: 'Size',
      type: 'Type',
      color: 'Color',
      price: 'Price',
      apply: 'Apply',
      reset: 'Reset filters',
      show: 'Show',
    },

    types: {
      tee: 'T-Shirts',
      tank: 'Tank Tops',
      shorts: 'Shorts',
    }
  }
};



window.addEventListener('DOMContentLoaded', () => {
  let allProducts = [];
  let filteredProducts = [];

  const container = document.querySelector('.cards-container');
  const brandGroup = document.getElementById('filter-brand-group');
  const sizeGroup = document.getElementById('filter-size-group');
  const typeGroup = document.getElementById('filter-type-group');
  const colorGroup = document.getElementById('filter-color-group'); // Статичный в HTML
  const sortSelect = document.getElementById('sort-price');
  const sortSelected = sortSelect.querySelector('.selected-option');
  const sortOptions = sortSelect.querySelectorAll('.option');

  const resetBtn = document.getElementById('reset-filters');
  const applyAllBtn = document.getElementById('apply-all-btn'); // Общая кнопка применить

  const searchInput = document.getElementById('global-search-input');
  const catalogTitle = document.getElementById('catalog-title');
  const searchResultsTitle = document.getElementById('search-results-title');

  const slider = document.getElementById('doubleRangeSlider');
  const sliderRange = document.getElementById('sliderRange');
  const thumbMin = document.getElementById('thumbMin');
  const thumbMax = document.getElementById('thumbMax');
  const priceMinDisplay = document.getElementById('price-min-value');
  const priceMaxDisplay = document.getElementById('price-max-value');

  const applyPriceBtn = document.getElementById('apply-price-btn');
  const applyBrandBtn = document.getElementById('apply-brand-btn');
  const applySizeBtn = document.getElementById('apply-size-btn');
  const applyTypeBtn = document.getElementById('apply-type-btn');
  const applyColorBtn = document.getElementById('apply-color-btn');

  const noProductsMsg = document.getElementById('no-products-msg');

  const filtersHeader = document.querySelector('div.filters-header');

  function fixKeyboardLayout(input) {
    const layoutMap = {
      'й': 'q', 'ц': 'w', 'у': 'e', 'к': 'r', 'е': 't', 'н': 'y', 'г': 'u', 'ш': 'i', 'щ': 'o', 'з': 'p',
      'х': '[', 'ъ': ']', 'ф': 'a', 'ы': 's', 'в': 'd', 'а': 'f', 'п': 'g', 'р': 'h', 'о': 'j', 'л': 'k', 'д': 'l',
      'ж': ';', 'э': '\'', 'я': 'z', 'ч': 'x', 'с': 'c', 'м': 'v', 'и': 'b', 'т': 'n', 'ь': 'm', 'б': ',', 'ю': '.',
      'ё': '`'
    };

    return input.split('').map(char => {
      const lowerChar = char.toLowerCase();
      const mapped = layoutMap[lowerChar] || char;
      return char === lowerChar ? mapped : mapped.toUpperCase();
    }).join('');
  }
  function transliterate(text) {
    const map = {
      'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo',
      'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm',
      'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
      'ф': 'f', 'х': 'kh', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'shch',
      'ы': 'y', 'э': 'e', 'ю': 'yu', 'я': 'ya', 'ь': '', 'ъ': '',

      // Украинские
      'ґ': 'g', 'є': 'ye', 'і': 'i', 'ї': 'yi',

      // Заглавные буквы
      'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'G', 'Д': 'D', 'Е': 'E', 'Ё': 'Yo',
      'Ж': 'Zh', 'З': 'Z', 'И': 'I', 'Й': 'Y', 'К': 'K', 'Л': 'L', 'М': 'M',
      'Н': 'N', 'О': 'O', 'П': 'P', 'Р': 'R', 'С': 'S', 'Т': 'T', 'У': 'U',
      'Ф': 'F', 'Х': 'Kh', 'Ц': 'Ts', 'Ч': 'Ch', 'Ш': 'Sh', 'Щ': 'Shch',
      'Ы': 'Y', 'Э': 'E', 'Ю': 'Yu', 'Я': 'Ya', 'Ь': '', 'Ъ': '',
      'Ґ': 'G', 'Є': 'Ye', 'І': 'I', 'Ї': 'Yi'
    };

    return text.split('').map(char => map[char] || char).join('');
  }


  let priceMinGlobal = 0;
  let priceMaxGlobal = 10000;
  let currentMin = 0;
  let currentMax = 10000;
  const minGap = 100;
  let activeThumb = null;
  let priceFilterActive = false;
  let sliderRect = null;

  const PRODUCTS_PER_BATCH = 12;
  let renderedCount = 0;
  let loading = false;
  let initialRenderDone = false;

  // Состояние фильтров
  const selectedFilters = {
    brand: [],
    size: [],
    type: [],
    color: [],
    priceMin: priceMinGlobal,
    priceMax: priceMaxGlobal,
  };

  // Состояние поиска
  let searchQuery = '';

  resetBtn.textContent = i18n[lang].filters.reset;
  applyBrandBtn.textContent = i18n[lang].filters.apply;
  applySizeBtn.textContent = i18n[lang].filters.apply;
  applyTypeBtn.textContent = i18n[lang].filters.apply;
  applyColorBtn.textContent = i18n[lang].filters.apply;
  applyPriceBtn.textContent = i18n[lang].filters.apply;

  fetch('/products.json')
    .then(res => res.json())
    .then(products => {
      allProducts = products;
      const prices = products.map(p => p.price);
      priceMinGlobal = Math.min(...prices);
      priceMaxGlobal = Math.max(...prices);
      currentMin = priceMinGlobal;
      currentMax = priceMaxGlobal;

      selectedFilters.priceMin = priceMinGlobal;
      selectedFilters.priceMax = priceMaxGlobal;

      populateFilters(products);
      applyFiltersFromURL();
      updateSliderUI();
      window.addEventListener('scroll', checkScrollNearBottom);

    })
    .catch(() => {
      document.body.innerHTML = `<h2>${i18n[lang].loadingError}</h2>`;
    });

  function createCheckbox(name, value) {
    const wrapper = document.createDocumentFragment(); // обёртка для label + br

    const label = document.createElement('label');
    label.className = 'custom-checkbox';

    const input = document.createElement('input');
    input.type = 'checkbox';
    input.name = name;
    input.value = value;

    const checkmark = document.createElement('span');
    checkmark.className = 'checkmark';

    label.appendChild(input);
    label.appendChild(checkmark);
    label.append(` ${value}`);

    wrapper.appendChild(label);
    wrapper.appendChild(document.createElement('br')); // добавляем <br>

    return wrapper;
  }

  // Обработчик для кнопок применить внутри фильтров
  document.querySelectorAll('.apply-filter-btn').forEach(button => {
    button.addEventListener('click', () => {
      const filterGroup = button.closest('.filter-group');
      if (filterGroup) filterGroup.classList.remove('active');
      applyAllBtn.textContent = `${i18n[lang].filters.show} (${countFilteredProductsPreview()})`;
    });
  });


  function openFilters() {
    document.querySelector('#filters').classList.add('active');
    document.querySelector('.overlay').classList.add('active');
    document.body.classList.add('no-scroll');

    disableScroll();
  }

  function closeFilters() {
    document.querySelector('#filters').classList.remove('active');
    document.querySelector('.overlay').classList.remove('active');
    enableScroll();
  }


  document.querySelector('#close-filters').addEventListener('click', (e) => {
    closeFilters();
  })
  document.querySelector('.overlay').addEventListener('click', () => {
    closeFilters();

  });

  document.querySelector('#filters-button').addEventListener('click', (e) => {
    openFilters();
    applyAllBtn.textContent = `${i18n[lang].filters.show} (${countFilteredProductsPreview()})`;
  })

  function updateFiltersHeaderVisibility() {
    if (!filtersHeader) return;
    if (showFavorites) {
      filtersHeader.classList.add('hidden');
    } else {
      filtersHeader.classList.remove('hidden');
    }
  }



  function populateFilters(products) {
    const brands = new Set();
    const sizes = new Set();
    const types = new Set();

    products.forEach(p => {
      if (p.brand) brands.add(p.brand);
      if (p.type) types.add(p.type);
      Object.keys(p.sizes).forEach(size => sizes.add(size.toUpperCase()));
    });

    brandGroup.innerHTML = '';
    [...brands].sort().forEach(brand => brandGroup.appendChild(createCheckbox('brand', brand)));

    sizeGroup.innerHTML = '';
    [...sizes].sort().forEach(size => sizeGroup.appendChild(createCheckbox('size', size)));
  }

  function getSelectedValues(group) {
    return Array.from(group.querySelectorAll('input:checked')).map(cb => cb.value);
  }

  function getSelectedLabels(group) {
    return Array.from(group.querySelectorAll('input:checked'))
      .map(cb => cb.parentElement.textContent.trim());
  }


  function initSelectedFilters() {
    selectedFilters.brand = getSelectedValues(brandGroup);
    selectedFilters.size = getSelectedValues(sizeGroup);
    selectedFilters.type = getSelectedValues(typeGroup);
    selectedFilters.color = getSelectedValues(colorGroup);
    selectedFilters.priceMin = currentMin;
    selectedFilters.priceMax = currentMax;
  }

  let showFavorites = false;

  function applyFiltersFromURL() {
    const params = new URLSearchParams(window.location.search);
    const selectedBrands = params.getAll('brand');
    const selectedSizes = params.getAll('size');
    const selectedTypes = params.getAll('type');
    const selectedColors = params.getAll('color');
    const sort = params.get('sort') || '';
    const priceMin = params.get('priceMin');
    const priceMax = params.get('priceMax');
    const search = params.get('search') || '';
    showFavorites = params.get('favorites') === 'true';

    updateFiltersHeaderVisibility();

    if (sort === 'asc' || sort === 'desc') {
      sortSelected.setAttribute('data-value', sort);

      const optionEl = [...sortOptions].find(opt => opt.getAttribute('data-value') === sort);
      if (optionEl) {
        const textEl = sortSelected.querySelector('p');
        if (textEl) textEl.textContent = optionEl.textContent;
      }
    } else {
      sortSelected.setAttribute('data-value', '');
    }

    brandGroup.querySelectorAll('input').forEach(i => (i.checked = selectedBrands.includes(i.value)));
    sizeGroup.querySelectorAll('input').forEach(i => (i.checked = selectedSizes.includes(i.value)));
    typeGroup.querySelectorAll('input').forEach(i => (i.checked = selectedTypes.includes(i.value)));
    colorGroup.querySelectorAll('input').forEach(i => (i.checked = selectedColors.includes(i.value)));

    sortSelect.value = sort;

    if (priceMin || priceMax) {
      currentMin = priceMin ? Math.max(priceMinGlobal, +priceMin) : priceMinGlobal;
      currentMax = priceMax ? Math.min(priceMaxGlobal, +priceMax) : priceMaxGlobal;
      priceFilterActive = true; // ← вот ключевой момент
    } else {
      currentMin = priceMinGlobal;
      currentMax = priceMaxGlobal;
      priceFilterActive = false;
    }

    searchQuery = search;

    enforceMinGap();
    updateSliderUI();

    initSelectedFilters();

    filterAndRender(true);
    fillPageInitially();

    updateTitles();
    updateFilterButtonLabels();


  }


  function updateURL() {
    const params = new URLSearchParams();
    selectedFilters.brand.forEach(v => params.append('brand', v));
    selectedFilters.size.forEach(v => params.append('size', v));
    selectedFilters.type.forEach(v => params.append('type', v));
    selectedFilters.color.forEach(v => params.append('color', v));
    const sortValue = sortSelected.getAttribute('data-value');
    if (sortValue) params.set('sort', sortValue);

    // Только добавляем priceMin/Max если фильтр активен
    if (priceFilterActive) {
      params.set('priceMin', Math.round(selectedFilters.priceMin));
      params.set('priceMax', Math.round(selectedFilters.priceMax));
    }

    if (searchQuery) params.set('search', searchQuery);
    history.replaceState(null, '', `${window.location.pathname}?${params}`);
  }

  function checkScrollNearBottom() {
    if (loading) return;

    const footer = document.querySelector('footer');
    if (!footer) return;

    const footerHeight = footer.offsetHeight;
    const scrollThreshold = 200; // можно регулировать

    const scrolledToBottom =
      window.innerHeight + window.scrollY >= document.body.offsetHeight - footerHeight - scrollThreshold;

    if (scrolledToBottom) {
      renderNextBatch();
    }
  }

  function countFilteredProductsPreview() {
    const previewFilters = {
      brand: getSelectedValues(brandGroup),
      size: getSelectedValues(sizeGroup),
      type: getSelectedValues(typeGroup),
      color: getSelectedValues(colorGroup),
      priceMin: currentMin,
      priceMax: currentMax,
    };

    const noFiltersSelected =
      previewFilters.brand.length === 0 &&
      previewFilters.size.length === 0 &&
      previewFilters.type.length === 0 &&
      previewFilters.color.length === 0 &&
      previewFilters.priceMin === priceMinGlobal &&
      previewFilters.priceMax === priceMaxGlobal;

    if (noFiltersSelected) {
      return allProducts.length;
    }

    let result = [...allProducts];

    if (previewFilters.brand.length)
      result = result.filter(p => previewFilters.brand.includes(p.brand));

    if (previewFilters.size.length)
      result = result.filter(p =>
        Object.keys(p.sizes).some(s => previewFilters.size.includes(s.toUpperCase()))
      );

    if (previewFilters.type.length)
      result = result.filter(p => previewFilters.type.includes(p.type));

    if (previewFilters.color.length)
      result = result.filter(p =>
        p.color && previewFilters.color.includes(p.color.toLowerCase())
      );

    result = result.filter(p =>
      p.price >= previewFilters.priceMin && p.price <= previewFilters.priceMax
    );

    return result.length;
  }



  function filterAndRender(reset = false) {
    if (reset) {
      renderedCount = 0;
      container.innerHTML = '';
      initialRenderDone = false;
    }

    filteredProducts = [...allProducts];

    // Фильтруем по бренду
    if (selectedFilters.brand.length)
      filteredProducts = filteredProducts.filter(p => selectedFilters.brand.includes(p.brand));

    // Фильтруем по размерам
    if (selectedFilters.size.length)
      filteredProducts = filteredProducts.filter(p => Object.keys(p.sizes).some(s => selectedFilters.size.includes(s.toUpperCase())));

    // По типу
    if (selectedFilters.type.length)
      filteredProducts = filteredProducts.filter(p => selectedFilters.type.includes(p.type));

    // По цвету
    if (selectedFilters.color.length)
      filteredProducts = filteredProducts.filter(p => p.color && selectedFilters.color.includes(p.color.toLowerCase()));

    // По цене
    if (priceFilterActive) {
      filteredProducts = filteredProducts.filter(p =>
        p.price >= selectedFilters.priceMin && p.price <= selectedFilters.priceMax
      );
    }

    // По поиску
    if (searchQuery.trim() !== '') {
      const original = searchQuery.trim();
      const fixedLayout = fixKeyboardLayout(original);
      const translit = transliterate(original);

      const fuse = new Fuse(filteredProducts, {
        keys: ['name', 'brand'],
        threshold: 0.4,
        ignoreLocation: true,
        minMatchCharLength: 2,
      });

      const combinedResults = new Map();

      // Ищем по всем трём вариантам
      [original, fixedLayout, translit].forEach(term => {
        fuse.search(term).forEach(res => combinedResults.set(res.item.id, res.item));
      });

      filteredProducts = Array.from(combinedResults.values());
    }



    // Вот здесь — фильтр по избранному **после всех остальных фильтров**:
    if (showFavorites) {
      const favorites = getFavorites();
      filteredProducts = filteredProducts.filter(p => favorites.includes(p.id));
    }

    updateFiltersHeaderVisibility();

    // Сортировка
    const sortValue = sortSelected.getAttribute('data-value');
    if (sortValue === 'asc') filteredProducts.sort((a, b) => a.price - b.price);
    if (sortValue === 'desc') filteredProducts.sort((a, b) => b.price - a.price);

    renderNextBatch();

    updateTitles();
  }

  let isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  if (!isTouchDevice) {
    // Десктоп — hover
    sortSelect.addEventListener('mouseenter', () => {
      sortSelect.classList.add('hovering');
    });

    sortSelect.addEventListener('mouseleave', () => {
      sortSelect.classList.remove('hovering');
    });
  } else {
    // Мобилка — toggle по клику
    sortSelected.addEventListener('click', (e) => {
      e.stopPropagation(); // чтобы не закрывало само себя
      sortSelect.classList.toggle('hovering');
    });

    // Закрытие при клике вне блока
    document.addEventListener('click', (e) => {
      if (!sortSelect.contains(e.target)) {
        sortSelect.classList.remove('hovering');
      }
    });
  }


  function renderNextBatch() {
    if (loading) return;
    loading = true;

    const nextBatch = filteredProducts.slice(renderedCount, renderedCount + PRODUCTS_PER_BATCH);

    if (nextBatch.length === 0) {
      if (renderedCount === 0) noProductsMsg.style.display = 'flex';
      loading = false;
      return;
    }

    noProductsMsg.style.display = 'none';
    nextBatch.forEach(p => container.appendChild(createProductCard(p)));
    renderedCount += nextBatch.length;
    loading = false;

    revealOnScroll(); // <--- ДОБАВИЛИ ЭТО

    if (initialRenderDone && window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
      renderNextBatch();
    } else {
      initialRenderDone = true;
    }
  }

  function fillPageInitially() {
    let batchesLoaded = 0;
    const maxBatches = 10;
    function loadBatch() {
      renderNextBatch();
      batchesLoaded++;
      if (batchesLoaded < maxBatches && window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        setTimeout(loadBatch, 100);
      }
    }
    loadBatch();
  }

  function enforceMinGap() {
    if (currentMax - currentMin < minGap) {
      if (activeThumb === thumbMin) currentMin = currentMax - minGap;
      else if (activeThumb === thumbMax) currentMax = currentMin + minGap;
    }
  }

  function updateFiltersCountBadge() {
  const filtersAmountEl = document.getElementById('filters-button-amount');

  let activeCount = 0;
  if (selectedFilters.brand.length) activeCount++;
  if (selectedFilters.size.length) activeCount++;
  if (selectedFilters.type.length) activeCount++;
  if (selectedFilters.color.length) activeCount++;
  if (priceFilterActive) activeCount++;

  if (activeCount > 0) {
    filtersAmountEl.classList.add('active');
    filtersAmountEl.querySelector('span').textContent = activeCount;
  } else {
    filtersAmountEl.classList.remove('active');
    filtersAmountEl.querySelector('span').textContent = '';
  }
}


  function updateSliderUI() {
    const range = priceMaxGlobal - priceMinGlobal;
    const leftPercent = ((currentMin - priceMinGlobal) / range) * 100;
    const rightPercent = ((priceMaxGlobal - currentMax) / range) * 100;

    thumbMin.style.left = `${leftPercent}%`;
    thumbMax.style.left = `${100 - rightPercent}%`;
    sliderRange.style.left = `${leftPercent}%`;
    sliderRange.style.right = `${rightPercent}%`;

    priceMinDisplay.textContent = `${Math.round(currentMin)}`;
    priceMaxDisplay.textContent = `${Math.round(currentMax)}`;
  }

  function onPointerDown(e) {
    activeThumb = e.target;
    sliderRect = slider.getBoundingClientRect();
    activeThumb.setPointerCapture(e.pointerId);
  }

  function onPointerMove(e) {
    if (!activeThumb) return;
    let x = e.clientX - sliderRect.left;
    if (x < 0) x = 0;
    if (x > sliderRect.width) x = sliderRect.width;
    const percent = x / sliderRect.width;
    const value = priceMinGlobal + percent * (priceMaxGlobal - priceMinGlobal);
    if (activeThumb === thumbMin) currentMin = Math.min(value, currentMax - minGap);
    if (activeThumb === thumbMax) currentMax = Math.max(value, currentMin + minGap);
    enforceMinGap();
    updateSliderUI();
  }

  function onPointerUp(e) {
    if (!activeThumb) return;
    activeThumb.releasePointerCapture(e.pointerId);
    activeThumb = null;
  }

  thumbMin.addEventListener('pointerdown', onPointerDown);
  thumbMax.addEventListener('pointerdown', onPointerDown);
  window.addEventListener('pointermove', onPointerMove);
  window.addEventListener('pointerup', onPointerUp);

  // Индивидуальные кнопки обновляют selectedFilters, но не вызывают рендер
  applyBrandBtn.addEventListener('click', () => {
    selectedFilters.brand = getSelectedValues(brandGroup);
  });
  applySizeBtn.addEventListener('click', () => {
    selectedFilters.size = getSelectedValues(sizeGroup);
  });
  applyTypeBtn.addEventListener('click', () => {
    selectedFilters.type = getSelectedValues(typeGroup);
  });
  applyColorBtn.addEventListener('click', () => {
    selectedFilters.color = getSelectedValues(colorGroup); // ← оставить так, если нужен `value`
    updateFilterButtonLabels();
  });

  applyPriceBtn.addEventListener('click', () => {
    selectedFilters.priceMin = currentMin;
    selectedFilters.priceMax = currentMax;
  });

  // Общая кнопка применить — применяет все фильтры сразу
  applyAllBtn.addEventListener('click', () => {
    closeFilters();
    updateURL();
    filterAndRender(true);
    fillPageInitially();
    updateFiltersCountBadge();
  });

  sortOptions.forEach(option => {
    option.addEventListener('click', () => {
      const value = option.getAttribute('data-value');

      const textEl = sortSelected.querySelector('p');
      if (textEl) textEl.textContent = option.textContent;

      sortSelected.setAttribute('data-value', value);
      sortSelect.classList.remove('hovering');

      updateURL();
      filterAndRender(true);
      fillPageInitially();
    });
  });

  resetBtn.addEventListener('click', () => {
    [brandGroup, sizeGroup, typeGroup, colorGroup].forEach(group => {
      group.querySelectorAll('input').forEach(cb => (cb.checked = false));
    });

    sortSelect.value = '';
    currentMin = priceMinGlobal;
    currentMax = priceMaxGlobal;
    updateSliderUI();

    selectedFilters.brand = [];
    selectedFilters.size = [];
    selectedFilters.type = [];
    selectedFilters.color = [];
    selectedFilters.priceMin = priceMinGlobal;
    selectedFilters.priceMax = priceMaxGlobal;
    priceFilterActive = false;

    searchQuery = '';
    searchInput.value = '';

    updateURL();
    updateFilterButtonLabels();
    updateFiltersCountBadge();

    closeFilters();           // ← Закрываем .filters
    filterAndRender(true);    // ← Обновляем карточки
    fillPageInitially();      // ← Заполняем по батчам

    applyAllBtn.textContent = `${i18n[lang].filters.show} (${countFilteredProductsPreview()})`;
  });


  // Управление заголовками при поиске
  function updateTitles() {
    if (showFavorites) {
      catalogTitle.style.display = 'block';
      catalogTitle.textContent = i18n[lang].favorites;
      searchResultsTitle.style.display = 'none';
    } else if (searchQuery.trim() !== '') {
      catalogTitle.style.display = 'none';
      searchResultsTitle.style.display = 'block';
      searchResultsTitle.textContent = i18n[lang].searchResults(searchQuery);
    } else {
      catalogTitle.style.display = 'block';
      catalogTitle.textContent = i18n[lang].catalog;
      searchResultsTitle.style.display = 'none';
    }
  }

  function updateFilterButtonLabels() {
  const map = {
    type: i18n[lang].types,
    brand: {},
    size: {},
    // color: i18n[lang].colors, // Убираем
  };

  document.querySelectorAll('.custom-checkbox').forEach(label => {
  const color = label.dataset.color;
  const dot = label.querySelector('.color-dot');
  if (dot && color) {
    dot.style.backgroundColor = color;
  }
});


  // Динамически добавить бренды и размеры
  document.querySelectorAll('#filter-brand-group input').forEach(input => {
    map.brand[input.value] = input.value;
  });
  document.querySelectorAll('#filter-size-group input').forEach(input => {
    map.size[input.value.toUpperCase()] = input.value.toUpperCase();
  });

  const buttonMap = {
    type: 'filter-group-category',
    brand: 'filter-group-brand',
    size: 'filter-group-size',
    color: 'filter-group-color',
    price: 'filter-group-price',
  };

  // Переводим названия фильтров (например: "Ціна", "Бренд"...)
  Object.entries(buttonMap).forEach(([filterKey, groupId]) => {
    const btn = document.querySelector(`.menu-wrap-button[data-filter-group-id="${groupId}"]`);
    if (!btn) return;

    const label = btn.querySelector('.menu-wrap-button-title');
    if (label && i18n[lang].filters[filterKey]) {
      label.textContent = i18n[lang].filters[filterKey];
    }
  });

  Object.entries(buttonMap).forEach(([filterKey, groupId]) => {
    const btn = document.querySelector(`.menu-wrap-button[data-filter-group-id="${groupId}"]`);
    if (!btn) return;

    const span = btn.querySelector('.menu-wrap-button-choice');
    let values = selectedFilters[filterKey];

    if (!Array.isArray(values)) {
      if (filterKey === 'price') {
        if (priceFilterActive) {
          values = [`${Math.round(selectedFilters.priceMin)} - ${Math.round(selectedFilters.priceMax)} ₴`];
        } else {
          values = [];
        }
      } else {
        values = [];
      }
    }

    let mapped;

    if (filterKey === 'color') {
      mapped = values.map(v => {
        const input = document.querySelector(`#filter-color-group input[value="${v}"]`);
        if (input) {
          // Берём текст из label (удаляем чекбокс, просто textContent)
          return input.parentElement.textContent.trim();
        }
        return v;
      });
    } else {
      mapped = values.map(v => map[filterKey]?.[v] || v);
    }

    span.textContent = mapped.length ? mapped.join(', ') : '';
  });

  }
  applyBrandBtn.addEventListener('click', () => {
    selectedFilters.brand = getSelectedValues(brandGroup);
    updateFilterButtonLabels();
  });
  applySizeBtn.addEventListener('click', () => {
    selectedFilters.size = getSelectedValues(sizeGroup);
    updateFilterButtonLabels();
  });
  applyTypeBtn.addEventListener('click', () => {
    selectedFilters.type = getSelectedValues(typeGroup);
    updateFilterButtonLabels();
  });
  applyColorBtn.addEventListener('click', () => {
    selectedFilters.color = getSelectedValues(colorGroup);
    updateFilterButtonLabels();
  });
  applyPriceBtn.addEventListener('click', () => {
    selectedFilters.priceMin = currentMin;
    selectedFilters.priceMax = currentMax;
    priceFilterActive = true;
    updateFilterButtonLabels();
  });

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target); // Отключаем, чтобы не триггерилось повторно
      }
    });
  }, {
    threshold: 0.1 // Можно регулировать, когда считать карточку "видимой"
  });
  revealOnScroll();

  updateFiltersHeaderVisibility();



});
