var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var fileinclude = require('gulp-file-include');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var gutil = require( 'gulp-util' );
var ftp = require( 'vinyl-ftp' );



gulp.task('hello', function(){
    //do
    console.log('hello world 你好');
});

//搬家
gulp.task('move',function(){
   //do
   return gulp.src('*.html') //來源
   .pipe(gulp.dest('dest/')) //目的地
})
//打包 css

gulp.task('movecss',function(){
    //do
    return gulp.src('css/*.css') //來源
    .pipe(gulp.dest('dest/css')) //目的地
 })

// 壓縮css
 gulp.task('minicss',function(){
    //do
    return gulp.src('css/*.css') //來源
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dest/css')) //目的地
 })
//合併 css
 gulp.task('concat',['sass'] ,function(){
    //do
    return gulp.src('css/*.css') //來源
    .pipe(concat('all.css'))//合併
    .pipe(cleanCSS({compatibility: 'ie8'}))//壓縮
    .pipe(gulp.dest('dest/css')) //目的地
 })

// sass 轉譯
 gulp.task('sass', function () {
    return gulp.src('./sass/*.scss')//來源
      .pipe(sass().on('error', sass.logError)) //sass轉譯
      .pipe(gulp.dest('./dest/css')); //目的地
  });

gulp.task('watch' ,function () {
     gulp.watch('./sass/*.scss' ,['sass']);
     gulp.watch('./*.html' ,['move']);
})

// html 樣板
gulp.task('fileinclude', function () {
    gulp.src(['*.html'])
      .pipe(fileinclude({
        prefix: '@@',
        basepath: '@file'
      }))
      .pipe(gulp.dest('./dest'));
  });



//同步
gulp.task('default', function() {
    browserSync.init({
        server: {
            baseDir: "./dest",
            index : "index.html"
        }
    });
    gulp.watch('./sass/*.scss' ,['sass']).on('change',reload);
    gulp.watch(['./*.html' ,'./**/*.html'] ,['fileinclude']).on('change',reload);
});



//壓圖

const imagemin = require('gulp-imagemin');
 
gulp.task('miniimg',function(){
  gulp.src('./dev/images/*')
  .pipe(imagemin())
  .pipe(gulp.dest('dest/images'))
})  


//ftp





gulp.task( 'ftp', function () {
 
  var conn = ftp.create( {
      host:     '140.115.236.71',
      user:     '%ed101+',
      password: '!654=stu&',
      parallel: 10
      
  } );

  var globs = [
      'dest/**',
      'dest/css/**',
      'dest/images/**',
      'index.html'
  ];

  // using base = '.' will transfer everything to /public_html correctly
  // turn off buffering in gulp.src for best performance

  return gulp.src( globs, { base: '.', buffer: false } )
      .pipe( conn.newer( './T2000278' ) ) // only upload newer files
      .pipe( conn.dest( './T2000278' ) );

} );