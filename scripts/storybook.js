const {executeCmd} = require("./executor");

async function run() {

  console.log("Running 'storybook' in [" + process.cwd() + "]");

  // Watch for workspace file changes, and compile them
  executeCmd("yarn workspaces foreach --all -p -i run watch", [], process.cwd(), {}, false)

  await new Promise(resolve => setTimeout(resolve, 2000));

  // Watch for workspace file changes, and create a custom-elements manifest file
  /*executeCmd("cem analyze --watch --config util/custom-elements-manifest.config.js", [], process.cwd(), {}, true)*/

  await new Promise(resolve => setTimeout(resolve, 2000));

  // Run storybook
  executeCmd("yarn workspace @martinaeynl/ui-docs-storybook run storybook", [], process.cwd(), {}, true)

}

try {
  run();
} catch (err) {
  console.error(err);
}
