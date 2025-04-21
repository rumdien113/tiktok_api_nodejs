import { Router } from 'express'
import {
  addTagToPost,
  removeTagFromPost,
  getTagsOfPost,
  getPostsByTag
} from '../controllers/post_tag.controller'

const router: Router = Router()

/**
 * @swagger
 * /post-tags:
 *   post:
 *     summary: Add a tag to a post
 *     tags:
 *       - PostTags
 *     requestBody:
 *       description: Provide post_id and tag_id to add tag to a post
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - post_id
 *               - tag_id
 *             properties:
 *               post_id:
 *                 type: string
 *               tag_id:
 *                 type: string
 *     responses:
 *       201:
 *         description: Tag added to post successfully
 *       409:
 *         description: Tag already added to post
 *       500:
 *         description: Internal server error
 */
router.post('/', addTagToPost)

/**
 * @swagger
 * /post-tags:
 *   delete:
 *     summary: Remove a tag from a post
 *     tags:
 *       - PostTags
 *     requestBody:
 *       description: Provide post_id and tag_id to remove tag from a post
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - post_id
 *               - tag_id
 *             properties:
 *               post_id:
 *                 type: string
 *               tag_id:
 *                 type: string
 *     responses:
 *       200:
 *         description: Tag removed from post successfully
 *       404:
 *         description: Tag not found for post
 *       500:
 *         description: Internal server error
 */
router.delete('/', removeTagFromPost)

/**
 * @swagger
 * /post-tags/post/{post_id}:
 *   get:
 *     summary: Get tags of a specific post
 *     tags:
 *       - PostTags
 *     parameters:
 *       - in: path
 *         name: post_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the post
 *     responses:
 *       200:
 *         description: List of tags for the post
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Internal server error
 */
router.get('/post/:post_id', getTagsOfPost)

/**
 * @swagger
 * /post-tags/tag/{tag_id}:
 *   get:
 *     summary: Get posts associated with a specific tag
 *     tags:
 *       - PostTags
 *     parameters:
 *       - in: path
 *         name: tag_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the tag
 *     responses:
 *       200:
 *         description: List of posts that have this tag
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Internal server error
 */
router.get('/tag/:tag_id', getPostsByTag)

export default router
