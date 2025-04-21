import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '~/config/database'
import { ITag } from '~/types/entities'

interface TagCreationAttributes extends Optional<ITag, 'id'> { }

class Tag extends Model<ITag, TagCreationAttributes> implements ITag {
  public id!: string
  public name!: string
}

/**
 * @swagger
 * components:
 *   schemas:
 *     Tag:
 *       type: object
 *       required:
 *         - id
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: ID của tag
 *           example: "8f8c3169-10c4-457b-89b0-6acb8fd5fc6b"
 *         name:
 *           type: string
 *           maxLength: 50
 *           description: Tên tag
 *           example: "javascript"
 *
 *     TagCreate:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           example: "typescript"
 */

Tag.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    }
  },
  {
    tableName: 'tags',
    sequelize,
    timestamps: false
  }
)

export default Tag
