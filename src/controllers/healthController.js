class HealthController {
  static checkHealth(req, res) {
    try {
      const healthData = {
        status: "ok",
        timestamp: new Date().toISOString(),
        service: "health-endpoint-service",
        version: "1.0.0"
      };

      console.log(`Health check requested at: ${healthData.timestamp}`);
      return res.status(200).json(healthData);
      
    } catch (error) {
      console.error('Error in health check:', error);
      
      return res.status(500).json({
        status: "error",
        timestamp: new Date().toISOString(),
        message: "Health check failed"
      });
    }
  }
}

module.exports = HealthController;