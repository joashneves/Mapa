import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle  } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Importando o ícone de marcador personalizado
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// Configurando o ícone personalizado
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const Mapa = () => {

  const [userLocation, setUserLocation] = useState([-21.1058688, -41.0451968]);
  

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

    const handleMapClick = (e) => {
      console.log('Clicou')
  };
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
             {/* Adicione um círculo ao mapa */}
             <Circle
                center={userLocation}
                pathOptions={{
                    color: 'red',
                    fillColor: '#f03',
                    fillOpacity: 0.5,
                    radius: 500
                }}
            />
        </MapContainer>
    );
}

export default Mapa;
