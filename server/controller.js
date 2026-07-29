import fs from "node:fs/promises";
import { prisma } from "./lib/prisma.js";

async function saveResult(newRecord) {
  try {
    await prisma.leaderboard.create({
      data: {
        name: newRecord.username,
        timer: newRecord.timer,
      },
    });
  } catch (error) {
    console.error(error);
  }
}

function figureValidator(req, res, name) {
  const figureArrayObj = {
    waldo: [0.39846, 0.40955, 0.60915, 0.6597],
    odlaw: [0.06406, 0.07851, 0.67879, 0.7144],
    wizard: [0.77382, 0.78945, 0.56012, 0.61234],
    wenda: [0.28924, 0.29948, 0.50676, 0.5599],
  };

  const { targetsObj, imgCoors } = req.body;
  let { list } = req.body;

  const ratioX = targetsObj.position.X / imgCoors.X;
  const ratioY = targetsObj.position.Y / imgCoors.Y;

  const isCorrect =
    ratioX >= figureArrayObj[name][0] &&
    ratioX <= figureArrayObj[name][1] &&
    ratioY >= figureArrayObj[name][2] &&
    ratioY <= figureArrayObj[name][3];

  if (!isCorrect) {
    console.log("fail");

    return res.json({
      message: `Wrong tagging ${name}`,
      result: false,
      list,
    });
  }

  //
  console.log(`success ${name}`);
  list.forEach((element) => {
    if (element.name === name) {
      element.clicked = true;
    }
  });

  if (list.every((element) => element.clicked)) {
    return res.json({
      message: `Successfully find ${name}`,
      result: true,
      list,
      gameOver: true,
    });
  }

  return res.json({
    message: `Successfully find ${name}`,
    result: true,
    list,
  });
}

async function resultSubmitPost(req, res) {
  const { username, timer } = req.body;

  try {
    await saveResult({ username, timer });
  } catch (error) {
    console.error("Failed to save record:", error);
  }

  return res.json({
    message: "Submission successful",
  });
}

async function getLeaderboard(req, res) {
  try {
    const records = await prisma.leaderboard.findMany();

    return res.send(JSON.stringify(records));
  } catch (error) {
    console.error(error);
  }
}

export default {
  figureValidator,
  resultSubmitPost,
  getLeaderboard,
};
