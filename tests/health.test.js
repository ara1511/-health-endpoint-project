const request = require('supertest');
const app = require('../src/app');

describe('Health Endpoint Tests', () => {
  
  describe('GET /health', () => {
    
    test('should return status 200', async () => {
      await request(app)
        .get('/health')
        .expect(200);
    });

    test('should return valid JSON with correct structure', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);

      expect(response.type).toBe('application/json');
      expect(response.body).toHaveProperty('status');
      expect(response.body).toHaveProperty('timestamp');
    });

    test('should return status "ok"', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);

      expect(response.body.status).toBe('ok');
    });

    test('should return valid ISO 8601 timestamp', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);

      expect(response.body.timestamp).toBeDefined();
      
      const timestamp = new Date(response.body.timestamp);
      expect(timestamp.toISOString()).toBe(response.body.timestamp);
      
      const now = new Date();
      const diff = now - timestamp;
      expect(diff).toBeLessThan(5000);
    });

    test('should respond in less than 100ms', async () => {
      const startTime = Date.now();
      
      await request(app)
        .get('/health')
        .expect(200);
      
      const responseTime = Date.now() - startTime;
      expect(responseTime).toBeLessThan(100);
    });

  });

});