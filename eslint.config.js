import tsParser from "@typescript-eslint/parser";
import ts from "@typescript-eslint/eslint-plugin";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";
import importPlugin from "eslint-plugin-import";

export default [
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "dist/**",
      "build/**",
      "public/**",
      "coverage/**",
      "src/components/ui/**",
    ],
  },

  {
    files: ["**/*.ts", "**/*.tsx"],

    languageOptions: {
      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        project: ["./tsconfig.json"],
        tsconfigRootDir: import.meta.dirname,
      },
    },

    plugins: {
      "@typescript-eslint": ts,
      react,
      "react-hooks": reactHooks,
      "jsx-a11y": jsxA11y,
      import: importPlugin,
    },

    rules: {
      "no-console": "warn",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "error",
      "react/no-array-index-key": "error",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",

      "@typescript-eslint/no-non-null-assertion": "off",
      "no-unused-vars": "off",

      "@typescript-eslint/no-misused-promises": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],

      "no-restricted-imports": [
        "error",
        {
          patterns: ["../*"],
        },
      ],

      "import/order": [
        "error",
        {
          // Đặt external (thư viện) đứng trước, sau đó builtin, rồi internal (alias @/...), parent, sibling, index (./)
          groups: ["external", "builtin", "internal", "parent", "sibling", "index"],

          // Map một số pattern cụ thể
          pathGroups: [
            { pattern: "react", group: "external", position: "before" },
            { pattern: "next/**", group: "external", position: "after" },
            { pattern: "next-auth", group: "external", position: "after" },
            // alias @/* coi là internal (sẽ nằm sau external)
            { pattern: "@/**", group: "internal", position: "after" },
            // đảm bảo relative imports bắt đầu bằng "./" được xếp vào index (cuối cùng)
            { pattern: "./**", group: "index", position: "after" }
          ],

          pathGroupsExcludedImportTypes: ["react"],

          // 1 dòng trống giữa các nhóm
          "newlines-between": "always",

          // Sort alphabet trong cùng nhóm
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],

      "no-implied-eval": "off",
      "require-await": "off",
    },

    settings: {
      react: { version: "detect" },

      // Rất quan trọng: cấu hình resolver để plugin import biết cách phân loại alias từ tsconfig
      "import/resolver": {
        // dùng resolver typescript (sử dụng tsconfig.json bạn đã gửi)
        typescript: {
          project: "./tsconfig.json"
        },
        // node resolver để nhận diện module trong node_modules và folder 'src'
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
          moduleDirectory: ["node_modules", "src"]
        }
      },
    },
  },
];