import jwt from "jsonwebtoken";
import enviroment from "../enviroment";
const generarJWT = (id: number, user: string) => {
  return new Promise((resolve, reject) => {
    const payload = { id, user };
    jwt.sign(
      payload,
      enviroment.SECRET_JWT_SEED,
      {
        expiresIn: "2h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("No se pudo general el token");
        }
        resolve(token);
        console.log(id, user);
      }
    );
  });
};

export default generarJWT;
