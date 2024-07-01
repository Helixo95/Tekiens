import { call } from "ionicons/icons";
import { AssociationMainData } from "../Interfaces/AssosInterface";
import { subscribeToTopic, unsubscribeFromTopic } from "../Notifications/TopicSub";

/** Filter an array of asso
 * @param filterChoice 'all', 'sub', 'active', 'over', 'rnd => random'
 * @param data Array of assos amin info
 * @param callback Where to save the result (prefferabmly a useState)
 */
export function filterData(filterChoice: string, data: AssociationMainData[], callback: Function) {
    if (!data) {
        return;
    }
    let campusFilteredData = filterByCampus(data);
    let result = [];
    switch (filterChoice) {
        case 'all':
            callback(campusFilteredData);
            break;
        case 'sub':
            const subed = getSubscribedAsso();
            result = campusFilteredData.filter((currentData: any) => subed.includes(currentData.id));
            callback(result);
            break;
        case 'rnd':
            result = [campusFilteredData[Math.floor(Math.random() * campusFilteredData.length)]];
            callback(result);
            break;

        default:
            const bChooseActive = filterChoice == 'active';
            result = campusFilteredData.filter((currentData: any) => bChooseActive ? currentData.end === null : currentData.end !== null);
            callback(result);
    }
}
/** Return all the associations filtered by the campus */
function filterByCampus(data: AssociationMainData[]) {
    if (!data) {
        return [];
    }

    const campus = localStorage.getItem("selectedCampus") || 'all';

    if (campus == "all") {
        return data;
    }

    return data.filter(currentData => currentData.campus === campus);
}

/** Return an array of all the subscribed assos */
export function getSubscribedAsso() {
    const data = localStorage.getItem("assos");
    return data ? JSON.parse(data) : [];
}

/** Remove a subscribed asso */
function removeAssosFromLocalStorage(id: any) {
    // Retrieve existing data
    let data = localStorage.getItem("assos");
    let currentSaved = [];
    if (!data) { return; }

    currentSaved = JSON.parse(data);
    if (!Array.isArray(currentSaved)) {
        console.log("Parsed assos data is not an array, so we can't remove the asso: " + id);
        return;
    }

    // Remove the asso from the array
    let filtered = currentSaved.filter((assoID: any) => assoID !== id);
    console.log(filtered);
    localStorage.setItem("assos", JSON.stringify(filtered));
    console.log("Updated local storage of assos, removed: " + id);
    unsubscribeFromTopic(id);

}

/** Subscribe to an asso */
function addAssoToLocalStrorage(id: any) {
    // Retrieve existing data
    let data = localStorage.getItem("assos");

    // Parse existing data or initialize an empty array
    let currentSaved = [];
    if (data) {
        try {
            currentSaved = JSON.parse(data);
            if (!Array.isArray(currentSaved)) {
                console.error("Parsed data is not an array. Initializing an empty array.");
                currentSaved = [];
            }
        } catch (e) {
            console.error("Error parsing data from localStorage:", e);
            currentSaved = [];
        }
    }

    if (currentSaved.includes(id)) {
        console.log("The assos " + id + " is already in the local storage !");
        return;
    }

    // Add the new id to the array
    currentSaved.push(id);

    // Update localStorage with the new array
    localStorage.setItem("assos", JSON.stringify(currentSaved));
    console.log(localStorage.getItem("assos"));
    subscribeToTopic(id);

}

export function managedSubscription(add: boolean, id: any, callback: Function) {
    add ? addAssoToLocalStrorage(id) : removeAssosFromLocalStorage(id);
    callback(add);
}

export function isAssoFollowed(id: any) {
    const data = localStorage.getItem("assos");
    return data ? data.includes(id) : false;
}