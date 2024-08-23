import globals from "globals";
import pluginJs from "@eslint/js";
import angularPlugin from "eslint-plugin-angular";


export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: {
        ...globals.browser,
        angular: "readonly",
      },
    },
    ignores: ["node_modules", "src/app/lib"],
    plugins: {
      angular: angularPlugin,
    },
    rules: {
      ...pluginJs.configs.recommended.rules,
      "angular/no-service-method": "error",
      "angular/controller-as": "error",
      "angular/di": ["error", "function"],
      "angular/module-getter": "error",
      "angular/module-setter": "error",
      "angular/no-private-call": "error",
    },
  },
];