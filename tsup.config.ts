import { readFileSync } from 'fs'
import { defineConfig } from 'tsup'
import type { NormalizedOptions, Format } from 'tsup'

interface Context {
    options: NormalizedOptions
    format: Format
    /** "type" field in project's package.json */
    pkgType?: string
}

interface Result {
    js?: string
}

interface PackageJson {
    name?: string
    version?: string
    license?: string
    [key: string]: unknown // Allow other fields
}

function outputExtensions(ctx: Context): Result {
    if (ctx.format === 'cjs') return { js: '.js' }
    if (ctx.format === 'esm') return { js: '.mjs' }
    return { js: '.min.js' }
}

function generateLicense(): string {
    /* eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- JSON.parse output is assumed to match PackageJson structure based on known package.json format */
    const packInfo = JSON.parse(readFileSync('package.json').toString()) as PackageJson
    return `/**\n * ${packInfo.name} v${packInfo.version}\n * Copyright (c) 2024 Ram Amoncar <ramamonkar444@gmail.com>\n * @license ${packInfo.license}\n */`
}

const license = generateLicense()

export default defineConfig({
    splitting: false,
    entry: ['src/index.ts'],
    // Generate declaration file (.d.ts & .d.mts)
    // And adds banner
    dts: {
        banner: license
    },
    // Builds for commonJS, ESmodules & Browser
    format: ['cjs', 'esm', 'iife'],
    outExtension: outputExtensions,
    // Cleaning './dist/' before building
    clean: true,
    // Header/Banner
    banner: {
        js: license
    },
    // Minify Options
    minifyIdentifiers: false,
    minifySyntax: true,
    minifyWhitespace: true
})
