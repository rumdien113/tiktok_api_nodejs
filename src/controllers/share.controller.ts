import { Request, Response } from 'express';
import Share from '~/models/share.model';

export const getAllShares = async (_req: Request, res: Response): Promise<void> => {
  try {
    const shares = await Share.findAll();
    res.status(200).json(shares);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getShareById = async (req: Request, res: Response): Promise<void> => {
  try {
    const share = await Share.findByPk(req.params.id);
    if (!share) {
      res.status(404).json({ message: 'Share not found' });
    } else {
      res.status(200).json(share);
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createShare = async (req: Request, res: Response): Promise<void> => {
  try {
    const { user_id, post_id } = req.body;
    const share = await Share.create({ user_id, post_id, created_at: new Date() });
    res.status(201).json(share);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteShare = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted = await Share.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.status(200).json({ message: 'Deleted successfully' });
    } else {
      res.status(404).json({ message: 'Share not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

