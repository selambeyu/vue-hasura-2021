import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import AuthPlugin from "./plugins/auth";

import VueApollo from "vue-apollo";

import ApolloClient from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";


Vue.use(AuthPlugin);
Vue.use(VueApollo);

Vue.config.productionTip = false;

const getHeaders = () => {
  const headers = {};
   const token = window.localStorage.getItem('apollo-token');
   if (token) {
     headers.authorization = `Bearer ${token}`;
   }
   return headers;
 };
 // Create an http link:
 const link = new HttpLink({
   uri: 'https://hasura.io/learn/graphql',
   fetch,
   headers: getHeaders()
 });
 const client = new ApolloClient({
   link: link,
   cache: new InMemoryCache({
     addTypename: true
   })
 });

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
