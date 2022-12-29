const isSFC = (request) => {
  const reg = /\.vue$/;
  return reg.test(request);
};

const getFileType = (request) => {
    type = request.split(".").pop();
    if (/\.vue$/.test(request)) {
      return ".vue";
    } else if (/\.tsx$/.test(request)) {
      return ".tsx";
    } else if (/\.jsx$/.test(request)) {
      return ".jsx";
    } else if (/\.ts$/.test(request)) {
      return ".ts";
    } else if (/\.js$/.test(request)) {
      return ".js";
    } else {
      throw Error(`file type of '.${type}' is not supported`);
    }
  };

module.exports = {
  isSFC,
  getFileType,
};
