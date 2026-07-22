import fs from "node:fs/promises";

async function saveInJson(newRecord) {
  try {
    const fileContent = await fs.readFile("./results.json", "utf8");
    const data = fileContent.trim() ? JSON.parse(fileContent) : [];

    data.push(newRecord);

    await fs.writeFile("./results.json", JSON.stringify(data, null, 2), "utf8");

    console.log("JSON file written");
  } catch (error) {
    console.error("Failed to write file:", error);
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

  console.log("success");
  list = list.filter((e) => e !== name);

  if (list.length === 0) {
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

function resultSubmitPost(req, res) {
  const { username, timer } = req.body;

  saveInJson({ username, timer });

  return res.json({
    message: "saved!",
  });
}

export default {
  figureValidator,
  resultSubmitPost,
};
