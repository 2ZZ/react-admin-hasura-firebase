import React from "react";
import { fetchUtils, Admin, Resource } from "react-admin";
import { TodoCreate, TodoEdit, TodoList } from "./todos";
import { UserList, UserShow } from "./users";
import hasuraDataProvider from "ra-data-hasura";
//import PostIcon from '@material-ui/icons/Book';
//import UserIcon from '@material-ui/icons/Group';
import { FirebaseAuthProvider } from "react-admin-firebase";

// Define Firebase auth provider
const firebaseConfig = {
  apiKey: "AIzaSyDWcx_KI23X4QxqDJuBdKecOgFKPyoQj4g",
  authDomain: "libresecret-46dfc.firebaseapp.com",
  databaseURL: "https://libresecret-46dfc-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "libresecret-46dfc",
  storageBucket: "libresecret-46dfc.appspot.com",
  messagingSenderId: "406811419819",
  appId: "1:406811419819:web:b71e83d67b32d87ff743ee"
};
const firebaseOptions = {
  // Enable logging of react-admin-firebase
  logging: true,
  // Authentication persistence, defaults to 'session', options are 'session' | 'local' | 'none'
  persistence: "session"
};

// This defines the AuthProvider first
const fbAuthProvider = FirebaseAuthProvider(firebaseConfig, firebaseOptions);

// Create a client for Hasura with the right headers
const httpClient = (url, options = {}) => {
    return fbAuthProvider.getJWTToken().then(function (JWT){
      if (!options.headers) {
          options.headers = new Headers({ Accept: 'application/json' });
      }
      // add your own headers here
      options.headers.set('Authorization', `Bearer ${JWT}`);
      return fetchUtils.fetchJson(url, options);
    });
    };

// Define the dataprovider
const dataProvider = hasuraDataProvider('http://localhost:8081', httpClient);

// Define main App
const App = () => {
  return (
    <Admin
      dataProvider={dataProvider}
      authProvider={fbAuthProvider}
    >
      <Resource
        name="todos"
        list={TodoList}
        edit={TodoEdit}
        create={TodoCreate}
      />
      <Resource name="users" list={UserList} show={UserShow} />
    </Admin>
  );
};

export default App;
