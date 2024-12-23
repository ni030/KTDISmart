const bcrypt = require("bcrypt");

const passwordController = {
  checkEmailExistence: async (req, res) => {
    const { email } = req.body;
    try {
      const user =
        await req.sql`SELECT * FROM user_credentials WHERE email = ${email}`;
      if (user.length > 0) {
        return res.status(200).json({ exists: true, message: "Email exists!" });
      } else {
        return res
          .status(204)
          .json({ exists: false, message: "Email not found!" });
      }
    } catch (error) {
      console.error("Error during checking email..", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },
  resetPassword: async (req, res) => {
    console.log("Resetting password...");

    const { email, newPassword } = req.body;

    try {
      // Check if user exists
      const user = await req.sql`
        SELECT * FROM user_credentials WHERE email = ${email}
      `;

      if (user.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      console.log("Check user -> " + JSON.stringify(user));

      // Hash the new password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

      console.log(
        "Updating password for user:",
        user[0].user_id,
        "email:",
        email
      );

      // Update password in the database
      const updateQuery = await req.sql`
      UPDATE user_credentials 
      SET password = ${hashedPassword} 
      WHERE user_id = ${user[0].user_id}
      RETURNING *`; // Return the updated row

      console.log("updateQuery -> " + JSON.stringify(updateQuery));

      if (updateQuery.length === 0) {
        console.error("No rows updated. Ensure email matches.");
        return res
          .status(400)
          .json({ message: "Failed to update password", success: false });
      }

      console.log("Password updated successfully.");
      res
        .status(200)
        .json({ message: "Password reset successful", success: true });
    } catch (error) {
      console.error("Error during password reset:", error);
      res
        .status(500)
        .json({
          message: "Server error",
          error: error.message,
          success: false,
        });
    }
  },
};

module.exports = passwordController;
