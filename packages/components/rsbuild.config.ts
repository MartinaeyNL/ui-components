import {defineConfig} from "@rsbuild/core";
import {pluginDts} from "rsbuild-plugin-dts";
import {RsdoctorRspackPlugin} from "@rsdoctor/rspack-plugin";

export default defineConfig({
    output: {
        injectStyles: true,
        filenameHash: false,
        legalComments: "none",
        minify: true,
        sourceMap: true,
        polyfill: "off"
    },
    /*plugins: [pluginDts({ bundle: true })],*/
    source: {
        decorators: {
            version: "legacy"
        }
    },
    environments: {

        // Specific config for NPM, making it a smaller bundle
        npm: {
            output: {
                target: "web",
                distPath: {
                    js: "./",
                    css: "./",
                    html: "./"
                }
            },
            performance: {
                bundleAnalyze: {
                    analyzerMode: "static",
                    openAnalyzer: false,
                    reportFilename: "./report.html",
                    generateStatsFile: true
                },
                chunkSplit: {
                    strategy: "all-in-one"
                }
            }
            /*tools: {
                rspack(config, { appendPlugins }) {
                    appendPlugins(new RsdoctorRspackPlugin({
                        disableClientServer: true,
                        mode: "brief",
                        features: ["bundle"],
                        supports: {
                            generateTileGraph: true
                        }
                    }));
                }
            }*/
        }

        // Specific configuration for CDN bundling (all in one)
        /*cdn: {
            output: {
                target: "web",
                distPath: {
                    js: "./cdn",
                    css: "./cdn",
                    html: "./cdn"
                }
            },
            performance: {
                chunkSplit: {
                    strategy: "all-in-one"
                }
            }
        }*/
    }
});
