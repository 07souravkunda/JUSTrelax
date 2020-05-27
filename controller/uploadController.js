const AWS = require("aws-sdk");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const key = process.env.AWS_ACCESS_KEY_ID;
const access = process.env.AWS_SECRET_ACCESS_KEY;
const S3 = new AWS.S3({
  accessKeyId: key,
  secretAccessKey: access,
});

const file = fs.readFileSync(path.resolve("./shayad.mp3"));
const stat = fs.statSync(path.resolve("./shayad.mp3"));
console.log(stat, "stat");
console.log(file);
const upload = (req, res, next) => {
  console.log("uploading..");
  try {
    // const url = await S3.getSignedUrlPromise("putObject", {
    //   Bucket: "justrelax-bucket",
    //   ContentType: "image/jpeg",
    //   Key: "key1",
    // });
    // console.log(url);
    // await axios.put(url, file, {
    //   headers: {
    //     "Content-Type": "image/jpeg",
    //   },
    // });
    const params = {
      Body: JSON.stringify(file),
      Bucket: "justrelax-bucket",
      Key: "new4.mp3",
      ContentLength: stat.size,
    };

    S3.upload(params, (err, data) => {
      if (err) {
        console.log(err);
        // return res.send(err);
      }
      console.log(data);
      // return res.send(data);
    });
  } catch (er) {
    console.log(er);
    // res.send(er.message);
  }
};
upload();
