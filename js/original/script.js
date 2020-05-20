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
    badreCaptcha: "Пожалуйста, подтвердите, что вы не бот",
  };
  // Проверка (валидация) заполнения формы
  // Проверка поля на использование только цифр и букв
  $.formUtils.addValidator({
    name: "letternumeric",
    validatorFunction: function (val, $el, config, language) {
      var patternStart =
          "^([a-zA-Z0-9\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0\u08A2-\u08AC\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097F\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191C\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA697\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA80-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC",
        patternEnd = "]+)$",
        additionalChars = $el.valAttr("allowing"),
        pattern = "";

      if (additionalChars) {
        pattern = patternStart + additionalChars + patternEnd;
        var extra = additionalChars.replace(/\\/g, "");
        if (extra.indexOf(" ") > -1) {
          extra = extra.replace(" ", "");
          extra += language.andSpaces || $.formUtils.LANG.andSpaces;
        }
        this.errorMessage = language.badAlphaNumeric + language.badAlphaNumericExtra + extra;
      } else {
        pattern = patternStart + patternEnd;
        this.errorMessage = language.badAlphaNumeric;
      }

      return new RegExp(pattern).test(val);
    },
    errorMessage: "",
    errorMessageKey: "badAlphaNumeric",
  });

  



  /*
   * Google reCaptcha 2
   */
  $.formUtils.addValidator({
    name: "recaptcha",
    validatorFunction: function (val, $el) {
      return grecaptcha.getResponse($el.valAttr("recaptcha-widget-id")) !== "";
    },
    errorMessage: "",
    errorMessageKey: "badreCaptcha",
  });

  $.fn.displayPasswordStrength = function (conf) {
    new $.formUtils.validators.validate_strength.strengthDisplay(this, conf);
    return this;
  };

  var setupGooglereCaptcha = function (evt, $forms, config) {
    if (!$forms) {
      $forms = $("form");
    }
    if (typeof grecaptcha !== "undefined" && !$.formUtils.hasLoadedGrecaptcha) {
      throw new Error("reCaptcha API can not be loaded by hand, delete reCaptcha API snippet.");
    } else if (!$.formUtils.hasLoadedGrecaptcha && $('[data-validation~="recaptcha"]', $forms).length) {
      $.formUtils.hasLoadedGrecaptcha = true;

      var src =
        "//www.google.com/recaptcha/api.js?onload=reCaptchaLoaded&render=explicit" +
        (config.lang ? "&hl=" + config.lang : "");
      var script = document.createElement("script");
      script.type = "text/javascript";
      script.async = true;
      script.defer = true;
      script.src = src;
      document.getElementsByTagName("body")[0].appendChild(script);
    }
  };

  window.reCaptchaLoaded = function ($forms) {
    if (!$forms || typeof $forms !== "object" || !$forms.length) {
      $forms = $("form");
    }

    $forms.each(function () {
      var $form = $(this),
        config = $form.get(0).validationConfig || $form.context.validationConfig || false;

      if (config) {
        $('[data-validation~="recaptcha"]', $form).each(function () {
          var $input = $(this),
            div = document.createElement("DIV"),
            siteKey = config.reCaptchaSiteKey || $input.valAttr("recaptcha-sitekey"),
            theme = config.reCaptchaTheme || $input.valAttr("recaptcha-theme") || "light",            
            size = config.reCaptchaSize || $input.valAttr("recaptcha-size") || "normal",
            type = config.reCaptchaType || $input.valAttr("recaptcha-type") || "image";

          if (!siteKey) {
            throw new Error("Google reCaptcha site key is required.");
          }

          var widgetId = grecaptcha.render(div, {
            sitekey: siteKey,
            theme: theme,
            size: size,
            type: type,
            callback: function (result) {
              $form.find('[data-validation~="recaptcha"]').trigger("validation", result && result !== "");
            },
            "expired-callback": function () {
              $form.find('[data-validation~="recaptcha"]').trigger("validation", false);
            },
          });
          $input
            .valAttr("recaptcha-widget-id", widgetId)
            .hide()
            .on("beforeValidation", function (evt) {
              // prevent validator from skipping this input because its hidden
              evt.stopImmediatePropagation();
            })
            .parent()
            .append(div);
        });
      }
    });
  };

  $(window).on("validatorsLoaded formValidationSetup", setupGooglereCaptcha);

  $.formUtils.addValidator({
    name: "phone",
    validatorFunction: function (string) {
      // validates telefones such as (having X as numbers):
      // (XX) XXXX-XXXX
      // (XX) XXXXX-XXXX
      // XX XXXXXXXX
      // XX XXXXXXXXX
      // XXXXXXXXXX
      // XXXXXXXXXXX
      // +XX XX XXXXX-XXXX
      // +X XX XXXX-XXXX
      // And so on…

      if (
        string.match(/^(\+[\d]{1,3}[\s]{0,1}){0,1}(\(){0,1}(\d){2}(\)){0,1}(\s){0,1}(\d){4,5}([-. ]){0,1}(\d){4}$/g)
      ) {
        return true;
      }

      return false;
    },
    errorMessage: "",
    errorMessageKey: "badTelephone",
  });

  /* Ajax-запрос */

  $(".popup__form").submit(function (event) {
    /* отключение стандартной отправки формы */
    event.preventDefault();
  });

  $.validate({
    language: myLanguage,
    form: ".popup__form",
    reCaptchaSiteKey: "6LeC8PkUAAAAAAUkgB7inLa37gjEsGIvNZ1nB7R3",
    reCaptchaTheme: "light",
    scrollToTopOnError: false, // Set this property to true on longer forms
    onSuccess: function SendPost() {
      // Наша функция, которая будет осуществлять ajax-отправку
      $.ajax({
        // Начала конструкции для работы с Ajax через jQuery
        type: "POST", // Метод, которым получаем данные из формы
        url: "mail.php", // Обработчик формы.
        data: $(".popup__form").serialize(), // Этот метод, берет форму с id=form и достает оттуда данные
        error: function () {
          $(".popup__results").html("Произошла ошибка! Попробуйте снова");
        },
        /* если произойдет ошибка в элементе с id erconts выведится сообщение*/

        beforeSend: function () {
          $(".popup__form").slideUp(250, function () {
            $(".popup__title").html("Отправляем данные...");
          });
        },
        success: function (result) {
          /* В случае удачной обработки и отправки выполнится следующий код*/
          $(".popup__title").html("Спасибо за заявку!");
        },
      });
    },
  });
});
