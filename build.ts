import { watch } from "fs";

const glob = new Bun.Glob("src/**/*.ts");

async function build() {
    const entrypoints: string[] = [];

    for await (const file of glob.scan(".")) {
        entrypoints.push(file);
    }

    await Bun.build({
        entrypoints,
        outdir: "./src",
        root: "./src",
        target: "browser",
    });
}

await build();

watch("src", { recursive: true }, async () => {
    console.log("Rebuilding...");
    await build();
});