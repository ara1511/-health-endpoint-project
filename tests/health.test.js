const request = require("supertest");
const app = require("../src/app.js");

describe("Health Endpoint Tests", () => {
  describe("GET /health", () => {
    test("should return valid ISO 8601 timestamp", async () => {
      const response = await request(app).get("/health").expect(200);

      expect(response.body.timestamp).toBeDefined();

      const timestamp = new Date(response.body.timestamp);
      expect(timestamp.toISOString()).toBe(response.body.timestamp);

      const now = new Date();
      const diff = now - timestamp;
      expect(diff).toBeLessThan(5000); // menos de 5s
    });

    test("should respond in less than 100ms", async () => {
      const startTime = Date.now();

      await request(app).get("/health").expect(200);

      const responseTime = Date.now() - startTime;
      expect(responseTime).toBeLessThan(100);
    });
  });
});