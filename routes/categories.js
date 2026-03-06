const express = require("express");
const router = express.Router();
const fs = require("fs");

let categories = require("../data/categories.json");

function save() {
    fs.writeFileSync("./data/categories.json", JSON.stringify(categories, null, 2));
}

router.get("/", (req, res) => {
    res.json(categories.map(c => ({
        id: c.id,
        name: c.name
    })));
});

router.get("/:id", (req, res) => {
    const category = categories.find(c => c.id == req.params.id);
    if (!category) return res.status(404).json({
        error: "Not found"
    });
    res.json(category);
});

router.post("/", (req, res) => {

    const {
        name,
        description
    } = req.body;

    if (!name)
        return res.status(400).json({
            error: "Name is required"
        });

    const newCategory = {
        id: Date.now(),
        name,
        description
    };

    categories.push(newCategory);
    save();

    res.json(newCategory);
});

router.put("/:id", (req, res) => {

    const category = categories.find(c => c.id == req.params.id);
    if (!category) return res.status(404).json({
        error: "Not found"
    });

    const {
        name,
        description
    } = req.body;

    if (!name)
        return res.status(400).json({
            error: "Name is required"
        });

    category.name = name;
    category.description = description;

    save();

    res.json(category);
});

router.delete("/:id", (req, res) => {

    const items = require("../data/items.json");

    const used = items.find(i => i.category_id == req.params.id);

    if (used)
        return res.status(400).json({
            error: "Category used in items"
        });

    categories = categories.filter(c => c.id != req.params.id);

    save();

    res.json({
        message: "Deleted"
    });
});


module.exports = router;