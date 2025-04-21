import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '~/config/database'
import { IShare } from '~/types/entities'
import User from './user.model'
import Post from './post.model'

interface ShareCreationAttributes extends Optional<IShare, 'id'> { }

class Share extends Model<IShare, ShareCreationAttributes> implements IShare {
  public id!: string
  public user_id!: string
  public post_id!: string
  public created_at!: Date
}

/**
 * @swagger
 * components:
 *   schemas:
 *     Share:
 *       type: object
 *       required:
 *         - id
 *         - user_id
 *         - post_id
 *         - created_at
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: ID của lượt chia sẻ
 *           example: "bfdbda1d-1b02-4a38-9a17-e5461db338a9"
 *         user_id:
 *           type: string
 *           format: uuid
 *           description: ID người dùng đã chia sẻ bài viết
 *           example: "user-abc-123"
 *         post_id:
 *           type: string
 *           format: uuid
 *           description: ID bài viết được chia sẻ
 *           example: "post-xyz-456"
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Ngày chia sẻ
 *           example: "2025-04-21T09:15:00.000Z"
 *
 *     ShareCreate:
 *       type: object
 *       required:
 *         - user_id
 *         - post_id
 *       properties:
 *         user_id:
 *           type: string
 *           format: uuid
 *           example: "user-abc-123"
 *         post_id:
 *           type: string
 *           format: uuid
 *           example: "post-xyz-456"
 */

Share.init(
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
    post_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'posts',
        key: 'id'
      }
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  },
  {
    tableName: 'shares',
    sequelize,
    timestamps: false
  }
)

// Define associations
Share.belongsTo(User, { foreignKey: 'user_id' })
Share.belongsTo(Post, { foreignKey: 'post_id' })

export default Share
