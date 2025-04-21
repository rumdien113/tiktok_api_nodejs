import express, { Application } from 'express'
import sequelize from './config/database'
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger/swaggerOptions';

import commentRoutes from './routes/comment.route'
import followRoutes from './routes/follow.route'
import likeRoutes from './routes/like.route'
import postRoutes from './routes/post.route'
import postTagRoutes from './routes/post_tag.route'
import reportRoutes from './routes/report.route'
import reportCounterRoutes from './routes/report_count.route'
import shareRoutes from './routes/share.route'
import tagRoutes from './routes/tag.route'
import userRoutes from './routes/user.route'

const app: Application = express()

app.use(express.json())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

app.use('/api/comment', commentRoutes)
app.use('/api/follow', followRoutes)
app.use('/api/like', likeRoutes)
app.use('/api/post_tag', postTagRoutes)
app.use('/api/post', postRoutes)
app.use('/api/report', reportRoutes)
app.use('/api/report_count', reportCounterRoutes)
app.use('/api/share', shareRoutes)
app.use('/api/tag', tagRoutes)
app.use('/api/user', userRoutes)

sequelize.sync().then(() => {
  console.log('Database and tables created!')
})

export default app
