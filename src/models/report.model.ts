// src/models/report.model.ts
import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '~/config/database';
import { IReport } from '~/types/entities';
import User from './user.model';

interface ReportCreationAttributes extends Optional<IReport, 'id'> { }

class Report extends Model<IReport, ReportCreationAttributes> implements IReport {
  public id!: string;
  public target_id!: string;
  public target_type!: string;
  public user_id!: string;
  public reason!: string;
  public status!: string;
  public created_at!: Date;
}

/**
 * @swagger
 * components:
 *   schemas:
 *     Report:
 *       type: object
 *       required:
 *         - id
 *         - target_id
 *         - target_type
 *         - user_id
 *         - reason
 *         - status
 *         - created_at
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "a9de9871-7aaf-4d1b-bd7d-3cd69c142bfd"
 *         target_id:
 *           type: string
 *           format: uuid
 *           description: ID của đối tượng bị báo cáo
 *           example: "post-abc-123"
 *         target_type:
 *           type: string
 *           enum: [post, comment, user]
 *           description: Kiểu đối tượng bị báo cáo
 *           example: "comment"
 *         user_id:
 *           type: string
 *           format: uuid
 *           description: ID người báo cáo
 *           example: "user-xyz-789"
 *         reason:
 *           type: string
 *           maxLength: 255
 *           description: Lý do báo cáo
 *           example: "Nội dung phản cảm hoặc spam"
 *         status:
 *           type: string
 *           enum: [pending, resolved, rejected]
 *           description: Trạng thái xử lý báo cáo
 *           example: "pending"
 *         created_at:
 *           type: string
 *           format: date-time
 *           example: "2025-04-21T14:00:00.000Z"
 *
 *     ReportCreate:
 *       type: object
 *       required:
 *         - target_id
 *         - target_type
 *         - user_id
 *         - reason
 *       properties:
 *         target_id:
 *           type: string
 *           format: uuid
 *           example: "user-abc-123"
 *         target_type:
 *           type: string
 *           enum: [post, comment, user]
 *           example: "user"
 *         user_id:
 *           type: string
 *           format: uuid
 *           example: "user-xyz-789"
 *         reason:
 *           type: string
 *           example: "Ngôn từ thù ghét"
 */

Report.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    target_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    target_type: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        isIn: [['post', 'comment', 'user']]
      }
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    reason: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    status: {
      type: DataTypes.STRING(20),
      allowNull: false
    }
  },
  {
    sequelize,
    tableName: 'reports',      // tên bảng trong DB
    modelName: 'Report',       // tên model trong Sequelize
    underscored: true,         // dùng created_at thay vì createdAt
    timestamps: false          // đã tự định nghĩa created_at, không dùng createdAt/updatedAt
  }
);

// Association: mỗi report được tạo bởi một user
Report.belongsTo(User, { foreignKey: 'user_id', as: 'reporter' });
User.hasMany(Report, { foreignKey: 'user_id', as: 'reports' });

export default Report;
