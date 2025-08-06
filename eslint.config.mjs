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

  ...compat.extends(
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended"
  ),

  // 👇 Place override AFTER compat.extends()
  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          "argsIgnorePattern": "^_",
          "varsIgnorePattern": "^_"
        }
      ],
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      "@typescript-eslint/no-require-imports": "error",
      "@typescript-eslint/no-explicit-any": "off", // ✅ Disable the rule here
      "react/no-unescaped-entities": "off",  // disable quote errors
      'react/display-name': 'off',
      "react/jsx-key": "off",
      "no-unused-expressions": "off"         // disable unused expression warning
    }
  }
];

export default config;
