const express = require("express");
const path = require("path");
const boom = require("boom");
const productsRouter = require("./routes/views/products");
const productsApiRouter = require("./routes/api/products");
const isRequestAjaxOrApi = require("./utils/isRequestAjaxOrApi");

const {
  logErrors,
  wrapErrors,
  clientErrorHandler,
  errorHandler,
} = require("./utils/middlewares/errorsHandlers");

// app
const app = express();

// middlewares
app.use(express.json());

// static files
app.use("/static", express.static(path.join(__dirname, "public")));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// routes
app.use("/products", productsRouter);
app.use("/api/products", productsApiRouter);

// redirect
app.get("/", (req, res) => {
  res.redirect("/products");
});

app.use(function (req, res, next) {
  if (isRequestAjaxOrApi(req)) {
    const {
      output: { statusCode, payload },
    } = boom.notFound();
    res.status(statusCode).json(payload);
  }

  res.status(404).render("404");
});

// errors handlers
app.use(logErrors);
app.use(wrapErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

// server
const server = app.listen(8000, () => {
  console.log(`Listening http://localhost:${server.address().port}`);
});
