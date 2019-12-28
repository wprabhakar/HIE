#!/bin/bash

PLUGINS=$(cordova plugin list | awk '{print $1}')

for PLUGIN in $PLUGINS; do
    cordova plugin rm $PLUGIN --save --force && cordova plugin add $PLUGIN --save
done
cordova plugin add cordova-plugin-facebook4 --save --variable APP_ID="1702614956729294" --variable APP_NAME="HaveItEarly"

