import 'reflect-metadata'
import 'dotenv/config'
import '../typeorm'
import '@shared/container'
import cors from 'cors'
import express, { NextFunction, Request, Response } from 'express'
import { errors } from 'celebrate'
import 'express-async-errors'
import uploadConfig from '@config/upload'
import AppError from '@shared/errors/appError'
import routes from './routes'

const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)
app.use('/files', express.static(uploadConfig.uploadsFolder))
app.use(errors())

app.use(
    (error: Error, request: Request, response: Response, _: NextFunction) => {
        if (error instanceof AppError) {
            return response.status(error.statusCode).json({
                status: 'error',
                message: error.message
            })
        }
        return response.status(500).json({
            status: 'error',
            message: 'Internal server Error.'
        })
    }
)
app.listen(3333, () => {
    console.log('Server initialing... ')
})
