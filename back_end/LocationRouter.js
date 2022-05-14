const express = require("express");
const database = require("./db");

const router = express.Router();

router.get("/all", async (req, res) => {
  try {
    const locations = database.collection("locations");
    const data = await locations.get();
    const locationsArray = [];
    if (data.empty) {
      res.status(404).send("No location found!");
    } else {
      data.forEach((doc) => {
        let newRoute = doc.data();
        newRoute.id = doc.id;
        locationsArray.push(newRoute);
      });
      res.send(locationsArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/add", async (req, res) => {
  try {
    const newLocation = {
      origin: req.body.origin,
      destination: req.body.destination,
      distance: req.body.distance,
      duration: req.body.duration,
    };

    if (
      !newLocation.origin ||
      !newLocation.destination ||
      !newLocation.distance ||
      !newLocation.duration
    ) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }
    const response = await database.collection("locations").add(newLocation);
    res.send(response);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/:place", async (req, res) => {
  try {
    const locations = database.collection("locations");
    const data = await locations.get();
    const locationsArray = [];
    if (data.empty) {
      res.status(404).send("No location found!");
    } else {
      data.forEach((doc) => {
        if (
          doc.data().destination.includes(req.params.place) ||
          doc.data().origin.includes(req.params.place)
        ) {
          let newRoute = doc.data();
          newRoute.id = doc.id;
          locationsArray.push(newRoute);
        }
      });
      res.send(locationsArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    database.collection("locations").doc(req.params.id).delete();
    res.send("Document successfully deleted!");
  } catch (error) {
    res.send("Error removing document: ", error);
  }
});

module.exports = router;
