const { parentPort } = require('worker_threads');
const fs = require('fs');    
var now_time = "1";     
var before_time= "0";   
var execFile = require('child_process').execFile;
var parameters = ["--incognito"];
         
//can not use below function otherwise that will cause javascript out of memory
/*       
function open_path(path) {                                                                                                                                        
	fs.open(path, 'r', (err, fd) => {
       if (err) throw err;   
         
       read_file(path);      
         
       fs.close(fd, (err) => {
           if (err) throw err;
       });              
   });   
}        
         
function get_time(data) {    
   var res = data.split(",");
   console.log("res[2]");    
   console.log(res[2]);      
   return res[2];
}        
         
function already_run_check() {
   if (now_time != before_time) {
       before_time = now_time;
       return true;
   } else {
       return false;
   }  
}

function read_file(path) {   
   get_data = fs.readFileSync(path, 'utf8');
   console.log(get_data);    
   now_time = get_time(get_data);
   console.log(now_time);    
   return already_run_check();
                             
}                            

// sleep time expects milliseconds
function sleep (time) {      
	return new Promise((resolve) => setTimeout(resolve, time));
}                            
*/ 
                             
while(1) {                   
	log_path = '../../Drone_Project/Drone_Target/for_python_path.log';
	exe_path = './NTUT/exe/vott_tracker.exe'
	if (fs.existsSync(log_path)) {  
		try {                 
			get_data = fs.readFileSync(log_path, 'utf8');
			res = get_data.split(",");
			now_time = res[2];
			//using file created time to judge this is new track object
			if (now_time != before_time) {
				//console.log(now_time);
				if (fs.existsSync(exe_path)) {
					before_time = now_time;
					execFile('./NTUT/exe/vott_tracker.exe', parameters, function(err, data) {
						if (err) {                                                                                  
							console.error(err);
							return;
						}         
						//console.log(data.toString());
					});
				} else {
					console.error("vott_tracker.exe is not existed!");
				}
			}

		} catch(e) {
			//console.error(e);
			console.error("file is not existed!");
		}
	}                                 
}

/* parentPort.postMessage() is the send message function, 
	it will send to below position(resovle) that thread creator
	const worker = new Worker('./NTUT/services/run_exe.js');                                                                                                    
	worker.on('message', (resolve) => { 
		console.error("receive:", resolve); 
	}); 	
*/
parentPort.postMessage("run exe()");
