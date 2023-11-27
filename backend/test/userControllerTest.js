// test/userControllerTest.js
require("dotenv").config({ path: "./.env.test" });
const jwt = require("jsonwebtoken");
const expect = require("chai").expect;
const request = require("supertest");
const sinon = require("sinon");
const mongoose = require("mongoose");
const User = require("../models/user");
const app = require("../app"); // your Express app

describe("User Controller Tests", function () {
  before(function () {
    // Setup any pre-conditions here
  });

  after(function () {
    mongoose.disconnect();
  });

  // Delete the mock user for cleanup
  afterEach(async () => {
    await User.deleteMany({});
  });

  beforeEach(async () => {
    // Create mock user data
    const userData = {
      firstName: "John",
      lastName: "Doe",
      email: "johnDoe@example.com",
      password: "password123abc",
      academicYear: 2,
      major: "Computer Science",
      role: "Vice President",
    };
    await request(app).post("/api/users/register").send(userData);
  });

  describe("POST /register", function () {
    it("should create a new user and return a token", async function () {
      const userData = {
        firstName: "Jane",
        lastName: "Dawson",
        email: "Janedawson@example.com",
        password: "password123",
        academicYear: 2,
        major: "Computer Science",
        role: "President",
      };

      const res = await request(app).post("/api/users/register").send(userData);

      expect(res.status).to.equal(201);
      expect(res.body).to.have.property("token");
      expect(res.body).to.have.property("userId");
      expect(res.body.firstName).to.equal("Jane");
      expect(res.body.lastName).to.equal("Dawson");
      expect(res.body.role).to.equal("President");
      // Add more assertions as needed
    });
  });

  // Testing user login function
  describe("Testing user login", function () {
    // Test for successful login
    it("should let user login and return a token", async function () {
      const loginData = {
        email: "johnDoe@example.com",
        password: "password123abc",
      };
      const response = await request(app)
        .post("/api/users/login") // Adjust the URL to your login endpoint
        .send(loginData);

      expect(response.status).to.equal(200);
      expect(response.body).to.have.property("token");
      expect(response.body).to.include.keys(
        "userId",
        "firstName",
        "lastName",
        "role"
      );
    });

    // Test for invalid email
    it("should NOT let user login because user email is not found", async function () {
      const loginData = {
        email: "someEmail@example.com",
        password: "password123abc",
      };
      const response = await request(app)
        .post("/api/users/login") // Adjust the URL to your login endpoint
        .send(loginData);

      expect(response.status).to.equal(400);
      expect(response.body.message).to.equal("User not found");
    });

    // Test for wrong password
    it("shoud NOT let user login because of invalid password", async function () {
      const loginData = {
        email: "johnDoe@example.com",
        password: "password123456",
      };
      const response = await request(app)
        .post("/api/users/login") // Adjust the URL to your login endpoint
        .send(loginData);

      expect(response.status).to.equal(401);
      expect(response.body.message).to.equal("Invalid credentials");
    });
  });

  // Testing user logout
  describe("Testing user logout", function () {
    let token;

    beforeEach(async function () {
      const userData = {
        firstName: "logoutTest",
        lastName: "user",
        email: "logoutTestuser@example.com",
        password: "password123",
        academicYear: 2,
        major: "Computer Science",
        role: "Vice President",
      };
      await request(app).post("/api/users/register").send(userData);
      //console.log("pre-test: user registration successful.");
      const loginResponse = await request(app)
        .post("/api/users/login")
        .send({ email: "logoutTestuser@example.com", password: "password123" });
      //console.log("pre-test: user login successful.");
      token = loginResponse.body.token;
    });

    it("user should be able to logout and token blacklisted", async function () {
      const response = await request(app)
        .post("/api/users/logout")
        .set("Authorization", `Bearer ${token}`);
      console.log(response.body.message);
      expect(response.status).to.equal(200);

      const protectedResponse = await request(app)
        .get("/api/users/validate-token")
        .set("Authorization", `Bearer ${token}`);
      expect(protectedResponse.status).to.equal(401); // user is logged out
    });
  });

  const jwt = require("jsonwebtoken");

  describe("Protected Route Tests", function () {
    let token;

    beforeEach(async function () {
      const userData = {
        firstName: "logoutTest",
        lastName: "user",
        email: "logoutTestuser@example.com",
        password: "password123",
        academicYear: 2,
        major: "Computer Science",
        role: "Vice President",
      };
      await request(app).post("/api/users/register").send(userData);
      //console.log("pre-test: user registration successful.");
      const loginResponse = await request(app)
        .post("/api/users/login")
        .send({ email: "logoutTestuser@example.com", password: "password123" });
      //console.log("pre-test: user login successful.");
      token = loginResponse.body.token;
    });

    it("should access a protected route", async function () {
      const res = await request(app)
        .get("/api/users/validate-token")
        .set("Authorization", `Bearer ${token}`);
      console.log(res.body.message);
      expect(res.status).to.equal(200);
    });
  });
});
