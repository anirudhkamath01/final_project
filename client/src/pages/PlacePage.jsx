import {Link, useParams} from "react-router-dom";
import AccountNav from "./AccountNav";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

export default function PlacePage() {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get('/places').then(({data}) => {
      setPlaces(data)
    })
  }, [])

  return (
    <div>
      <AccountNav />
        <div>

        <Link className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full" to={'/account/places/new'}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
            Add new listing
        </Link>
        </div>
        <div className = "mt-4">
          {places.length > 0 && places.map(place => (
            <Link to={'/account/places/'+place._id} className ="flex gap-4 bg-gray-100 p-4 rounded-2xl mt-10">
              <div className="flex w-32 h-32 bg-gray-300 shrink-0 rounded-2xl">
                {place.photos.length > 0 && (
                  <img className="rounded-2xl w-full object-cover" src={'http://localhost:4000/uploads/' + place.photos[0]} alt=""></img>
                )}
              </div>
              <div className="text-left">
                <h2 className="text-xl">{place.title}</h2>
                <p className="text-sm mt-2">{place.description}</p>
                <div className="my-5">
                <span className="text-center bg-gray-500 text-white py-2 px-6 rounded-full">
                    ${place.address}
                  </span>
                </div>
              </div>
            </Link>
          )
          )}
        </div>
    </div>

  
  );
}