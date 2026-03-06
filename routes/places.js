const express = require("express");
const router = express.Router();
const fs = require("fs");

let places = require("../data/places.json");

function save() {
    fs.writeFileSync("./data/places.json", JSON.stringify(places, null, 2));
}

router.get("/", (req, res) => {
    res.json(places.map(p => ({
        id: p.id,
        name: p.name
    })));
});

router.get("/:id", (req, res) => {
    const place = places.find(p => p.id == req.params.id);
    if (!place) return res.status(404).json({
        error: "Not found"
    });
    res.json(place);
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

    const newPlace = {
        id: Date.now(),
        name,
        description
    };

    places.push(newPlace);

    save();

    res.json(newPlace);
});

router.put("/:id", (req, res) => {

    const place = places.find(p => p.id == req.params.id);

    if (!place)
        return res.status(404).json({
            error: "Not found"
        });

    const {
        name,
        description
    } = req.body;

    if (!name)
        return res.status(400).json({
            error: "Name required"
        });

    place.name = name;
    place.description = description;

    save();

    res.json(place);
});

router.delete("/:id", (req, res) => {

    const items = require("../data/items.json");

    const used = items.find(i => i.place_id == req.params.id);

    if (used)
        return res.status(400).json({
            error: "Place used in items"
        });

    places = places.filter(p => p.id != req.params.id);

    save();

    res.json({
        message: "Deleted"
    });
});

module.exports = router;