import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const ParcelTrack = () => {

    const { trackingId } = useParams()
    const axiossecure = useAxiosSecure()
    const { data: tracking = [], isLoading, isError } = useQuery({
        queryKey: ['tracking', trackingId],
        queryFn: async () => {
            const res = await axiossecure.get(`/tracking`);
            return res.data;
        },
        enabled: !!trackingId, // only run query if trackingId exists
    });
 
    console.log(tracking)
    
    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error fetching logs</p>;
    
    return (
        <div>

            <h2 className="text-5xl font-bold">tracking information { trackingId}</h2>
            <ul className="timeline timeline-vertical">

                {
                    tracking.map((track, idx) => <li>
                        <div className="timeline-start">
                            {new Date(track.createdAt).toDateString()}
                        </div>
                        <div className="timeline-middle">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="h-5 w-5"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        <div className="timeline-end timeline-box">
                            <span className="text-xl">{track.details}</span>
                        </div>
                        <hr />
                    </li>)
                }
              
             
            </ul>
        </div>
    );
};

export default ParcelTrack;