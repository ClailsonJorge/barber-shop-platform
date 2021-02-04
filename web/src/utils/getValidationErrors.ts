import { ValidationError } from 'yup'

interface Errors {
    [key: string]: string
}
const getValidationErrors = (error: ValidationError): Errors => {
    const validationErrors: Errors = {}

    error.inner.forEach(validationError => {
        validationErrors[validationError.path] = validationError.message
    })
    return validationErrors
}
export default getValidationErrors
