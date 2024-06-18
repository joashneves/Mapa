import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle   } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Importando o ícone de marcador personalizado
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const Marcador = (props) =>{
    const ocupado = props.content; // se verdadeiro ocupado, se não livre
    const cor = ocupado ? {  weight: 3, color: 'red', fillColor: 'red', fillOpacity: 1  } : {  stroke: false  ,fillColor: '#fff', opacity: 0.5 } ;
    const legenda = ocupado ? 'Ocupado' : 'Livre'; 
    const bounds = props.location;
    
    return(
        <>
        <Circle  
                center={bounds}
                radius={5}
                pathOptions={cor}
            >{props.message}<Popup>{legenda}<br></br>
                Lote : {props.message}</Popup></Circle  ></>
    )
}

export default Marcador;