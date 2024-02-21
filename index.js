module.exports = {
  plugins: ["@typescript-eslint"],
  parser: "@typescript-eslint/parser",
  rules: {
    "no-restricted-syntax": [
      "warn",
      {
        selector: "TSInterfaceDeclaration",
        message: "Classes are preferred over TypeScript-specific interfaces.",
      },
      {
        selector: "TSEnumDeclaration",
        message: "Classes are preferred over TypeScript-specific enums.",
      },
      {
        selector: "TSTypeAliasDeclaration",
        message: "TypeScript-specific type aliases are forbidden.",
      },
    ],
    "@typescript-eslint/array-type": [
      "warn",
      {
        default: "generic",
      },
    ],
    "@typescript-eslint/no-namespace": "warn",
  },
};
