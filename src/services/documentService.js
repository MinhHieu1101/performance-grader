const documentRepo = require("../repositories/documentRepository");

class DocumentService {
  updateStatus = async ({ documentId, status, remarks }) => {
    const allowed = ["Approved", "Rejected"];
    if (!allowed.includes(status)) {
      const err = new Error(`Invalid status: ${status}`);
      err.status = 400;
      throw err;
    }

    const updated = await documentRepo.updateStatus(documentId, {
      status,
      reviewed_at: new Date(),
      remarks,
    });
    return updated;
  };
}
module.exports = new DocumentService();
