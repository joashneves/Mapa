import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMapEvent, ImageOverlay , useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import imageOverlayUrl from '../assets/mapadefinitivo.jpeg';
import imagemPorbaixo from '../assets/imagemtest.jpeg';
import axios from 'axios';

// Importando o ícone de marcador personalizado
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import Marcador from '../component/Marcador';

const locationIgrejaDasNeves = [-21.234602324714437, -40.9909987449646];
const radius = 0.005; // Raio permitido em graus (aproximado)

// Configurando o ícone personalizado
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;
let click = 122; // numero de clicks
function LogCoordinatesOnClick() {
    useMapEvent('click', (e) => {
        console.log("========================");
        console.log("Latitude:", e.latlng.lat);
        console.log(`
        ,{
            "message": "${click}",
            "bounds": [
                ${e.latlng.lat},
                ${e.latlng.lng}
            ],
            "content": false
          }`);
          click++;
    });

    return null;
}

function CheckMapBounds({ center, radius }) {
    const map = useMap();
  
    useEffect(() => {
      const checkBounds = () => {
        const currentCenter = map.getCenter();
        const distance = map.distance(center, currentCenter);
  
        // Se a distância for maior que o raio permitido, volte para o centro
        if (distance > radius) {
          map.setView(center);
        }
      };
  
      map.on('moveend', checkBounds);
      return () => {
        map.off('moveend', checkBounds);
      };
    }, [map, center, radius]);
  
    return null;
  }

const Mapa = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_REACT_APP_API_URL_BACKEND}/carregar-configuracoes`)
            .then(response => {
                setData(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error('Erro ao carregar dados:', error);
            });
    }, []); // A lista de dependências está vazia, portanto, useEffect será executado apenas uma vez após a montagem do componente


    const locationIgrejaDasNeves =  [-21.231802184929844,-40.98850429058076];
    const center = [-21.234602324714437, -40.9909987449646]; // Coordenadas do centro do mapa
    const imageSize = [1600, 1265]; // Largura e altura da imagem

    const bounds = [[ -21.23568236442125, -40.99162101745606 ], [ -21.227275179810054,-40.98072052001954]]// [[-21.237902421195642,-40.992549061775215], [-21.2312521512244, -40.987318754196174]]; // Coordenadas da imagem (sudeste e noroeste)
    const boundstest = [[ -21.234217308646965,-40.98909437656403 ], [ -21.233987298568533, -40.9886384010315]]
    const boundstest1 = [[ -21.234097303433423,  -40.9909987449646 ], [ -21.233957297227505,-40.99093973636628]]
    const boundstest2 = [[-21.234352314395462, -40.98823070526124], [-21.234127304745964,  -40.9877371788025]]
    return (
        <MapContainer center={locationIgrejaDasNeves}
            zoom={18}
            minZoom={18}
            maxZoom={20}
            style={{ height: '56rem', width: '84rem' }}
            scrollWheelZoom={false}
        // Definindo o manipulador de eventos de clique no mapa
        >
            <TileLayer
                attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {/* Função para clicar no mapa e mostras as coordenadas */}
            <LogCoordinatesOnClick />
            <CheckMapBounds center={locationIgrejaDasNeves} radius={radius * 100000} />
                
            {/* Adicione uma imagem ao mapa */}
            <ImageOverlay
                url={imageOverlayUrl}
                bounds={bounds}
                opacity={1} // Opacidade da imagem (0 a 1)
                zIndex={8}
            />
            {/* Adicione um círculo ao mapa */}
            
            {Object.values(data).map((o) => {
                return (
                    <Marcador 
                    location={o.bounds}
                    content={o.content}
                    message={o.message}
                    />
                )
            })}

        </MapContainer>
    );
}

export default Mapa;
