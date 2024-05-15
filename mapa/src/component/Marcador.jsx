import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Rectangle  } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Importando o ícone de marcador personalizado
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const Marcador = (props) =>{
    return(
        <>
        <Rectangle 
                bounds={props.location}
                
            ><Popup>{props.content}</Popup></Rectangle ></>
    )
}

export default Marcador;