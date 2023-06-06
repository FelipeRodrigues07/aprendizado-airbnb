import React from 'react';
import { useState } from 'react';
//Importar CSS das ButtonGroup
import './css/ButtonGroup.css';

export default function ButtonGroup({ buttons }) {
    const [clickedId, setClickedId] = useState(-1);

    const handleClick = (e, i) => {
        setClickedId(i);
        console.log('O indice clicado foi: ' + i);
    }

    return (
        <div className='row mb-4'>
            {
                buttons.map((buttonLabel, i) => (
                    <div key={i} className={i == 0 ? 'col-3' : 'col'}>
                        <button
                            key={i}
                            onClick={(e) => handleClick(e, i)}
                            className={i === clickedId || clickedId == -1 && buttonLabel == "Qualquer um" ? 'w-100 btn-especial active' : 'w-100 btn-especial'}
                        >
                            {buttonLabel}
                        </button>
                    </div>
                ))
            }
        </div>
    )
}