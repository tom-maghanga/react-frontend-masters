import Pet from "./Pet";
import { Link } from "react-router-dom";

const Results = ({pets})=> {
    return(
        <div className="search">
            {!pets.length ? (
                <h1>No Pets Found</h1>               
            ) : (
                pets.map((pet) =>{
                    return(
                        <Link key={pet.id} to={`/details/${pet.id}`}>                        
                        <Pet 
                        animal = {pet.animal}
                        key={pet.id}
                        name={pet.name}
                        breed = {pet.breed}
                        images={pet.images}
                        location={`${pet.city}, ${pet.state}`}
                        id={pet.id}
                        />
                         </Link>
                    );
                })
            )};
        </div>
    );
};

export default Results;