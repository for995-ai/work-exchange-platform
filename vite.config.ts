import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'


/**
 * The Figma Make export writes version-pinned bare imports, e.g.
 *   import { Slot } from '@radix-ui/react-slot@1.1.2'
 * which it supported via `npm:`-aliased dependency keys. Modern pnpm rejects
 * those aliases outright — an alias must be a valid package name — so they can
 * no longer be installed. Stripping the version suffix at resolve time keeps
 * the original source untouched while installing normally.
 */
function versionedImportResolver() {
  const VERSIONED = /^(@[^/@]+\/[^/@]+|[^@][^/@]*)@\d[\w.\-+]*$/
  return {
    name: 'versioned-import-resolver',
    async resolveId(id: string, importer: string | undefined) {
      const m = VERSIONED.exec(id)
      if (!m) return null
      const resolved = await this.resolve(m[1], importer, { skipSelf: true })
      return resolved ?? null
    },
  }
}

function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '')
        return path.resolve(__dirname, 'src/assets', filename)
      }
    },
  }
}

export default defineConfig(({ command }) => ({
  // Served from a project subpath on GitHub Pages, but from the root during
  // local development — so `pnpm dev` is unaffected.
  base: command === 'build' ? '/work-exchange-platform/' : '/',
  plugins: [
    versionedImportResolver(),
    figmaAssetResolver(),
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/app'),
    },
  },
}))
