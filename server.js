import mysql from "mysql";
import config from "./config.js";
import fetch from "node-fetch";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import response from "express";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(express.static(path.join(__dirname, "client/build")));

app.post("/api/SearchedMovies", (req, res) => {
  let connection = mysql.createConnection(config);

  const { title, actor, director } = req.body;
  let sql =
    'SELECT M.name, CONCAT(D.first_name, " ", D.last_name) AS director_name, ' +
    'GROUP_CONCAT(DISTINCT A.first_name, " ", A.last_name) AS ActorsNames, ' +
    "GROUP_CONCAT(DISTINCT R.reviewContent) AS reviews, " +
    "AVG(R.reviewScore) AS avg_review_score " +
    "FROM movies M " +
    "LEFT JOIN movies_directors MD ON M.id = MD.movie_ID " +
    "LEFT JOIN directors D ON D.id = MD.director_id " +
    "LEFT JOIN roles RO ON M.id = RO.movie_ID " +
    "LEFT JOIN actors A ON A.id = RO.actor_id " +
    "LEFT JOIN Review R ON M.id = R.movieID ";

  const data = [];

  if (title || actor || director) {
    sql += "WHERE ";
    if (title) {
      sql += "M.name LIKE ? ";
      data.push(`%${title}%`);
    }
    if (actor) {
      if (title) sql += "AND ";
      sql += 'CONCAT(A.first_name, " ", A.last_name) LIKE ? ';
      data.push(`%${actor}%`);
    }
    if (director) {
      if (title || actor) sql += "AND ";
      sql += 'CONCAT(D.first_name, " ", D.last_name) LIKE ? ';
      data.push(`%${director}%`);
    }
  }

  sql += "GROUP BY M.name, director_name, R.reviewContent";

  connection.query(sql, data, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
      return;
    }

    let string = JSON.stringify(results);
    res.send({ express: string });
  });

  connection.end();
});

app.post("/api/getMovies", (req, res) => {
  let connection = mysql.createConnection(config);

  let sql = "SELECT * FROM movies";

  connection.query(sql, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
      return;
    }

    let string = JSON.stringify(results);
    let obj = JSON.parse(string);
    res.send(obj);
  });
  connection.end();
});

app.post("/api/loadUserSettings", (req, res) => {
  let connection = mysql.createConnection(config);
  let userID = req.body.userID;

  let sql = `SELECT mode FROM user WHERE userID = ?`;
  console.log(sql);
  let data = [userID];
  console.log(data);

  connection.query(sql, data, (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    }

    let string = JSON.stringify(results);
    //let obj = JSON.parse(string);
    res.send({ express: string });
  });
  connection.end();
});

app.post("/api/addReview", (req, res) => {
  let connection = mysql.createConnection(config);

  //let { movieId, userId, reviewTitle, reviewContent, reviewScore } = req.body;

  let sql = `INSERT INTO Review (movieId, userId, reviewTitle, reviewContent, reviewScore) VALUES (?, ?, ?, ?, ?)`;
  let data = [
    req.body.movieId,
    req.body.userId,
    req.body.reviewTitle,
    req.body.reviewContent,
    req.body.reviewScore,
  ];

  connection.query(sql, data, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
      return;
    }

    res.send("Review added successfully");
  });

  connection.end();
});

aapp.post("/api/addTrailer", (req, res) => {
	let connection = mysql.createConnection(config);
  
	let sql = `UPDATE movies SET trailers = ? WHERE ID = ?`;
	let data = [req.body.trailerLink, req.body.movieID]; 
  
	connection.query(sql, data, (error, results) => {
	  if (error) {
		console.error(error);
		res.status(500).send("Internal Server Error");
		return;
	  }
  
	  console.log("Trailer added"); 
  
	  res.send("Trailer added successfully");
  
	  connection.end();
	});
});  

app.listen(port, () => console.log(`Listening on port ${port}`)); //for the dev version
//app.listen(port, '172.31.31.77'); //for the deployed version, specify the IP address of the server
