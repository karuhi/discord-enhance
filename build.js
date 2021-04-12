const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

const env = dotenv.config({
  path: path.resolve(process.cwd(), ".env.front"),
}).parsed;

let settings = {
  entryPoints: ["public/js/main.js", "public/js/authenticated.js"],
  bundle: true,
  outdir: "public/js/dist",
  define: {
    "process.env": JSON.stringify(env),
  },
  minify: true,
};

if (process.env.WATCH_MODE === "true") {
  settings["watch"] = {
    onRebuild(error, result) {
      if (error) {
        console.error("watch build failed:", error);
      } else {
        console.log("watch build succeeded:", result);
      }
    },
  };
}

require("esbuild")
  .build(settings)
  .then(() => console.log("build succeeded"))
  .catch(() => process.exit(1));
