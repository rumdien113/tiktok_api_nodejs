import { Request, Response } from "express"
import Comment from "~/models/comment.model"

export const createComment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { post_id, user_id, parent_comment_id, content } = req.body
    const comment = await Comment.create({ post_id, user_id, parent_comment_id, content, created_at: new Date() })
    res.status(201).json(comment)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export const getComment = async (req: Request, res: Response): Promise<void> => {
  try {
    const comment = await Comment.findByPk(req.params.id)
    if (comment) res.status(200).json(comment)
    else res.status(404).json({ message: 'Comment not found' })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export const getComments = async (req: Request, res: Response): Promise<void> => {
  try {
    const comments = await Comment.findAll()
    res.status(200).json(comments)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export const getCommentsByPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const postId = req.params.postId
    const comments = await Comment.findAll({ where: { post_id: postId } })
    res.status(200).json(comments)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export const updateComment = async (req: Request, res: Response): Promise<void> => {
  try {
    const [updated] = await Comment.update(req.body, { where: { id: req.params.id } })
    if (updated) {
      const updatedComment = await Comment.findByPk(req.params.id)
      res.status(200).json(updatedComment)
    } else {
      res.status(404).json({ message: 'Comment not found' })
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export const deleteComment = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted = await Comment.destroy({ where: { id: req.params.id } })
    if (deleted) res.status(200).json({ message: 'Comment deleted' })
    else res.status(404).json({ message: 'Comment not found' })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}
