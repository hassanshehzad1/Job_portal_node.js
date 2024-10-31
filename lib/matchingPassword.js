import bcrypt from "bcrypt";
const matchingPassword = (pass, user) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(pass, user, function (err, result) {
      if (err) resolve(err);
      if (!result) resolvr(false);

      resolve(result);
    });
  });
};

export default matchingPassword;
