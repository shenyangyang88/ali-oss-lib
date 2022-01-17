import URLUtil from "../utils/url.util";

/**
 * @class ImageLoader
 * @classdesc 图片加载器类
 * @param file 文件流
 */

class ImageLoader {
  constructor(file) {
    if (Blob) {
      if (file instanceof Blob) {
        this.file = file;
      }
    }
  }

  async load() {
    return new Promise((resolve, reject) => {
      if (this.file) {
        const data = URLUtil.createObjectURL(this.file);
        if (data) {
          this.getImageInfo(data).then((info) => {
            URLUtil.revokeObjectURL(data);
            resolve(info);
          }).catch((error) => {
            reject(error);
          });
        } else {
          resolve();
        }
      } else {
        reject("文件流参数格式错误");
      }
    });
  }

  async getImageInfo(data) {
    return new Promise((resolve, reject) => {
      const imageElement = new Image();
      imageElement.src = data;
      imageElement.onload = () => {
        resolve({
          width: imageElement.width,
          height: imageElement.height,
        });
      };
      imageElement.onerror = () => {
        reject("图片格式错误");
      };
    });
  }
}

export default ImageLoader;