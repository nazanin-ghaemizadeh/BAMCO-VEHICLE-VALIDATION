import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
export default defineConfig({root:path.resolve('pages'),base:'/BAMCO-VEHICLE-VALIDATION/',publicDir:path.resolve('public'),plugins:[react()],build:{outDir:path.resolve('dist-pages'),emptyOutDir:true}});
