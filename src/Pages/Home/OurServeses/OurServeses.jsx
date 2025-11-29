import { useEffect, useState } from "react";
import OurServesesCard from "./OurServesesCard";


const OurServeses = () => {

    const [data, setdata] = useState([])

    useEffect(() => {
        fetch('/public/Our.json')
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setdata(data)

            })
    }, [])
    return (
        <div className="bg-secondary  rounded-2xl p-12">
            <h1 className="text-center text-white font-bold text-3xl">Our Services</h1>
            <p className="text-center text-white/50 mb-5 font-medium text-lg">Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle.  From personal <br /> packages to business shipments — we deliver on time, every time.</p>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:grid-cols-2 ">
                {
                    data.map((item, idx) => <OurServesesCard key={idx} item={item}></OurServesesCard>)
                }
            </div>
        </div>
    );
};

export default OurServeses;