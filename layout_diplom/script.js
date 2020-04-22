$(function () {
  /* -- Включение анимации Тегов при загрузки страницы -- */
  window.onload = function () {
    /* -- Добавляем классы с анимацией для Тегов Header -- */
    $(".tag-header__div-top").addClass("tag-header__div-top_anim");
    $(".tag-header__div-down").addClass("tag-header__div-down_anim");
    $(".tag-header__slash-top").addClass("tag-header__slash-top_anim");
    $(".tag-header__slash-down").addClass("tag-header__slash-down_anim");
    $(".tag-header__grid-left").addClass("tag-header__grid-left_anim");
    $(".tag-header__bracket-left").addClass("tag-header__bracket-left_anim");
    /* -- Добавляем классы с анимацией для Тегов Main Banner -- */
    $(".tag-banner__div-down").addClass("tag-banner__div-down_anim");
    $(".tag-banner__bracket-left").addClass("tag-banner__bracket-left_anim");
    $(".tag-banner__slash-up").addClass("tag-banner__slash-up_anim");
    $(".tag-banner__grid-left").addClass("tag-banner__grid-left_anim");
    $(".tag-banner__bracket-right").addClass("tag-banner__bracket-right_anim");
  };
});
