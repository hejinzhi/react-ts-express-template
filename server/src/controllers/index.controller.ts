import IndexService from '@/services/index.service';
import { NextFunction, Request, Response } from 'express';

class IndexController {
  public indexService = new IndexService();

  // 测试
  public test = async (req: Request, res: Response, next: NextFunction) => {
    // const msg = this.indexService.sendTxt();
    // res.status(200).send(msg);
  };
}

export default IndexController;
