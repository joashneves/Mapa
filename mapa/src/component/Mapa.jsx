import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';


const Mapa = () => {
    
    return <MapContainer center={[51.505, -0.09]} zoom={12} style={{height: '350px'}}>
      <TileLayer
        attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[51.505, -0.09]}>
        <Popup>
            <span>
              A pretty CSS3 popup. <br/> Easily customizable.
            </span>
        </Popup>
      </Marker>
    </MapContainer>;

}

export default Mapa;