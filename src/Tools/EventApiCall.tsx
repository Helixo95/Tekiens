import { useEffect, useState } from 'react';
import { ApiResponseEvents, SomeEventsData } from '../Tools/Interfaces/EventInterface';

const useEventData = (apiHref: string) => {
    const [data, setData] = useState<SomeEventsData[]>([]);
    const [loading, setLoading] = useState(true);

    const selectedCampus = localStorage.getItem('selectedCampus');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://tekiens.net/api/' + apiHref);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const result: ApiResponseEvents = await response.json();

                const eventsWithAssociations: SomeEventsData[] = await Promise.all(result.data.map(async (event) => {
                    const associationResponse = await fetch(`https://tekiens.net/api/assos/${event.asso_id}`);
                    if (!associationResponse.ok) {
                        throw new Error(`Failed to fetch association ${event.asso_id}`);
                    }
                    const associationResult = await associationResponse.json();
                    return {
                        ...event,
                        associationName: associationResult.data.names[0], // Use the first name (assuming it's primary)
                        associationColor: associationResult.data.color,
                        associationCampus: associationResult.data.campus,
                    };
                }));

                selectedCampus == "all" ? setData(eventsWithAssociations.reverse()) : setData(eventsWithAssociations.filter(event => event.associationCampus === selectedCampus).reverse());
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [apiHref, selectedCampus]);

    return { data, loading };
};

export default useEventData;
