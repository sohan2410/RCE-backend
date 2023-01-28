import chai from "chai"
import reqeust from "supertest"
import app from "../src/app"
const expect = chai.expect
describe("Server test", () => {
  it("Should run the server", async () => {
    const response = await reqeust(app).get("/")
    expect(response.status).to.equal(200)
    expect(response.body).to.be.an("object")
    expect(response.body).to.have.all.keys("status", "message")
    expect(response.body.status).to.equal(true)
    expect(response.body.message).to.be.an("string")
  })
})
