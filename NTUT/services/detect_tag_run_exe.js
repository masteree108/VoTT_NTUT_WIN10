const fs = require('fs');
var now_time = "1";     
var before_time= "0";   
var execFile = require('child_process').execFile;
var parameters = ["--incognito"];
         
      
function get_time(data) {    
   var res = data.split(",");
   //console.log("res[2]");    
   //console.log(res[2]);      
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
   //console.log(get_data);    
   now_time = get_time(get_data);
   //console.log(now_time);    
   return already_run_check();
}                            
                           
function check_path_and_run_vott_tracker_exe() {
	log_path = '../../Drone_Project/Drone_Target/for_python_path.log';
	exe_path = './NTUT/exe/vott_tracker.exe'
	if (fs.existsSync(log_path)) {  
		try {                 
			if (read_file(log_path)) {
				if (fs.existsSync(exe_path)) {
					before_time = now_time;
					execFile('./NTUT/exe/vott_tracker.exe', parameters, function(err, data) {
   					console.log("vott_tracker.exe has been executed");    
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

module.exports.check_and_run = function check_and_run() {
	console.log('Starting the vott_detect_tag service...');
	setInterval(() => {
  		check_path_and_run_vott_tracker_exe()}, 100);
}


