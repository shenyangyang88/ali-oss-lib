import SparkMD5 from "spark-md5";

/**
 * @class MD5Util
 * @classdesc md5 工具类
 * @static getFileMD5 获取文件 md5
 */

class MD5Util {
  static async getFileMD5(file) {
    return new Promise((resolve, reject) => {
      try {
        let chunkCount = 0;
        const chunkSize = 2097152;
        const chunkLength = Math.ceil(file.size / chunkSize);
        const spark = new SparkMD5.ArrayBuffer();
        const fileReader = new FileReader();
        const fileSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice;
        const fileLoadNext = () => {
          var start = chunkCount * chunkSize,
            end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize;

          fileReader.readAsArrayBuffer(fileSlice.call(file, start, end));
        }

        fileReader.onload = (e) => {
          spark.append(e.target.result);
          chunkCount++;
          if (chunkCount < chunkLength) {
            fileLoadNext();
          } else {
            resolve(spark.end());
          }
        };
        fileReader.onerror = () => {
          reject("文件流读取错误");
        };

        fileLoadNext();
      } catch (error) {
        console.error('MD5Util.getFileMD5.error', error);
        resolve();
      }
    });
  }
}

export default MD5Util;