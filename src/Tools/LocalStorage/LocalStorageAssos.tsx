import { AssosData } from "../Interfaces/EventAndAssoInterface";

/**
 * Function to return data filtered by the campus
 * @param assosData the data we want to filter
 * @returns the data filtered by the campus
 */
export function filterByCampus(assosData: AssosData[]) {
    if (!assosData) {
        return [];
    }

    const campus = localStorage.getItem("selectedCampus") || 'all';

    if (campus == "all") {
        return assosData;
    }

    return assosData.filter(currentData => currentData.campus === campus);
}

/**
 * Function to add or remove an association from the saved associations
 * @param assoID the asso id we want to add or remove
 * @param setIsFollowed the useState function to update isFollowed
 */
export function followAssociation(assoID: any, setIsFollowed: Function) {
    if (isAssoFollowed(assoID)) {
        removeFollowedAsso(assoID);
        setIsFollowed(false);
    } else {
        addFollowedAsso(assoID);
        setIsFollowed(true);
    }
}

/**
 * Function to check if an association is followed
 * @param assoID the asso id
 * @returns true if the association's followed or false if not
 */
export function isAssoFollowed(assoID: any) {
    const followedAssos = JSON.parse(localStorage.getItem("followedAssos") || "[]");

    if (followedAssos) {
        return followedAssos.includes(assoID);
    }
    return false;
}

/**
 * Function to remove an association to the followed associations
 * @param assoID the asso id we want to remove
 */
function removeFollowedAsso(assoID: any) {
    // Retrieve existing data
    const followedAssos = JSON.parse(localStorage.getItem("followedAssos") || "[]");

    // Check if we have data and check if the asso is followed
    if (followedAssos && followedAssos.includes(assoID)) {
        // Remove the assoID to the array
        followedAssos.pop(assoID);

        // Update localStorage with the new array
        localStorage.setItem("followedAssos", JSON.stringify(followedAssos));
    }
    else {
        console.log("Can't remove " + assoID + " because he's not in the followed associations.");
    }
}

/**
 * Function to add an association to the followed associations
 * @param assoID the asso id we want to add
 */
function addFollowedAsso(assoID: any) {
    // Retrieve existing data
    const followedAssos = JSON.parse(localStorage.getItem("followedAssos") || "[]");

    // Check if we have data and check if the asso is followed
    if (followedAssos && !followedAssos.includes(assoID)) {
        // Add the assoID to the array
        followedAssos.push(assoID);

        console.log(followedAssos);

        // Update localStorage with the new array
        localStorage.setItem("followedAssos", JSON.stringify(followedAssos));
    }
    else {
        console.log("Can't add " + assoID + " because he's already followed.");
    }
}