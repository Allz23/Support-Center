# Support Center (Client)

- Web app for providing the clients of a shirt shop, allowing them to write tickets and giving answers to the most frequently asked questions.

## App ecosystem

- Vue.js
- Vuex
- Vue-router
- Axios
- Vue-Bootstrap
- Stylus

## Project build setup

```bash
#Install dependencies
npm install

#Compiles and hot-reloads for development
npm run serve

#Compiles and minifies for production
npm run build
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## Why am i writing this?

- First of all, i'm writing this as an abstract way of teaching the future me, or anyone interested in creating an app like this one. Why? Well, this app is one of the examples that can be found in the book _Vue.js 2 - Web Development Projects by Guillaume Chau_ which can be found [here](www.link.com), and of course, the credit for many parts of the code i've written here belongs to him and his book.

- Next thing to say is that, at the moment i started reading that book (and some others) i was looking for guidance in becoming a full stack JavaScript developer, or at the very least,to gain enough knowledge to develop web pages/apps with Node.js, Express, and Vue.js. The thing with this app in particular was that, it had a pre-built backend, and i wanted to learn how to create the backend by myself, so, i started my adventure on it too, and the result of it goes to the **server** folder, more information of it in the _README_ file contained within it.

- Now, another reason to write this is to remind myself in the future of the errors that i confronted while developing the app my way, and the way i resolved them, for future learning and debugging.

## The frontend development

- Most of the frontend code was developed like how it's seen in the book, the key difference, apart from the styles i added, was the use of the UI framework Bootstrap Vue and some of it's components, like the Navbar, as an example (i'm referring that component since i didn't started to write at the same time of coding, so a big part of the UI and the server was already done).

## Client development issues and learnings

### Vuex

- First off, the book example didn't worked with Vuex, it had a store.js file and all, but in that chapter the author wasn't explaining anything about Vuex, he was just introducing the "data store" concept. So i decided to install Vuex and implement it's pattern to learn how to use it and how to work with. My _/store/index.js_ file looked like this:

```JavaScript
import Vue from "vue";
import Vuex from "vuex";

import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";
import state from "./state";

Vue.use(Vuex);

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
});
```

And, as it's seen, i created separated files for the actions, mutations, getters, and the state, following the best practices i found in some videos and books.

- **TODO**:Maybe as a test i'll use the module architecture for the store, like that i can structure the app like how it should be on larger projects.

### Axios

- One particular issue that cost me a couple hours of search through the internet and documentation was the one i had with the requests made to the server after the user logged in the app. The issue was something like this: when the user logged in, the server did an authentication of the data the client was sending with the module **Passport.js** , which verified the data, and, if it was correct, serialized the user and stored the info in a _session cookie_ using the module **Express-Session**. After all this was done, on each request the client sends to the server, the cookie needed to be sent too, as this was the client _credentials_ (or that's how i gave sense to it) which the server would need to deserialize the user data and verify that this user had an active session. Thing was, when i navigated to the pages that sent requests to the server, one of the Passport methods for user authentication was returning _false_ (of course, the idea of using this method on the server and put the result in the console happened after some time of battling with the error), but when i sent a request using [Postman](www.postman.io), the result was _true_. Well, at least i knew that it was my client the one giving the error, but why? Well, after the couple of hours looking in the net, i found that Axios (and the browser's _fetch_ method too) needed to be configured to send credentials with the requests, and that i needed to tell what was the origin of those credentials. The Axios configuration that worked for me in this project was:

```JavaScript
import axios from "axios";
const axiosInstance = axios.create({
  baseURL: `http://localhost:8081`,
  // This part was missing before
  withCredentials: true,
  headers: {
    credentials: "same-origin"
  }
  // ----------------------------
});
```

Using that instance to make my requests, they worked just as i wanted.

#### The Axios plugin

- What? A plugin for Axios, which is basically a plugin? Well, yeah. One of the things i liked about the example given in the book was the _fetch plugin_, with it it was possible to fetch data just by passing the url as a parameter, like that it was possible to reuse the same plugin in many components that needed the same functionality, and even using that functionality in a mixin. The idea was pretty awesome, so i decided to code the same plugin, but, for Axios instead, since it'd save some lines of code in some parts (not needing to import Axios, configuring the instance, etc), applying the DRY principle, in the end.

Here's a view of the _superAxios.js_ file:

```JavaScript
let baseUrl;

import axios from "axios";

export async function $axios(url, options) {
  const axiosInstance = axios.create({
    baseURL: `${baseUrl}`,
    withCredentials: true,
    headers: {
      credentials: "same-origin"
    }
  });
  const response = await axiosInstance({
    method: "GET",
    url: `/${url}`
  });
  if (response.status === 200) {
    return response.data.data;
  }
}

export default {
  install(Vue, options) {
    console.log("Plugin installed", options);
    //  Plugin options
    baseUrl = options.baseUrl;

    // Axios
    Vue.prototype.$axios = $axios;
  }
};
```

Now, something important here, let's look at this piece of code:

```JavaScript
  if (response.status === 200) {
    return response.data.sentData;
  }
  // ----------------------------
});
```

In the code above, you can see that we're returning the key _sentData_ in the object data that the Axios response give us, now this is very important. Since we want to reuse this plugin, we **_need_** to make the data available for the components to use, all the data that comes from the server is sent in the format:

```JSON
  "sentData: "data"
```

Like this, we don't need to access the keys within the _resources_ object, since the object will be _null_ when the instance is created and that will lead to a warning (**TODO: look for a way to handle this issue client side**)

- **TODO**: Make the plugin able to handle all types of requests (GET, POST, etc).

### Vue-router

- One particular characteristic i learned in this project were the _route navigation guards_. Vue router offers these functions that works something like Vue's life cycle hooks, but, we can use these to create some kind of validations for the routes, in the ase of this app, using the route's _meta_ property.

```JavaScript
// Route navigation guards
router.beforeEach((to, from, next) => {
  // It's recommended to use this method to check the routes
  // Specially if we have child routes
  if (to.matched.some(r => r.meta.private) && !state.user) {
    next({
      name: "login",
      // Used to redirect the user later to his/her wanted route
      params: {
        wantedRoute: to.fullPath
      }
    });
    return;
  }

  if (to.matched.some(r => r.meta.guest) && state.user) {
    next({ name: "home" });
    return;
  }
  next();
});
```

In the code above, we check if the route is meant for logged users or not (private or guests, respectively) and depending on that, we redirect them to the login page or the home screen.

- Another important concept, _child routes_, with this we can have routes that are related with each other, as we can see in the code below:

```JavaScript
{
    path: "/tickets",
    component: TicketsLayout,
    meta: { private: true },
    children: [
      { path: "", name: "tickets", component: Tickets },
      { path: "new", name: "new-ticket", component: NewTicket },
      // We add 'props' since we want to decouple the component from the route
      {
        path: ":id",
        name: "ticket",
        component: Ticket,
        props: route => ({ id: route.params.id })
      }
    ]
  }
```

Like this, we can add the same properties of the parent route to the children, like the _meta_ object, in this case.
