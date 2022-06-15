import request from "supertest";
import app from "../Server/src/route";

const balance = {
  "account": 3882768020,
  "balance": 110300,
  "createdAt": "2022-04-04T19:50:55.571Z"
};

const balancePost = {
  "balance": 110300,
};

describe("Should respond with 200 when user is posted", () => {

  it("should return 404 status code", async () => {
    await request(app)
    .post("").send(balancePost)
    .expect(404);
  })

});

describe("Should return 200 for users found", () => {
  it("GET /balance", async () => {
    await request(app).get("/balances")
      .send({
        balance
      })
      .expect(200)
  });

  it("GET /", async () => {
    await request(app).get("/bal")
      .send({
        balance
      })
      .expect(404)
  });
});

describe("GET /balances", () => {

  it("should return an 404 status for item not found", async () => {
    // let accountNumber;
      await request(app)
      .put(`/balances`)
      .expect(404);
  });

});
