var gulp = require("gulp");
var $ = require("gulp-load-plugins")(); //加载模块
var open = require("open");

//用来定义目录路径
var app = {
    srcPath: "src/",
    devPath: "build/", //整合之后的文件
    prdPath: "dist/" //用来生产部署
};

//拷贝文件
gulp.task("lib", function() {
    //读取文件
    gulp.src('bower_components/**/*.js')
        //pipe链式调用，拷贝文件dest();
        .pipe(gulp.dest(app.devPath + 'vendor'))
        .pipe(gulp.dest(app.prdPath + 'vendor'))
        .pipe($.connect.reload())
});

gulp.task('html', function() {
    gulp.src(app.srcPath + '**/*.html')
        .pipe(gulp.dest(app.devPath))
        .pipe(gulp.dest(app.prdPath))
        .pipe($.connect.reload())
});

gulp.task('json', function() {
    gulp.src(app.srcPath + 'data/**/*.json')
        .pipe(gulp.dest(app.devPath + 'data'))
        .pipe(gulp.dest(app.prdPath + 'data'))
        .pipe($.connect.reload())
});

//$.less()编译less文件
//$.cssmin()压缩css文件
gulp.task('less', function() {
    gulp.src(app.srcPath + 'style/index.less')
        .pipe($.plumber())
        .pipe($.less())
        .pipe(gulp.dest(app.devPath + 'css'))
        .pipe($.cssmin())
        .pipe(gulp.dest(app.prdPath + 'css'))
        .pipe($.connect.reload())
});

//$.concat('index.js')合并js文件生成一个index.js文件
//$.uglify()压缩
gulp.task('js', function() {
    gulp.src(app.srcPath + 'script/**/*.js')
        .pipe($.plumber())
        .pipe($.concat('index.js'))
        .pipe(gulp.dest(app.devPath + 'js'))
        .pipe($.uglify())
        .pipe(gulp.dest(app.prdPath + 'js'))
        .pipe($.connect.reload())
});

gulp.task("image", function() {
    gulp.src(app.srcPath + 'image/**/*')
        .pipe($.plumber())
        .pipe(gulp.dest(app.devPath + 'image'))
        .pipe($.imagemin())
        .pipe(gulp.dest(app.prdPath + 'image'))
        .pipe($.connect.reload())
});

gulp.task('build', ['image', 'js', 'less', 'lib', 'html', 'json']);
gulp.task('clean', function() {
    gulp.src([app.devPath, app.prdPath])
        .pipe($.clean());
});

gulp.task('serve', ['build'], function() {
    $.connect.server({
        root: [app.devPath],
        livereload: true, //针对高级浏览器
        port: 1234
    });
    open('http://localhost:1234');


    gulp.watch('bower_components/**/*', ['lib'])
    gulp.watch(app.srcPath + '**/*.html', ['html'])
    gulp.watch(app.srcPath + 'data/**/*.json', ['json'])
    gulp.watch(app.srcPath + 'style/**/*.less', ['less'])
    gulp.watch(app.srcPath + 'script/**/*.js', ['js'])
    gulp.watch(app.srcPath + 'image/**/*', ['image'])
});

gulp.task('default', ['serve']);
