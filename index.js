/*
play this: https://www.youtube.com/watch?v=d-diB65scQU

Sing along:

here's a little code I wrote, you might want to read it really slow, don't worry be happy
in every line there may be trouble, but if you worry you make it double, don't worry, be happy
ain't got no sense of what is REST? just concentrate on learning Express, don't worry, be happy
your file is getting way too big, bring a Router and make it thin, don't worry, be crafty
there is no data on that route, just write some code, you'll sort it out… don't worry, just API…
I need this code, just don't know where, perhaps should make some middleware, don't worry, be happy

Go code!
*/
const path = require("path");
const app = require("./server.js");
const projectRouter = require("./routes/projectRoutes");
const actionRouter = require("./routes/actionRoutes");

const port = process.env.PORT || 8000;

app.use("/api/projects", projectRouter);
app.use("/api/actions", actionRouter);

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

/**
 * All wrong routes
 */
app.get("*", (req, res) => {
  res.status(404).json({
    status: 404,
    message: "Wrong route"
  });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
