import { Router } from 'express'
import {
  createFollow,
  deleteFollow,
  getFollowers,
  getFollowing
} from '../controllers/follow.controller'

const router: Router = Router()

/**
 * @swagger
 * tags:
 *   name: Follows
 *   description: Quản lý follow/unfollow
 */

/**
 * @swagger
 * /follows:
 *   post:
 *     summary: Theo dõi một người dùng
 *     tags: [Follows]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FollowCreate'
 *     responses:
 *       201:
 *         description: Theo dõi thành công
 *       409:
 *         description: Đã theo dõi trước đó
 *       400:
 *         description: Không thể tự theo dõi bản thân
 *       500:
 *         description: Lỗi server
 */
router.post('/', createFollow)

/**
 * @swagger
 * /follows:
 *   delete:
 *     summary: Bỏ theo dõi người dùng
 *     tags: [Follows]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FollowCreate'
 *     responses:
 *       200:
 *         description: Bỏ theo dõi thành công
 *       404:
 *         description: Quan hệ theo dõi không tồn tại
 *       500:
 *         description: Lỗi server
 */
router.delete('/', deleteFollow)

/**
 * @swagger
 * /follows/followers/{userId}:
 *   get:
 *     summary: Lấy danh sách người theo dõi
 *     tags: [Follows]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID của người được theo dõi
 *     responses:
 *       200:
 *         description: Danh sách followers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Follow'
 *       500:
 *         description: Lỗi server
 */
router.get('/followers/:userId', getFollowers)

/**
 * @swagger
 * /follows/following/{userId}:
 *   get:
 *     summary: Lấy danh sách người đang theo dõi
 *     tags: [Follows]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID của người theo dõi
 *     responses:
 *       200:
 *         description: Danh sách following
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Follow'
 *       500:
 *         description: Lỗi server
 */
router.get('/following/:userId', getFollowing)

export default router
