const express = require("express");
const routes = require("./controllers");
const sequelize = require("./config/connection");
const path = require("path");
const helpers = require("./utils/helpers");
const exphbs = require("express-handlebars");
const hbs = exphbs.create({ helpers });
const session = require("express-session");
const app = express();
const PORT = process.env.PORT || 3001;
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const categorySeedData = require("./seeds/categorySeeds.json");
const Category = require("./models/Category.js");

const sess = {
  secret: "Super secret secret",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(routes);

app.get("/*", (req, res) => {
  res.render("404", { loggedIn: req.session.loggedIn });
});

sequelize.sync({ force: false }).then(async () => {
  // await Category.bulkCreate(categorySeedData);
  app.listen(PORT, () => console.log("Now listening"));
});
