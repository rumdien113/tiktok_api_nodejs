import { Request, Response } from 'express';
import Tag from '~/models/tag.model';

export const getAllTags = async (_req: Request, res: Response): Promise<void> => {
  try {
    const tags = await Tag.findAll();
    res.status(200).json(tags);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const getTagById = async (req: Request, res: Response): Promise<void> => {
  try {
    const tag = await Tag.findByPk(req.params.id);
    if (tag) res.status(200).json(tag);
    else res.status(404).json({ message: 'Tag not found' });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const createTag = async (req: Request, res: Response): Promise<void> => {
  try {
    const tag = await Tag.create({ name: req.body.name });
    res.status(201).json(tag);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const updateTag = async (req: Request, res: Response): Promise<void> => {
  try {
    const [count] = await Tag.update({ name: req.body.name }, { where: { id: req.params.id } });
    if (count) {
      const updated = await Tag.findByPk(req.params.id);
      res.status(200).json(updated);
    } else {
      res.status(404).json({ message: 'Tag not found' });
    }
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteTag = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted = await Tag.destroy({ where: { id: req.params.id } });
    if (deleted) res.status(200).json({ message: 'Tag deleted' });
    else res.status(404).json({ message: 'Tag not found' });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

