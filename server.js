const express = require("express");
const app = express();

let PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`ACTIVE on ${PORT}`));

const path = require("path");
const axios = require("axios");

const Sequelize = require("sequelize");
const { STRING, DATEONLY, INTEGER, BOOLEAN } = Sequelize;
let conn = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost/talent"
);

app.use("/dist", express.static(path.join(__dirname, "dist")));
app.use("/media", express.static(path.join(__dirname, "media")));
app.use(express.json());

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "index.html")));
app.get("/api/clients", async (req, res, next) => {
  try {
    res.send(await Client.findAll());
  } catch (ex) {
    next(ex);
  }
});

app.get("/api/skills", async (req, res, next) => {
  try {
    res.send(await Skill.findAll());
  } catch (error) {
    next(error);
  }
});

app.get("/api/connections", async (req, res, next) => {
  try {
    res.send(
      await Connection.findAll({
        include: [{ model: Client }, { model: Skill }],
      })
    );
  } catch (error) {
    next(error);
  }
});

const Client = conn.define("client", {
  name: STRING,
});

const Skill = conn.define("skill", {
  name: STRING,
});

const Connection = conn.define("connection", {
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  clientName: {
    type: STRING,
  },
  skillName: {
    type: STRING,
  },
});

Client.hasMany(Connection);
Skill.hasMany(Connection);
Connection.belongsTo(Client);
Connection.belongsTo(Skill);

const syncAndSeed = async () => {
  await conn.sync({ force: true });
  const kennethR = await Client.create({ name: "Kenneth R" });
  const devinB = await Client.create({ name: "Devin B" });
  const camV = await Client.create({ name: "Cam V" });
  const hein = await Client.create({ name: "Heinnssin P" });
  const john = await Client.create({ name: "John P" });
  const dancing = await Skill.create({ name: "Dancing" });
  const billiard = await Skill.create({ name: "Billiard" });
  const skipping = await Skill.create({ name: "Skipping" });
  const piano = await Skill.create({ name: "Piano" });
  Connection.create({
    clientId: kennethR.id,
    skillId: dancing.id,
    clientName: kennethR.name,
    skillName: dancing.name,
  });
  Connection.create({
    clientId: kennethR.id,
    skillId: billiard.id,
    clientName: kennethR.name,
    skillName: billiard.name,
  });
  Connection.create({
    clientId: devinB.id,
    skillId: billiard.id,
    clientName: devinB.name,
    skillName: billiard.name,
  });
  Connection.create({
    clientId: john.id,
    skillId: skipping.id,
    clientName: john.name,
    skillName: skipping.name,
  });
  Connection.create({
    clientId: camV.id,
    skillId: billiard.id,
    clientName: camV.name,
    skillName: billiard.name,
  });
};

const init = async () => {
  try {
    //seed the db
    await syncAndSeed();
  } catch (error) {
    console.log(error);
  }
};

init();
