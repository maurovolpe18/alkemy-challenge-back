import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/User";
import generarJWT from "../helpers/jwt";

export const getUsers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const users = await User.find();
    return res.status(200).json({
      ok: true,
      users,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      ok: false,
      err,
    });
  }
};
export const createUsers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const body = req.body;

  const { user } = body;

  try {
    let userFind = await User.findOne({ user });

    if (userFind) {
      return res.json({
        ok: false,
        err: {
          message: "El usuario ya existe",
        },
      });
    }

    const newUser = User.create(body);

    const results = await User.save(newUser);

    let userForToken = await User.findOne({ user });
    if (!userForToken) {
      return res.json({
        ok: false,
        message: "hable con el administrador",
      });
    }
    const token = await generarJWT(userForToken.id, userForToken.user);

    return res.json({
      ok: true,
      results,
      token,
    });
  } catch (err) {
    console.log(err);
    return res.json({
      ok: false,
      err,
    });
  }
};

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId = req.params.id;

  try {
    const user = await User.findOne(userId);

    if (!user) {
      return res.status(404).json({
        ok: false,
        err: {
          message: "User doesn't exist",
        },
      });
    }

    await User.delete(userId);

    return res.json({
      ok: true,
      message: "user has remove",
    });
  } catch (err) {
    console.log(err);
    return res.json({
      ok: false,
      err,
    });
  }
};

// Login User

export const loginUser = async (req: Request, res: Response) => {
  const { user } = req.body;

  try {
    let userFind = await User.findOne({ user });
    if (!userFind) {
      return res.status(400).json({
        ok: false,
        msg: "El usuario no existe",
      });
    }
    const token = await generarJWT(userFind.id, userFind.user);
    return res.status(201).json({
      ok: true,
      id: userFind.id,
      user: userFind.user,
      token,
    });
  } catch (err) {
    console.log(err);
    res.json({
      ok: false,
      err,
    });
  }
};

export const revalidarToken = async (req: Request, res: Response) => {
  const id = req.userId;

  const userFind = await User.findOne(id);

  if (!userFind) {
    return res.json({
      ok: false,
      message: "hable con el administrador",
    });
  }

  //generar new JWT
  const token = await generarJWT(userFind.id, userFind.user);
  res.json({
    ok: true,
    id,
    name: userFind.user,
    token,
  });
};
