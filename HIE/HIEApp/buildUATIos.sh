cp src/app/env.properties.ts.UAT src/app/env.properties.ts
ionic cordova build ios --prod
cp src/app/env.properties.ts.TEST src/app/env.properties.ts

