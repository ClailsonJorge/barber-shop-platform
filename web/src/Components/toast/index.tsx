import React from 'react'
import { FiAlertCircle, FiXCircle } from 'react-icons/fi'
import { Container, Toast } from './styles'

const ToastCompanent: React.FC = () => {
    return (
        <Container>
            <Toast>
                <FiAlertCircle size={20} />

                <div>
                    <strong>Ocorreu um erro inesperado.</strong>
                    <p>
                        Descrição do Erro que deve ser condicional sua aparição
                    </p>
                </div>
                <button type="button">
                    <FiXCircle size={18} />
                </button>
            </Toast>

            <Toast type="error">
                <FiAlertCircle size={20} />

                <div>
                    <strong>Ocorreu um erro inesperado.</strong>
                    <p>
                        Descrição do Erro que deve ser condicional sua aparição
                    </p>
                </div>
                <button type="button">
                    <FiXCircle size={18} />
                </button>
            </Toast>

            <Toast type="sucess">
                <FiAlertCircle size={20} />

                <div>
                    <strong>Ocorreu um erro inesperado.</strong>
                    <p>
                        Descrição do Erro que deve ser condicional sua aparição
                    </p>
                </div>
                <button type="button">
                    <FiXCircle size={18} />
                </button>
            </Toast>
        </Container>
    )
}

export default ToastCompanent
