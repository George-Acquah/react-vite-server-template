import fs from "node:fs/promises";
import express from "express";
import { Transform } from "node:stream";

const isProduction = false;
// const isProduction = process.env.NODE_ENV === "production";
const port = process.env.PORT || 5111;
const base = process.env.BASE || "/";
const ABORT_DELAY = 10000;

const templateHtml = isProduction
  ? await fs.readFile("./dist/client/index.html", "utf-8")
  : "";
const ssrManifest = isProduction
  ? await fs.readFile("./dist/client/.vite/ssr-manifest.json", "utf-8")
  : undefined;

const app = express();

let vite;
if (!isProduction) {
  const { createServer } = await import("vite");
  vite = await createServer({
    server: { middlewareMode: true },
    appType: "custom",
    base,
  });
  app.use(vite.middlewares);
} else {
  const compression = (await import("compression")).default;
  const sirv = (await import("sirv")).default;
  app.use(compression());
  app.use(
    base,
    sirv("./dist/client", {
      maxAge: 31536000, // Cache assets for 1 year
      immutable: true, // Assets are never modified
      extensions: [],
    })
  );
}

// Handle all routes with the SSR setup
app.use("*all", async (req, res) => {
  try {
    const url = req.originalUrl.replace(base, "");

    let template;
    let render;
    if (!isProduction) {
      template = await fs.readFile("./index.html", "utf-8");
      template = await vite.transformIndexHtml(url, template);
      render = (await vite.ssrLoadModule("/src/entry-server.tsx")).render;
    } else {
      template = templateHtml;
      render = (await import("./dist/server/entry-server.js")).render;
    }

    let didError = false;

    // Dynamically set the page-specific metadata
    const metaTags = getPageMetadata(url); // Get the metadata for this route

    const { pipe, abort } = render(url, ssrManifest, {
      onShellError() {
        res.status(500);
        res.set({ "Content-Type": "text/html" });
        res.send("<h1>Something went wrong</h1>");
      },
      onShellReady() {
        res.status(didError ? 500 : 200);
        res.set({ "Content-Type": "text/html" });

        const transformStream = new Transform({
          transform(chunk, encoding, callback) {
            res.write(chunk, encoding);
            callback();
          },
        });

        const [htmlStart, htmlEnd] = template.split(`<!--app-html-->`);

        // Insert dynamic meta tags into the head section
        const headTags = `
          <title>${metaTags.title}</title>
          <meta name="description" content="${metaTags.description}">
          <meta name="keywords" content="${metaTags.keywords}">
        `;

        res.write(htmlStart.replace("<head>", `<head>${headTags}`));

        transformStream.on("finish", () => {
          res.end(htmlEnd);
        });

        pipe(transformStream);
      },
      onError(error) {
        didError = true;
        console.error(error);
      },
    });

    setTimeout(() => {
      abort();
    }, ABORT_DELAY);
  } catch (e) {
    vite?.ssrFixStacktrace(e);
    console.log(e.stack);
    res.status(500).end(e.stack);
  }
});

// Start http server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});

function getPageMetadata(url) {
  // Customize metadata for each page based on the route
  const metaMap = {
    "/": {
      title: "Home - Vite React App",
      description: "Welcome to the Vite React App home page.",
      keywords: "vite, react, home",
    },
    "/about": {
      title: "About - Vite React App",
      description: "Learn more about the Vite React App on the about page.",
      keywords: "vite, react, about",
    },
    // Add more routes as needed...
  };

  return (
    metaMap[url] || {
      title: "Vite React App",
      description: "Default description for the Vite React App.",
      keywords: "vite, react, ssr",
    }
  );
}
