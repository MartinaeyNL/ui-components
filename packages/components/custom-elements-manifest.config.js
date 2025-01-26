import {getTsProgram, expandTypesPlugin} from "cem-plugin-expanded-types";
import {cemInheritancePlugin} from "custom-elements-manifest-inheritance";

/**
 * Represents the Custom Elements Manifest Analyzer configuration for the component build step.
 * This is different from the custom-elements.json for the monorepo, since this includes all components.
 * The dist/custom-elements.json file is purely meant for distribution purposes.
 */
export default {
  globs: [
    "src/*.ts",
  ],
  overrideModuleCreation: ({ts, globs}) => {
    const program = getTsProgram(ts, globs, "util/tsconfig.json");
    return program
      .getSourceFiles()
      .filter((sf) => globs.find((glob) => sf.fileName.includes(glob)));
  },
  plugins: [expandTypesPlugin(), cemInheritancePlugin()],
  dependencies: true,
  litelement: true,
  outdir: "dist"
}
