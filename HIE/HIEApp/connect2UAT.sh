mkdir -p src/assets/js
cp js/card.js src/assets/js/card.js
cp node_modules/adyen-cse-js/js/adyen.encrypt.min.js src/assets/js/adyen.encrypt.min.js
cp node_modules/adyen-cse-js/js/adyen.encrypt.nodom.min.js src/assets/js/adyen.encrypt.nodom.min.js
cp src/app/env.properties.ts.UAT src/app/env.properties.ts
#ionic serve --lab --address 192.168.1.10
ionic serve --lab --address 127.0.0.1
#ionic serve -t android
