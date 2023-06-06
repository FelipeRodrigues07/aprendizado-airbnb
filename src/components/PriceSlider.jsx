import React from 'react';
import { useState, useEffect } from 'react';

//Importar CSS do PriceSlider
import './css/PriceSlider.css';

export default function PriceSlider(props) {

    const [min, setMin] = useState(props.min);
    const [max, setMax] = useState(props.max);
    const [left, setLeft] = useState('0%');
    const [right, setRight] = useState('0%');

    function changeRangeMin(e) {

        if ((parseInt(e.target.value) - max) >= -props.step) {
            // console.log('Limite mínimo alcançado!');
        } else {
            setMin(parseInt(e.target.value));
            if (min == props.min) {
                setLeft("0%");
            } else {
                var totalBarra = props.max - props.min;
                var qtsSteps = min - props.min;

                setLeft(((qtsSteps * 100) / totalBarra) + "%");
            }
        }


    }

    function changeRangeMax(e) {

        if ((parseInt(e.target.value) - min) <= props.step) {
            // console.log('Limite Máximo Alcançado!');
        } else {
            setMax(parseInt(e.target.value));
            if (max == props.max) {
                setRight("0%");
            } else {
                var totalBarra = props.max - props.min;
                var qtsSteps = props.max - max;

                setRight(((qtsSteps * 100) / totalBarra) + "%");
            }
        }


    }

    useEffect(() => {
        if (min == props.min) {
            document.getElementById('inputMin').value = props.min;
        } else {
            document.getElementById('inputMin').value = min;
        }
        props.filterByPrice(props.catID, min, max);
    }, [min]);

    useEffect(() => {
        if (max == props.max) {
            document.getElementById('inputMax').value = props.max + "+";
        } else {
            document.getElementById('inputMax').value = max;
        }
        props.filterByPrice(props.catID, min, max);
    }, [max]);

    function validacao(e) {
        //CAMPO INPUT MIN
        let inputMin = document.getElementById('inputMin');
        //CAMPO INPUT MAX
        let inputMax = document.getElementById('inputMax');
        //PEGAR O VALOR DO CAMPO INPUT
        let valor = parseInt(e.target.value);
        //SE O CAMPO INPUT FOR INPUT MIN
        if (e.target.id == "inputMin") {
            //VERIFICAR SE CAMPO É VAZIO OU NULL
            if (e.target.value == "" || e.target.value == null) {
                //SETAR PARA O MÍNIMO PERMITIDO
                setMin(props.min);
                setLeft("0%");
                //MUDAR O VALOR DO CAMPO INPUT MIN PARA VALOR MÍNIMO
                inputMin.value = props.min;
            } else {
                //VERIFICAR SE VALOR É MENOR QUE MÍNIMO
                if (valor < props.min) {
                    //SETAR PARA O MÍNIMO PERMITIDO
                    setMin(props.min);
                    setLeft("0%");
                    //MUDAR O VALOR DO CAMPO INPUT MIN PARA VALOR MÍNIMO
                    inputMin.value = props.min;
                } else {
                    //VALOR É MAIOR QUE MINIMO PERMITIDO - OK
                    //VERIFICAR SE MIN É MAIOR QUE MAX
                    if (valor >= max) {
                        let corrige = max - props.step;
                        setMin(corrige);

                        var totalBarra = props.max - props.min;
                        var qtsSteps = valor - props.min;

                        setLeft(((qtsSteps * 100) / totalBarra) + "%");

                        inputMin.value = corrige;

                    } else {
                        //TUDO CERTO
                        setMin(valor);
                        //MOVIMENTAR A BARRA
                        var totalBarra = props.max - props.min;
                        var qtsSteps = valor - props.min;

                        setLeft(((qtsSteps * 100) / totalBarra) + "%");

                    }
                }
            }

        }

        //SE O CAMPO FOR INPUT MAX
        if (e.target.id == "inputMax") {

            //VERIFICAR SE VALOR DIGITADO É VAZIO OU NULL
            if (e.target.value == "" || e.target.value == null) {
                //SETAR PARA MAXIMO PERMITIDO
                setMax(props.max);
                setRight("0%");
                inputMax.value = props.max + "+";
            } else {
                //SE O VALOR DIGITADO FOR MAIOR QUE MÁXIMO PERMITIDO
                if (valor > props.max) {
                    //SETAR PARA MAXIMO PERMITIDO
                    setMax(props.max);
                    setRight("0%");
                    //MUDAR O CAMPO PARA MÁXIMO +
                    inputMax.value = props.max + "+";
                } else {
                    //VALOR DIGITADO É MENOR QUE MÁXIMO PERMITIDO
                    //VERIFICAR SE MAX É MENOR QUE MIN
                    if (valor <= min) {
                        let corrige = min + props.step;
                        setMax(corrige);

                        var totalBarra = props.max - props.min;
                        var qtsSteps = props.max - valor;

                        setRight(((qtsSteps * 100) / totalBarra) + "%");
                        inputMax.value = corrige;

                    } else {
                        //TUDO CERTO
                        //SE VALOR DIGITADO É MAIOR QUE MIN
                        setMax(valor);
                        var totalBarra = props.max - props.min;
                        var qtsSteps = props.max - valor;

                        setRight(((qtsSteps * 100) / totalBarra) + "%");
                    }
                }
            }

        }

    }

    function soNumero(e) {
        if (!/[0-9]/.test(e.key)) {
            e.preventDefault();
        }
    }

    return (
        <div>
            <div className='slider'>
                <div style={{ left: left, right: right }} className='progress'></div>
            </div>
            <div className='range-input'>
                <input id='rangeMin' onChange={changeRangeMin} type="range" min={props.min} max={props.max} value={min} step={props.step} />
                <input id='rangeMax' onChange={changeRangeMax} type="range" min={props.min} max={props.max} value={max} step={props.step} />
            </div>
            <div className='row mt-4'>
                <div className='col'>
                    <label className='text-muted'>preço mínimo</label>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">R$</span>
                        <input id="inputMin" onBlur={validacao} onKeyPress={(e) => { (e.key == "Enter" ? validacao(e) : soNumero(e)) }} type="text" className="form-control" placeholder="Min" />
                    </div>
                </div>
                <div className='col'>
                    <label className='text-muted'>preço máximo</label>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">R$</span>
                        <input id="inputMax" onBlur={validacao} onKeyPress={(e) => { (e.key == "Enter" ? validacao(e) : soNumero(e)) }} type="text" className="form-control" placeholder="Max" />
                    </div>
                </div>
            </div>
        </div>
    )
}

