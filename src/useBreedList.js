import { useQuery } from "@tanstack/react-query";
import fetchBreed from "./fetchBreed";


export default function useBreedList(animal){
    
    const results = useQuery(['breeds', animal], fetchBreed);
    return [results?.data?.breeds ?? [], results.status];

}