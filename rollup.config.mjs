import commonJs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import path from "path";
import { defineConfig } from "rollup";
import externals from "rollup-plugin-node-externals";

const basePath = ".";

const tsconfig = {
    rootDir: path.join(basePath, "src"),
    declarationDir: path.join(basePath, "dist"),
    declaration: true,
    include: [path.posix.join("src", "**", "*.ts")],
    module: "ESNext",
    target: "ESNext",
};

const config = defineConfig([
    {
        input: path.join(basePath, "src", "index.ts"),
        output: {
            dir: path.join(basePath, "dist"),
            format: "cjs",
            sourcemap: true,
        },
        plugins: [
            externals({
                deps: true,
            }),
            nodeResolve(),
            commonJs(),
            typescript({
                ...tsconfig,
            }),
        ],
    },
    {
        input: path.join(basePath, "src", "index.ts"),
        output: {
            dir: path.join(basePath, "dist"),
            format: "esm",
            entryFileNames: "[name].mjs",

            sourcemap: true,
        },
        plugins: [
            externals({
                deps: true,
            }),
            nodeResolve(),
            commonJs(),
            typescript({
                ...tsconfig,
            }),
        ],
    },
]);

// console.dir({ tsconfig, config }, { depth: 999 });

export default config;
