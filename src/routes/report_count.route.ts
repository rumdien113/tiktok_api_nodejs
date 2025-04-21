import { Router } from 'express';
import {
  getAllReportCounters,
  getReportCounter,
  upsertReportCounter,
  deleteReportCounter
} from '../controllers/report_counter.controller';

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: ReportCounters
 *     description: Quản lý số lượt báo cáo theo đối tượng (post, comment, user)
 */

/**
 * @swagger
 * /report-counters:
 *   get:
 *     summary: Lấy danh sách tất cả ReportCounters
 *     tags: [ReportCounters]
 *     responses:
 *       200:
 *         description: Danh sách ReportCounters
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ReportCounter'
 *       500:
 *         description: Lỗi server
 */
router.get('/report-counters', getAllReportCounters);

/**
 * @swagger
 * /report-counters/{target_id}/{target_type}:
 *   get:
 *     summary: Lấy ReportCounter theo target_id và target_type
 *     tags: [ReportCounters]
 *     parameters:
 *       - in: path
 *         name: target_id
 *         required: true
 *         description: UUID của đối tượng bị báo cáo
 *         schema:
 *           type: string
 *           format: uuid
 *       - in: path
 *         name: target_type
 *         required: true
 *         description: Loại đối tượng (post, comment, user)
 *         schema:
 *           type: string
 *           enum: [post, comment, user]
 *     responses:
 *       200:
 *         description: Thông tin ReportCounter
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ReportCounter'
 *       404:
 *         description: Không tìm thấy ReportCounter
 *       500:
 *         description: Lỗi server
 */
router.get('/report-counters/:target_id/:target_type', getReportCounter);

/**
 * @swagger
 * /report-counters:
 *   post:
 *     summary: Tạo mới hoặc cập nhật ReportCounter
 *     tags: [ReportCounters]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - target_id
 *               - target_type
 *               - count
 *             properties:
 *               target_id:
 *                 type: string
 *                 format: uuid
 *               target_type:
 *                 type: string
 *                 enum: [post, comment, user]
 *               count:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Đã tạo mới ReportCounter
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ReportCounter'
 *       200:
 *         description: Đã cập nhật ReportCounter
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ReportCounter'
 *       500:
 *         description: Lỗi server
 */
router.post('/report-counters', upsertReportCounter);

/**
 * @swagger
 * /report-counters/{target_id}/{target_type}:
 *   delete:
 *     summary: Xóa ReportCounter theo target_id và target_type
 *     tags: [ReportCounters]
 *     parameters:
 *       - in: path
 *         name: target_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *       - in: path
 *         name: target_type
 *         required: true
 *         schema:
 *           type: string
 *           enum: [post, comment, user]
 *     responses:
 *       200:
 *         description: Xóa thành công
 *       404:
 *         description: Không tìm thấy ReportCounter
 *       500:
 *         description: Lỗi server
 */
router.delete('/report-counters/:target_id/:target_type', deleteReportCounter);

export default router;

