const request = require("supertest");
const seed = require("../db/seeds/seed");
const db = require("../db/connection");
const testData = require("../db/data/test-data/index");
const app = require("../app");
const { expect } = require("@jest/globals");

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
describe("GET /api/reviews", () => {
  it("200: should respond with review objects array, which should have 9 properties and sorted by date desc", () => {
    return request(app)
      .get("/api/reviews")
      .expect(200)
      .then(({ body }) => {
        expect(typeof body).toBe("object");
        expect(body).toHaveProperty("reviews");
        const { reviews } = body;
        expect(body.reviews).toBeInstanceOf(Array);
        expect(reviews.length).toBe(13);
        reviews.forEach((review) => {
          expect(review).toHaveProperty("owner", expect.any(String));
          expect(review).toHaveProperty("title", expect.any(String));
          expect(review).toHaveProperty("review_id", expect.any(Number));
          expect(review).toHaveProperty("category", expect.any(String));
          expect(review).toHaveProperty("review_img_url", expect.any(String));
          expect(review).toHaveProperty("created_at", expect.any(String));
          expect(review).toHaveProperty("votes", expect.any(Number));
          expect(review).toHaveProperty("designer", expect.any(String));
          expect(review).toHaveProperty("comment_count", expect.any(String));
        });
        expect(reviews).toBeSortedBy("created_at", {
          descending: true,
        });
      });
  });
  //
  it("404: should respond with 404 not found", () => {
    return request(app).get("/api/differentEndpoint").expect(404);
  });
});
//
// describe("GET /api/reviews/:review_id", () => {
//   it("200: should respond with review object, which should have 9 properties", () => {
//     return request(app)
//       .get("/api/reviews/1")
//       .expect(200)
//       .then(({ body }) => {
//         const { review } = body;
//         expect(typeof review).toBe("object");
//         expect(review).toHaveProperty("review_id", expect.any(Number));
//         expect(review.review_id).toBe(1);
//         expect(review).toHaveProperty("title", expect.any(String));
//         expect(review.title).toBe("Agricola");
//         expect(review).toHaveProperty("review_body", expect.any(String));
//         expect(review).toHaveProperty("designer", expect.any(String));
//         expect(review).toHaveProperty("review_img_url", expect.any(String));
//         expect(review).toHaveProperty("votes", expect.any(Number));
//         expect(review).toHaveProperty("category", expect.any(String));
//         expect(review).toHaveProperty("owner", expect.any(String));
//         expect(review).toHaveProperty("created_at", expect.any(String));
//       });
//   });
// });
