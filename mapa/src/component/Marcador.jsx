import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle  } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Importando o ícone de marcador personalizado
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const Marcador = (props) =>{
    return(
        <>
        <Circle
                center={props.location}
                pathOptions={{
                    color: 'red',
                    fillColor: '#f03',
                    fillOpacity: 0.5,
                    radius: 500
                }}
            ><Popup>{props.content}</Popup></Circle></>
    )
}

export default Marcador;