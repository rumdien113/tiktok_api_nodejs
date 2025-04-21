import { Router } from 'express';
import * as tagCtr from '~/controllers/tag.controller';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Tags
 *   description: API endpoints for managing tags
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Tag:
 *       type: object
 *       required:
 *         - id
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Unique identifier for the tag
 *           example: "8f8c3169-10c4-457b-89b0-6acb8fd5fc6b"
 *         name:
 *           type: string
 *           maxLength: 50
 *           description: Name of the tag
 *           example: "javascript"
 *     TagCreate:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           maxLength: 50
 *           description: Name of the tag
 *           example: "typescript"
 */

/**
 * @swagger
 * /tags:
 *   get:
 *     summary: Retrieve a list of tags
 *     tags: [Tags]
 *     responses:
 *       200:
 *         description: A list of tags
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Tag'
 */
router.get('/tags', tagCtr.getAllTags);

/**
 * @swagger
 * /tags/{id}:
 *   get:
 *     summary: Retrieve a tag by ID
 *     tags: [Tags]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: UUID of the tag
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Tag found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tag'
 *       404:
 *         description: Tag not found
 */
router.get('/tags/:id', tagCtr.getTagById);

/**
 * @swagger
 * /tags:
 *   post:
 *     summary: Create a new tag
 *     tags: [Tags]
 *     requestBody:
 *       description: Tag object to create
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TagCreate'
 *     responses:
 *       201:
 *         description: Tag created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tag'
 *       500:
 *         description: Internal server error
 */
router.post('/tags', tagCtr.createTag);

/**
 * @swagger
 * /tags/{id}:
 *   put:
 *     summary: Update an existing tag
 *     tags: [Tags]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: UUID of the tag to update
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       description: Tag object with updated data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TagCreate'
 *     responses:
 *       200:
 *         description: Tag updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tag'
 *       404:
 *         description: Tag not found
 *       500:
 *         description: Internal server error
 */
router.put('/tags/:id', tagCtr.updateTag);

/**
 * @swagger
 * /tags/{id}:
 *   delete:
 *     summary: Delete a tag by ID
 *     tags: [Tags]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: UUID of the tag to delete
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Tag deleted successfully
 *       404:
 *         description: Tag not found
 *       500:
 *         description: Internal server error
 */
router.delete('/tags/:id', tagCtr.deleteTag);

export default router;
