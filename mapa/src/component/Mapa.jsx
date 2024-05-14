    import React, { useState, useEffect } from 'react';
    import { MapContainer, TileLayer, Marker, Popup, Circle , useMapEvent  } from 'react-leaflet';
    import 'leaflet/dist/leaflet.css';
    import L from 'leaflet';

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

  const [userLocation, setUserLocation] = useState([-21.1058688, -41.0451968]);
  const location2 = [-21.1058918, -41.0452768];

  useEffect(() => {
      // Obtendo a localização do usuário
      if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(
              (position) => {
                  setUserLocation([position.coords.latitude, position.coords.longitude]);
                  
              },
              (error) => {
                  console.error('Erro ao obter localização do usuário:', error);
              }
          );
      } else {
          console.error('Geolocalização não suportada neste navegador.');
      }
      console.log(userLocation)
  }, []); // A função useEffect só será executada uma vez, quando o componente for montado

    return (
        <MapContainer center={userLocation}
         zoom={12}
         style={{ height: '450px', width: '840px' }}
       // Definindo o manipulador de eventos de clique no mapa
        >
            <TileLayer
            
                attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
             <LogCoordinatesOnClick />
             {/* Adicione um círculo ao mapa */}
             <Marcador location={userLocation} content="ocupado" />
             <Marcador location={location2} content="descupado" />
             
        </MapContainer>
    );
}

export default Mapa;
