const request = require("supertest");
const express = require("express");
const move = require("../routes/move");

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use("/moves", move);

test("move route works", (done) => {
  request(app)
    .post("/moves")
    .type("form")
    .send({
      position_x: 900,
      position_y: 100,
      characterId: 1,
      gameplayId: 8,
      range: 100,
    })
    // .set("Content-Type", "application/json")
    // .set("Content-Type", "application/json")
    .then((rs) => {
      //   console.log(rs.body);
      const move = {
        position_x: rs.body.position_x,
        position_y: rs.body.position_y,
        characterId: rs.body.characterId,
        marker: rs.body.marker,
        gampelayId: rs.body.gameplayId,
      };
      const expectedMove = {
        position_x: 900,
        position_y: 100,
        characterId: 1,
        marker: true,
        gampelayId: 8,
      };
      expect(move).toEqual(expectedMove);
    })
    .catch((err) => {
      console.log(`Errors after send request: ${err}`);
    })
    .then(() => {
      done();
    });
  //   request(app).get("/moves/1").expect(200, done);
});
