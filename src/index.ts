import express from "express";
import "reflect-metadata";
import cors from "cors";
import { createConnection } from "typeorm";

import userRoutes from "./routes/user.routes";
import enviroment from "./enviroment";

const app = express();
createConnection();

const bodyParser = require("body-parser");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//Cors
app.use(cors());

//Lectura y parseo del body

app.use(express.json());

//Routes
app.use(userRoutes);

app.listen(enviroment.PORT, () => {
  console.log("Escuchando puerto: ", enviroment.PORT);
});
