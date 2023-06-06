import React from 'react';
//Importar CSS do Card
import './css/Card.css';

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Pagination, Navigation } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

//IMPORTAR DADOS DE BACK-END (simulação)
//import { acomodacoes } from '../../backend/dados.js';

export default function Card({ dados }) {
    
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function animar(e) {
        e.target.classList.toggle('animate');
    }

    if (dados.length == 0) {
        return (
            <div style={{ paddingTop: '180px' }} className='d-flex justify-content-center align-items-center'>
                <div className='container-airbnb row'>
                    <div className='col mt-5'>
                        <div className='card text-center'>
                            <div className='card-body'>
                                Nenhuma acomodação encontrada para esta categoria
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div style={{ paddingTop: '180px', paddingBottom: '100px' }} className='container-fluid'>
                <div className="container-airbnb row">
                    {
                        dados.map((acomodacao, index) => (
                            <div key={acomodacao.id} className='position-relative mt-4 col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-2'>
                                <div onClick={animar} className='HeartAnimation position-absolute top-0 end-0'></div>
                                <Swiper
                                    className='img-content'
                                    navigation={true}
                                    pagination={true}
                                    modules={[Pagination, Navigation]}
                                >
                                    {
                                        acomodacao.imagens.map((imagem, index) => (
                                            <SwiperSlide
                                                className='swiperImg'
                                                key={index}
                                            >
                                                <img src={imagem} className="img-fluid cardImage" />
                                            </SwiperSlide>
                                        ))
                                    }
                                </Swiper>


                                <p className='d-flex justify-content-between mt-3 mb-0'>
                                    <span style={{ display: 'block', maxWidth: '200px' }} className='fw-bold text-truncate'>{acomodacao.cidade}, {acomodacao.pais}</span>
                                    <span><i className='mdi mdi-star'></i> {acomodacao.nota}</span>
                                </p>
                                <p className='text-muted my-0'>{getRandomInt(10, 800)} KM de distância</p>
                                <p className='text-muted'>{getRandomInt(1, 31)} de jan - {getRandomInt(1, 28)} de fev</p>
                                <p className='fw-bold'>R$ {acomodacao.preco.toLocaleString('pt-BR')} noite</p>


                            </div>
                        ))
                    }

                </div>
            </div>
        )
    }


}

