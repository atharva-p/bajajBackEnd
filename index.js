const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); 
const app = express();
const port = process.env.PORT || 3000;

// Your user details (replace with your actual details)
const USER_ID = "atharva_patil_08082003";
const EMAIL = "aa1685@srmist.edu.in";
const ROLL_NUMBER = "RA2111032020006";

app.use(cors()); 
app.use(bodyParser.json());

app.get("/bfhl", (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

app.post("/bfhl", (req, res) => {
  try {
    const { data } = req.body;

    if (!Array.isArray(data)) {
      throw new Error("Invalid input: data must be an array");
    }

    const numbers = data.filter((item) => !isNaN(item));
    const alphabets = data.filter((item) => isNaN(item) && item.length === 1);

    res.json({
      is_success: true,
      user_id: USER_ID,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      numbers: numbers,
      alphabets: alphabets,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      is_success: false,
      user_id: USER_ID,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      numbers: [],
      alphabets: [],
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
