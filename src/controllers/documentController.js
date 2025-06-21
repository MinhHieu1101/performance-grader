const BaseController = require("./BaseController");
const documentService = require("../services/documentService");

class DocumentController extends BaseController {
  // PATCH /applications/:applicationId/documents/:documentId/status
  updateStatus = BaseController.handle(async (req, res) => {
    const { documentId } = req.params;
    const { status } = req.body;
    const adminId = req.userId;

    const updated = await documentService.updateStatus({
      documentId: Number(documentId),
      adminId,
      status,
    });

    return this.sendSuccess(res, updated);
  });
}
module.exports = new DocumentController();