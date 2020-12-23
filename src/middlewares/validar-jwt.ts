import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import enviroment from "../enviroment";

interface IPayload {
  id: string;
}

const validarJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "No hay token en la petición",
    });
  }

  try {
    const { id } = jwt.verify(token, enviroment.SECRET_JWT_SEED) as IPayload;
    req.userId = id;
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "Token no valido",
    });
  }
  next();

  //   const payload = jwt.verify(
  //     token,
  //     enviroment.SECRET_JWT_SEED,
  //     (err, decoded) => {
  //       if (err) {
  //         return res.status(401).json({
  //           ok: false,
  //           err: {
  //             message: "token no valido",
  //           },
  //         });
  //       }
  //       console.log(payload);

  //       next();
  //     }
  //   );
};

export default validarJWT;
