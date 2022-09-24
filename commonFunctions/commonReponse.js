module.exports.returnStatement = async function (
  message,
  success,
  data,
  status,
  req,
  res
) {
  return res.status(status).json({
    message: message,
    success: success,
    data: data ? data : "",
  });
};
