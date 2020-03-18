const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const expSessions = require("express-session");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const uuid = require("uuid");

// Initializations
const app = express();

const User = require("./models/User");
const mongodb_conn_module = require("./config/mongoDBConn");
let mongoDB = mongodb_conn_module.connect();

// Configurations
const PORT = process.env.PORT || 8081;
const SECRET = process.env.SECRET || "support_center_app";
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:8080";

app.set("port", PORT);

const corsOptions = {
  origin: CLIENT_ORIGIN,
  credentials: true
};

// Middlewares
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(cookieParser(SECRET));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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

app.use(passport.initialize());
app.use(passport.session());

// Global variables
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

// Routes
app.use(require("./routes/questions"));
app.use(require("./routes/users"));
app.use(require("./routes/tickets"));

// Starting the server
app.listen(app.get("port"), () => {
  console.log(`Server on port: ${PORT}`);
});
