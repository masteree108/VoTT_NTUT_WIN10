const { Worker } = require('worker_threads');
                 
module.exports.run = function runService() {
  console.log('Starting the vott_detect_tag service...');
  return new Promise((resolve, reject) => {
    const worker = new Worker('./NTUT/services/run_exe.js');
    worker.on('message', (resolve) => {
       console.error("receive:", resolve);
   });           
    worker.on('error', (reject) => {
       console.error("error", reject);
   });           
                 
    worker.on('exit', (code) => {
       console.error("exit", code);
    });          
  })             
}
