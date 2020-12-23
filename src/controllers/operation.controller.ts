import { Request, Response } from "express";
import { type } from "os";
import { Operation } from "../entity/Operation";

export const getOperation = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const operation: Operation[] = await Operation.find({
      relations: ["user"],
      where: { user: `${req.userId}` },
    });

    let amountTotal: number = 0;
    let suma: number = 0;
    let resta: number = 0;

    for (let i in operation) {
      if (operation[i].type === false) {
        resta -= -operation[i].amount;
      } else {
        suma += +operation[i].amount;
      }
    }
    amountTotal = suma - resta;

    return res.status(200).json({
      ok: true,
      operation,
      amountTotal,
      suma,
      resta,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      ok: false,
      err,
    });
  }
};

export const createOperation = async (req: Request, res: Response) => {
  try {
    const { user = req.userId, concept, amount, type } = req.body;

    const newOperation = Operation.create({ user, concept, amount, type });

    const operationSave = await Operation.save(newOperation);

    return res.json({
      ok: true,
      operation: operationSave,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

export const updateOperation = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const operationId = req.params.id;
  const body = req.body;

  try {
    const operation = await Operation.findOne(operationId);

    if (!operation) {
      return res.status(404).json({
        ok: false,
        err: {
          message: "Operation doesn't exist",
        },
      });
    }
    operation.concept = body.concept;
    operation.amount = body.amount;

    await Operation.save(operation);

    return res.json({
      ok: true,
      operation,
    });
  } catch (err) {
    console.log(err);
    return res.json({
      ok: false,
      err,
    });
  }
};

export const deleteOperation = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId = req.params.id;

  try {
    const operation: Operation[] = await Operation.find({
      relations: ["user"],
      where: { user: `${req.userId}` },
    });

    if (!operation) {
      return res.status(404).json({
        ok: false,
        err: {
          message: "Operation doesn't exist",
        },
      });
    }

    await Operation.delete(userId);

    return res.json({
      ok: true,
      message: "operation has remove",
    });
  } catch (err) {
    console.log(err);
    return res.json({
      ok: false,
      err,
    });
  }
};
