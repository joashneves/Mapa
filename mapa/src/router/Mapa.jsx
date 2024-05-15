import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMapEvent, ImageOverlay } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import imageOverlayUrl from '../assets/tes2.png';


// Importando o ícone de marcador personalizado
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import Marcador from '../component/Marcador';

// Configurando o ícone personalizado
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

function LogCoordinatesOnClick() {
    useMapEvent('click', (e) => {
        console.log("Latitude:", e.latlng.lat);
        console.log("Longitude:", e.latlng.lng);
    });

    return null;
}

const Mapa = () => {

    const locationIgrejaDasNeves =  [-21.234602324714437, -40.9909987449646];
    const center = [-21.234602324714437, -40.9909987449646]; // Coordenadas do centro do mapa
    const imageSize = [1600, 900]; // Largura e altura da imagem

    const bounds = [[ -21.23568236442125, -40.99162101745606 ], [ -21.227251913953758,  -40.98520525990899 ]]// [[-21.237902421195642,-40.992549061775215], [-21.2312521512244, -40.987318754196174]]; // Coordenadas da imagem (sudeste e noroeste)
    const boundstest = [[ -21.234217308646965,-40.98909437656403 ], [ -21.233987298568533, -40.9886384010315]]
    const boundstest1 = [[ -21.234097303433423,  -40.9909987449646 ], [ -21.233957297227505,-40.99093973636628]]
    const boundstest2 = [[-21.234352314395462, -40.98823070526124], [-21.234127304745964,  -40.9877371788025]]
    return (
        <MapContainer center={locationIgrejaDasNeves}
            zoom={17}
            style={{ height: '46rem', width: '74rem' }}
        // Definindo o manipulador de eventos de clique no mapa
        >
            <TileLayer

                attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {/* Função para clicar no mapa e mostras as coordenadas */}
            <LogCoordinatesOnClick />
            {/* Adicione uma imagem ao mapa */}
            <ImageOverlay
                url={imageOverlayUrl}
                bounds={bounds}
                opacity={1} // Opacidade da imagem (0 a 1)
                zIndex={8}
            />
            {/* Adicione um círculo ao mapa */}
            <Marcador location={boundstest} content={false}/>
            <Marcador location={boundstest1} content={false}/>
            <Marcador location={boundstest2} content={true}/>

        </MapContainer>
    );
}

export default Mapa;
