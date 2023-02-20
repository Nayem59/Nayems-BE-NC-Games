const request = require("supertest");
const seed = require("../db/seeds/seed");
const db = require("../db/connection");
const testData = require("../db/data/test-data/index");
const app = require("../app");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("GET /api/categories", () => {
  it("200: should respond with category objects array, which should have slug and description properties", () => {
    return request(app)
      .get("/api/categories")
      .expect(200)
      .then(({ body }) => {
        expect(typeof body).toBe("object");
        const { categories } = body;
        expect(body).toHaveProperty("categories");
        expect(body.categories).toBeInstanceOf(Array);
        expect(categories.length).toBe(4);
        categories.forEach((category) => {
          expect(category).toHaveProperty("slug", expect.any(String));
          expect(category).toHaveProperty("description", expect.any(String));
        });
      });
  });
  //
  it("404: should respond with 404 not found", () => {
    return request(app).get("/api/wrongEndpoint").expect(404);
  });
});
