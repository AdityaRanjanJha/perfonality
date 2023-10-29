const Bool = require("../model/data");
const asyncHandler = require("express-async-handler");

const createEntry = asyncHandler(async (req, res) => {
  try {
    const {
      music,
      dogandcat,
      travel,
      datenight,
      relationship,
      smokeanddrink,
      outdoor,
    } = req.body;

    const entery = new Bool({
      music,
      dogandcat,
      travel,
      datenight,
      relationship,
      smokeanddrink,
      outdoor,
    });

    try {
      await entery.save();
    } catch (err) {
      console.log(err);
    }

    if (entery) {
      res.status(201).json({
        _id: entery._id,
        music: entery.music,
        dogandcat: entery.dogandcat,
        travel: entery.travel,
        datenight: entery.datenight,
        relationship: entery.relationship,
        smokeanddrink: entery.smokeanddrink,
        outdoor: entery.outdoor,
      });
    }
  } catch (error) {
    res.json({ message: error.message });
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
    const _id = req.params.id;
    const userData = await Bool.findOne({ _id });

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

module.exports = { createEntry,calculateOverallSimilarity };
