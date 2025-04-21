const swaggerAutogen = require('swagger-autogen')({
  openapi: '3.0.0',
  autoHeaders: false,
  autoQuery: true,
  autoResponses: true
});

const doc = {
  info: {
    title: 'Social Network API',
    version: '1.0.0',
    description: 'API Documentation for Social Network Application with MySQL'
  },
  host: process.env.HOST || 'localhost:3000',
  basePath: '/api',
  schemes: ['http', 'https'],
  consumes: ['application/json'],
  produces: ['application/json'],
  securityDefinitions: {
    bearerAuth: {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT'
    }
  },
  tags: [
    { name: 'Users', description: 'Quản lý người dùng' },
    { name: 'Posts', description: 'Quản lý bài viết' },
    { name: 'Comments', description: 'Quản lý bình luận' },
    { name: 'Likes', description: 'Quản lý lượt thích' },
    { name: 'Follows', description: 'Quản lý theo dõi' },
    { name: 'Reports', description: 'Quản lý báo cáo' },
    { name: 'Tags', description: 'Quản lý tags' }
  ],
  definitions: {
    // User
    User: {
      $username: "username123",
      $email: "user@example.com",
      password: "P@ssw0rd123",
      avatar: "http://example.com/avatar.jpg",
      bio: "Giới thiệu về người dùng",
      isAdmin: false,
      createdAt: "2023-01-01T00:00:00.000Z",
      updatedAt: "2023-01-01T00:00:00.000Z"
    },

    // Post
    Post: {
      $content: "Nội dung bài viết...",
      $userId: 1,
      mediaUrl: "http://example.com/image.jpg",
      isPublished: true,
      createdAt: "2023-01-01T00:00:00.000Z"
    },

    // Comment
    Comment: {
      $content: "Nội dung bình luận...",
      $userId: 1,
      $postId: 1,
      createdAt: "2023-01-01T00:00:00.000Z"
    },

    // Like
    Like: {
      $userId: 1,
      $targetId: 1,
      targetType: "POST", // POST | COMMENT
      createdAt: "2023-01-01T00:00:00.000Z"
    },

    // Follow
    Follow: {
      $followerId: 1,
      $followingId: 2,
      createdAt: "2023-01-01T00:00:00.000Z"
    },

    // Report
    Report: {
      $reporterId: 1,
      $targetId: 1,
      targetType: "POST", // POST | COMMENT | USER
      reason: "Nội dung vi phạm",
      status: "PENDING", // PENDING | RESOLVED
      createdAt: "2023-01-01T00:00:00.000Z"
    },

    // Tag
    Tag: {
      $name: "technology",
      description: "Các bài viết về công nghệ",
      createdAt: "2023-01-01T00:00:00.000Z"
    },

    // PostTag
    PostTag: {
      $postId: 1,
      $tagId: 1,
      createdAt: "2023-01-01T00:00:00.000Z"
    },

    // Error Response
    Error: {
      status: "error",
      message: "Error message"
    }
  }
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./src/routes/*.ts'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log('Swagger documentation generated successfully!');
});
