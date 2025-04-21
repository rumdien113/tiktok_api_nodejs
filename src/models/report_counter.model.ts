import { DataTypes, Model } from 'sequelize';
import sequelize from '~/config/database';
import { IReportCounter } from '~/types/entities';

class ReportCounter extends Model<IReportCounter> implements IReportCounter {
  public target_id!: string;
  public target_type!: string;
  public count!: number;
  public updated_at!: Date;
}

/**
 * @swagger
 * components:
 *   schemas:
 *     ReportCounter:
 *       type: object
 *       required:
 *         - target_id
 *         - target_type
 *         - count
 *         - updated_at
 *       properties:
 *         target_id:
 *           type: string
 *           format: uuid
 *           description: ID của đối tượng bị báo cáo
 *           example: "c1a5c940-5bda-4d2e-b3cf-87fd05db0cf3"
 *         target_type:
 *           type: string
 *           enum: [post, comment, user]
 *           description: Loại đối tượng bị báo cáo
 *           example: "post"
 *         count:
 *           type: integer
 *           description: Số lượt báo cáo
 *           example: 5
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: Ngày cập nhật cuối cùng
 *           example: "2025-04-21T14:00:00.000Z"
 */

ReportCounter.init(
  {
    target_id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    target_type: {
      type: DataTypes.STRING(20),
      primaryKey: true
    },
    count: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    updated_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW }
  },
  {
    sequelize,
    tableName: 'report_counters',
    modelName: 'ReportCounter',
    underscored: true,
    timestamps: false
  }
);

export default ReportCounter;

