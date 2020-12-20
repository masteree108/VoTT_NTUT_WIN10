# after $ npm run release, you can execute this script to package NTUT_VoTT
# and move to correct path
if [ -d "../../releases" ]; then
	cd ../../
	mv releases NTUT_VoTT
	cd NTUT_VoTT
	mv win-unpacked WIN10
	cd WIN10
	mkdir -p NTUT/exe
	mkdir -p NTUT/services
	cp ../../NTUT/exe/vott_tracker.exe ./NTUT/exe/
	cp ../../NTUT/services/run_vott_tracker.js ./NTUT/services/
	cd ../../
	mv NTUT_VoTT ../../../
else
	echo "Directory ../../../releases does not exists"
fi
