import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UrlState } from "../../context/context";

function Home() {
  const navigate = useNavigate();
  const [longUrl, setLongUrl] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/auth?createNew=${longUrl}`);
  };

  return (
    <div className="flex flex-col h-full w-full p-10">
      <div className="text-3xl md:text-5xl text-center font-extrabold pb-10">
        <h2>Free Best URL Shortner 🔗</h2>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 items-center w-full md:w-[30%] mx-auto">
        <Input onChange={(e) => setLongUrl(e.target.value)} className="w-full h-full md:py-3 md:px-6 lg:py-4 py-2 px-4 text-md md:text-xl" type="url" placeholder="Enter Long URL" value={longUrl} />
        <Button className="w-full h-full md:w-fit md:py-3 md:px-6 lg:py-4 py-2 px-4 text-md md:text-xl" type="submit">Shorten</Button>
      </form>
    </div>
  );
}

export default Home;