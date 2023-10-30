const Bool = require("../model/data");
const asyncHandler = require("express-async-handler");

const createEntry = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;

    const existingEntry = await Bool.findOne({ user: userId });

    if (existingEntry) {
      existingEntry.music = req.body.music;
      existingEntry.dogandcat = req.body.dogandcat;
      existingEntry.travel = req.body.travel;
      existingEntry.datenight = req.body.datenight;
      existingEntry.relationship = req.body.relationship;
      existingEntry.smokeanddrink = req.body.smokeanddrink;
      existingEntry.outdoor = req.body.outdoor;

      try {
        await existingEntry.save();
      } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error updating entry" });
        return;
      }

      res.status(200).json({
        _id: existingEntry._id,
        music: existingEntry.music,
        dogandcat: existingEntry.dogandcat,
        travel: existingEntry.travel,
        datenight: existingEntry.datenight,
        relationship: existingEntry.relationship,
        smokeanddrink: existingEntry.smokeanddrink,
        outdoor: existingEntry.outdoor,
      });
    } else {
      // If no entry exists, create a new one
      const {
        music,
        dogandcat,
        travel,
        datenight,
        relationship,
        smokeanddrink,
        outdoor,
      } = req.body;

      const entry = new Bool({
        user: userId,
        music,
        dogandcat,
        travel,
        datenight,
        relationship,
        smokeanddrink,
        outdoor,
      });

      try {
        await entry.save();
      } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error creating entry" });
        return;
      }

      res.status(201).json({
        _id: entry._id,
        music: entry.music,
        dogandcat: entry.dogandcat,
        travel: entry.travel,
        datenight: entry.datenight,
        relationship: entry.relationship,
        smokeanddrink: entry.smokeanddrink,
        outdoor: entry.outdoor,
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

function calculateSimilarity(dataPoint1, dataPoint2) {
  const totalProperties = Object.keys(dataPoint1).length - 2;
  let matchingProperties = 0;

  for (const property in dataPoint1) {
    if (
      property !== "_id" &&
      property !== "__v" &&
      dataPoint1[property] === dataPoint2[property]
    ) {
      matchingProperties++;
    }
  }

  const similarityPercentage = (matchingProperties / totalProperties) * 100;
  return Math.round(similarityPercentage);
}

const calculateOverallSimilarity = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const userData = await Bool.findOne({ user: userId });

    if (!userData) {
      res.status(404).json({ message: "User data not found." });
      return;
    }

    const randomData = await Bool.aggregate([{ $sample: { size: 3 } }]);
    console.log(randomData);

    const similarityValues = randomData.map((randomDataPoint) =>
      calculateSimilarity(userData, randomDataPoint)
    );

    res.status(200).json({ similarityValues });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ message: "An error occurred while calculating similarity." });
  }
});

module.exports = { createEntry, calculateOverallSimilarity };
