import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths";
import { VitePWA } from 'vite-plugin-pwa';
import fs from 'fs';
import path from 'path';

function settingsApiPlugin() {
  return {
    name: 'settings-api',
    configureServer(server: any) {
      server.middlewares.use('/api/settings', (req: any, res: any) => {
        const dbPath = path.resolve(process.cwd(), 'settings.json');

        if (req.method === 'GET') {
          if (fs.existsSync(dbPath)) {
            const data = fs.readFileSync(dbPath, 'utf-8');
            res.setHeader('Content-Type', 'application/json');
            res.end(data);
          } else {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({}));
          }
        } else if (req.method === 'POST') {
          let body = '';
          req.on('data', (chunk: any) => {
            body += chunk.toString();
          });
          req.on('end', () => {
            fs.writeFileSync(dbPath, body);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: true }));
          });
        }
      });

      server.middlewares.use('/api/stats', (req: any, res: any) => {
        const dbPath = path.resolve(process.cwd(), 'stats.json');

        if (req.method === 'GET') {
          if (fs.existsSync(dbPath)) {
            const data = fs.readFileSync(dbPath, 'utf-8');
            res.setHeader('Content-Type', 'application/json');
            res.end(data);
          } else {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(null));
          }
        } else if (req.method === 'POST') {
          let body = '';
          req.on('data', (chunk: any) => {
            body += chunk.toString();
          });
          req.on('end', () => {
            fs.writeFileSync(dbPath, body);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: true }));
          });
        }
      });
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  build: {
    sourcemap: 'hidden',
  },
  plugins: [
    react({
      babel: {
        plugins: [
          'react-dev-locator',
        ],
      },
    }),
    tsconfigPaths(),
    settingsApiPlugin(),
    VitePWA({ 
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'UPA Realtime Dashboard',
        short_name: 'UPA Dashboard',
        description: 'Realtime dashboard for UPA Library',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
})
