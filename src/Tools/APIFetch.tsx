import { IonButton } from "@ionic/react";
/**
 * This function fetch the result of a query and set the result as a json object it into the callback function (Preferably a useState)
 * @param url The query made to the API
 */
async function fetchAPIResult(url: any){
    try{
        // Fetch with the API
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }

    catch(error){
        console.error(error);
    }
}

/**
 * Fetch and return via the API the (id, name, theme and logo path and color) of all the associations
 * @return An array containing associative array of the differents attributes or null if the query failed
 */
export async function getAllAssosMainInfos(){
    const response = await fetchAPIResult("https://tekiens.net/api/assos");
    if(!response){
        return null;
    }
    
    return response.data;
}

/**
 * Retrieve either the active associations or the finished ones and return its main infos
 * @param bChooseActive Choose the active associations instead of the finished ones
 * @return An array containing associative array of the differents attributes or null if the query failed
 */
export async function getAssosFilteredInfos(bChooseActive: boolean){
    const response = await fetchAPIResult("https://tekiens.net/api/assos");
    if(!response){
        return null;
    }

    const data = response.data;
    return data
        .filter((currentData: any) => bChooseActive ? currentData.end === null : currentData.end !== null)
        .map((currentData: any) => ({
            id: currentData.id,
            name: currentData.names,
            theme: currentData.theme,
            logo: currentData.logo,
            color: currentData.color
        }));
}

/** Return the informations of an asso in function of its id
 * @return An associative array of the asso informations or null if the query failed
*/
export async function getAssoInformationByID(id: String){
    const response = await fetchAPIResult("https://tekiens.net/api/assos/"+id);
    if(!response){
        return null;
    }
    return response.data;
}


/** Return all the found ids in the database 
 * @return An array of ids
*/
export async function getAssoIDs(){
    const data = await fetchAPIResult("https://tekiens.net/api/assos").then(fetchArray =>(fetchArray.data));
    let result = [];

    for(let i = 0; i < data.length; i++){
        result.push(data[i].id);
    }
    
    return result;

}

function Assosbutton(){
    return(<IonButton className="center-content" onClick={() =>{getAssoInformationByID("animatsuri")}}>Click Me !</IonButton>);
} 

export default Assosbutton;