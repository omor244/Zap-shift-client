import { useEffect, useState } from "react";
import WorkCard from "./WorkCard";


const HowItWork = () => {
     const [data, setdata ]= useState([])

    useEffect(() => {
        fetch('/public/work.json')
            .then(res => res.json())
            .then(data => {
          
                setdata(data)
                
        })
    },[])

    return (
        <div>
            <h1 className="font-bold text-4xl mb-4">How it Works</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
                {
                    data.map((work, idx) => <WorkCard key={idx}  work={work}></WorkCard>)
                 }
            </div>
        </div>
    );
};

export default HowItWork;