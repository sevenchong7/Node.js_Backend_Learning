const request = require("supertest");
const app = require("../src/app");


describe("Auth API", () => {

    test("should register a new user", async () => {

        const response = await request(app)
            .post("/auth/register")
            .send({
                name: "Test User",
                email: "test@gmail.com",
                password: "123456"
            });


        expect(response.statusCode)
            .toBe(201);


        expect(response.body)
            .toHaveProperty("message");

    });

});