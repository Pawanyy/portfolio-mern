import app from "./app.js";
import config from "./lib/config.js";
import Database from "./lib/Database.js"

app.listen(config.PORT, async () => {
  await (new Database().connect());
  console.log(`Server is running on http://localhost:${config.PORT}`);
});
