import chai from "chai"
import reqeust from "supertest"
import app from "../src/app"
const expect = chai.expect
describe("Language test", () => {
  // C language
  it("Should execute c program without giving input", async () => {
    const response = await reqeust(app)
      .post("/api/code/execute")
      .send({
        format: "c",
        code: `#include <stdio.h>
      int main() {
          // Write C code here
          printf("Hello world");
      return 0;
      }`,
      })
    expect(response.status).to.equal(200)
    expect(response.body).to.be.an("object")
    expect(response.body).to.have.all.keys("status", "message", "output")
    expect(response.body.status).to.equal(true)
    expect(response.body.message).to.be.an("string")
    expect(response.body.output).to.be.an("string")
  })
  it("Should execute c program with input", async () => {
    const response = await reqeust(app)
      .post("/api/code/execute")
      .send({
        format: "c",
        code: `#include <stdio.h>
        int main()
        {
            int a, b;
            printf("Enter first number: ");
            scanf("%d", &a);
            printf("Enter second number:");
            scanf("%d", &b);
            printf("A : %d  B : %d" ,a , b);
            return 0;
        }
        `,
        input: `2\n3`,
      })
    expect(response.status).to.equal(200)
    expect(response.body).to.be.an("object")
    expect(response.body).to.have.all.keys("status", "message", "output")
    expect(response.body.status).to.equal(true)
    expect(response.body.message).to.be.an("string")
    expect(response.body.output).to.be.an("string")
  })
  it("Should fail to execute c program", async () => {
    const response = await reqeust(app)
      .post("/api/code/execute")
      .send({
        format: "c",
        code: `#include <stdio.h>
      int main() {
          // Write C code here
          printf("Hello world");
      return 0
      }`,
      })
    expect(response.status).to.equal(200)
    expect(response.body).to.be.an("object")
    expect(response.body).to.have.all.keys("status", "message", "error")
    expect(response.body.status).to.equal(false)
    expect(response.body.message).to.be.an("string")
    expect(response.body.error).to.be.an("string")
  })
  // Todo:
  // 1. it("Should fail to execute when number of input provided are insufficient")
  // 2. it("Should fail for run time execution")
  // 3. Write test cases for c++, py, js, java
})
