import { defineConfig } from 'vite'
import react from "@vitejs/plugin-react";
import tailwindcss from 'tailwindcss';
import { fileURLToPath } from 'url';
import { resolve } from 'path';

const ReactCompilerConfig = {
  target: "19",
};

export default defineConfig(() => {
  return {
    plugins: [
      react({
        babel: {
          plugins: [["babel-plugin-react-compiler", ReactCompilerConfig]],
        },
      }),
    ],
    resolve: {
      alias: {
        "@": resolve(__dirname, "src"), // Set up the alias
      },
    },
    css: {
      postcss: {
        plugins: [tailwindcss()],
      },
    },
    ssr: {
      noExternal: ["react-router-dom"],
    },
  };
});
