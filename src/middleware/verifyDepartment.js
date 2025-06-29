module.exports = async (req, res, next) => {
  const { departmentId } = req.params;
  const userDepartmentId = req.user.department_id;

  if (Number.isNaN(departmentId)) {
    const err = new Error("Invalid departmentId");
    err.status = 400;
    return next(err);
  }

  if (userDepartmentId !== departmentId) {
    const err = new Error(`Unauthorized access to department ${departmentId}`);
    err.status = 403;
    return next(err);
  }

  next();
}