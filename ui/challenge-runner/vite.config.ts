import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { readFileSync, readdirSync } from 'fs';
import { resolve, join } from 'path';

const VIRTUAL_MODULE_ID = 'virtual:challenges';
const RESOLVED_VIRTUAL_MODULE_ID = '\0' + VIRTUAL_MODULE_ID;

function challengesPlugin() {
  const challengesDir = resolve(__dirname, '../../code/challenges');

  return {
    name: 'challenges-plugin',
    resolveId(id: string) {
      if (id === VIRTUAL_MODULE_ID) return RESOLVED_VIRTUAL_MODULE_ID;
    },
    load(id: string) {
      if (id === RESOLVED_VIRTUAL_MODULE_ID) {
        const files = readdirSync(challengesDir).filter(
          f => f.endsWith('.ts') && !f.includes('/')
        );
        const challenges: Record<string, string> = {};
        for (const file of files) {
          const name = file.replace('.ts', '');
          const source = readFileSync(join(challengesDir, file), 'utf-8');
          challenges[name] = source;
        }
        return `export const challenges = ${JSON.stringify(challenges)};`;
      }
    },
    configureServer(server: { watcher: { add: (path: string) => void } }) {
      server.watcher.add(challengesDir);
    },
  };
}

export default defineConfig({
  plugins: [react(), challengesPlugin()],
});
