import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '~/config/database'
import { ILike } from '~/types/entities'
import User from './user.model'

interface LikeCreationAttributes extends Optional<ILike, 'id'> { }

class Like extends Model<ILike, LikeCreationAttributes> implements ILike {
  public id!: string
  public user_id!: string
  public target_id!: string
  public target_type!: string
  public created_at!: Date
}

/**
 * @swagger
 * components:
 *   schemas:
 *     Like:
 *       type: object
 *       required:
 *         - id
 *         - user_id
 *         - target_id
 *         - target_type
 *         - created_at
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "3a9f7c9d-1234-4f50-b2e3-56789abcd012"
 *         user_id:
 *           type: string
 *           format: uuid
 *           description: ID của người dùng đã like
 *           example: "user-abc-123"
 *         target_id:
 *           type: string
 *           format: uuid
 *           description: ID của bài viết hoặc bình luận được like
 *           example: "post-xyz-789"
 *         target_type:
 *           type: string
 *           enum: [post, comment]
 *           description: Kiểu đối tượng được like
 *           example: "post"
 *         created_at:
 *           type: string
 *           format: date-time
 *           example: "2025-04-21T09:30:00.000Z"
 *
 *     LikeCreate:
 *       type: object
 *       required:
 *         - user_id
 *         - target_id
 *         - target_type
 *       properties:
 *         user_id:
 *           type: string
 *           format: uuid
 *           example: "user-abc-123"
 *         target_id:
 *           type: string
 *           format: uuid
 *           example: "comment-xyz-789"
 *         target_type:
 *           type: string
 *           enum: [post, comment]
 *           example: "comment"
 */

Like.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    target_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    target_type: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        isIn: [['post', 'comment']]
      }
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  },
  {
    tableName: 'likes',
    sequelize,
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ['user_id', 'target_id', 'target_type']
      }
    ]
  }
)

// Define associations
Like.belongsTo(User, { foreignKey: 'user_id' })

export default Like
