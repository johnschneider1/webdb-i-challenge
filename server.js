const express = require("express");

const db = require("./data/dbConfig.js");

const server = express();

server.use(express.json());

// SANITY TEST
server.get("/", (req, res) => {
  res.send("<h3>DB Helpers with knex, and Monday's are the best</h3>");
});

// GET ALL

server.get("/accounts", (req, res) => {
  db.select("*")
    .from("accounts")
    .then(account => {
      res.status(200).json(account);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// Post to accounts

server.post("/accounts", (req, res) => {
  const accountAdd = req.body;
  db("accounts")
    .insert(accountAdd, "id")
    .then(account => {
      res.status(200).json(account);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// Delete from accounts by ID

server.delete("/accounts/:id", (req, res) => {
  db("accounts")
    .where({ id: req.params.id })
    .del()
    .then(removed => {
      res.status(200).json({ message: `deleted ${removed} account` });
    })
    .catch(err => {
      res.json(500);
    });
});

// Update/put by ID

server.put("/accounts/:id", (req, res) => {
  const changes = req.body;

  db("accounts")
    .where("id", req.params.id)
    .update(changes)
    .then(account => {
      res.status(200).json({ message: `updated ${account} account record` });
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = server;
