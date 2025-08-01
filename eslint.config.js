import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    ignores: ["dist/", "build/", "node_modules/", "*.config.ts", "*.config.js"],
  }
);
