require('dotenv').config();
const express = require("express");
const foodRoutes = require("./src/food/routes");
const app = express();

const { swaggerServe, swaggerSetup } = require("./config");

app.use(express.json());
app.use('/api/v1/food', foodRoutes);
app.use("/api-docs", swaggerServe, swaggerSetup); 

app.listen(process.env.PORT, () => {
    console.log(`app listening on port ${process.env.PORT}`);
});