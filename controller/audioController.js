const fs = require("fs");
const AppError = require("../utils/appError");

const data = JSON.parse(
  fs.readFileSync("./assets/dev-data/dev-data.json", "utf-8")
).musics;

exports.getAllAudios = (req, res, next) => {
  res.status(200).json({
    satus: "success",
    musicLength: data.length,
    data,
  });
};

exports.getAudio = (req, res, next) => {
  const stat = fs.statSync(`./assets/audio/${req.params.id}`);
  const total = stat.size;
  if (req.headers.range) {
    const range = req.headers.range;
    const parts = range.replace(/bytes=/, "").split("-");
    const partialstart = parts[0];
    const partialend = parts[1];

    const start = parseInt(partialstart, 10);
    const end = partialend ? parseInt(partialend, 10) : total - 1;
    const chunksize = end - start + 1;
    const readStream = fs.createReadStream(`./assets/audio/${req.params.id}`, {
      start: start,
      end: end,
    });
    res.writeHead(206, {
      "Content-Range": "bytes " + start + "-" + end + "/" + total,
      "Accept-Ranges": "bytes",
      "Content-Length": chunksize,
      "Content-Type": "audio/mp3",
    });
    readStream.pipe(res);
  } else {
    res.writeHead(200, {
      "Content-Length": total,
      "Content-Type": "audio/mp3",
    });
    fs.createReadStream(`./assets/audio/${req.params.id}`).pipe(res);
  }
};

exports.getAudioImage = (req, res, next) => {
  fs.createReadStream(`./assets/image/${req.params.id}`).pipe(res);
};

exports.getSearchedSong = (req, res, next) => {
  const resData = data[data.findIndex((el) => el.name === req.params.id)];

  if (resData) {
    res.status(200).json({
      status: "success",
      data: resData,
    });
  } else {
    return next(new AppError("Not Found", 404));
  }
};
