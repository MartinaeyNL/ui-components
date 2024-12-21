/*const cem = require("cem-plugin-expanded-types");*/
import {getTsProgram, expandTypesPlugin} from "cem-plugin-expanded-types";

/*module.exports = {*/
export default {
  globs: [
    "packages/components/**/src/*.ts",
    "packages/util/**/src/*.ts"
  ],
  overrideModuleCreation: ({ts, globs}) => {
    const program = getTsProgram(ts, globs, "util/tsconfig.json");
    return program
      .getSourceFiles()
      .filter((sf) => globs.find((glob) => sf.fileName.includes(glob)));
  },
  plugins: [expandTypesPlugin(), /*{
    name: '@martinaeynl/ui-components-cem-plugin',
    analyzePhase({ ts, node, moduleDoc}) {
      switch (node.kind) {
        case ts.SyntaxKind.ClassDeclaration:
          const className = node.name.getText();

          /!* If a member has JSDoc notations, we loop through them *!/
          node.jsDoc?.forEach(jsDoc => {
            jsDoc?.tags?.forEach(tag => {
              /!* If we find a `@attribute` JSDoc tag, we want to extract the default value *!/
              if(tag.tagName.getText() === "attribute") {
                const desc = tag.comment;

                /!* Substring the attribute name *!/
                const split = desc.split("-");
                const attrDetails = split[0].split(" ");
                const attrName = attrDetails.filter(x => !x.includes('@') && !x.includes('{') && !x.includes('['))[0];

                /!* We then find the current class from the `moduleDoc` *!/
                const classDeclaration = moduleDoc.declarations.find(declaration => declaration.name === className);

                console.log("Class members are the following:");
                console.log(classDeclaration.members);

                if(desc.includes('[default=')) {
                  const defaultTxt = attrDetails.filter(x => x.includes('['))?.[0];
                  const defaultValue = defaultTxt.replaceAll('[default=', '').replaceAll(']', '');
                  if(defaultValue != null) {
                    if(classDeclaration.members[attrName] == null) {
                      classDeclaration.members[attrName] = {};
                    }
                    console.log("Updating default value of " + attrName);
                    classDeclaration.members[attrName].default = defaultValue;
                  }
                }
              }
            })
          })
      }
    }
  }*/],
  outdir: 'docs',
  dependencies: true,
  litelement: true
}
