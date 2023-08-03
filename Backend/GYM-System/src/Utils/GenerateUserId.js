const crypto = require("crypto");
const userRoles = require("../config/UserRoles");

const generateUserId = async (nic, role) => {
  const timestamp = Date.now().toString(); // Get the current timestamp
  // Concatenate the timestamp and nic strings
  const concatenatedString = timestamp + nic;

  // Generate a hash using the concatenated string
  const hash = crypto
    .createHash("sha256")
    .update(concatenatedString)
    .digest("hex");

  // Extract the first 5 characters from the hash to get the unique ID
  let uniqueID;
  switch (role) {
    case userRoles.ADMIN:
      uniqueID = "A-" + hash.substr(0, 9);
      break;
    case userRoles.MEMBER:
      uniqueID = "M-" + hash.substr(0, 9);
      break;
    case userRoles.INSTRUCTOR:
      uniqueID = "I-" + hash.substr(0, 9);
      break;
    default:
      uniqueID = "0000000000";
      break;
  }

  return uniqueID.toLocaleUpperCase();
};

module.exports = generateUserId;
