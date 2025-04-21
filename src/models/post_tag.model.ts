import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '~/config/database'
import { IPostTag } from '~/types/entities'
import Post from './post.model'
import Tag from './tag.model'

interface PostTagCreationAttributes extends Optional<IPostTag, 'id'> { }

class PostTag extends Model<IPostTag, PostTagCreationAttributes> implements IPostTag {
  public id!: string
  public post_id!: string
  public tag_id!: string
}

/**
 * @swagger
 * components:
 *   schemas:
 *     PostTag:
 *       type: object
 *       required:
 *         - id
 *         - post_id
 *         - tag_id
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: ID định danh của post-tag
 *           example: "c1a5c940-5bda-4d2e-b3cf-87fd05db0cf3"
 *         post_id:
 *           type: string
 *           format: uuid
 *           description: ID của bài viết
 *           example: "post-abc-123"
 *         tag_id:
 *           type: string
 *           format: uuid
 *           description: ID của tag
 *           example: "tag-xyz-456"
 *
 *     PostTagCreate:
 *       type: object
 *       required:
 *         - post_id
 *         - tag_id
 *       properties:
 *         post_id:
 *           type: string
 *           format: uuid
 *           example: "post-abc-123"
 *         tag_id:
 *           type: string
 *           format: uuid
 *           example: "tag-xyz-456"
 */

PostTag.init(
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
    tag_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'tags',
        key: 'id'
      }
    }
  },
  {
    tableName: 'post_tags',
    sequelize,
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ['post_id', 'tag_id']
      }
    ]
  }
)

// Define associations
PostTag.belongsTo(Post, { foreignKey: 'post_id' })
PostTag.belongsTo(Tag, { foreignKey: 'tag_id' })

export default PostTag
