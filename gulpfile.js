// 註冊方法
const {
  src , dest , series , parallel , watch
} = require('gulp');

// 任務一
function defaultask(){
  console.log('hi gulp4');
  cb();
};

// 把任務做輸出
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