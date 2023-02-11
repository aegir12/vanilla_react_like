const express = require("express");

const imagesRouter = require("./routes/images");

const app = express();

const PORT = 5000;

app.use(express.static('public', { index: 'index.html' }));

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

// Mount the router to the /images route
app.use("/api/images", imagesRouter);
