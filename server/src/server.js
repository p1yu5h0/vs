const app = require("./app");
const { connect } = require("./modules/db/mongo");

const PORT = 4000;

const setup = async (db) => {
  const { updateSchema } = await require("./modules/models/video/schema");
  await updateSchema(db);
  const { routes } = await require("./modules/models/video/controller");
  routes(app);
};

app.listen(PORT, async () => {
  console.log(`listening on port ${PORT}`);
  const db = await connect("mongodb://localhost:27017");
  await setup(db);
  console.log("application setup completed");
  app.use("/", (req, res) => {
    console.log(`request received at ${new Date()}`);
    console.log("req", req.body);
    res.send(`request received at ${new Date()}`);
  });

  console.log(new Date());
  console.log("application started", new Date().toTimeString());
});