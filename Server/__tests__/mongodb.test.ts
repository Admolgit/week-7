const request = require("supertest");
const app = require("../../Server/index");

const balance = {
  "account": 3882768020,
  "balance": 110300,
  "createdAt": "2022-04-04T19:50:55.571Z"
};

const balancePost = {
  "balance": 110300,
};

const transaction = {
  "reference": "311476de-cc57-4250-b265-72b6f5ac0107",
  "senderAccount": 4547927321,
  "amount": 300,
  "receiverAccount": 3882768020,
  "transferDescription": "for payment",
  "createdAt": "2022-04-04T22:01:45.830Z"
}

const trans = {
  "senderAccount": 4547927321,
  "amount": 300,
  "receiverAccount": 3882768020,
  "transferDescription": "for payment",
}

describe("getAllAccount", () => {
  test("Should return all balances of an account holder", async () => {
    await request(app)
    .send(balance)
    .expect(200)
  })
});

// // describe('/create-account', () => {

// // })

// describe("Should respond with 200 when user is posted", () => {

//   it("should return 404 status code", async () => {
//     await request(app)
//     .post("").send(balancePost)
//     .expect(200);
//   })

// });

// describe("Should return 200 for users found", () => {
//   it("GET /balance", async () => {
//       await request(app).get("/balances")
//       .send({
//         balance
//       })
//       .expect(200)
//   });

//   it("GET /", async () => {
//       await request(app).get("/allaccount")
//       .send({
//         balance
//       })
//       .expect(200)
//   });
// });

// describe("GET /balances", () => {

//   it("should return an 404 status for item not found", async () => {
//       await request(app)
//       .get(`/balances`)
//       .expect(200);
//   });

// });
