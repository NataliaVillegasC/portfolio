#!/usr/bin/env node
/**
 * Photo import pipeline — the ONLY way images should enter the site.
 *
 * Phone photos carry EXIF metadata: GPS coordinates of where you stood,
 * exact capture time, device model and sometimes serial number. Publishing
 * them raw leaks all of that. This script:
 *
 *   1. Converts HEIC/HEIF (iPhone default) to a workable format via macOS `sips`
 *   2. Bakes the EXIF orientation into the pixels (so stripping won't rotate it)
 *   3. Resizes to web size (max 1600px wide) and re-encodes as WebP
 *   4. Strips ALL metadata — GPS, timestamps, device info, everything
 *   5. Renames the file (IMG_4231.jpg also leaks; seoul.webp doesn't)
 *   6. Verifies the output really has no EXIF/XMP/IPTC before reporting done
 *
 * Usage:
 *   npm run photos:import -- <photo file> <clean-name>
 *   npm run photos:import -- ~/Desktop/IMG_4231.HEIC seoul
 *   npm run photos:import -- ~/Desktop/vacation/  (whole folder, keeps names slugified)
 *
 * Output goes to webpage/public/photos/<name>.webp
 */

import { execFileSync } from 'node:child_process'
import { mkdtempSync, readdirSync, rmSync, statSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..')
const OUT_DIR = path.join(ROOT, 'webpage', 'public', 'photos')
const MAX_WIDTH = 1600
const QUALITY = 82

const IMAGE_EXT = /\.(heic|heif|jpe?g|png|webp|avif|tiff?)$/i
const LEAKY_NAME = /^(img|dsc|dcim|pxl|photo|image)[-_ ]?\d/i

function fail(msg) {
  console.error(`✗ ${msg}`)
  process.exit(1)
}

function slugify(name) {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/** HEIC → JPEG via macOS sips, into a temp dir. Returns the new path. */
function convertHeic(file, tmp) {
  if (process.platform !== 'darwin') {
    fail(
      `${path.basename(file)} is HEIC and this machine has no converter. On iPhone: Settings → Camera → Formats → Most Compatible, or share via Mail/Files which converts to JPEG.`
    )
  }
  const jpeg = path.join(tmp, `${path.basename(file, path.extname(file))}.jpg`)
  execFileSync('sips', ['-s', 'format', 'jpeg', file, '--out', jpeg], { stdio: 'pipe' })
  return jpeg
}

async function importOne(file, cleanName, tmp) {
  let source = file
  if (/\.hei[cf]$/i.test(file)) source = convertHeic(file, tmp)

  const outPath = path.join(OUT_DIR, `${cleanName}.webp`)

  // .rotate() with no args applies the EXIF orientation to the pixels;
  // sharp then drops all metadata by default (no .withMetadata() — that is
  // exactly what we want).
  await sharp(source)
    .rotate()
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(outPath)

  // Trust nothing: re-open the output and confirm the metadata is gone.
  const meta = await sharp(outPath).metadata()
  if (meta.exif || meta.xmp || meta.iptc) {
    rmSync(outPath)
    fail(`${cleanName}.webp still contained metadata — deleted it. Please report this.`)
  }

  const kb = Math.round(statSync(outPath).size / 1024)
  console.log(
    `✓ ${path.basename(file)} → photos/${cleanName}.webp (${meta.width}×${meta.height}, ${kb} KB, metadata stripped)`
  )
}

async function main() {
  const args = process.argv.slice(2).filter((a) => !a.startsWith('-'))
  if (args.length === 0) {
    fail('Usage: npm run photos:import -- <photo or folder> [clean-name]')
  }

  const first = path.resolve(args[0].replace(/^~/, process.env.HOME ?? '~'))
  let jobs = []

  if (statSync(first).isDirectory()) {
    const files = readdirSync(first).filter((f) => IMAGE_EXT.test(f))
    if (files.length === 0) fail(`No images found in ${first}`)
    jobs = files.map((f) => {
      const base = slugify(path.basename(f, path.extname(f)))
      if (LEAKY_NAME.test(f)) {
        console.warn(
          `⚠ ${f} keeps its camera name (${base}) — consider renaming, e.g.: npm run photos:import -- "${path.join(first, f)}" seoul`
        )
      }
      return { file: path.join(first, f), name: base }
    })
  } else {
    const name = args[1] ? slugify(args[1]) : slugify(path.basename(first, path.extname(first)))
    if (!args[1] && LEAKY_NAME.test(path.basename(first))) {
      fail(
        `Give this photo a clean name (IMG_… filenames leak too): npm run photos:import -- "${args[0]}" seoul`
      )
    }
    jobs = [{ file: first, name }]
  }

  const tmp = mkdtempSync(path.join(tmpdir(), 'photo-import-'))
  try {
    for (const job of jobs) await importOne(job.file, job.name, tmp)
  } finally {
    rmSync(tmp, { recursive: true, force: true })
  }

  console.log(
    `\nDone. Now update shared/src/data/photos.ts: set file: '<name>.webp' and placeholder: false.`
  )
}

main().catch((e) => fail(e.message))
