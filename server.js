const express = require('express');
const app = express(); 

app.use(express.json());
app.use("/uploads", express.static("uploads"));

const categoriesRoutes = require("./routes/categories");
const placesRoutes = require("./routes/places");
const itemsRoutes = require("./routes/items");

app.use("/categories", categoriesRoutes);
app.use("/places", placesRoutes);
app.use("/items", itemsRoutes);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});