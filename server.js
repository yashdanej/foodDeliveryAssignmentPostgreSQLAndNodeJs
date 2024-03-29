const express = require("express");
const foodRoutes = require("./src/food/routes");
const app = express();
const port = 3000;

const { swaggerServe, swaggerSetup } = require("./config");

app.use(express.json());
app.use('/api/v1/food', foodRoutes);
app.use("/api-docs", swaggerServe, swaggerSetup); 

app.listen(port, () => {
    console.log(`app listening on port ${port}`);
}); 