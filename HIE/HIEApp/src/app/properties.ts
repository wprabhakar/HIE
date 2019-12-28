//export const sEndPoint = "http://192.168.0.120:4200/";
//export const sEndPoint = "http://127.0.0.1:4200/" ;

import { sEndPoint } from './env.properties';

export const sURL = sEndPoint + "api/";
export const sIMAGE_URL = sEndPoint + "image/";
export var V = {
//  Name: "/^[a-zA-Z0-9]*$/", 
  Name: "/^[a-zA-Z]*$/", 
  Name_Min: 1,
  Name_Max: 25,
  // Email = "[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}";
//  Email: "[A-Za-z0-9]+@[A-Za-z0-9]+\.+[A-Za-z]{2}",
  Email: "[A-Za-z0-9]+@[A-Za-z0-9]+\.+[A-Za-z0-9]{2}",
  Email_Min: 1,
  Email_Max: 50,
  Password: "[A-Za-z0-9]+",
  Password_Min: 3, //6,
  Password_Max: 25,
  Phone_Min: 8,
  Phone_Max: 8,
  Address: "[A-Za-z0-9#-.& ]",
  Address_Max: 100,
  CardNumber: "[0-9]",
  CardNumber_Min: 16,
  CardNumber_Max: 16,
  CardExpiry: "[0-9]",
  MenuTitle_Min: 1,
  MenuTitle_Max: 25,
  MenuDescription_Min: 1,
  MenuDescription_Max: 50,
  Review_Min: 10,
  Review_Max: 100,
  Price_Min: 1,
  Price_Max: 6
}
export var Global_Variables = {
  sUserEmail: '',
  canSwith2Merchant: -1,
  isConnected: true,
  token: null,
  DeviceID: "None",
  oMID: -1,
  oRItem: null,
  oMenuItems: [],
  sCurrentPage: 'Home',
  searchRegion: 'Any',
  selectedRegion: '',
  searchCuisine: ['Others', 'Indian'],
  selectedCuisines: "'Others', 'Indian'",
  collectionDate: '',
  collectionTime: '2',
  collectionTimes: [
    {
      name: 'col1',
      options: [
        { text: '5:30 - 6:30', value: '1' },
        { text: '6:30 - 7:30', value: '2' },
        { text: '7:30 - 8:30', value: '3' },
        { text: '8:30 - 9:30', value: '4' },
        { text: '9:30 - 9:30', value: '5' },
        { text: '10:30 - 9:30', value: '6' },
        { text: '11:30 - 9:30', value: '7' },
        { text: '12:30 - 9:30', value: '8' },
        { text: '13:30 - 9:30', value: '9' },
        { text: '14:30 - 9:30', value: '10' },
      ],
    }
  ]
};

export var getStartTime = function ( val: string ) : string
{
  var source = Global_Variables.collectionTimes[0].options;
  for (var i = 0; i < source.length; i++)
    if (source[i].value === val) {
      return source[i].text.split(" ")[0];
    }
  return 'NotFound';
}

export var lookupTime = function (val: string): string {
  var source = Global_Variables.collectionTimes[0].options;
  for (var i = 0; i < source.length; i++)
    if (source[i].value === val) {
      return source[i].text;
    }
  return 'NotFound';
}

export var lookupStatus = function (val: string): string {
  if (val == 'C')
    return 'Confirmed';
  if (val == 'P')
    return 'Pending';
  if (val == 'D')
    return 'Fullfilled';
  return val ;
}
