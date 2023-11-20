import { useEffect, useState } from "react";
import Pet from "./Pet";

const  Animals = ["bird", "cat", "dog","rabbit","reptile"];

const SearchParams = () =>{
    const [location, setLocation]= useState("");
    const [animal, setAnimal] = useState("");
    const [breed, setBreeds] = useState("");
    const [pets, setPets] = useState([]);
    const breeds = ["Poodle"];

    useEffect(() =>{
        requestPets();
    }, []);

    async function requestPets(){
        const res = await fetch(
            `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
        );
        const json = await res.json();
        setPets(json.pets);
    }
    return(
        <div className="search-params">
            <form
            onSubmit={(e) =>{
                e.preventDefault();
                requestPets();
            }} >
                <label htmlFor="location">
                    Location
                    <input onChange={e => setLocation(e.target.value)} id="location" value={location} placeholder="Location"/>
                </label>
                <label htmlFor="animal">
                    Animal
                    <select 
                    onChange={
                        (e) => {setAnimal(e.target.value);
                        setBreeds("")
                    }}
                     id="animal" value={animal} placeholder="animal">
                    <option/>
                    {Animals.map((animal)=> (
                        <option key={animal}>{animal}</option>
                    ))}
                    </select>
                </label>
                <label htmlFor="breed">
                    Breed
                    <select 
                    disabled = {breeds.length ===0}
                    onChange={e => setBreeds(e.target.value)} id="breed" value={breed} placeholder="breed">
                    <option/>
                    {breeds.map((breed)=> (
                        <option key={breed}>{breed}</option>
                    ))}
                    </select>
                </label>
                <button>Submit</button>
            </form>
            {pets.map((pet)=>(
                <Pet name={pet.name} breed={pet.breed} animal={pet.animal} key={pet.id}/>
            ))}
        </div>
    );
};

export default SearchParams;