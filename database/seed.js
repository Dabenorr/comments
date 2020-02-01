const faker = require("faker");
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const _ = require("lodash");
const url = "mongodb://localhost:27017";

const dbName = "Comments";

MongoClient.connect(url, function (err, client) {
  assert.equal(null, err);

  const db = client.db(dbName);
  const commentsCollection = db.collection("Comments");

  let comments = [];
  for (let i = 0; i < 400; i += 1) {
    const song_id = i;
    const user_id = faker.random.number({
      'min': 10,
      'max': 50
    });

    var randomWordCount = Math.floor(Math.random() * 30);
    const message = faker.random.words(randomWordCount);

    const audio_position = faker.random.number({
      'min': 1,
      'max': 120
    });
    let newComment = {
      song_id: song_id,

      user_id: user_id,
      message: message,
      audio_position: audio_position,
    };
    comments.push(newComment);
  }
  commentsCollection.insertMany(comments);

});