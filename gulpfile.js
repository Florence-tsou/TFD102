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

const uglify = require('gulp-uglify'); // 先置入官方給的壓縮指令

function ugjs(){
  // 選擇要壓縮的檔案，中間經過pipe壓縮打包，最後產出到要的地方
  return src('js/scripts.js'). // src 來源檔案
  pipe(uglify()). // 壓縮、打包檔案
  pipe(dest('js/minify/')) // dest 目的地，沒這資料夾他會自己幫你建
};

exports.taskjs = ugjs;



// 壓縮 css

const cleanCSS = require('gulp-clean-css');

function mincss(){
  return src('sass/style.css')
  .pipe(cleanCSS({compatibility: 'ie10'}))
  .pipe(dest('css/'))
}

exports.css = mincss;

// 同時執行壓縮js跟css
exports.abc = parallel(ugjs , mincss);