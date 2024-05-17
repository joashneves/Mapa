import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Rectangle  } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Importando o ícone de marcador personalizado
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const Marcador = (props) =>{
    const ocupado = props.content; // se verdadeiro ocupado, se não livre
    const cor = ocupado ? { color: 'red', fillColor: 'red'   } : { color: 'blue', fillColor: 'blue' } ;
    const legenda = ocupado ? 'Ocupado' : 'Livre'; 
    const bounds = props.location;
    console.log(bounds);
    
    return(
        <>
        <Rectangle 
                bounds={bounds}
                pathOptions={cor}
            ><Popup>{legenda}<br></br>
                Lote : {props.message}</Popup></Rectangle ></>
    )
}

export default Marcador;