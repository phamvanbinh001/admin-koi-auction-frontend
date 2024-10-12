import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  envPrefix: 'VITE_',
<<<<<<< HEAD
  server: {
    host: '0.0.0.0',
    historyApiFallback: true,
  },
});
=======
})
>>>>>>> d9fc573 (Get Auction Feature before using tooltip)
