import {defineConfig} from "@rsbuild/core";
import {pluginDts} from "rsbuild-plugin-dts";

export default defineConfig({
    output: {
        distPath: {
            js: "./",
            css: "./"
        },
        /*emitCss: false,*/
        injectStyles: true,
        filenameHash: false,
        legalComments: "none",
        minify: true,
        sourceMap: true
    },
    performance: {
      chunkSplit: {
          strategy: "all-in-one"
      }
    },
    /*plugins: [pluginDts({ bundle: true })],*/
    source: {
        decorators: {
            version: "legacy"
        }
    }
});
