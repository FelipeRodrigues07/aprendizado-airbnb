import { useEffect, useState } from 'react';

//Importar o Bootstrap@5.3.0
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';

//Importar material design icons
import '@mdi/font/css/materialdesignicons.css'

//importar css geral
import './App.css';

//importar componentes
import Navbar from './components/Navbar';
import Categorias from './components/Categorias';
//importar Modal de Filtro
import ModalFilter from './components/ModalFilter';
import Card from './components/Card';
import Skeleton from './components/Skeleton';


function App() {

   //ESTADOS DA NOSSA APLICAÇÃO
   const [isLoading, setIsLoading] = useState(true);
   const [catID, setCatID] = useState(1);
   const [allHouses, setAllHouses] = useState([]);
   const [filterHouses, setFilterHouses] = useState([]);
 
    //PRIMEIRA VEZ QUE A APLICAÇÃO RODOU
  useEffect(() => {
    fetch('https://curso.programacaoweb.com.br/api-airbnb/')
      .then((resposta) => {
        if (resposta.ok) {
          return resposta.json();
        }
        throw new Error('Algo deu errado!');
      }).then((respostaJSON) => {
        setAllHouses(respostaJSON);
        setIsLoading(false);
      }).catch((error) => {
        console.log(error);
      })
  }, []);

  useEffect(() => {
    // console.log(allHouses);
    filterByID(catID);
  }, [allHouses])

  useEffect(() => {
    // console.log(filterHouses);
  }, [filterHouses])

  useEffect(() => {
    console.log('A categoria atual é: ' + catID);
  }, [catID])

  const changeCat = (id) => {
    setCatID(id);
    filterByID(id);
  }

   //FILTRAR POR ID DA CATEGORIA
   const filterByID = (id) => {
    const novaLista = allHouses.filter((item) => {
      return item.categoria === id;
    })
    setFilterHouses(novaLista);
  }

    //FILTRAR POR PREÇO
    const filterByPrice = (catID, min, max) => {
      const novaLista = allHouses.filter((item) => {
        return item.categoria === catID
          && item.preco >= min
          && item.preco <= max
      })
      setFilterHouses(novaLista);
    }

    const resetFilter = (id) => {
      filterByID(id);
    }  
  

  return (
   <div>
    <Navbar/>
    <Categorias changeCat={changeCat}/>
    {
       isLoading ?
       <div className='mt-4 container-airbnb row' style={{ paddingTop: '180px' }}>
         <Skeleton />
         <Skeleton />
         <Skeleton />
         <Skeleton />
         <Skeleton />
         <Skeleton />
       </div>
       :
       <Card dados={filterHouses} />
    }
    <ModalFilter resetFilter={resetFilter} catID={catID} filterByPrice={filterByPrice} itens={filterHouses}/>
   </div>
      
  )
}

export default App
