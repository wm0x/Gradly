import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { FlatCompat } from "@eslint/eslintrc";
import nextPlugin from "@next/eslint-plugin-next";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: {
    settings: { react: { version: "detect" } }
  }
});

const config = [
  {
    ignores: [
      "**/generated/**",
      "**/node_modules/**",
      "**/.next/**",
      "**/dist/**",
      "**/*.d.ts"
    ]
  },

  {
    plugins: {
      "@next/next": nextPlugin
    },
    rules: {
      "@next/next/no-img-element": "off",
      "@next/next/no-html-link-for-pages": "warn",
      "@next/next/no-sync-scripts": "error"
    }
  },

  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          "argsIgnorePattern": "^_",
          "varsIgnorePattern": "^_"
        }
      ],
      "@typescript-eslint/no-require-imports": "error"
    }
  },

  ...compat.extends(
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended"
  )
];

export default config;
