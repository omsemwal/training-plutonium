const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");


const createUser = async function (req, res) {
  let data = req.body
   try {
    let savedData = await userModel.create(data);
    res.status(200).send({ msg: savedData });
  }
  catch (error){
    console.log(error.message)
    res.status(400).send(error.message )
  }
};

const loginUser = async function (req, res) {
try{
  let userName = req.body.emailId;
  let password = req.body.password;

  let user = await userModel.findOne({ emailId: userName, password: password });
  if (!user)
    return res.status(400).send({
         status: false,
         msg: "username or the password is not corerct",
    });
  let token = jwt.sign(
    {
      userId: user._id.toString(),
      batch: "plutoniyam",
    },
       "Hariom semwal"
  );
       res.setHeader("x-auth-token", token);
       res.status(200).send({ status: true, token: token });
  }
  catch(error){res.status(401).send(error.message)}
};

const getUserData = async function (req, res) {
  try {
    let userId = req.params.userId;
    let userDetails = await userModel.findById(userId);
    if (!userDetails)
      return res.status(404).send({ status: false, msg: "No such user exists" });

    res.status(200).send({ status: true, data: userDetails });
  } catch (error) {
    res.status(404).send(error.message)}
    
    // Note: Try to see what happens if we change the secret while decoding the token
  };

  const updateUser = async function (req, res) {
    try{
    let userId = req.params.userId;
    let user = await userModel.findById(userId);
    //Return an error if no user with the given id exists in the db
    if (!user) {
      return res.status(404).send("No such user exists");
    }
    let userData = req.body;
    let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, userData, { new: true })
    res.status(200).send({ status: updatedUser, data: updatedUser });
    } catch(error){res.status(404).send(error.message)}
  };


  const deleteUser = async function (req, res) {
    try{
    let userId = req.params.userId
    let user = await userModel.findById(userId)
    if (!user) {
      return res.status(404).send({ status: false, message: "no such user exists" })
    }
    let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, { isDeleted: true }, { new: true })
    res.status(200).send({ status: true, data: updatedUser })
  } catch(error){res.status(404).send(error.message)}
  };

  module.exports.createUser = createUser;
  module.exports.getUserData = getUserData;
  module.exports.updateUser = updateUser;
  module.exports.loginUser = loginUser;
  module.exports.deleteUser = deleteUser