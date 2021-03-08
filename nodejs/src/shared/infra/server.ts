import 'reflect-metadata'
import './typeorm'
import cors from 'cors'
import express, { NextFunction, Request, Response } from 'express'
import 'express-async-errors'
import uploadConfig from '@config/upload'
import routes from './routes'
import AppError from '../errors/appError'

const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)
app.use('/files', express.static(uploadConfig.directory))

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