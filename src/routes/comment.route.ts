import { Router } from 'express'
import {
  createComment,
  getComment,
  getComments,
  getCommentsByPost,
  updateComment,
  deleteComment
} from '../controllers/comment.controller'

const router: Router = Router()

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: Quản lý bình luận
 */

/**
 * @swagger
 * /comments:
 *   post:
 *     summary: Tạo bình luận mới
 *     tags: [Comments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CommentCreate'
 *     responses:
 *       201:
 *         description: Bình luận được tạo thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       500:
 *         description: Lỗi server
 */
router.post('/', createComment)

/**
 * @swagger
 * /comments:
 *   get:
 *     summary: Lấy tất cả bình luận
 *     tags: [Comments]
 *     responses:
 *       200:
 *         description: Danh sách bình luận
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 *       500:
 *         description: Lỗi server
 */
router.get('/', getComments)

/**
 * @swagger
 * /comments/post/{postId}:
 *   get:
 *     summary: Lấy bình luận theo bài viết
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID của bài viết
 *     responses:
 *       200:
 *         description: Danh sách bình luận cho bài viết
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 *       500:
 *         description: Lỗi server
 */
router.get('/post/:postId', getCommentsByPost)

/**
 * @swagger
 * /comments/{id}:
 *   get:
 *     summary: Lấy chi tiết một bình luận
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID của bình luận
 *     responses:
 *       200:
 *         description: Thông tin bình luận
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       404:
 *         description: Bình luận không tồn tại
 *       500:
 *         description: Lỗi server
 */
router.get('/:id', getComment)

/**
 * @swagger
 * /comments/{id}:
 *   put:
 *     summary: Cập nhật bình luận
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID của bình luận cần cập nhật
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       404:
 *         description: Bình luận không tồn tại
 *       500:
 *         description: Lỗi server
 */
router.put('/:id', updateComment)

/**
 * @swagger
 * /comments/{id}:
 *   delete:
 *     summary: Xóa bình luận
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID của bình luận cần xóa
 *     responses:
 *       200:
 *         description: Xóa thành công
 *       404:
 *         description: Bình luận không tồn tại
 *       500:
 *         description: Lỗi server
 */
router.delete('/:id', deleteComment)

export default router
