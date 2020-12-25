const express = require("express");
const bcrypt = require("bcrypt");
const pool = require("../../db");

const router = express.Router();
const saltRounds = 10;

// @route   POST api/user/signup
// @desc    Signup user
// @access  public

router.post("/signup", async (req, res) => {
    try {
      console.log(req.body);
        const { user_name, user_pass, user_email} = req.body;
        console.log(user_name, user_pass, user_email);
        const pass_hash = await bcrypt.hash(user_pass, saltRounds);
        const newUser = await pool.query(
            "INSERT INTO users (user_name, user_pass, user_email) \
             VALUES ($1, $2, $3) RETURNING user_id",
            [user_name, pass_hash, user_email]
        );
        res.json({ status: "success", user_id: newUser.rows[0].user_id});
    } catch (err) {
        if(err.constraint === 'users_user_email_key')
            res.json({status: "user already exists"});
        else
            console.log("Error: " + err);
    }
});

// @route   POST api/user/signin
// @desc    Login user
// @access  public

router.post("/signin", async (req, res) => {
    try {
        const { user_email, user_pass } = req.body;
        
        const user = await pool.query(
            "SELECT user_id, user_name, user_pass FROM Users WHERE user_email = $1",
            [user_email]
        );

        if (user.rowCount === 0) {
            res.json({ status: "invalid" });
        } else {
            if (await bcrypt.compare(user_pass, user.rows[0].user_pass))
            {
                res.json({ status: "valid", user_id: user.rows[0].user_id });
            }
            else res.json({ status: "invalid" });
        }
    } catch (err) {
        console.error(err.message);
    }
});

module.exports = router;
