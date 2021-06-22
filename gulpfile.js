require('dotenv').config();

const ProjectFolder = 'dist';
const SourceFolder = 'src';
const PORT = process.env.PORT || 3000;

const fs = require('fs');

const Routes = {
    src: {
        html: [`${SourceFolder}/*.html`, `!${SourceFolder}/_*.html`],
        css: [`${SourceFolder}/scss/style.scss`],
        bem: `${SourceFolder}/scss/blocks/*.scss`,
        js: `${SourceFolder}/js/main.js`,
        images: `${SourceFolder}/img/**/*.{jpg,png,svg,gif,ico,webp}`,
        fonts: `${SourceFolder}/fonts/*.ttf`,
    },
    build: {
        html: `${ProjectFolder}/`,
        css: `${ProjectFolder}/css/`,
        js: `${ProjectFolder}/js/`,
        images: `${ProjectFolder}/img/`,
        fonts: `${ProjectFolder}/fonts/`,
    },
    watch: {
        html: `${SourceFolder}/**/*.html`,
        css: `${SourceFolder}/scss/**/*.scss`,
        js: `${SourceFolder}/js/**/*.js`,
        images: `${SourceFolder}/img/**/*.{ipg,png,svg,gif,ico,webp}`,
    },
    clean: `./${ProjectFolder}/`,
};

const del = require('del');
const browserSync = require('browser-sync').create();

const gulp = require('gulp');
const rename = require('gulp-rename');

const fileInclude = require('gulp-file-include');

const sass = require('gulp-sass');
sass.compiler = require('node-sass');
const groupMedia = require('gulp-group-css-media-queries');
const autoprefixer = require('gulp-autoprefixer');
const cleanCss = require('gulp-clean-css');

const uglify = require('gulp-uglify-es').default;

const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');

const ttf2woff = require('gulp-ttf2woff');
const ttf2woff2 = require('gulp-ttf2woff2');

const { src, dest } = gulp;
function browserSyncFunction() {
    browserSync.init({
        server: {
            baseDir: `./${ProjectFolder}/`,
        },
        port: PORT,
        notify: false,
        online: true,
    });
}

// * HTML

function html() {
    return (
        src(Routes.src.html)
            .pipe(fileInclude())
            // .pipe(webpHtml())
            .pipe(dest(Routes.build.html))
            .pipe(browserSync.stream())
    );
}

// * CSS

function css() {
    return src(Routes.src.css)
        .pipe(
            sass({
                outputStyle: 'expanded',
            }).on('error', sass.logError),
        )
        .pipe(groupMedia())
        .pipe(
            autoprefixer({
                overrideBrowserslist: ['last 5 versions'],
                cascade: true,
            }),
        )
        .pipe(dest(Routes.build.css))
        .pipe(
            rename({
                extname: '.min.css',
            }),
        )
        .pipe(cleanCss())
        .pipe(dest(Routes.build.css))
        .pipe(browserSync.stream());
}

// * JS

function js() {
    return (
        src(Routes.src.js)
            // .pipe(fileInclude())
            .pipe(dest(Routes.build.js))
            .pipe(uglify())
            .pipe(
                rename({
                    extname: '.min.js',
                }),
            )
            .pipe(dest(Routes.build.js))
            .pipe(browserSync.stream())
    );
}

// * Images

function images() {
    return src(Routes.src.images)
        .pipe(
            webp({
                quality: 70,
            }),
        )
        .pipe(dest(Routes.build.images))
        .pipe(src(Routes.src.images))
        .pipe(
            imagemin({
                progressive: true,
                svgoPlugins: [{ removeViewBox: true }],
                interlaced: true,
                optimizationLevel: 3, // 0..7
            }),
        )
        .pipe(dest(Routes.build.images))
        .pipe(browserSync.stream());
}

// * Fonts

function fonts() {
    return src(Routes.src.fonts)
        .pipe(ttf2woff())
        .pipe(dest(Routes.build.fonts))
        .pipe(src(Routes.src.fonts))
        .pipe(ttf2woff2())
        .pipe(dest(Routes.build.fonts));
}
// function fontsStyle() {
//     let fileContent = fs.readFileSync(sourceFolder + '/scss/_fonts.scss');
//     if (fileContent == '') {
//         fs.writeFile(sourceFolder + '/scss/_fonts.scss', '', () => {});
//         return fs.readdir(path.build.fonts, function (err, items) {
//             if (items) {
//                 let currentFontname;
//                 for (var i = 0; i < items.length; i++) {
//                     let fontname = items[i].split('.');
//                     fontname = fontname[0];
//                     if (currentFontname != fontname) {
//                         fs.appendFile(
//                             sourceFolder + '/scss/_fonts.scss',
//                             '@include font("' +
//                                 fontname +
//                                 '", "' +
//                                 fontname +
//                                 '", "400", "normal");\r\n',
//                             cb,
//                         );
//                     }
//                     currentFontname = fontname;
//                 }
//             }
//         });
//     }
// }

function watchFiles() {
    gulp.watch([Routes.watch.html], html);
    gulp.watch([Routes.watch.css], css);
    gulp.watch([Routes.watch.js], js);
    gulp.watch([Routes.watch.images], images);
}

function clean() {
    return del(Routes.clean);
}

const build = gulp.series(
    clean,
    gulp.parallel(js, css, html, images, fonts),
    // fontsStyle,
);
const watch = gulp.parallel(build, watchFiles, browserSyncFunction);

module.exports = {
    fonts,
    images,
    js,
    css,
    html,
    build,
    watch,
    default: watch,
};
