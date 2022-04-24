# after $ npm run release, you can execute this script to package NTUT_VoTT
# and move to correct path
if [ -d "../../releases" ]; then
	cd ../../
	mv releases NTUT_VoTT
	cd NTUT_VoTT
	mv win-unpacked WIN10
	cd WIN10
	mkdir -p NTUT/exe
	cp ../../NTUT/exe/vott_tracker.exe ./NTUT/exe/
	cp -af ../../NTUT/yolo-coco_v3 ./NTUT/
	cd ../../
	cp -af NTUT_VoTT ../../../
	rm -r NTUT_VoTT
else
	echo "Directory ../../../releases does not exists"
fi
