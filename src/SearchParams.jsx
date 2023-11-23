import { useState } from "react";
import Results from "./Results";
import useBreedList from "./useBreedList";
import { useQuery } from "@tanstack/react-query";
import fetchSearch from "./fetchSearch";

const  Animals = ["bird", "cat", "dog","rabbit","reptile"];

const SearchParams = () =>{
    const [requestParams, setrequestParams] = useState({
        animal : "",
        breed : "",
        location: "",
    });
    const [animal, setAnimal] = useState("");
    const breeds = useBreedList(animal)[0];

    const results = useQuery(["search", requestParams], fetchSearch);
    const pets = results?.data?.pets ?? [] ;
 
    return(
        <div className="search-params">
            <form
            onSubmit={(e) =>{
                e.preventDefault();
                const formData = new FormData(e.target);
          const obj = {
            animal: formData.get("animal") ?? "",
            breed: formData.get("breed") ?? "",
            location: formData.get("location") ?? "",
          };
          setrequestParams(obj);
            }} >
                <label htmlFor="location">
                    Location
                    <input name="location" id="location" placeholder="Location"/>
                </label>
                <label htmlFor="animal">
                    Animal
                    <select 
                    onChange={
                        (e) => {setAnimal(e.target.value);
                      
                    }}
                    name="animal"
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
                    disabled = {!breeds.length ===0}
                   name="breed" id="breed" placeholder="breed">
                    <option/>
                    {breeds.map((breed)=> (
                        <option key={breed}>{breed}</option>
                    ))}
                    </select>
                </label>
                <button>Submit</button>
            </form>
            <Carousel images={pets.images}/>
            <Results pets={pets}/>
        </div>
    );
};

export default SearchParams;