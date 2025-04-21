import { Request, Response } from 'express'
import Post from '~/models/post.model'

export const createPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { user_id, media, description } = req.body
    const post = await Post.create({ user_id, media, description, created_at: new Date() })
    res.status(201).json(post)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export const getPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const post = await Post.findByPk(req.params.id)
    if (post) res.status(200).json(post)
    else res.status(404).json({ message: 'Post not found' })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export const getPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const posts = await Post.findAll()
    res.status(200).json(posts)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export const updatePost = async (req: Request, res: Response): Promise<void> => {
  try {
    const [updated] = await Post.update(req.body, { where: { id: req.params.id } })
    if (updated) {
      const updatedPost = await Post.findByPk(req.params.id)
      res.status(200).json(updatedPost)
    } else {
      res.status(404).json({ message: 'Post not found' })
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export const deletePost = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted = await Post.destroy({ where: { id: req.params.id } })
    if (deleted) res.status(200).json({ message: 'Post deleted' })
    else res.status(404).json({ message: 'Post not found' })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

