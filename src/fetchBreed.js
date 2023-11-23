const fetchBreed = async({queryKey}) =>{
    const animal = queryKey[1];

    const apiRes = await fetch(`http://pets-v2.dev-apis.com/breeds?animal=${animal}`);

    if(!apiRes.ok){
        throw new Error(`details/${animal} feth not ok`);
    }

    return apiRes.json();
}

export default fetchBreed;