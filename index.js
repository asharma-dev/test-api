const express = require("express");
const app = express();

app.get("/home", (req, res) => {
  res.send("Server is healthy");
});

const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log("Server is up on " + port);
});

// Fore deploying to Vercel as serverless, https://shadowsmith.com/thoughts/how-to-deploy-an-express-api-to-vercel
module.exports = app;
