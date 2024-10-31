import bcypt from "bcrypt";

const hashingPassword = (pass) => {
  const saltRounds = 12;
  return new Promise((resolve, reject) => {
    bcypt.genSalt(saltRounds, function (err, salt) {
      bcypt.hash(pass, salt, function (err, hash) {
        if (err) reject(err);

        resolve(hash);
      });
    });
  });
};
export default hashingPassword;
