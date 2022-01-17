import URLUtil from "../utils/url.util";

/**
 * @class VideoLoader
 * @classdesc 视频加载器类
 * @param file 文件流
 */

class VideoLoader {
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
          this.getVideoInfo(data).then((info) => {
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

  async getVideoInfo(data) {
    return new Promise((resolve, reject) => {
      const videoElement = document.createElement("video");
      videoElement.preload = "metadata";
      videoElement.src = data;
      videoElement.onloadedmetadata = () => {
        resolve({
          duration: videoElement.duration,
          width: videoElement.videoWidth,
          height: videoElement.videoHeight,
        });
      };
      videoElement.onerror = () => {
        reject("视频格式错误");
      };
    });
  }
}

export default VideoLoader;