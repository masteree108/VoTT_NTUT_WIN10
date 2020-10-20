const net = require('net');
const port = process.env.PORT ? (process.env.PORT - 100) : 3000;
const detect_tag_thread = require('../../NTUT/services/detect_tag.js');
process.env.ELECTRON_START_URL = `http://localhost:${port}`;
const fs = require('fs');
const client = new net.Socket();


let startedElectron = false;
const detect_tag_switch = false;
const tryConnection = () => client.connect({ port: port }, () => {
    client.end();
    if (!startedElectron) {
        console.log('starting electron');
        startedElectron = true;
        const exec = require('child_process').exec;
        const electron = exec('npm run electron:run:dev', (error, stdout, stderr) => {
            console.log('Electron Process Terminated');
        });

		NTUT_version();
		if (detect_tag_switch) {
			detect_tag_thread.run().catch(err => console.error(err));
		}

        electron.stdout.on("data", (data) => {
            console.log(data);
        });

        electron.on("message", (message, sendHandle) => {
            console.log(message);
        });

        electron.on("error", (err) => {
            console.log(err);
        });

        electron.on("exit", (code, signal) => {
            console.log(`Exit-Code: ${code}`);
            console.log(`Exit-Signal: ${signal}`);
        });

        electron.on("close", (code, signal) => {
            console.log(`Close-Code: ${code}`);
            console.log(`Close-Signal: ${signal}`);
        });

        electron.on("disconnect", () => {
            console.log('Electron Process Disconnect')
        });
    }
}
);

function NTUT_version(){
	var execFile = require('child_process').execFile;
	var parameters = ["--incognito"];
	exe_path = './NTUT/exe/NTUT_version.exe';
	if (fs.existsSync(exe_path)) {
		execFile(exe_path, parameters, function(err, data) {
			if(err) {                                                                                                                                            
				console.error(err);
				return;
			}
			console.log(data.toString());
		});
	}
}

tryConnection();

client.on('error', (error) => {
    setTimeout(tryConnection, 1000);
});
