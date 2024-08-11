const router = require("../router");

router.get("/", (req, res) => {
  // res.send('Hello, World!');
  res.json({ message: "Hello, World!" });
});
