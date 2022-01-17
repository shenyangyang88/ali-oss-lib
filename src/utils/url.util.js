/**
 * @class URLUtil
 * @classdesc url 工具类
 * @static createObjectURL
 * @static revokeObjectURL
 */

class URLUtil {
  static createObjectURL(file) {
    try {
      return URL.createObjectURL(file);
    } catch (error) {
      console.error('URLUtil.createObjectURL.error', error);
    }
  }

  static revokeObjectURL(data) {
    try {
      URL.revokeObjectURL(data);
    } catch (error) {
      console.error('URLUtil.revokeObjectURL.error', error);
    }
  }
}

export default URLUtil;