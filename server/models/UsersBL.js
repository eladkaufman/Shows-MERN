const userModel = require("./UserModel");

exports.getUserByUserName = (userName) => {
  return new Promise((resolve, reject) => {
    userModel.find({ userName }, (err, usersArray) => {
      if (err) {
        reject(err);
      } else {
        resolve(usersArray[0]);
      }
    });
  });
};
