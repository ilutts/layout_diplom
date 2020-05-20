var gulp = require("gulp"), // Подключаем Gulp
  concat = require("gulp-concat"), // Подключаем gulp-concat (для конкатенации файлов)
  uglify = require("gulp-uglifyjs"), // Подключаем gulp-uglifyjs (для сжатия JS)
  cssnano = require("gulp-cssnano"), // Подключаем пакет для минификации CSS
  rename = require("gulp-rename"), // Подключаем библиотеку для переименования файлов
  del = require("del"), // Подключаем библиотеку для удаления файлов и папок
  imagemin = require("gulp-imagemin"), // Подключаем библиотеку для работы с изображениями
  pngquant = require("imagemin-pngquant"), // Подключаем библиотеку для работы с png
  cache = require("gulp-cache"), // Подключаем библиотеку кеширования
  autoprefixer = require("gulp-autoprefixer"); // Подключаем библиотеку для автоматического добавления префиксов

gulp.task("scripts-libs", function () {
  return gulp
    .src("app/libs/*.js") // Берем все необходимые библиотеки
    .pipe(concat("libs.min.js")) // Собираем их в кучу в новом файле libs.min.js
    .pipe(uglify()) // Сжимаем JS файл
    .pipe(gulp.dest("dist/js")); // Выгружаем в папку dist/js
});

gulp.task("scripts-main", function () {
  return gulp
    .src("app/js/*.js") // Берем все необходимые библиотеки
    .pipe(concat("script.min.js")) // Собираем их в кучу в новом файле script.min.js
    .pipe(uglify()) // Сжимаем JS файл
    .pipe(gulp.dest("dist/js")); // Выгружаем в папку dist/js
});

gulp.task("css-libs", function () {
  return gulp
    .src("app/css/*.css") // Выбираем файл для минификации
    .pipe(concat("styles.min.css"))
    .pipe(cssnano()) // Сжимаем
    .pipe(gulp.dest("dist/css")); // Выгружаем в папку dist/css
});

gulp.task("clean", async function () {
  return del.sync("dist"); // Удаляем папку dist перед сборкой
});

gulp.task("img", function () {
  return gulp
    .src("app/img/**/*") // Берем все изображения из app
    .pipe(
      cache(
        imagemin({
          // С кешированием
          // .pipe(imagemin({ // Сжимаем изображения без кеширования
          interlaced: true,
          progressive: true,
          svgoPlugins: [{ removeViewBox: false }],
          use: [pngquant()],
        })
      ) /**/
    )
    .pipe(gulp.dest("dist/img")); // Выгружаем на продакшен
});

gulp.task("prebuild", async function () {
  var buildHtml = gulp
    .src("app/*.html") // Переносим HTML в продакшен
    .pipe(gulp.dest("dist"));

  var buildFonts = gulp
    .src("app/fonts/**/*") // Переносим шрифты в продакшен
    .pipe(gulp.dest("dist/fonts"));
});

gulp.task("clear", function (callback) {
  return cache.clearAll();
});

gulp.task("build", gulp.parallel("prebuild", "clean", "img", "css-libs", "scripts-libs", "scripts-main"));
