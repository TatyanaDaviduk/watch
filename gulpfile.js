const { src, dest, parallel, series, watch } = require('gulp');
const del = require('del')
const fonter = require('gulp-fonter');
const concat = require('gulp-concat');
const sass = require('gulp-sass')(require('sass')); //для использования препроцессора SASS
const autoprefixer = require('gulp-autoprefixer'); //добавляет необходимые вендорные префиксы CSS
const includeFiles = require('gulp-include');
const browserSync = require('browser-sync').create();



function browsersync(){
    browserSync.init({
        server: {
            baseDir: "./public/", //указываем рабочую папку;
            serveStaticOptions: {
                extensions: ['html'],
              }, //упрощаем ввод в браузере адреса страницы — без расширения .html
        },
        port:8080, //назначаем номер порта для взаимодействия с веб-сервером;
        ui: { port: 8081 }, //назначаем номер порта для пользовательского интерфейса веб-сервера;
        open: true, //открываем в браузере главную страницу сайта
    });
}

function fonts(){
  return src('./src/fonts?*')
  pipe(fonter({
    formats: ['woff', 'woff2']
  }))
  .pipe(dest('./public/fonts/'))
  .pipe(browserSync.stream());
}

function styles(){
    return src('src/style/*.scss') //src/style/style.scss
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({ grid: true }))  //grid???
    .pipe(dest('./public/css/'))
    .pipe(browserSync.stream());
}

function scripts() {
    return src('./src/js/script.js')
    .pipe(
      includeFiles({
        includePaths: './src/components/**/',
      })
    )
    .pipe(dest('./public/js/'))
    .pipe(browserSync.stream())
  }

function pages() {
    return src('./src/pages/*.html')
    .pipe(
      includeFiles({
        includePaths: './src/components/**/',
      })
    )
    .pipe(dest('./public/'))
    .pipe(browserSync.reload({ stream: true, }))
  }

  async function clean() {
    return del.sync('./public/', { force: true })
  }

function copyFonts(){
    return src('./src/fonts/**/*')
    .pipe(dest('./public/fonts/'))
}
function copyImages() {
    return src('./src/images/**/*')
    .pipe(dest('./public/images/'))
  }
async function copyResources() {
    copyFonts()
    copyImages()
}


function watch_dev() {
    watch(['./src/js/script.js', './src/components/**/*.js'], scripts)
    watch(['./src/style/*.scss', './src/components/**/*.scss'], styles).on(
      'change',
      browserSync.reload
    )
    watch(['./src/pages/*.html', './src/components/**/*.html'], pages).on(
      'change',
      browserSync.reload
    )
  }

exports.browsersync = browsersync
exports.clean = clean
exports.scripts = scripts
exports.styles = styles
exports.pages = pages
exports.copyResources = copyResources

exports.default = parallel(
    clean,
    styles,
    scripts,
    copyResources,
    pages,
    browsersync,
    watch_dev
  )
  
  exports.build = series(
    clean,
    styles,
    scripts,
    copyResources,
    pages
  )