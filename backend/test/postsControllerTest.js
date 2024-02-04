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

  // beforeAll
  before(async function () {
    // register and login with test user
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

  // afterAll
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
      testPost = new Post({
        // Fill in the required fields according to your Post model
        title: "Test Post",
        description: "A post to test with",
        contributors: ["Contributor1", "Contributor2"],
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
      expect(res.body.description).to.equal("A post to test with");
      console.log(res.body.contributors);
      //expect(res.body.contributors).to.equal(["Test Contributor"]);
      expect(res.body.imageUrl).to.equal("some.url");
    });

    it('should return "Post not found error"', async function () {
      const someID = "507f1f77bcf86cd799439011";
      const res = await request(app).get(`/api/posts/${someID}`).expect(404);
      expect(res.body.message).to.equal("Post not found");
    });
  });

  describe("Testing delete post", function () {
    beforeEach(async function () {
      let testPost = new Post({
        title: "Test Post",
        description: "A post to test with",
        contributors: ["Contributor1", "Contributor2"],
        imageUrl: "some.url",
      });
      await testPost.save();
    });
    it("should delete post", function () {
      //request(app).put
    });
  });

  describe("Testing update post", function () {
    let testPostID;
    let testPost;
    beforeEach(async function () {
      testPost = new Post({
        // Fill in the required fields according to your Post model
        title: "Test Post",
        description: "A post to test with",
        contributors: ["Contributor1", "Contributor2"],
        imageUrl: "some.url",
      });
      await testPost.save();
      // get post id
      testPostID = testPost._id;
      //console.log(testPostID);
    });

    it("should update the post title", async function () {
      console.log("old project title: ", testPost.title);
      const newTitle = "new project title";
      //console.log(testPostID);
      const res = await request(app)
        .put(`/api/posts/${testPostID}`)
        .set("Authorization", `Bearer ${token}`)
        .set({ title: newTitle });
      console.log(res.body.title);
      expect(res.status).to.equal(200);
      expect(res.body.title).to.equal("new project title");
    });
  });
});
