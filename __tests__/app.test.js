const request = require("supertest");
const seed = require("../db/seeds/seed");
const db = require("../db/connection");
const testData = require("../db/data/test-data/index");
const app = require("../app");
const { expect } = require("@jest/globals");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("404 /notExistingPath", () => {
  it("404: should respond with 404 path not found", () => {
    return request(app)
      .get("/wrongEndpoint")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Path not found");
      });
  });
});
//
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
});
//
describe("GET /api/reviews/:review_id", () => {
  it("200: should respond with review object, which should have 9 properties", () => {
    return request(app)
      .get("/api/reviews/1")
      .expect(200)
      .then(({ body }) => {
        const { review } = body;
        expect(typeof review).toBe("object");
        expect(review).toHaveProperty("review_id", expect.any(Number));
        expect(review.review_id).toBe(1);
        expect(review).toHaveProperty("title", expect.any(String));
        expect(review.title).toBe("Agricola");
        expect(review).toHaveProperty("review_body", expect.any(String));
        expect(review).toHaveProperty("designer", expect.any(String));
        expect(review).toHaveProperty("review_img_url", expect.any(String));
        expect(review).toHaveProperty("votes", expect.any(Number));
        expect(review).toHaveProperty("category", expect.any(String));
        expect(review).toHaveProperty("owner", expect.any(String));
        expect(review).toHaveProperty("created_at", expect.any(String));
      });
  });
  //
  it("400: should respond with 400 bad request", () => {
    return request(app)
      .get("/api/reviews/banana")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("bad request");
      });
  });
  //
  it("404: should respond with 404 not existent review_id", () => {
    return request(app)
      .get("/api/reviews/100")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("valid but not existent review_id");
      });
  });
});
//
describe("GET /api/reviews/:review_id/commnets", () => {
  it("200: should respond comments array for the given review_id, which should have 6 properties each", () => {
    return request(app)
      .get("/api/reviews/2/comments")
      .expect(200)
      .then(({ body }) => {
        expect(body).toHaveProperty("comments");
        const { comments } = body;
        expect(body.comments).toBeInstanceOf(Array);
        expect(comments.length).toBe(3);
        comments.forEach((comment) => {
          expect(comment).toHaveProperty("comment_id", expect.any(Number));
          expect(comment).toHaveProperty("votes", expect.any(Number));
          expect(comment).toHaveProperty("created_at", expect.any(String));
          expect(comment).toHaveProperty("author", expect.any(String));
          expect(comment).toHaveProperty("body", expect.any(String));
          expect(comment).toHaveProperty("review_id", expect.any(Number));
        });
        expect(comments).toBeSortedBy("created_at", {
          descending: true,
        });
      });
  });
  //
  it("200: should respond with empty array if review has no comments", () => {
    return request(app)
      .get("/api/reviews/1/comments")
      .expect(200)
      .then(({ body }) => {
        expect(body.comments).toHaveLength(0);
      });
  });
  //
  it("400: should respond with 400 bad request if review id is not a number", () => {
    return request(app)
      .get("/api/reviews/banana/comments")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("bad request");
      });
  });
  //
  it("404: should respond with 404 not existent review_id", () => {
    return request(app)
      .get("/api/reviews/100/comments")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("valid but not existent review_id");
      });
  });
});
//
describe("POST /api/reviews/:review_id/commnets", () => {
  it("201: should accept object with username and body and respond with posted comment", () => {
    const review_id = 1;
    const newComment = {
      username: "mallionaire",
      body: "what an awesome comment",
    };
    return request(app)
      .post(`/api/reviews/${review_id}/comments`)
      .send(newComment)
      .expect(201)
      .then(({ body }) => {
        const { comment } = body;
        expect(comment).toHaveProperty("comment_id", expect.any(Number));
        expect(comment).toHaveProperty("votes", 0);
        expect(comment).toHaveProperty("created_at", expect.any(String));
        expect(comment).toHaveProperty("author", "mallionaire");
        expect(comment).toHaveProperty("body", "what an awesome comment");
        expect(comment).toHaveProperty("review_id", review_id);
      });
  });
  //
  it("400: should respond with 400 bad request if review id is not a number", () => {
    const review_id = "banana";
    const newComment = {
      username: "mallionaire",
      body: "what an awesome comment",
    };
    return request(app)
      .post(`/api/reviews/${review_id}/comments`)
      .send(newComment)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("bad request");
      });
  });
  //
  it("400: should respond with 400 if new comment has got missing body key", () => {
    const review_id = "1";
    const newComment = {
      username: "mallionaire",
    };
    return request(app)
      .post(`/api/reviews/${review_id}/comments`)
      .send(newComment)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("missing or wrong request keys");
      });
  });
  //
  it("404: should respond with 404 not found review_id", () => {
    const review_id = "100";
    const newComment = {
      username: "mallionaire",
      body: "what an awesome comment",
    };
    return request(app)
      .post(`/api/reviews/${review_id}/comments`)
      .send(newComment)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("not found");
      });
  });
  //
  it("404: should respond with 404 not found if user does not exist", () => {
    const review_id = "1";
    const newComment = {
      username: "wrongUser",
      body: "what an awesome comment",
    };
    return request(app)
      .post(`/api/reviews/${review_id}/comments`)
      .send(newComment)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("not found");
      });
  });
});
//
describe("PATCH /api/reviews/:review_id", () => {
  it("201: should accept object with inc_votes and update with new vote in review", () => {
    const review_id = 1;
    const newComment = {
      inc_votes: 1,
    };
    return request(app)
      .patch(`/api/reviews/${review_id}`)
      .send(newComment)
      .expect(201)
      .then(({ body }) => {
        const { review } = body;
        expect(review).toHaveProperty("review_id", review_id);
        expect(review).toHaveProperty("title", "Agricola");
        expect(review).toHaveProperty("designer", "Uwe Rosenberg");
        expect(review).toHaveProperty("owner", "mallionaire");
        expect(review).toHaveProperty("review_img_url", expect.any(String));
        expect(review).toHaveProperty("review_body", "Farmyard fun!");
        expect(review).toHaveProperty("category", "euro game");
        expect(review).toHaveProperty("created_at", expect.any(String));
        expect(review).toHaveProperty("votes", 2);
      });
  });
  //
  it("400: should respond with 400 bad request if review id is not a number", () => {
    const review_id = "banana";
    const newComment = {
      inc_votes: 1,
    };
    return request(app)
      .patch(`/api/reviews/${review_id}`)
      .send(newComment)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("bad request");
      });
  });
  //
  it("400: should respond with 400 if new comment has not got right keys", () => {
    const review_id = "1";
    const newComment = {
      wrongKey: 1,
    };
    return request(app)
      .patch(`/api/reviews/${review_id}`)
      .send(newComment)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("missing or wrong request keys");
      });
  });
  //
  it("400: should respond with 400 bad request if new comment has not got right key value type", () => {
    const review_id = "1";
    const newComment = {
      inc_votes: "banana",
    };
    return request(app)
      .patch(`/api/reviews/${review_id}`)
      .send(newComment)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("bad request");
      });
  });
  //
  it("404: should respond with 404 not existent review_id", () => {
    const review_id = "100";
    const newComment = {
      inc_votes: 1,
    };
    return request(app)
      .patch(`/api/reviews/${review_id}`)
      .send(newComment)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("valid but not existent review_id");
      });
  });
});
