import { Request, Response } from 'express'
import Like from '../models/like.model'

export const createLike = async (req: Request, res: Response): Promise<void> => {
  try {
    const { user_id, target_id, target_type } = req.body

    const [like, created] = await Like.findOrCreate({
      where: { user_id, target_id, target_type }
    })

    if (!created) {
      res.status(409).json({ message: 'Already liked' })
    } else {
      res.status(201).json(like)
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export const deleteLike = async (req: Request, res: Response): Promise<void> => {
  try {
    const { user_id, target_id, target_type } = req.body

    const deleted = await Like.destroy({
      where: { user_id, target_id, target_type }
    })

    if (deleted) {
      res.status(200).json({ message: 'Like removed successfully' })
    } else {
      res.status(404).json({ message: 'Like not found' })
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export const getLikesByTarget = async (req: Request, res: Response): Promise<void> => {
  try {
    const { target_id, target_type } = req.params

    const likes = await Like.findAll({
      where: { target_id, target_type }
    })

    res.status(200).json(likes)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export const countLikes = async (req: Request, res: Response): Promise<void> => {
  try {
    const { target_id, target_type } = req.params

    const count = await Like.count({
      where: { target_id, target_type }
    })

    res.status(200).json({ count })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

