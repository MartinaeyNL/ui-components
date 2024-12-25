import * as esbuild from 'esbuild';
import { clean } from 'esbuild-plugin-clean';
import { dtsPlugin } from "esbuild-plugin-d.ts";


async function run() {

  console.log("Running 'build' for [" + process.cwd() + "]");

  await esbuild.build({
    entryPoints: [
      process.cwd() + "/src/*",
    ],
    bundle: true,
    minify: false,
    treeShaking: false, // true
    outdir: "dist",
    allowOverwrite: true,
    plugins: [
      clean({ patterns: ["./dist/*"]}),
      dtsPlugin()
    ],
  })

}

try {
  run();
} catch (err) {
  console.error(err);
}
