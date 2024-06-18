import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMapEvent, ImageOverlay , useMap , SVGOverlay} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import imageOverlayUrl from '../assets/mapadefinitivo.png';
import imagemPorbaixo from '../assets/jarare.PNG';
import axios from 'axios';
import { useMediaQuery } from 'react-responsive';

// Importando o ícone de marcador personalizado
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import Marcador from '../component/Marcador';
import Spiner from '../component/Spiner';


//import jsonData from 'C:/Users/joas.neves/Desktop/Mapa kennedy/Mapa/backend/configuracoes.json';

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
    const [carregado, setCarregado] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            
                try {
                    console.log("tentado conectar aos dados...");
                    const response = await Promise.race([
                        axios.get(`${import.meta.env.VITE_REACT_APP_API_URL_BACKEND}/carregar-configuracoes`),
                        new Promise((_, reject) => setTimeout(() => reject(new Error('Request timed out')), 2000))
                    ]);
                    
                    setData(response.data);
                    setCarregado(true);
 
                } catch (error) {
                    console.error('Erro ao carregar dados:', error);
                   // setData(jsonData); // Caso não consiga se conectar ao backend ele puxa do proprio computador
                    setCarregado(true);
                }
            
        };

        fetchData();

        const sleep = (ms) =>{
            return new Promise(resolve => setTimeout(resolve, ms));
        }
        const AtualizarPaginga = async () =>{
            await sleep(30000);
            window.location.reload()
        }

        AtualizarPaginga();
    }, []); // A lista de dependências está vazia, portanto, useEffect será executado apenas uma vez após a montagem do componente



    const locationIgrejaDasNeves =  [-21.231612173518077, -40.98758965730667];
    const center = [-21.234602324714437, -40.9909987449646]; // Coordenadas do centro do mapa
    const imageSize = [1600, 1265]; // Largura e altura da imagem

    const bounds = [[ -21.23568236442125, -40.99162101745606 ], [ -21.227275179810054,-40.98072052001954]]// [[-21.237902421195642,-40.992549061775215], [-21.2312521512244, -40.987318754196174]]; // Coordenadas da imagem (sudeste e noroeste)
    const quadrado = [ [-21.177120071317482,
        -41.04391210017287], [-21.26347983786585,
            -40.934496858471455]]

    const isMobile = useMediaQuery({ query: '(max-width: 767px)' }); // se for um celular
    const mapStyle = isMobile ? { height: '100vh', width: '100vw' } : { height: '56rem', width: '84rem' }; // ajuste o css
    const dragging = isMobile; // permita a pessoa se mover

    return (
        <>
        {carregado ? (
        <MapContainer center={locationIgrejaDasNeves}
            zoom={18}
            minZoom={17}
            maxZoom={20}
            style={mapStyle}
            scrollWheelZoom={isMobile}
            dragging={true}
        // Definindo o manipulador de eventos de clique no mapa
        >
            <ImageOverlay
                url={imagemPorbaixo}
                bounds={quadrado}
                opacity={1} // Opacidade da imagem (0 a 1)
                zIndex={0}
            />
            
            <TileLayer
                attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                zIndex={1}
            />
            {/* Função para clicar no mapa e mostras as coordenadas */}
            <LogCoordinatesOnClick />
            <CheckMapBounds center={locationIgrejaDasNeves} radius={radius * 100000} />
            
            {/* Adicione uma imagem ao mapa */}
            <ImageOverlay
                url={imageOverlayUrl}
                bounds={bounds}
                opacity={1} // Opacidade da imagem (0 a 1)
                zIndex={3}
            />

            {Object.values(data).map((o) => {
                return (
                    <Marcador 
                    location={o.bounds}
                    content={o.content}
                    message={o.message}
                    zIndex={4}
                    />
                )
            })}
            
        </MapContainer>
        ): (<Spiner/>) }
        </>
        
    );
}

export default Mapa;
