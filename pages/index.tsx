import { useEffect, useState } from 'react';
import QuestaoModel from '../model/questao';
import Questionario from '../components/Questionario';
// import BASE_URL from '../config'
import { useRouter } from 'next/router';

const BASE_URL = 'http://localhost:3000/api'
export default function Home() {

  const router = useRouter()

  const [idsDasQuestoes, setIdsDasQuestoes] = useState<number[]>([])
  const [questao, setQuestao] = useState<QuestaoModel>()
  const [respostasCertas, setRespostasCertas] = useState<number>(0)

  async function carregarIdsDasQuestoes(){
    const resp = await fetch(`${BASE_URL}/questionario`)
    const idsDasQuestoes = await resp.json()
    setIdsDasQuestoes(idsDasQuestoes)
  }

  async function carregarQuestoes(idQuestao: number){
    const resp = await fetch(`${BASE_URL}/questoes/${idQuestao}`)
    const json = await resp.json()
    const novaQuestão = QuestaoModel.criarUsandoObjeto(json)
    setQuestao(novaQuestão)
  }
  
  useEffect(() => {
    carregarIdsDasQuestoes()
  }, [])

  useEffect(() => {
    idsDasQuestoes.length > 0 && carregarQuestoes(idsDasQuestoes[0])
  }, [idsDasQuestoes])

  function questaoRespondida(questaoResp: QuestaoModel){
    setQuestao(questaoResp)
    const acertou = questaoResp.acertou
    setRespostasCertas(respostasCertas + (acertou ? 1 : 0))
  }
  function idProximaQuestao(){
    if(questao){
      const proximoIndice = idsDasQuestoes.indexOf(questao.id) + 1
      return idsDasQuestoes[proximoIndice]
    }
  }
  function irParaProximoPasso(){
    const proximoId = idProximaQuestao()
    proximoId ? irParaProximaQuestao(proximoId) : finalizar()
  }

  function irParaProximaQuestao(proximoIds: number){
    carregarQuestoes(proximoIds)
  }

  function finalizar(){
    router.push({
      pathname: "/resultado",
      query: {
        total: idsDasQuestoes.length,
        certas: respostasCertas
      }
    })
  }

  return (
        questao ? (
          <Questionario
             questao={questao}
             ultima={idProximaQuestao() === undefined}
             questaoRespondida={questaoRespondida}
             irParaProximoPasso={irParaProximoPasso}
            /> 
        ) : false
        
        
  );
}
