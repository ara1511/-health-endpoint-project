import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    files: ["src/**/*.js", "tests/**/*.js"],
    rules: {
      semi: "error",
      quotes: ["error", "double"]
    }
  }
];
