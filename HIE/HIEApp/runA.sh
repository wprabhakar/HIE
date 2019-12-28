. ~/setenv.sh
adb devices
cp src/app/env.properties.ts.DEV src/app/env.properties.ts
ionic cordova run android --device -c
cp src/app/env.properties.ts.TEST src/app/env.properties.ts
echo 'To debug in chrome go to URL => chrome://inspect/#devices '

