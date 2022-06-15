import { Response, Request, NextFunction } from "express";

function paginate(model: Number[] | string[] | any) {
  return async (req: Request | any, res: Response | any, next: NextFunction) => {
    const page: any = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const result: any = {};
// change model.length to model.countDocuments() because you are counting directly from mongodb
    if (endIndex < (await model.countDocuments().exec())) {
      result.next = {
        page: page + 1,
        limit: limit,
      };
    }
    if (startIndex > 0) {
      result.previous = {
        page: page - 1,
        limit: limit,
      };
    }
    try {
//       .limit(limit).skip(startIndex) replaced the slice method because
//       it is done directly from mongodb and they are one of mongodb methods
      result.results = await model.find().limit(limit).skip(startIndex);
      res.paginatedResult = result;
      next();
    } catch (e: any) {
      res.status(500).json({ message: e.message });
    }
  };
}

export default paginate
