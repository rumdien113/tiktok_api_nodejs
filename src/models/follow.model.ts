import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '~/config/database'
import { IFollow } from '~/types/entities'
import User from './user.model'

interface FollowCreationAttributes extends Optional<IFollow, 'id'> { }

class Follow extends Model<IFollow, FollowCreationAttributes> implements IFollow {
  public id!: string
  public follower_id!: string
  public followed_id!: string
  public created_at!: Date
}

/**
 * @swagger
 * components:
 *   schemas:
 *     Follow:
 *       type: object
 *       required:
 *         - id
 *         - follower_id
 *         - followed_id
 *         - created_at
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "a12b3c4d-5678-9101-1121-314151617181"
 *         follower_id:
 *           type: string
 *           format: uuid
 *           description: ID người theo dõi (người chủ động follow)
 *           example: "user-1234-abcd-5678"
 *         followed_id:
 *           type: string
 *           format: uuid
 *           description: ID người được theo dõi
 *           example: "user-5678-efgh-1234"
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Thời gian bắt đầu follow
 *           example: "2025-04-21T08:30:00.000Z"
 *
 *     FollowCreate:
 *       type: object
 *       required:
 *         - follower_id
 *         - followed_id
 *       properties:
 *         follower_id:
 *           type: string
 *           format: uuid
 *           description: ID người theo dõi
 *           example: "user-1234-abcd-5678"
 *         followed_id:
 *           type: string
 *           format: uuid
 *           description: ID người được theo dõi
 *           example: "user-5678-efgh-1234"
 */

Follow.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    follower_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    followed_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
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
    tableName: 'follows',
    sequelize,
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ['follower_id', 'followed_id']
      }
    ]
  }
)

// Define associations
Follow.belongsTo(User, { foreignKey: 'follower_id', as: 'Follower' })
Follow.belongsTo(User, { foreignKey: 'followed_id', as: 'Followed' })

export default Follow
