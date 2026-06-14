import { defineConfig, globalIgnores } from "eslint/config";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

export default defineConfig([
  ...nextCoreWebVitals,
  ...nextTypescript,
  globalIgnores([
    "node_modules/**",
    ".pnpm-store/**",
    ".next/**",
    "out/**",
    "dist/**",
    "build/**",
    ".tools/**",
    ".pw-browsers/**",
    "coverage/**",
    "next-env.d.ts",
  ]),
]);
