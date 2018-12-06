var gulp = require('gulp');
var less = require('gulp-less');
var bs = require('browser-sync').create();
var rename = require('gulp-rename');
var cleancss = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');
var fileinclude = require('gulp-file-include');
var htmlmin = require('gulp-htmlmin');
var imagemin = require('gulp-imagemin');
var uglify = require("gulp-uglify");
var cache = require('gulp-cache');
// less编译任务
gulp.task('lessc', function () {
  gulp.src('src/less/*.less')
    .pipe(less())
    .pipe(autoprefixer({
      browsers: ['last 10 versions']
    }))
    .pipe(gulp.dest('csstest/css'))

    .pipe(cleancss())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('csstest/css'))
    .pipe(bs.reload({
      stream: true
    }));
})
//image
gulp.task("images", function () {
  gulp.src("src/images/img/*.{png,jpg,gif}")
    .pipe(gulp.dest("csstest/images/img"));
});
// serve启动本地服务
gulp.task('serve', function () {
  bs.init({
    server: {
      baseDir: 'cssdest'
    },
    startPath: 'index.html'
  })
})
//js
gulp.task("js", function () {
  gulp.src("src/js/*.js")
    .pipe(gulp.dest("csstest/js"));
});
gulp.task("bt", function () {
  gulp.src("src/bootstrap/{css,js,fonts}/*")
    .pipe(gulp.dest("csstest/bootstrap"));
});
// html
gulp.task('html', function () {
  gulp.src('src/html/*.html')
    .pipe(fileinclude({
      prefix: '@@',
      basepath: 'src/template',
      indent: true,
    }))
    .pipe(htmlmin({
      removeComments: true, //清除HTML注释
      collapseWhitespace: true, //压缩HTML
      collapseBooleanAttributes: true, //省略布尔属性的值 <input checked="true"/> ==> <input />
      removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
      removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
      removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
      minifyJS: true, //压缩页面JS
      minifyCSS: true //压缩页面CSS
    }))
    .pipe(gulp.dest('csstest/html'))
})
// serve启动本地服务
gulp.task('serve', function () {
  bs.init({
    server: {
      baseDir: 'csstest'
    },
    startPath: 'html/index.html'
  })
})
gulp.task("refresh", function () {
  bs.reload();
});
// 自动监听任务
gulp.task("watch", function () {
  gulp.watch("src/html/*.html", ["html", "refresh"]);
  gulp.watch("src/less/*.less", ["lessc"]);
  gulp.watch("src/js/*.js", ["js", "refresh"]);
  gulp.watch("src/images/img/*", ["images", "refresh"]);
});


// 默认任务
gulp.task("default", ["html", "lessc", "js", "images"], function () {
  gulp.run("serve", "watch");
});