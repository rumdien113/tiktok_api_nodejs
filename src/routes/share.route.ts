import { Router } from 'express';
import {
  getAllShares,
  getShareById,
  createShare,
  deleteShare
} from '../controllers/share.controller';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Shares
 *   description: Quản lý lượt chia sẻ bài viết
 */

/**
 * @swagger
 * /shares:
 *   get:
 *     summary: Lấy danh sách tất cả lượt chia sẻ
 *     tags: [Shares]
 *     responses:
 *       200:
 *         description: Danh sách lượt chia sẻ
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Share'
 *       500:
 *         description: Lỗi server
 */
router.get('/shares', getAllShares);

/**
 * @swagger
 * /shares/{id}:
 *   get:
 *     summary: Lấy chi tiết một lượt chia sẻ theo ID
 *     tags: [Shares]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: UUID của lượt chia sẻ
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Chi tiết lượt chia sẻ
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Share'
 *       404:
 *         description: Không tìm thấy lượt chia sẻ
 *       500:
 *         description: Lỗi server
 */
router.get('/shares/:id', getShareById);

/**
 * @swagger
 * /shares:
 *   post:
 *     summary: Tạo mới một lượt chia sẻ
 *     tags: [Shares]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ShareCreate'
 *     responses:
 *       201:
 *         description: Tạo lượt chia sẻ thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Share'
 *       500:
 *         description: Lỗi server
 */
router.post('/shares', createShare);

/**
 * @swagger
 * /shares/{id}:
 *   delete:
 *     summary: Xóa một lượt chia sẻ
 *     tags: [Shares]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: UUID của lượt chia sẻ cần xóa
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Xóa lượt chia sẻ thành công
 *       404:
 *         description: Không tìm thấy lượt chia sẻ
 *       500:
 *         description: Lỗi server
 */
router.delete('/shares/:id', deleteShare);

export default router;

