import reactPlugin from "eslint-plugin-react";
import babelParser from "@babel/eslint-parser"; // Import the babel parser

export default [
  {
    files: ["**/*.{js,jsx}"], // Lint all .js and .jsx files
    ignores: ["node_modules/**", "dist/**"], // Ignore node_modules and dist
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parser: babelParser, // Use Babel parser for JSX
      parserOptions: {
        requireConfigFile: false, // Disable requiring a Babel config file
        babelOptions: {
          presets: ["@babel/preset-react"], // Ensure JSX is correctly parsed
        },
      },
    },
    plugins: {
      react: reactPlugin,
    },
    rules: {},
  },
];
