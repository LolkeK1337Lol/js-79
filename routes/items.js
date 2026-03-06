const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");

let items = require("../data/items.json");

function save() {
    fs.writeFileSync("./data/items.json", JSON.stringify(items, null, 2));
}

const storage = multer.diskStorage({

    destination: "./uploads",

    filename: (req, file, cb) => {
        cb(null, Date.now() + "_" + file.originalname);
    }

});

const upload = multer({
    storage
});

router.get("/", (req, res) => {
    res.json(items.map(i => ({
        id: i.id,
        name: i.name
    })));
});

router.get("/:id", (req, res) => {

    const item = items.find(i => i.id == req.params.id);

    if (!item)
        return res.status(404).json({
            error: "Not found"
        });

    res.json(item);
});

router.post("/", upload.single("photo"), (req, res) => {

    const {
        name,
        category_id,
        place_id,
        description
    } = req.body;

    if (!name || !category_id || !place_id)
        return res.status(400).json({
            error: "Missing required fields"
        });

    const newItem = {

        id: Date.now(),
        name,
        category_id,
        place_id,
        description,
        photo: req.file ? req.file.filename : null,
        date_added: new Date()

    };

    items.push(newItem);

    save();

    res.json(newItem);
});

router.put("/:id", upload.single("photo"), (req, res) => {

    const item = items.find(i => i.id == req.params.id);

    if (!item)
        return res.status(404).json({
            error: "Not found"
        });

    const {
        name,
        category_id,
        place_id,
        description
    } = req.body;

    if (!name || !category_id || !place_id)
        return res.status(400).json({
            error: "Missing fields"
        });

    item.name = name;
    item.category_id = category_id;
    item.place_id = place_id;
    item.description = description;

    if (req.file)
        item.photo = req.file.filename;

    save();

    res.json(item);
});

router.delete("/:id", (req, res) => {

    items = items.filter(i => i.id != req.params.id);

    save();

    res.json({
        message: "Deleted"
    });
});

module.exports = router;