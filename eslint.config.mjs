import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      // Breezy platform infrastructure files
      "app/components/ClickToSource.tsx",
      "app/components/PoweredByBreezy.tsx",
      "app/components/ImageEditDialog.tsx",
      "app/components/CustomBuildErrorOverlay.tsx",
      "app/components/DevErrorBoundary.tsx",
    ],
  },
  {
    rules: {
      // Allow require imports for dynamic requires
      "@typescript-eslint/no-require-imports": "off",
    },
  },
];

export default eslintConfig;
