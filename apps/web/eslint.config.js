import { nextJsConfig } from "@repo/eslint-config/next-js";

/** @type {import("eslint").Linter.Config[]} */
export default [
  ...nextJsConfig,
  {
    rules: {
      "no-case-declarations": "off", // Disable 'no-case-declarations' warnings
      "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_", "varsIgnorePattern": "^_" }], // Ignore unused variables starting with '_'
      "turbo/no-undeclared-env-vars": "off", // Disable undeclared env vars warning
    },
  }
];
  