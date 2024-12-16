import reactPlugin from "eslint-plugin-react";

export default [
  {
    files: ["**/*.{js,jsx}"], // Lint all .js and .jsx files
    ignores: ["node_modules/**", "dist/**"], // Ignore node_modules and dist
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    plugins: {
      react: reactPlugin,
    },
    rules: {
      "no-console": "warn",
      "no-unused-vars": "warn",
    },
  },
];
