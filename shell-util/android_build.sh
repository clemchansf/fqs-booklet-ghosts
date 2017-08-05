rm -rf $BUILD_DIR/fqs/Ghosts/www
mkdir $BUILD_DIR/fqs/Ghosts/www
cp -r build/ $BUILD_DIR/fqs/Ghosts/www
rm -rf $BUILD_DIR/fqs/Ghosts/platforms/android
cd $BUILD_DIR/fqs/Ghosts/

echo '#########    cordova platforms add android'
cordova platforms add android@latest

#echo '#########    cordova build android --release'
echo '#########    cordova build android debug'
cordova build android

cd platforms/android/build/outputs/apk/
#$BUILD_DIR/Library/Android/sdk/build-tools/24.0.2/zipalign -v 4 android-debug.apk crGhost-unsigned.apk
$BUILD_DIR/Library/Android/sdk/build-tools/$ANDROID_SDK_VERSION/zipalign -v 4 android-debug.apk crGhost-unsigned.apk
