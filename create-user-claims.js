// make sure you export the creds first
// export GOOGLE_APPLICATION_CREDENTIALS="/Users/idriver/Downloads/libresecret-46dfc-firebase-adminsdk-hm5yr-26ace9ef20.json"
const admin = require("firebase-admin");
const firebaseConfig = {
  apiKey: "AIzaSyDWcx_KI23X4QxqDJuBdKecOgFKPyoQj4g",
  authDomain: "libresecret-46dfc.firebaseapp.com",
  databaseURL: "https://libresecret-46dfc-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "libresecret-46dfc",
  storageBucket: "libresecret-46dfc.appspot.com",
  messagingSenderId: "406811419819",
  appId: "1:406811419819:web:b71e83d67b32d87ff743ee"
};
const customClaims = {
  "https://hasura.io/jwt/claims": {
    "x-hasura-default-role": "user",
    "x-hasura-allowed-roles": ["user"],
    "x-hasura-user-id": "ituqUpWUIAX3CN6cNivzNSsqlt82"
  }
};
admin.initializeApp(firebaseConfig);
admin.auth().setCustomUserClaims('ituqUpWUIAX3CN6cNivzNSsqlt82', customClaims);
// aHxqHuaHDpPxWOIHVvIX3DH2ETL2
