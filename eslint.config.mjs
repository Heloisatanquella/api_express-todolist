import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig({
  files: ["**/*.{js,mjs,cjs,ts}"],
  plugins: { js },
  languageOptions: {
    globals: globals.node,
  },
  ignores: [
    "node_modules",      
    ".venv",             
    "coverage",          
    "dist",            
    "prisma",            
    "**/site-packages/**",
  ],
  extends: [
    "js/recommended",
    ...tseslint.configs.recommended,
  ],
});
