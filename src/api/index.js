import Service from './service';

export default class Http {
  static getMenuData() {
    return Service.get('menu/getMenuData');
  }
}
