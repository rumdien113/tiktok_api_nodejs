import { DataTypes, Model, Optional } from "sequelize"
import sequelize from "~/config/database"
import { IPost } from "~/types/entities"
import User from './user.model'

interface PostCreationAttributes extends Optional<IPost, 'id'> { }

class Post extends Model<IPost, PostCreationAttributes> implements IPost {
  public id!: string
  public user_id!: string
  public media?: string
  public description?: string
  public created_at!: Date
  public updated_at?: Date
}

/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *         - id
 *         - user_id
 *         - created_at
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "post-abc-123"
 *         user_id:
 *           type: string
 *           format: uuid
 *           description: ID người đăng bài
 *           example: "user-xyz-456"
 *         media:
 *           type: string
 *           format: uri
 *           nullable: true
 *           description: URL hình ảnh hoặc video
 *           example: "https://example.com/image.jpg"
 *         description:
 *           type: string
 *           nullable: true
 *           description: Nội dung mô tả bài viết
 *           example: "Hôm nay trời đẹp quá!"
 *         created_at:
 *           type: string
 *           format: date-time
 *           example: "2025-04-20T08:45:00.000Z"
 *         updated_at:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           example: "2025-04-21T10:00:00.000Z"
 *
 *     PostCreate:
 *       type: object
 *       required:
 *         - user_id
 *       properties:
 *         user_id:
 *           type: string
 *           format: uuid
 *           example: "user-xyz-456"
 *         media:
 *           type: string
 *           format: uri
 *           example: "https://example.com/image.jpg"
 *         description:
 *           type: string
 *           example: "Mô tả bài viết..."
 */

Post.init(
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
    media: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  },
  {
    tableName: 'posts',
    sequelize,
    timestamps: false
  }
)

Post.belongsTo(User, { foreignKey: 'user_id' })

export default Post
