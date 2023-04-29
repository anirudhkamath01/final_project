import { MdChair } from "react-icons/md";
import { IoBed } from "react-icons/io5";
import { BsBookshelf } from "react-icons/bs";
import { TbToolsKitchen2 } from "react-icons/tb";
import { MdOutdoorGrill } from "react-icons/md";
import { MdBathroom } from "react-icons/md";

export default function Perks({selected,onChange}) {
  function handleCbClick(ev) {
    const {checked,name} = ev.target;
    if (checked) {
      onChange([...selected,name]);
    } else {
      onChange([...selected.filter(selectedName => selectedName !== name)]);
    }
  }
  return (
    <>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input type="checkbox" checked={selected.includes('wifi')} name="wifi" onChange={handleCbClick}/>
        <MdChair /> 
        <span>Furniture</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input type="checkbox" checked={selected.includes('parking')} name="parking" onChange={handleCbClick}/>
        <IoBed />
        <span>Beds & Mattresses</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input type="checkbox" checked={selected.includes('tv')} name="tv" onChange={handleCbClick}/>
        <BsBookshelf />
        <span>Storage & Organization</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input type="checkbox" checked={selected.includes('radio')} name="radio" onChange={handleCbClick}/>
        <TbToolsKitchen2 />
        <span>Kitchen & Appliances</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input type="checkbox" checked={selected.includes('pets')} name="pets" onChange={handleCbClick}/>
        <MdOutdoorGrill />
        <span>Outdoor</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input type="checkbox" checked={selected.includes('entrance')} name="entrance" onChange={handleCbClick}/>
        <MdBathroom />
        <span>Bathroom</span>
      </label>
    </>
  );
}