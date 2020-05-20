$(document).ready(function () {
  /* -- Меню сайта в мобильном и планшетном варианте -- */
  function MenuHeader() {
    // Задаем функцию
    /* -- Меняем CSS нашего меню -- */
    $(".header__menu").find(".menu").toggleClass("menu_mobile");
    $(".header__menu").find("li").toggleClass("menu__item_mobile").toggleClass("menu__item_row");
    /* -- Меняем изображение кнопки -- */
    $(".header__btn-menu").toggleClass("header__btn-menu_active");
  }
  // Обрабатываем нажатие кнопки Меню
  $(".header__btn-menu").click(function () {
    /* -- Проверяем наличие класса -- */
    if ($(".header__menu").find(".menu").hasClass("menu_mobile") == false) {
      /* -- Показываем меню -- */
      MenuHeader();
      $(".header__menu").show().find(".menu").hide().slideDown(250);
    } else {
      /* -- Скрываем меню -- */
      $(".header__menu")
        .find(".menu")
        .slideUp(250, function () {
          $(".header__menu").hide();
          MenuHeader();
        });
    }
  });

  /* -- Плавный скролл к секции -- */
  $(".menu__link").click(function (e) {
    e.preventDefault();

    let href = $(this).attr("href");
    let offset = $(href).offset().top;

    $("body, html").animate(
      {
        scrollTop: offset,
      },
      500
    );
  });

  /* -- Включение анимации Тегов при загрузки страницы -- */
  /* -- Добавляем классы с анимацией для Тегов Header -- */
  $(".elements").addClass("elements_active");
  /* -- Добавляем классы с анимацией для Тегов Main Banner -- */
  $(".cost-elements").addClass("cost-elements_active");

  // События клика по кнопкам заказа звонка
  function BtnClick() {
    $(".popup-container").css("display", "flex").hide().fadeIn(250);
    $(".popup").css("display", "flex").hide().fadeIn(250);
    $("html").addClass("stop-scrolling"); // Запрет скроллинга на странице
    $(".popup__close").click(function () {
      // Кнопка закрытия формы
      $(".popup-container").fadeOut(250); // Скрываем форму
      $("html").removeClass("stop-scrolling"); //Отменяем запрет скроллинга
      $(".popup__form").get(0).reset();
    });
  }
  // Скрываем всплывающие окно по клику не в форме
  $(".popup-container").click(function (event) {
    if (event.target == this) {
      $(".popup-container").fadeOut(250); // Скрываем форму
      $("html").removeClass("stop-scrolling");
      $(".popup__form").get(0).reset();
    }
  });

  // Клик по кнопке с формой email
  $(".btn-more").click(function () {
    if ($(".popup-container").css("display") == "none") {
      BtnClick();
      $(".form-popup__group_hide").show();
      $("#form-popup_email").attr("data-validation", "email");
    }
  });
  // Клик по кнопке с формой без email
  $(".btn-bell").click(function () {
    BtnClick();
    $(".form-popup__group_hide").hide();
    $("#form-popup_email").removeAttr("data-validation");
  });

  /* -- Настройка слайдера в секции примеров работ -- */
  new Swiper(".slider-wrapper", {
    slidesPerView: 1,
    spaceBetween: 20,
    breakpoints: {
      // when window width is >= 576px
      576: {
        slidesPerView: 2,
        spaceBetween: 35,
      },
      // when window width is >= 1200px
      1200: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },

    loop: true,
    slideClass: "slider-wrapper__item",
    wrapperClass: "slider-wrapper__list",
    pagination: {
      el: ".slider-wrapper__paginator",
      type: "bullets",
      bulletClass: "paginator-slider__item",
      bulletActiveClass: "paginator-slider__item_active",
      clickable: true,
    },
    navigation: {
      nextEl: ".slider-wrapper__btn_right",
      prevEl: ".slider-wrapper__btn_left",
    },
    a11y: {
      prevSlideMessage: "Предыдущий слайд",
      nextSlideMessage: "Следующий слайд",
      paginationBulletMessage: "Перейти к слайду {{index}}",
    },
  });

  // Всплывающие окно обратного звонка
  // Перевод формы валидации
  var myLanguage = {
    errorTitle: "Ошибка отправки формы!",
    requiredField: "Это обязательное поле",
    requiredFields: "Вы задали не все обязательные поля",
    badEmail: "Вы задали некорректный e-mail",
    badTelephone: "Вы задали некорректный номер телефона",
    badSecurityAnswer: "Вы задали некорректный ответ на секретный вопрос",
    lengthBadStart: "Значение должно быть в диапазоне ",
    lengthBadEnd: " символов",
    lengthTooLongStart: "Значение длинее, чем ",
    lengthTooShortStart: "Значение меньше, чем ",
    notConfirmed: "Введённые значения не могут быть подтверждены",
    badDomain: "Некорректное значение домена",
    badUrl: "Некорретный URL",
    badCustomVal: "Введённое значение неверно",
    andSpaces: " и пробелы ",
    badInt: "Значение - не число",
    badNumberOfSelectedOptionsStart: "Вы должны выбрать как минимум ",
    badNumberOfSelectedOptionsEnd: " ответов",
    badAlphaNumeric: "Значение должно содержать только числа и буквы ",
    badAlphaNumericExtra: " и ",
    groupCheckedRangeStart: "Выберите между ",
    groupCheckedTooFewStart: "Выберите как минимум ",
    groupCheckedTooManyStart: "Выберите максимум из ",
    groupCheckedEnd: " элемент(ов)",
    min: "минимум",
    max: "максимум",
  };
  //Проверка заполнения формы
  $.validate({
    language: myLanguage,
    form: ".popup__form",
    scrollToTopOnError: false, // Set this property to true on longer forms
  });
});
