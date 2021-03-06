import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'
import authConfig from '@config/auth'
import AppError from '@shared/errors/appError'

interface ITokenPayload {
    iat: number
    exp: number
    sub: string
}

export default function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
): void {
    const authHeader = request.headers.authorization

    if (!authHeader) {
        throw new AppError('JWT token is missing', 401)
    }
    const [, token] = authHeader.split(' ')

    const { secret } = authConfig.jwt
    try {
        const decodedToken = verify(token, secret)
        const { sub } = decodedToken as ITokenPayload

        request.user = {
            id: sub
        }
        return next()
    } catch (error) {
        throw new Error('Invalid JWT token')
    }
}
