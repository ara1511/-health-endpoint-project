const js = require("@eslint/js");

module.exports = [
  js.configs.recommended,
  {
    files: ["src/**/*.js", "tests/**/*.js"],
    rules: {
      semi: "error",
      quotes: ["error", "double"]
    }
  }
];
