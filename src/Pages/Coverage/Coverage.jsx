import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import 'leaflet/dist/leaflet.css'
import { useLoaderData } from "react-router";
import { Handler } from "leaflet";
import { useRef } from "react";

const Coverage = () => {
    const position = [23.684994, 90.356331]
    const data = useLoaderData()
    const mapref = useRef('')

    const handelsearch = e => {
        e.preventDefault()

        const location = e.target.location.value 
        console.log(location)
        const district = data.find(c => c.district.toLowerCase().includes(location.toLowerCase()))

        if (district) {
            const coord = [district.latitude, district.longitude]
            console.log(district, coord)
            mapref.current.flyTo(coord, 15)
        }

    }
    return (
        <div>

            <h2 className="text-4xl font-bold">We are available in 64 districts</h2>

            <div>
                
                <form onSubmit={handelsearch}>
                    <label className="input">
                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth="2.5"
                                fill="none"
                                stroke="currentColor"
                            >
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.3-4.3"></path>
                            </g>
                        </svg>
                        <input name="location" type="search" required placeholder="Search" />
                    </label>
                </form>
            </div>
            <div className="border  h-[800px]">
                <MapContainer
                    center={position}
                    zoom={8}
                    scrollWheelZoom={false}
                    className="h-[800px]"
                    ref={mapref}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {
                        data.map((center, idx) => <Marker
                            key={idx}
                            position={[center.latitude, center.longitude]}>
                            
                            <Popup>
                                <strong>{center.district}</strong> <br /> 
                                Service Area: {center.covered_area.join(', ')}
                            </Popup>
                        </Marker>)
                  }
                </MapContainer>
            </div>
        </div>
    );
};

export default Coverage;