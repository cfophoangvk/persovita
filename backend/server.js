//express.js: thư viện tạo web api
//nodemon: thư viện reload web api
//cors: thư viện gọi api phía frontend

const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();

app.use(express.json());
app.use(cors()); //for fucking frontend app
app.get("/", (req, res) => {
  res.send("<h2>Hello Express Web API</h2>");
})

app.get("/user", (req, res) => {
  res.send("Get user");
});

app.post("/user", (req, res) => {
  res.send("Get user");
});

app.put("/user", (req, res) => {
  res.send("Get user");
});

app.delete("/user", (req, res) => {
  res.send("Get user");
});

//Dùng database.json để lưu CSDL
app.get("/file", (req, res) => {
  fs.readFile('db/database.json', 'utf8', (err, data) => {
    if (err) {
      res.send("Cannot read database.json")
      return;
    }
    res.send(JSON.parse(data));
  });
})

const PORT = 6789;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});