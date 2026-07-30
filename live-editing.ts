
/// <reference types="vite/client" />
// @ts-ignore
import { registerAstroComponent } from "@cloudcannon/editable-regions/astro";
// @ts-ignore
import "@cloudcannon/editable-regions/astro-react-renderer";

// Auto-discover and register every .astro component
const componentModules = import.meta.glob(
  [
    "./src/components/page-sections/**/*.astro",
    "./src/components/page-sections/builders/**/*.astro",
  ],
  { eager: true }
);

function pascalToKebab(str: string): string {
  return str.replace(/([A-Z])/g, "-$1").toLowerCase().replace(/^-/, "");
}

for (const [path, module] of Object.entries(componentModules)) {
  const match = path.match(/\.\/src\/components\/(.+)\.astro$/);
  if (!match) continue;

  const fullPath = match[1];
  const parts = fullPath.split("/");
  const filename = parts[parts.length - 1];
  const parentFolder = parts.length > 1 ? parts[parts.length - 2] : null;

  const kebabFilename = pascalToKebab(filename);
  const kebabParent = parentFolder ? pascalToKebab(parentFolder) : null;

  const registrationPath =
    kebabFilename === kebabParent
      ? parts.slice(0, -1).join("/")
      : parts.slice(0, -1).concat(kebabFilename).join("/");

  registerAstroComponent(registrationPath, (module as any).default);
}