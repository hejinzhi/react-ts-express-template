import { Menu } from './../entity/menu.entity';
import { getRepository, UpdateResult } from 'typeorm';
import { UpdateUserProps } from '@interfaces/users.interface';
import { Users } from '@/entity/users.entity';
import jwt from 'jsonwebtoken';
import config from 'config';

class MenuService {
  public menu = Menu;

  public async getMenu() {
    const menuRepository = getRepository(this.menu);
    const menu = await menuRepository.findOne({
      disabled: '0',
    });
    return menu;
  }

  public async setMenu(menu: string) {
    const menuRepository = getRepository(this.menu);
    const menuData = await menuRepository.findOne({
      disabled: '0',
    });
    let menuRes;
    if (menuData) {
      menuRes = await menuRepository.save({
        id: menuData.id,
        menu,
      });
    } else {
      menuRes = await menuRepository.save({
        menu,
      });
    }

    return menuRes;
  }
}

export default MenuService;
