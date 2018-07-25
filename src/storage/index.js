const request = require('request')
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
async function deleteFile({
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
async function getTempFileURL({
  fileList
}) {
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

async function downloadFile({
  fileID
}) {
  let tmpUrl
  try {
    let tmpUrlRes = await this.getTempFileURL({
      fileList: [{
        fileID,
        maxAge: 600
      }]
    })
    console.log(tmpUrlRes)

    if (tmpUrlRes.code || typeof tmpUrlRes.data != 'object' || !Array.isArray(tmpUrlRes.data.download_list) || !tmpUrlRes.data.download_list[0].download_url) {
      return;
    }

    tmpUrl = tmpUrlRes.data.download_list[0].download_url
  } catch (e) {
    return;
  }

  return new Promise(function (resolve, reject) {
    request({
      url: tmpUrl
    }, function (err, response, body) {
      console.log(err, typeof body);
      if (err === null && response.statusCode == 200) {
        return resolve(body);
      } else {
        return reject(new Error(err));
      }
    });
  });
}

exports.uploadFile = uploadFile;
exports.deleteFile = deleteFile;
exports.getTempFileURL = getTempFileURL;
// exports.downloadFile = downloadFile;
