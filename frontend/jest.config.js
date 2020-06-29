module.exports = {
  preset: 'ts-jest',
  collectCoverage: true,
  collectCoverageFrom: [
    "!**/node_modules/**",
    "src/pages/**/*.tsx",
    "src/components/**/*.tsx",
    "src/hooks/*.tsx",
    "!src/hooks/index.tsx"
  ]

};
