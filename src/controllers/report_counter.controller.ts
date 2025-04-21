import { Request, Response } from 'express';
import ReportCounter from '~/models/report_counter.model';

export const getAllReportCounters = async (_req: Request, res: Response): Promise<void> => {
  try {
    const counters = await ReportCounter.findAll();
    res.status(200).json(counters);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getReportCounter = async (req: Request, res: Response): Promise<void> => {
  try {
    const { target_id, target_type } = req.params;
    const counter = await ReportCounter.findOne({ where: { target_id, target_type } });
    if (!counter) {
      res.status(404).json({ message: 'ReportCounter not found' });
    } else {
      res.status(200).json(counter);
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const upsertReportCounter = async (req: Request, res: Response): Promise<void> => {
  try {
    const { target_id, target_type, count } = req.body;
    const [counter, created] = await ReportCounter.upsert({
      target_id,
      target_type,
      count,
      updated_at: new Date()
    });
    res.status(created ? 201 : 200).json(counter);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteReportCounter = async (req: Request, res: Response): Promise<void> => {
  try {
    const { target_id, target_type } = req.params;
    const deleted = await ReportCounter.destroy({ where: { target_id, target_type } });
    if (deleted) {
      res.status(200).json({ message: 'Deleted successfully' });
    } else {
      res.status(404).json({ message: 'ReportCounter not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
