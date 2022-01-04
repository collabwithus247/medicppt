let gulp = require('gulp'),
  sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps'),
  $ = require('gulp-load-plugins')(),
  cleanCss = require('gulp-clean-css'),
  rename = require('gulp-rename'),
  postcss = require('gulp-postcss'),
  rtl = require('postcss-rtl'),
  autoprefixer = require('autoprefixer'),
  postcssInlineSvg = require('postcss-inline-svg'),
  browserSync = require('browser-sync').create(),
  pxtorem = require('postcss-pxtorem'),
  postcssProcessors = [
    postcssInlineSvg({
      removeFill: true,
      paths: ['./node_modules/bootstrap-icons/icons']
    }),
    pxtorem({
      propList: ['font', 'font-size', 'line-height', 'letter-spacing', '*margin*', '*padding*'],
      mediaQuery: true
    })
  ];

// To remove [dir] attribute.
function addPrefixToSelector ( selector, prefix ) {
  if (prefix === '[dir]') {
    return `${selector}`
  }
  return `${prefix} ${selector}`
}

// RTL plugin options.
const options = {
  addPrefixToSelector,
  removeComments: true,
};


const paths = {
  scss: {
    src: './scss/style.scss',
    dest: './css',
    watch: './scss/style.scss'
  }
}

// Compile sass into CSS & auto-inject into browsers
function styles () {
  return gulp.src([paths.scss.src])
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe($.postcss(postcssProcessors))
    .pipe(postcss([autoprefixer({
      browsers: [
        'last 2 versions',
        'ie >= 9'
      ]
    })]))
    .pipe(postcss( [ rtl( options ) ]))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.scss.dest))
    .pipe(cleanCss())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(paths.scss.dest))
    .pipe(browserSync.stream())
}



function serve () {
  gulp.watch([paths.scss.watch])
}

const build = gulp.series(styles)

exports.styles = styles
exports.serve = serve

exports.default = build
