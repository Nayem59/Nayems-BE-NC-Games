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
//
// describe("GET /api/reviews", () => {
//   it("200: should respond with review objects array, which should have 9 properties and sorted by date desc", () => {
//     return request(app)
//       .get("/api/reviews")
//       .expect(200)
//       .then(({ body }) => {
//         expect(typeof body).toBe("object");
//         expect(body).toHaveProperty("reviews");
//         const { reviews } = body;
//         expect(body.reviews).toBeInstanceOf(Array);
//         expect(reviews.length).toBe(9);
//         reviews.forEach((review) => {
//           expect(review).toHaveProperty("owner", expect.any(String));
//           expect(review).toHaveProperty("title", expect.any(String));
//           expect(review).toHaveProperty("review_id", expect.any(Number));
//           expect(review).toHaveProperty("category", expect.any(String));
//           expect(review).toHaveProperty("review_img_url", expect.any(String));
//           expect(review).toHaveProperty("created_at", expect.any(Date));
//           expect(review).toHaveProperty("votes", expect.any(Number));
//           expect(review).toHaveProperty("designer", expect.any(String));
//           expect(review).toHaveProperty("comment_count", expect.any(Number));
//         });
//       });
//   });
// });
