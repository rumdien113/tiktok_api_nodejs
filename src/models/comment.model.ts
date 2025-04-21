import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '~/config/database'
import { IComment } from '~/types/entities'
import User from './user.model'
import Post from './post.model'

interface CommentCreationAttributes extends Optional<IComment, 'id'> { }

class Comment extends Model<IComment, CommentCreationAttributes> implements IComment {
  public id!: string
  public post_id!: string
  public user_id!: string
  public parent_comment_id?: string
  public content!: string
  public created_at!: Date
  public updated_at?: Date
}

/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       required:
 *         - id
 *         - post_id
 *         - user_id
 *         - content
 *         - created_at
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         post_id:
 *           type: string
 *           format: uuid
 *         user_id:
 *           type: string
 *           format: uuid
 *         parent_comment_id:
 *           type: string
 *           format: uuid
 *           nullable: true
 *         content:
 *           type: string
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *           nullable: true
 *     CommentCreate:
 *       type: object
 *       required:
 *         - post_id
 *         - user_id
 *         - content
 *       properties:
 *         post_id:
 *           type: string
 *           format: uuid
 *         user_id:
 *           type: string
 *           format: uuid
 *         parent_comment_id:
 *           type: string
 *           format: uuid
 *           nullable: true
 *         content:
 *           type: string
 */

Comment.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    post_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'posts',
        key: 'id'
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
    parent_comment_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'comments',
        key: 'id'
      }
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
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
    tableName: 'comments',
    sequelize,
    timestamps: false
  }
)

// Define associations
Comment.belongsTo(User, { foreignKey: 'user_id' })
Comment.belongsTo(Post, { foreignKey: 'post_id' })
Comment.belongsTo(Comment, { foreignKey: 'parent_comment_id', as: 'ParentComment' })
Comment.hasMany(Comment, { foreignKey: 'parent_comment_id', as: 'Replies' })

export default Comment
