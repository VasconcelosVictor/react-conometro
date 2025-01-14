import Botao from "../Botao"
import Relogio from "./Relogio"
import style from './Cronometro.module.scss'
import { tempoParaSegundos } from "../../common/utils/time"
import { ITarefa } from "../../types/tarefa"
import { useEffect, useState } from "react"

interface Props {
    selecionado : ITarefa | undefined,
    finalizarTarefa: () => void;
}
export default function Cronometro({selecionado, finalizarTarefa} : Props){
    const [tempo, setTempo] = useState<number>(tempoParaSegundos(String(selecionado?.tempo)));
    useEffect( ()=>{
        if (selecionado?.tempo){
            setTempo(tempoParaSegundos(selecionado.tempo));
        }
        
    },[selecionado])

    function regressiva(contador : number = 0 ){
        setTimeout(()=>{
            if(contador > 0 ){
                setTempo(contador - 1);
                return regressiva(contador -1);
            }else {
                finalizarTarefa();
            }

        }, 1000);
    }

    return (
        <div className={style.cronometro}>
            <p className={style.titulo}>Escoha um card de inicie o cronometro</p>
            <div className={style.relogioWrapper}>
                <Relogio tempo={tempo}></Relogio>
            </div>
            <Botao onClick={()=> regressiva(tempo)}>Comecar!</Botao>
        </div>
    )
}