
import { useState } from "react";
import Perks from "../Perks";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import AccountNav from "./AccountNav";

export default function PlacesFormPage(){
    const {id} = useParams();
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [photoLink, setPhotoLink] = useState('');
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [redirect,setRedirect] = useState(false);

    useEffect(() => {
        if (!id) {
          return;
        }
        axios.get('/places/'+id).then(response => {
           const {data} = response;
           setTitle(data.title);
           setAddress(data.address);
           setAddedPhotos(data.photos);
           setDescription(data.description);
           setPerks(data.perks);
        });
      }, [id]);
    
    
    async function addPhotoByLink(ev) {
        ev.preventDefault();
        const {data:fileName} = await axios.post('/upload-by-link', {link:photoLink})
        setAddedPhotos(prev => {
          return [...prev,fileName];
        });
        setPhotoLink('')
      }
    
      async function savePlace(ev) {
        ev.preventDefault();
        const placeData = {
          title, address, addedPhotos,
          description, perks,
        };
        if (id) {
          // update
          await axios.put('/places', {
            id, ...placeData
          });
          setRedirect(true);
        } else {
          // new place
          await axios.post('/places', placeData);
          setRedirect(true);
        }
    
      }
    
      if (redirect) {
        return <Navigate to={'/account/places'} />
      }
    

    return (
        <div className="text-start"> 
        <AccountNav />
          <form onSubmit={savePlace}>
            <h2 className="text-2xl mt-4">Title</h2>
            <input type ="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder ="Title"></input>
            <h2 className="text-2xl mt-4">Price</h2>
            <input type ="text" value={address} onChange={ev => setAddress(ev.target.value)} placeholder ="$"></input>
            <h2 className="text-2xl mt-4">Photos</h2>
            <div className="flex gap-2">
              <input type ="text" value={photoLink} onChange={ev => setPhotoLink(ev.target.value)} placeholder="add a link"></input>
              <button onClick={addPhotoByLink} className = "bg-gray-200 px-4 rounded-2xl">Add photo</button>
            </div>
            
            <div className = "mt-2 grid gap-2 grids-cols-3 md:grid-cols-4">
            {addedPhotos.length > 0 && addedPhotos.map(link => (
              <div className="h-40 flex" key={link}>
                <img className="rounded-2xl w-full object-cover" src={'http://localhost:4000/uploads/' + link}></img>
              </div>
            ))}
            </div>

            <h2 className="text-2xl mt-4">Description</h2>
            <textarea type ="text" value={description} onChange={ev => setDescription(ev.target.value)}  placeholder ="Description"></textarea>

            <div className ="grid mt-2 gap-2 grid-cols-2">
              <Perks selected={perks} onChange={setPerks}/>
            </div>
            <button className ="primary my-4">Save</button>
          </form>
        </div>
    );
}