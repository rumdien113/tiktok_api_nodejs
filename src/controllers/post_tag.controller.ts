import { Request, Response } from 'express'
import PostTag from '../models/post_tag.model'

export const addTagToPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { post_id, tag_id } = req.body

    const [postTag, created] = await PostTag.findOrCreate({
      where: { post_id, tag_id }
    })

    if (!created) {
      res.status(409).json({ message: 'Tag already added to post' })
    } else {
      res.status(201).json(postTag)
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export const removeTagFromPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { post_id, tag_id } = req.body

    const deleted = await PostTag.destroy({
      where: { post_id, tag_id }
    })

    if (deleted) {
      res.status(200).json({ message: 'Tag removed from post successfully' })
    } else {
      res.status(404).json({ message: 'Tag not found for post' })
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export const getTagsOfPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { post_id } = req.params

    const postTags = await PostTag.findAll({ where: { post_id } })

    res.status(200).json(postTags)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export const getPostsByTag = async (req: Request, res: Response): Promise<void> => {
  try {
    const { tag_id } = req.params

    const postTags = await PostTag.findAll({ where: { tag_id } })

    res.status(200).json(postTags)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

