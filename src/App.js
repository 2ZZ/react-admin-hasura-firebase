import React, { useState, useEffect } from "react";
import { fetchUtils, Admin, Resource } from "react-admin";
import { TodoCreate, TodoEdit, TodoList } from "./todos";
import { SecretCreate, SecretEdit, SecretList } from "./secrets";
import { UserList, UserShow } from "./users";
import buildHasuraProvider from "ra-data-hasura";
//import PostIcon from '@material-ui/icons/Book';
//import UserIcon from '@material-ui/icons/Group';
import { FirebaseAuthProvider } from "react-admin-firebase";
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { theme } from "./theme";

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
  persistence: "session",
  associateUsersById: true
};

// This defines the AuthProvider first
const fbAuthProvider = FirebaseAuthProvider(firebaseConfig, firebaseOptions);

const httpLink = createHttpLink({
  uri: 'http://localhost:8081/v1/graphql',
});

const authLink = setContext((_, { headers }) => {
  return fbAuthProvider.getJWTToken().then(function (token){
    if (token) {
      fbAuthProvider.checkAuth().then(function(user) {
        localStorage.setItem('user.uid',user.uid)
        localStorage.setItem('user.email',user.email)
      })
      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : "",
        }
      }
    }
  })
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

// Define main App
const App = () => {
  const [dataProvider, setDataProvider] = useState(null);

  useEffect(() => {
    const buildDataProvider = async () => {
      const dataProvider = await buildHasuraProvider({client: client});
      setDataProvider(() => dataProvider);
    };
    buildDataProvider();
  }, []);

  if (!dataProvider) return <p>Loading...</p>;

  return (
    <Admin
      dataProvider={dataProvider}
      authProvider={fbAuthProvider}
      theme={theme}
    >
      <Resource
        name="secrets"
        list={SecretList}
        edit={SecretEdit}
        create={SecretCreate}
      />
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
