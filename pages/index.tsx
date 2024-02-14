import { useEffect, useState } from 'react';
import QuestaoModel from '../model/questao';
import RespostaModel from '../model/resposta';
import Questionario from '../components/Questionario';
import BASE_URL from '../config'

const questaoMock = new QuestaoModel(1, 'Qual é a Melhor cor?', [
  RespostaModel.errada('Verde'),
  RespostaModel.errada('Vermelha'),
  RespostaModel.errada('Azul'),
  RespostaModel.certa('Preta'),
])
export default function Home() {

  const [idsDasQuestoes, setIdsDasQuestoes] = useState<number[]>([])
  const [questao, setQuestao] = useState<QuestaoModel>(questaoMock)

  async function carregarIdsDasQuestoes(){
    const resp = await fetch(`${BASE_URL}/questionario`)
    const idsDasQuestoes = await resp.json()
    setIdsDasQuestoes(idsDasQuestoes)
  }

  async function carregarQuestoes(idQuestao: number){
    const resp = await fetch(`${BASE_URL}/questoes/${idQuestao}`)
    const json = await resp.json()
  }
  
  useEffect(() => {
    carregarIdsDasQuestoes()
  }, [])

  useEffect(() => {
    idsDasQuestoes.length > 0 && carregarQuestoes(idsDasQuestoes[0])
  }, [idsDasQuestoes])

  function questaoRespondida(questao: QuestaoModel){

  }
  function irParaProximoPasso(){

  }
  return (
        <Questionario
          questao={questao}
          ultima={true}
          questaoRespondida={questaoRespondida}
          irParaProximoPasso={irParaProximoPasso}
        ></Questionario>

  );
}
