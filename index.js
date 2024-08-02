const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get("/bfhl", (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

app.post("/bfhl", (req, res) => {
  try {
    const { user_id, email, roll_number, data } = req.body;

    if (!user_id || !email || !roll_number || !data) {
      throw new Error("Invalid input: all fields are required");
    }

    if (!Array.isArray(data)) {
      throw new Error("Invalid input: data must be an array");
    }

    // additional input validation
    if (data.length === 0) {
      throw new Error("Invalid input: data array is empty");
    }

    const numbers = data.filter((item) => !isNaN(item));
    const alphabets = data.filter((item) => isNaN(item) && item.length === 1);
    const highestAlphabet =
      alphabets.length > 0
        ? [
            alphabets.reduce((a, b) =>
              a.toLowerCase() > b.toLowerCase() ? a : b
            ),
          ]
        : [];

    res.json({
      is_success: true,
      user_id: user_id,
      email: email,
      roll_number: roll_number,
      numbers: numbers,
      alphabets: alphabets,
      highest_alphabet: highestAlphabet,
    });
  } catch (error) {
    console.error(error); // log the error
    res.status(400).json({ is_success: false, error: "Invalid input" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
