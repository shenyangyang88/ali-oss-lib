import OSS from "ali-oss";

/**
 * @class MultipartUploadClient
 * @classdesc oss 类
 * @param client
 * @param onProgress
 */

class MultipartUploadClient {
  constructor(client, onProgress) {
    this.client = client;
    this.checkpoint = undefined;
    if (onProgress instanceof Function) {
      this.onProgress = onProgress;
    } else {
      this.onProgress = (p) => {
        console.log(p);
      };
    }
  }

  async upload(file, fileName) {
    return new Promise((resolve, reject) => {
      this.client.multipartUpload(fileName, file, {
        checkpoint: this.checkpoint,
        progress: (p, cpt) => {
          this.onProgress(p);
          this.checkpoint = cpt;
        }
      }).then((result) => {
        if (result.res.status === 200) {
          this.checkpoint = undefined;
        }
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  abort() {
    if (this.checkpoint) {
      this.client.abortMultipartUpload(this.checkpoint.name, this.checkpoint.uploadId);
    }
  }
}

/**
 * @class OSSClient
 * @classdesc oss 类
 * @param config 配置对象
 */

class OSSClient {
  constructor(config) {
    this.client = new OSS(config);
  }

  async upload(file, fileName) {
    return this.client.put(fileName, file);
  }

  createMultipartUploadClient(onProgress) {
    return new MultipartUploadClient(this.client, onProgress);
  }
}

export default OSSClient;