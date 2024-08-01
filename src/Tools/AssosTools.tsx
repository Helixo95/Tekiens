import { AssosData } from "./Interfaces/EventAndAssoInterface";
import { filterByCampus } from "./LocalStorage/LocalStorageAssos";

/** Filter an array of asso
 * @param filterChoice 'all', 'sub', 'active', 'former'
 * @param assosData Array of assos amin info
 * @param callback Where to save the result (prefferabmly a useState)
 */
export function filterData(assosData: AssosData[], filterChoice: string) {
    if (!assosData) {
        return [];
    }

    let campusFilteredData = filterByCampus(assosData);

    if (campusFilteredData.length === 0) {
        return [];
    }

    switch (filterChoice) {
        case 'all':
            return campusFilteredData;

        case 'sub':
            const followedAssos = JSON.parse(localStorage.getItem('followedAssos') || '[]');
            return campusFilteredData.filter(currentData => followedAssos.includes(currentData.id));

        case 'rnd':
            return [campusFilteredData[Math.floor(Math.random() * campusFilteredData.length)]];

        default:
            const bChooseActive = filterChoice == 'active';
            return campusFilteredData.filter((currentData: any) => bChooseActive ? currentData.end === null : currentData.end !== null);
    }
}