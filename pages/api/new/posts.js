export default async (req, res) => {
  if (req.method == "POST") {
  } else {
    res.status(404).send("error");
  }
};
