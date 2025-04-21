import { Request, Response } from 'express'
import Follow from '../models/follow.model'

export const createFollow = async (req: Request, res: Response): Promise<void> => {
  try {
    const { follower_id, followed_id } = req.body
    if (follower_id === followed_id) {
      res.status(400).json({ message: 'Cannot follow yourself' })
      return
    }

    const [follow, created] = await Follow.findOrCreate({
      where: { follower_id, followed_id }
    })

    if (!created) {
      res.status(409).json({ message: 'Already following' })
    } else {
      res.status(201).json(follow)
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export const deleteFollow = async (req: Request, res: Response): Promise<void> => {
  try {
    const { follower_id, followed_id } = req.body
    const deleted = await Follow.destroy({
      where: { follower_id, followed_id }
    })

    if (deleted) {
      res.status(200).json({ message: 'Unfollowed successfully' })
    } else {
      res.status(404).json({ message: 'Follow relationship not found' })
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export const getFollowers = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params
    const followers = await Follow.findAll({
      where: { followed_id: userId }
    })
    res.status(200).json(followers)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export const getFollowing = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params
    const following = await Follow.findAll({
      where: { follower_id: userId }
    })
    res.status(200).json(following)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

