var gulp = require('gulp');
var less = require('gulp-less');
var bs = require('browser-sync').create();
var autoprefixer = require('gulp-autoprefixer');

// less编译任务
gulp.task('lessc', function () {
  gulp.src('src/less/*.less')
    .pipe(less())
    // .pipe( auto() )
    .pipe(gulp.dest('csstest/css'))
    .pipe(bs.reload({
      stream: true
    }));
});

//js
gulp.task('jss', function () {
  gulp.src('src/script/*.js')
    .pipe(js())
    // .pipe( auto() )
    .pipe(bs.reload({
      stream: true
    }));
});
// serve启动本地服务
gulp.task('serve', function () {
  bs.init({
    server: {
      baseDir: './'
    },
    startPath: 'src/html/index1.html'
  })
})

// 自动监听任务
gulp.task('watch', function () {

  gulp.watch('src/less/*.less', ['lessc']);
  gulp.watch('src/html/*.html', function () {
    bs.reload();
  });

});

// 默认任务
gulp.task('default', function () {
  gulp.run('serve', 'watch')
})