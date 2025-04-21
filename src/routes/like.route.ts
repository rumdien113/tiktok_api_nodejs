import { Router } from 'express'
import {
  createLike,
  deleteLike,
  getLikesByTarget,
  countLikes
} from '../controllers/like.controller'

const router: Router = Router()

/**
 * @swagger
 * tags:
 *   name: Likes
 *   description: Quản lý lượt like cho bài viết/bình luận
 */

/**
 * @swagger
 * /likes:
 *   post:
 *     summary: Thêm like cho target
 *     tags: [Likes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LikeCreate'
 *     responses:
 *       201:
 *         description: Like được tạo thành công
 *       409:
 *         description: Đã like trước đó
 *       500:
 *         description: Lỗi server
 */
router.post('/', createLike)

/**
 * @swagger
 * /likes:
 *   delete:
 *     summary: Xóa like khỏi target
 *     tags: [Likes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LikeCreate'
 *     responses:
 *       200:
 *         description: Like được xóa thành công
 *       404:
 *         description: Like không tồn tại
 *       500:
 *         description: Lỗi server
 */
router.delete('/', deleteLike)

/**
 * @swagger
 * /likes/{target_type}/{target_id}:
 *   get:
 *     summary: Lấy tất cả like của target
 *     tags: [Likes]
 *     parameters:
 *       - in: path
 *         name: target_type
 *         required: true
 *         schema:
 *           type: string
 *           enum: [post, comment]
 *         description: Loại target
 *       - in: path
 *         name: target_id
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID của target
 *     responses:
 *       200:
 *         description: Danh sách likes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Like'
 *       500:
 *         description: Lỗi server
 */
router.get('/:target_type/:target_id', getLikesByTarget)

/**
 * @swagger
 * /likes/count/{target_type}/{target_id}:
 *   get:
 *     summary: Đếm số lượng like của target
 *     tags: [Likes]
 *     parameters:
 *       - in: path
 *         name: target_type
 *         required: true
 *         schema:
 *           type: string
 *           enum: [post, comment]
 *       - in: path
 *         name: target_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Số lượng likes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *                   example: 42
 *       500:
 *         description: Lỗi server
 */
router.get('/count/:target_type/:target_id', countLikes)

export default router
