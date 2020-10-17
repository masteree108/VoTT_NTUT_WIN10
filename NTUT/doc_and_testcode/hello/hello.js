/* if you want to test this, please as follows 
$ vim ../../src/electron/start.js
add below code
const detect_tag_thread = require('../../NTUT/services/detect_tag.js'); 
+const hello = require('../../NTUT/doc_and_testcode/hello/hello.js'); 

NTUT_version();
+hello.hello();

save and exit
when you use belo command to run VoTT again,you will see the HELLO on the terminal
$ npm start
*/
module.exports.hello = function hello() {                  
   var execFile = require('child_process').execFile;
   var parameters = ["--incognito"];
   execFile('./NTUT/doc_and_testcode/hello/hello.exe', parameters, function(err, data) {
       if(err) {                                                                                  
           console.error(err);      
           return;                  
       }                            
       console.log(data.toString());
   });                              
}                                   

