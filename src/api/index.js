import Service from './service';

export default class Http {
  static getMenuData() {
    return Service.get('menu/getMenuData');
  }
  static getCodeString(index) {
    return Service.get(`resource/code/${index}`);
  }
  static getJSONResource(name) {
    return Service.get(`resource/json/${name}`);
  }
}
