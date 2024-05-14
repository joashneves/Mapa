import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMapEvent, ImageOverlay } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import imageOverlayUrl from '../assets/mapaimagem.jpeg';


// Importando o ícone de marcador personalizado
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import Marcador from './Marcador';

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

    const locationIgrejaDasNeves = [-21.234602324714437, -40.9909987449646];
    const center = [-21.234602324714437, -40.9909987449646]; // Coordenadas do centro do mapa
    const imageSize = [1600, 900]; // Largura e altura da imagem

    const bounds = [[-21.23521234811371, -40.99198579788209], [-21.233322267410447, -40.988316535949714]]; // Coordenadas da imagem (sudeste e noroeste)
    const rotationAngle = 25; // Ângulo de rotação da imagem em graus

    // Estilo CSS para rotacionar a imagem
    const imageStyle = {
        transform: `rotate(${rotationAngle}deg)`
    };

    return (
        <MapContainer center={locationIgrejaDasNeves}
            zoom={12}
            style={{ height: '450px', width: '840px' }}
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
                opacity={0.8} // Opacidade da imagem (0 a 1)
                style={imageStyle} // Aplicar o estilo de rotação à imagem
            />
            {/* Adicione um círculo ao mapa */}
            <Marcador location={locationIgrejaDasNeves} content='ocupado'/>

        </MapContainer>
    );
}

export default Mapa;
