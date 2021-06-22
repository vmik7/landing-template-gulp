const srcFolderName = 'src';
const buildFolderName = 'dist';

const src = {
    html: [`${srcFolderName}/*.html`, `!${srcFolderName}/_*.html`],
    scss: [`${srcFolderName}/scss/style.scss`],
    js: `${srcFolderName}/js/main.js`,
    images: `${srcFolderName}/img/**/*.{jpg,png,svg,gif,ico,webp}`,
    fonts: `${srcFolderName}/fonts/converted/*.{woff,woff2}`,
};
const build = {
    html: `${buildFolderName}/`,
    css: `${buildFolderName}/css/`,
    js: `${buildFolderName}/js/`,
    images: `${buildFolderName}/img/`,
    fonts: `${buildFolderName}/fonts/`,
};
const watch = {
    html: `${srcFolderName}/**/*.html`,
    css: `${srcFolderName}/scss/**/*.scss`,
    js: `${srcFolderName}/js/**/*.js`,
    images: src.images,
    fonts: src.fonts,
};
const prepare = {
    fontsFrom: `${srcFolderName}/fonts/`,
    fontsTo: `${srcFolderName}/fonts/converted/`,
};

module.exports = {
    srcFolderName,
    buildFolderName,
    src,
    build,
    watch,
    prepare,
};
