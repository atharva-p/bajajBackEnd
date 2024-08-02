const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3000;

// Your user details (replace with your actual details)
const USER_ID = "your_full_name_ddmmyyyy";
const EMAIL = "your_email@example.com";
const ROLL_NUMBER = "your_roll_number";

app.use(bodyParser.json());

app.post("/bfhl", (req, res) => {
  try {
    const { data } = req.body;

    if (!Array.isArray(data)) {
      throw new Error("Invalid input: data must be an array");
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
      user_id: USER_ID,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      numbers: numbers,
      alphabets: alphabets,
      highest_alphabet: highestAlphabet,
    });
  } catch (error) {
    res.status(400).json({ is_success: false, error: error.message });
  }
});

app.get("/bfhl", (req, res) => {
  res.json({ operation_code: 1 });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
