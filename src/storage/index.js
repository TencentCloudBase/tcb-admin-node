// const cloudApiRequest = require("../utils/cloudApiRequest");
const httpRequest = require("../utils/httpRequest");

/*
 * 上传文件
 * @param {string} cloudPath 上传后的文件路径
 * @param {fs.ReadStream} fileContent  上传文件的二进制流
 */
function uploadFile({
  cloudPath,
  fileContent
}) {
  let params = Object.assign(this.commParam, {
    action: "storage.uploadFile",
    path: cloudPath,
    file: fileContent
  });

  return httpRequest({
    secretId: this.config.secretId,
    secretKey: this.config.secretKey,
    params,
    method: "post",
    headers: {
      // "content-type": "multipart/form-data"
    },
    proxy: this.config.proxy
  });
}

/**
 * 删除文件
 * @param {Array.<string>} fileList 文件id数组
 */
function deleteFile({
  fileList
}) {
  if (!fileList || !Array.isArray(fileList)) {
    return {
      code: "INVALID_PARAM",
      message: "fileList必须是非空的数组"
    };
  }

  for (let file of fileList) {
    if (!file || typeof file != "string") {
      return {
        code: "INVALID_PARAM",
        message: "fileList的元素必须是非空的字符串"
      };
    }
  }

  let params = Object.assign(this.commParam, {
    action: "storage.batchDeleteFile",
    fileid_list: fileList
  });

  return httpRequest({
    secretId: this.config.secretId,
    secretKey: this.config.secretKey,
    params,
    method: "post",
    headers: {
      "content-type": "application/json"
    },
    proxy: this.config.proxy
  });
}

/**
 * 获取文件下载链接
 * @param {Array.<Object>} fileList
 */
function getTempFileURL({
  fileList
}) {
  // console.log(fileList);
  if (!fileList || !Array.isArray(fileList)) {
    return {
      code: "INVALID_PARAM",
      message: "fileList必须是非空的数组"
    };
  }

  let file_list = [];
  for (let file of fileList) {
    if (
      typeof file !== "object" ||
      !file.hasOwnProperty("fileID") ||
      !file.hasOwnProperty("maxAge")
    ) {
      return {
        code: "INVALID_PARAM",
        message: "fileList的元素必须是包含fileID和maxAge的对象"
      };
    }

    file_list.push({
      fileid: file.fileID,
      max_age: file.maxAge
    });
  }

  let params = Object.assign(this.commParam, {
    action: "storage.batchGetDownloadUrl",
    file_list
  });
  // console.log(params);

  return httpRequest({
    secretId: this.config.secretId,
    secretKey: this.config.secretKey,
    params,
    method: "post",
    headers: {
      "content-type": "application/json"
    },
    proxy: this.config.proxy
  });
}

function downloadFile({
  fileId
}) {}

exports.uploadFile = uploadFile;
exports.deleteFile = deleteFile;
exports.getTempFileURL = getTempFileURL;
