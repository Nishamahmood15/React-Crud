const nodeMailer = require("nodemailer");
const userModel = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
// createuser api
const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10); //converting password to hash
    //creating new instance of usermodel to save data
    const user = new userModel({
      firstName,
      lastName,
      email,
      password: hashPassword,
    });
    await user.save(); //save the above user instance
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message }); //convert error message
  }
};

//get api

const getAllUser = async (req, res) => {
  try {
    const user = await userModel.find({});

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//delete api
const deleteUser = async (req, res) => {
  try {
    const user = req.params.id;
    const del = await userModel.findByIdAndDelete(user);
    res.status(200).json("user deleted successfully");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//update api
const updateUser = async (req, res) => {
  try {
    const user = await userModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json("user updated successfully");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//get single data by querry
const getDataByQuerry = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.query.email });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//get single data and update by params
const getAndUpdateByParams = async (req, res) => {
  try {
    const user = await userModel.findOneAndUpdate(
      { name: req.params.name },
      req.body,
      { new: true }
    );

    res.status(200).json("Updation successfull");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//login system apis
const loginSystem = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { userId: user.id },
        "LDUyfHQNq5qggRxsLjrutYqVkBxj6nXv",
        { expiresIn: "1 hr" }
      );
      res.status(200).json({ token });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// forget password apis
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const myuser = await userModel.findOne({ email });

    if (!myuser) {
      return res.status(404).json({ error: 'User not found in record' });
    }

    const resetToken = generateResetToken();
    console.log('Reset Token:', resetToken);
   myuser.resetPasswordToken  = resetToken;
    myuser.tokenExpired = Date.now() + 1500000;
 
    await myuser.save();

    const resetLink = `http://localhost:5000/user/resetPassword?token=${resetToken}`;
    const mailOptions = {
      from: 'Nishamahmood97@outlook.com',
      to: myuser.email, 
      subject: 'Password Reset',
      text: `Click the following link to reset your password: ${resetLink}`,
    };
   

    const transport = nodeMailer.createTransport({
      host: 'smtp-mail.outlook.com',
      port: 587,
      secure: false, // Use TLS
      auth: {
        user: 'Nishamahmood97@outlook.com',
        pass: 'nishaelaaf143'
      },
    
    });
   

    // Send the email
    transport.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to send reset email' });
      } else {
        console.log('Email sent: ' + info.response);
        res.status(200).json({ message: 'Password reset email sent successfully' });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

const generateResetToken = () => {
  const buffer = crypto.randomBytes(32);
  const token = buffer.toString('hex');
  return token;
}



module.exports = {
  createUser,
  getAllUser,
  deleteUser,
  updateUser,
  getDataByQuerry,
  getAndUpdateByParams,
  loginSystem,
  forgotPassword,
}; //destructuring the object of createUser
