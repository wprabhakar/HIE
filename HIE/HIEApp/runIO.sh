#. ~/setenv.sh
#adb devices
cp src/app/env.properties.ts.OFFICE src/app/env.properties.ts
ionic cordova run ios
cp src/app/env.properties.ts.TEST src/app/env.properties.ts


