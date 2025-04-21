import { Request, Response } from 'express'
import Report from '../models/report.model'

export const createReport = async (req: Request, res: Response): Promise<void> => {
  try {
    const { target_id, target_type, user_id, reason, status } = req.body

    const report = await Report.create({
      target_id,
      target_type,
      user_id,
      reason,
      status,
      created_at: new Date()
    })

    res.status(201).json(report)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export const getAllReports = async (_req: Request, res: Response): Promise<void> => {
  try {
    const reports = await Report.findAll()
    res.status(200).json(reports)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export const getReportById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    const report = await Report.findByPk(id)
    if (report) {
      res.status(200).json(report)
    } else {
      res.status(404).json({ message: 'Report not found' })
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export const updateReportStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    const { status } = req.body

    const report = await Report.findByPk(id)
    if (!report) {
      res.status(404).json({ message: 'Report not found' })
      return
    }

    report.status = status
    await report.save()

    res.status(200).json(report)
  } catch (error: any) {
    console.error(error)
    res.status(500).json({ message: error.message })
  }
}

export const deleteReport = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params

    const deleted = await Report.destroy({ where: { id } })
    if (deleted) {
      res.status(200).json({ message: 'Report deleted' })
    } else {
      res.status(404).json({ message: 'Report not found' })
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

