//import styles from '../styles/Questão.module.css'
import QuestaoModel from '../model/questao'
import styles from '../styles/Questao.module.css'
import Enunciado from './Enunciado'
import Resposta from './Resposta'

interface QuestaoProps {
    valor: QuestaoModel
}
export default function Questao(props: QuestaoProps){
    const questao = props.valor

    function renderizarRespostas(){
        return questao.respostas.map((resposta, i) => {
            return <Resposta 
            key={i}
                valor ={resposta}
                indice={i}
                letra="A"
                corFundoLetra='#f2c866'
            />
        })
    }
    return (
        <div className={styles.questao}>
            <h1>
                <Enunciado texto={questao.enunciado}/>
                {renderizarRespostas()}
            </h1>
        </div>
    )
}