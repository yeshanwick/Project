const bcrypt = require("bcryptjs");

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt();
  return await bcrypt.hash(password, salt);
};

const checkPassword = async (password, encryptedPassword) => {
    const isPasswordCorrect = await bcrypt.compare(password, encryptedPassword);
    if (isPasswordCorrect) {
        return true;
    } else {
        return false;
    }
  };

  
module.exports = {hashPassword, checkPassword};
