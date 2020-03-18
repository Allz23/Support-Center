# Support Center (Server)

- Backend of the Support Center app, developed with Express.js.

## Ecosystem

- Express.js
- Express-session
- Passport.js (local strategy)
- Cors
- Mongoose
- Uuid
- Cookie-parser

## Project build setup

```bash
#Install dependencies
npm install

#Compiles and hot-reloads for development
npm run dev
```

## The new server side of the app

- As i said in the client's **README** file, the Support Center app in the book came with a pre-built backend, and there's nothing wrong about it, i just wanted to code my own backend to learn for myself how to do it. Here i'll write most of the journey i had with this part of the app, the errors, learnings and such so it can be helpful for future development.

## Server side issues and learnings

### Express setup

- The express server configuration is the "standard" one, or at the very least, i've seen it almost everywhere. Though i had some issues with the session, it wasn't saving it correctly and the _req.user_ wasn't being populated correctly. Here's the final working code:

```JavaScript
app.use(
  expSessions({
    genid: () => uuid(),
    secret: SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 3 * 60 * 60 * 1000
    }
  })
);
```

- In the end, i removed the **SECURE** option from the cookie, since i wasn't planning on deploying the app to a _https_ server.

- TODO: look for a better way of storing the sessions, be it Redis, or the database.

### Cors

- Pretty important stuff here, Cors need to be told that the requests will have credentials on them, so, the configuration looked like this:

```JavaScript
const corsOptions = {
  origin: CLIENT_ORIGIN,
  credentials: true
};

app.use(cors(corsOptions));
```
