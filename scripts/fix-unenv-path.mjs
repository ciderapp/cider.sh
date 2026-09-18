#!/usr/bin/env node

/**
 * Workaround for nuxt-og-image@4.2.0 / unenv@2.0.0-rc.24 path bug
 * 
 * Issue: nuxt-og-image imports from:
 *   unenv/dist/runtime/runtime/mock/empty.mjs
 * 
 * Actual path:
 *   unenv/dist/runtime/mock/empty.mjs
 * 
 * This script creates a symlink to fix the import path.
 */

import { existsSync, mkdirSync, symlinkSync, readlinkSync } from 'fs';
import { join, resolve } from 'path';
import { fileURLToPath } from 'url';
import { cwd } from 'process';

const __filename = fileURLToPath(import.meta.url);
const projectRoot = resolve(cwd());

const UNENV_VERSION = '2.0.0-rc.24';
const TARGET_DIR = join(projectRoot, 'node_modules', '.pnpm', `unenv@${UNENV_VERSION}`, 'node_modules', 'unenv', 'dist', 'runtime', 'runtime');
const LINK_PATH = join(TARGET_DIR, 'mock');
const SOURCE_PATH = '../mock';

function setupUnenvSymlink() {
  try {
    // Check if the unenv package exists
    const unenvBase = join(projectRoot, 'node_modules', '.pnpm', `unenv@${UNENV_VERSION}`);
    if (!existsSync(unenvBase)) {
      console.log('ℹ Unenv workaround: unenv package not found, skipping (may not be needed)');
      return true;
    }

    // Create the runtime/runtime directory if it doesn't exist
    if (!existsSync(TARGET_DIR)) {
      mkdirSync(TARGET_DIR, { recursive: true });
      console.log('✓ Created runtime/runtime directory');
    }

    // Check if symlink already exists and is correct
    if (existsSync(LINK_PATH)) {
      try {
        const existingTarget = readlinkSync(LINK_PATH);
        if (existingTarget === SOURCE_PATH) {
          console.log('✓ Unenv workaround: symlink already exists and is correct');
          return true;
        } else {
          console.log('⚠ Unenv workaround: incorrect symlink exists, will recreate');
          // On Windows, we might need special handling
          // For now, we'll leave it and log a warning
          console.log('  If build fails, manually run: pnpm run fix-unenv');
        }
      } catch (err) {
        // Not a symlink, might be a directory
        console.log('⚠ Unenv workaround: path exists but is not a symlink');
        console.log('  If build fails, manually delete and run: pnpm run fix-unenv');
      }
      return true;
    }

    // Create the symlink
    symlinkSync(SOURCE_PATH, LINK_PATH, 'junction');
    console.log('✓ Unenv workaround: symlink created successfully');
    return true;

  } catch (error) {
    console.error('✗ Unenv workaround failed:', error.message);
    console.error('  Build may fail. Please report this issue.');
    console.error('  Manual fix: mkdir -p', TARGET_DIR, '&& ln -sf ../mock', LINK_PATH);
    // Don't fail the install, just warn
    return false;
  }
}

// Run the workaround
const success = setupUnenvSymlink();
process.exit(0); // Always exit 0 to not break install
