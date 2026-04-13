import { watch } from "fs";

async function build(file?: string) {
    const start = performance.now();

    const entrypoints = file ? [file] : [];

    if (!file) {
        const glob = new Bun.Glob("src/**/*.ts");
        for await (const f of glob.scan(".")) {
            entrypoints.push(f);
        }
    }

    const result = await Bun.build({
        entrypoints,
        outdir: "./src",
        root: "./src",
        target: "browser",
    });

    const time = Math.round(performance.now() - start);

    if (!result.success) {
        for (const log of result.logs) {
            console.error(log);
        }
        console.log(`[Bun Build] Build failed in ${time}ms\n`);
        return;
    }

    const outputs = result.outputs
        .map(o => o.path.split("/").pop())
        .join(", ");

    console.log(`[Bun Build] ${file ? file : "full"} → ${outputs} (${time}ms)\n`);
}

try {
    await build();
} catch (err) {
    console.error("Initial build failed:");
    console.error(err);
}

let timeout: Timer | null = null;
let lastFile: string | null = null;

watch("src", { recursive: true }, (event, filename) => {
    if (!filename || !filename.endsWith(".ts")) return;

    lastFile = "src/" + filename;

    if (timeout) clearTimeout(timeout);

    timeout = setTimeout(async () => {
        try {
            await build(lastFile || undefined);
        } catch (err) {
            console.error("Build failed:");
            console.error(err);
        }
    }, 100);
});