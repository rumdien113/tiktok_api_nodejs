import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '~/config/database'
import { IUser } from '~/types/entities'

interface UserCreationAttributes extends Optional<IUser, 'id'> { }

class User extends Model<IUser, UserCreationAttributes> implements IUser {
  public id!: string
  public username!: string
  public email!: string
  public password!: string
  public firstname?: string
  public lastname?: string
  public birthdate?: Date
  public phone?: string
  public gender?: string
  public avatar?: string
  public bio?: string
  public created_at!: Date
  public updated_at?: Date
}

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - id
 *         - username
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: ID người dùng
 *           example: "0c4a53be-1b2f-4c36-a561-70e5c9c4f723"
 *         username:
 *           type: string
 *           maxLength: 128
 *           description: Tên người dùng (duy nhất)
 *           example: "john_doe"
 *         email:
 *           type: string
 *           format: email
 *           maxLength: 128
 *           description: Email (duy nhất)
 *           example: "john@example.com"
 *         password:
 *           type: string
 *           format: password
 *           description: Mật khẩu đã được mã hóa
 *           example: "$2b$10$0qU6Uez..."
 *         firstname:
 *           type: string
 *           maxLength: 128
 *           description: Tên
 *           example: "John"
 *         lastname:
 *           type: string
 *           maxLength: 128
 *           description: Họ
 *           example: "Doe"
 *         birthdate:
 *           type: string
 *           format: date
 *           description: Ngày sinh
 *           example: "1990-05-15"
 *         phone:
 *           type: string
 *           maxLength: 15
 *           description: Số điện thoại
 *           example: "0905123456"
 *         gender:
 *           type: string
 *           enum: [male, female, other]
 *           description: Giới tính
 *           example: "male"
 *         avatar:
 *           type: string
 *           maxLength: 255
 *           description: URL ảnh đại diện
 *           example: "https://example.com/avatar.jpg"
 *         bio:
 *           type: string
 *           description: Tiểu sử
 *           example: "I love coding and exploring new tech."
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Ngày tạo tài khoản
 *           example: "2025-04-21T15:30:00.000Z"
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: Ngày cập nhật cuối
 *           example: "2025-04-22T10:00:00.000Z"
 *
 *     UserCreate:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           example: "new_user"
 *         email:
 *           type: string
 *           example: "new_user@example.com"
 *         password:
 *           type: string
 *           example: "strong_password123"
 *         firstname:
 *           type: string
 *           example: "New"
 *         lastname:
 *           type: string
 *           example: "User"
 *         birthdate:
 *           type: string
 *           format: date
 *           example: "2000-01-01"
 *         phone:
 *           type: string
 *           example: "0987654321"
 *         gender:
 *           type: string
 *           enum: [male, female, other]
 *           example: "other"
 *         avatar:
 *           type: string
 *           example: "https://example.com/default-avatar.png"
 *         bio:
 *           type: string
 *           example: "This is a new user."
 */

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING(128),
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING(128),
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    firstname: {
      type: DataTypes.STRING(128),
      allowNull: true
    },
    lastname: {
      type: DataTypes.STRING(128),
      allowNull: true
    },
    birthdate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    gender: {
      type: DataTypes.ENUM('male', 'female', 'other'),
      allowNull: true
    },
    avatar: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  },
  {
    tableName: 'users',
    sequelize,
    timestamps: false

  }
)

export default User
