// 註冊方法
const {
  src , dest , series , parallel , watch
} = require('gulp');

// 任務一
function defaultask(){
  console.log('hi gulp4');
  cb();
};

// 把任務做輸出，.後面可自行命名，=後面為要執行的function
exports.do = defaultask;




// 執行順序

// 任務A
function missionA(cb){
  console.log('missionA');
  cb();
};

// 任務B
function missionB(cb){
  console.log('missionB');
  cb();
};

// 任務C
function missionC(cb){
  console.log('missionC');
  cb();
};

// 任務D
function missionD(cb){
  console.log('missionD');
  cb();
};


// series 有順序的執行裡面的任務
exports.async = series(missionA , missionB);

// 先做A，再來B，最後一起做C跟D
exports.tasks = series(missionA , missionB , parallel(missionC , missionD));


// 同時執行任務
exports.sync = parallel(missionA , missionB);




// 壓縮 js

const uglify = require('gulp-uglify'); // 把套件require進來

function ugjs(){
  // 選擇要壓縮的檔案，中間經過pipe壓縮打包，最後產出到要的地方
  return src('./src/js/scripts.js') // src 來源檔案
  .pipe(uglify()) // 壓縮、打包檔案
  .pipe(rename({ // 更換檔名
    extname: '.min.css'
  }))
  .pipe(dest('js/minify/')) // dest 目的地，沒這資料夾他會自己幫你建
};

exports.taskjs = ugjs;



// 壓縮 css

const cleanCSS = require('gulp-clean-css');

function mincss(){
  return src('./src/sass/style.css')
  .pipe(cleanCSS({compatibility: 'ie10'}))
  .pipe(dest('./src/css/'))
}

exports.css = mincss;

// 同時執行壓縮js跟css
exports.alltask = parallel(ugjs , mincss);





// 拷貝多個檔案、更換檔名

const rename = require('gulp-rename'); // 換檔名才需要

function copy(){
  // return src('./src/sass/*.css') // 打包所有附檔名為css
  // return src(['./src/sass/*.css' , './src/sass/*.scss']) // 打包所有副檔名為css及scss
  return src(['./src/sass/*.css' , '!./src/sass/font.css']) //不要被打包的，就在第二個參數寫 !檔名
  // return src('./src/sass/*.*') // 打包全部檔案，所有附檔名
  // return src('./src/sass/*.*' , './src/sass/**/*.scss') // 連其他資料夾裡所有的scss都打包
  .pipe(rename({ // 更換檔名
    extname: '.min.css'
  }))
  .pipe(dest('./src/css/'))
};

exports.move = copy;




// include html 
const fileinclude = require('gulp-file-include');

function html(){
  return src('./src/*.html') // 根目錄下的所有html
  .pipe(fileinclude({ // 官方格式，若裡面有include，打包完後會把include的東西串進去
    prefix: '@@',
    basepath: '@file'
  }))
  .pipe(dest('./src/dist'))
}

exports.h = html;





// sass gulp
var sass = require('gulp-sass')(require('sass'));

// 讓CSS可以追朔SASS要加 ↓
const sourcemaps = require('gulp-sourcemaps');

function sassstyle(){
  return src('./src/sass/*.scss')
  .pipe(sourcemaps.init())
  .pipe(sass.sync({outputStyle: 'compressed'}).on('error', sass.logError))
  .pipe(sourcemaps.write())
  .pipe(dest('./dist/css'))
}
exports.style = sassstyle
