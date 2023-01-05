// @author PoofyPloop

const sqlite3 = require("sqlite3").verbose();
const sqlite = require("sqlite");
const express = require("express");
const app = express();

// use JSON middleware to parse request bodies and put result into req.body
app.use(express.json());

/** Collection */

// GET the entire collection, send it back as JSON data
app.get("/api", async function (req, res) {
  // get the data to be sent back
  const data = await db.all(
    "SELECT * FROM Movies"
  );

  // send back table data as JSON data
  res.json(data);
});

// PUT the entire collection, send it back as JSON data
app.put("/api", async function (req, res) {
  // delete all current data in the collection
  let data = await db.run(
    "DELETE FROM Movies"
  );
  // data array
  let output = [];
  // loop that inserts the new data array
  for (const [i, obj] of req.body.entries()) {
    let insert = `INSERT INTO "Movies" (`;
  let values = "VALUES( "
  // data loop that sets the value to it's key
  for (const [index, [key, value]] of Object.entries(Object.entries(obj))) {
    if (index == 0) {
      insert = insert.concat(`${key}`)
      values = values.concat(`"${value}"`)
    }
    else {
      insert = insert.concat(`,${key}`)
      values = values.concat(`,"${value}"`)
    }
  }
  const data = await db.run(
    `${insert}) ${values})`
  );
  console.log(data);
  output = [...output,data]
  }
  console.log(output);

  // send back table data as JSON data
  res.json({status: "REPLACE COLLECTION SUCCESSFUL"});
});

// POST the entire collection, send it back as JSON data
app.post("/api", async function (req, res) {
  // sql syntax variables
  let insert = `INSERT INTO "Movies" (`;
  let values = "VALUES( "
  // item adding loop with values set on appropriate keys
  for (const [index, [key, value]] of Object.entries(Object.entries(req.body))) {
    if (index == 0) {
      insert = insert.concat(`${key}`)
      values = values.concat(`"${value}"`)
    }
    else {
      insert = insert.concat(`,${key}`)
      values = values.concat(`,"${value}"`)
    }
  }
  console.log("insert and value: ", `${insert}) ${values})`)
  const data = await db.run(
    `${insert}) ${values})`
  );

  // send back table data as JSON data
  res.json({status: "CREATE ENTRY SUCCESSFUL"});
});

// DELETE the entire collection, send it back as JSON data
app.delete("/api", async function (req, res) {
  // get the data to be sent back
  const data = await db.run(
    "DELETE FROM Movies"
  );

  // send back table data as JSON data
  res.json({status: "DELETE COLLECTION SUCCESSFUL"});
});

/** Individual */

// GET a single item, send it back as JSON data
app.get("/api/:id", async function (req, res) {
  // get the data to be sent back
  console.log("Req result: ", req.params.id);
  const data = await db.all(
    "SELECT rowid, title, release_year, time_viewed FROM Movies WHERE rowid=?", req.params.id
  );

  // send back table data as JSON data
  res.json(data);
});

// PUT a single item, send it back as JSON data
app.put("/api/:id", async function (req, res) {
  let set = "SET "
  // data loop that sets the value to it's key
  for (const [index, [key, value]] of Object.entries(Object.entries(req.body))) {
    x =`${key}="${value}"`;
    if (index == 0) {
      set = set.concat(`${x}`)
    }
    else {
      set = set.concat(`,${x}`)
    }
  }
  console.log(`UPDATE Movies ${set} WHERE rowid=${req.params.id}` )
  // updating the item with the data from the loop
  const data = await db.run(
    `UPDATE "Movies" ${set} WHERE rowid=${req.params.id}`
  );

  // send back table data as JSON data
  res.json({status: "UPDATE ITEM SUCCESSFUL"});
});

// DELETE a single item, send it back as JSON data
app.delete("/api/:id", async function (req, res) {
  // delete item
  const data = await db.run(
    "DELETE FROM Movies WHERE rowid=?", req.params.id
  );
  // send back table data as JSON data
  res.json({status: "DELETE ITEM SUCCESSFUL"});
});

// creates the database and table of data to be managed, then starts the server
async function startup() {
  // create the database connection
  db = await sqlite.open({
    filename: "api.db",
    driver: sqlite3.Database,
  });

  // create
  await db.run("DROP TABLE IF EXISTS Movies");
  await db.run(
    "CREATE TABLE Movies (title TEXT, release_year TEXT, time_viewed TEXT)"
  );

  // start the server
  const server = app.listen(3000, function () {
    console.log("RESTful API listening on port 3000!");
  });
}

startup();
