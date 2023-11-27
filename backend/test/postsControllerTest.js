const Post = require("../models/post"); // import the Post model
const expect = require("chai").expect;
const request = require("supertest");
const app = require("../app"); // your Express app
const path = require("path");
const User = require("../models/user");
const fs = require("fs");
require("dotenv").config({ path: "./.env.test" });

describe("Post Controller Tests", function () {
  let token;
  before(async function () {
    const userData = {
      firstName: "test",
      lastName: "user",
      email: "testUser@example.com",
      password: "password123",
      academicYear: 2,
      major: "Computer Science",
      role: "Vice President",
    };
    const res = await request(app).post("/api/users/register").send(userData);
    console.log(res.status, "-->", res.body.message);

    const loginResponse = await request(app)
      .post("/api/users/login")
      .send({ email: "testUser@example.com", password: "password123" });
    console.log(loginResponse.status, "-->", loginResponse.body.message);
    token = loginResponse.body.token;
  });

  after(async function () {
    await User.deleteMany({});
  });

  // Test post creation
  describe("Testing createPost", function () {
    it("Should be able to create a post and receive a token and user info", async function () {
      const imagePath = path.join(__dirname, "project.jpeg"); // project.jpeg is located in test folder
      const res = await request(app)
        .post("/api/posts/")
        .set("Authorization", `Bearer ${token}`)
        .field("title", "project title")
        .field("description", "project description")
        .field("contributors", "contributor1,contributor2")
        .attach("image", imagePath);
      console.log(res.body.message);
      expect(res.status).to.equal(201);
    });
  });

  // Retrieve all posts
  describe("Testing retrieval of all posts", function () {
    it("should get all post and receive a token", async function () {
      const res = await request(app).get("/api/posts/").expect(200);
    });
  });

  // Get post by ID
  describe("Testing get post by id", function () {
    let testPost;

    beforeEach(async function () {
      // Create the post
      //   const imagePath = path.join(__dirname, "project.jpeg");
      //   const res = await request(app)
      //     .post("/api/posts/")
      //     .set("Authorization", `Bearer ${token}`)
      //     .field("title", "project title")
      //     .field("description", "project description")
      //     .field("contributors", "contributor1,contributor2")
      //     .attach("image", imagePath);
      testPost = new Post({
        // Fill in the required fields according to your Post model
        title: "Test Post",
        description: "A post to test with",
        contributors: ["Test Contributor"],
        imageUrl: "some.url",
      });
      await testPost.save();
    });

    it("should return a post and its content", async function () {
      const res = await request(app).get(`/api/posts/${testPost._id}`);
      expect(res.body)
        .to.have.property("_id")
        .to.equal(testPost._id.toString());
      expect(res.body.title).to.equal("Test Post");
    });

    it("should return Post not found error", async function () {
      const someID = "507f1f77bcf86cd799439011";
      const res = await request(app).get(`/api/posts/${someID}`).expect(404);
      expect(res.body.message).to.equal("Post not found");
    });
  });
});
