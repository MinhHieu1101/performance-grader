const documentRepo = require("../repositories/documentRepository");

class DocumentService {
  updateStatus = async ({ documentId, adminId, status }) => {
    const allowed = ["Approved", "Rejected"];
    if (!allowed.includes(status)) {
      const err = new Error(`Invalid status: ${status}`);
      err.status = 400;
      throw err;
    }

    const doc = await documentRepo.findById(documentId);
    if (!doc) {
      const err = new Error(`Document ${documentId} not found`);
      err.status = 404;
      throw err;
    }

    const updated = await documentRepo.updateStatus(documentId, {
      status,
      reviewed_by: adminId,
      reviewed_at: new Date(),
    });
    return updated;
  };
}
module.exports = new DocumentService();
