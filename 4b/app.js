const express = require("express");
const app = express();
const port = 4000;
const path = require("path");
const hbs = require("hbs");
const bcrypt = require("bcrypt");
const session = require("express-session");
const flash = require("express-flash");
const { Op, where } = require("sequelize");
const { users_tb, collections_tb, task_tb } = require("./models");

// app settings
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "./src/views"));
app.use("/assets", express.static(path.join(__dirname, "./src/assets")));
app.use(express.urlencoded({ extended: true }));
app.use(flash());
app.use(
  session({
    name: "my-session",
    secret: "sicmunduscreatusest",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

// handlebars partials & helpers
hbs.registerPartials(path.join(__dirname, "./src/views/partials"));

hbs.registerHelper("countTask", (array, value) => {
  return array.filter((x) => x.collections_id === value).length;
});

hbs.registerHelper("countDone", (array, value) => {
  return array.filter((x) => x.collections_id === value && x.is_done == true).length;
});

hbs.registerHelper("notDone", (array, value) => {
  return array.filter((x) => x.collections_id === value && x.is_done == false);
});

hbs.registerHelper("isZero", (array, value) => {
  return array.filter((x) => x.collections_id === value).length == 0;
});

// url handling
app.get("/", collectionPage);
app.post("/collection", collectionPost);
app.get("/collection-delete/:id", collectionDelete);

app.get("/task/:id", taskPage);
app.post("/task/:id", taskPost);
app.get("/task/:id/:collections_id", taskDone);

app.get("/register", registerPage);
app.post("/register", registerPost);

app.get("/login", loginPage);
app.post("/login", loginPost);

app.get("/logout", logout);

// collection - page
async function collectionPage(req, res) {
  const user = req.session.user;
  const userId = req.session.userId;
  let collections;
  if (user) {
    collections = await collections_tb.findAll({
      where: {
        user_id: userId,
      },
    });
  }
  const allTask = await task_tb.findAll({});
  res.render("index", {
    title: "Collections",
    user,
    collections,
    allTask,
  });
}

// collection - create
async function collectionPost(req, res) {
  const { name } = req.body;
  const userId = req.session.userId;
  const created = await collections_tb.create({ name: name, user_id: userId });
  if (created) {
    req.flash("success", "Collection added successfully");
    res.redirect("/");
  } else {
    req.flash("error", "Failed to add collection!");
    res.redirect("/");
  }
}

// collection - delete
async function collectionDelete(req, res) {
  const { id } = req.params;
  await collections_tb.destroy({
    where: {
      id: id,
    },
  });

  await task_tb.destroy({
    where: {
      collections_id: id,
    },
  });

  req.flash("success", "Collection deleted successfully");
  res.redirect("/");
}

// task - page
async function taskPage(req, res) {
  const { id } = req.params;
  const user = req.session.user;
  if (!user) {
    req.flash("error", "Please login first!");
    return res.redirect("/login");
  }
  const collection = await collections_tb.findAll({ where: { id: id } });
  const tasks = await task_tb.findAll({ where: [{ collections_id: id }, { is_done: false }] });
  const taskDone = await task_tb.findAll({
    where: [{ collections_id: id }, { is_done: true }],
    order: [["updatedAt", "DESC"]],
  });
  const allTask = await task_tb.findAll({});
  res.render("task", {
    title: "Tasks",
    user,
    collection,
    tasks,
    taskDone,
    totalTask: tasks.length + taskDone.length,
    allTask,
  });
}

// task - create
async function taskPost(req, res) {
  const { id } = req.params;
  const { name } = req.body;

  const created = await task_tb.create({ name: name, is_done: false, collections_id: id });

  res.redirect("/task/" + id);
}

// task - done
async function taskDone(req, res) {
  const { id, collections_id } = req.params;

  await task_tb.update(
    { is_done: true },
    {
      where: {
        id: id,
      },
    }
  );
  res.redirect("/task/" + collections_id);
}

// register - page
async function registerPage(req, res) {
  res.render("register", { title: "Register" });
}

// register - post
async function registerPost(req, res) {
  const { email, username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const [_, created] = await users_tb.findOrCreate({
    where: { [Op.or]: [{ email: email }, { username: username }] },
    defaults: { email: email, username: username, password: hashedPassword },
  });
  if (created) {
    res.redirect("login");
  } else {
    res.redirect("register");
  }
}

// login - page
async function loginPage(req, res) {
  res.render("login");
}

// login - post
async function loginPost(req, res) {
  const { username, password } = req.body;
  const user = await users_tb.findAll({ where: { username: username } });
  const validation = await bcrypt.compare(password, user[0].password);
  if (validation) {
    req.session.user = user[0];
    req.session.userId = user[0].id;
    res.redirect("/");
  } else {
    res.redirect("login");
  }
}

// logout
function logout(req, res) {
  req.session.destroy();

  req.flash("success", "Logout success");
  res.redirect("/");
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
