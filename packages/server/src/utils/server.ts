import express, { Application, Request, Response } from 'express'
import path from 'path'

const createServer = () => {
  const serverRoot = path.resolve()
  const app: Application = express()

  app.use(express.json())

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(serverRoot, 'packages/client/dist')))
    app.get('*', (req: Request, res: Response) =>
      res.sendFile(
        path.resolve(serverRoot, 'packages', 'client', 'dist', 'index.html')
      )
    )
  } else {
    app.get('/', (req: Request, res: Response) => res.json('API is running'))
  }

  return app
}

export default createServer
