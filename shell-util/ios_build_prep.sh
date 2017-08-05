rm -rf $BUILD_DIR/fqs/Ghosts/www
mkdir $BUILD_DIR/fqs/Ghosts/www
cp -r build/ $BUILD_DIR/fqs/Ghosts/www

#rm -rf $BUILD_DIR/fqs/Ghosts/platforms/ios
#cd $BUILD_DIR/fqs/Ghosts/
#cordova platforms add ios

cd $BUILD_DIR/fqs/Ghosts/
cordova build ios

