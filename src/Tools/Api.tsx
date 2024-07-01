import { AssosData, EventData } from "./Interfaces/EventAndAssoInterface";

const baseUrl = "https://tekiens.net";

const Api = {
    assos: {
        // Return an array with all the associations
        get(): Promise<AssosData[]> {
            return sendApiRequest<AssosData[]>("GET", "assos", {}, "Getting assos")
        },
        // Return one association by its id
        getOne(id: string): Promise<AssosData> {
            return sendApiRequest<AssosData>("GET", "assos/" + encodeURIComponent(id), {}, "Getting asso " + id)
        },
        // Return all the association events
        getEvents(id: string): Promise<EventData[]> {
            return sendApiRequest<EventData[]>("GET", "assos/" + encodeURIComponent(id) + "/events", {}, "Getting asso " + id + " events");
        }
    },

    event: {
        // Return an array with all the events
        get(): Promise<EventData[]> {
            return sendApiRequest<EventData[]>("GET", "events", {}, "Getting event");
        },
        // Return one event by its id
        getOne(id: string): Promise<EventData> {
            return sendApiRequest<EventData>("GET", "events/" + encodeURIComponent(id), {}, "Getting event " + id)
        },
    }
}

async function sendApiRequest<T>(method: string, endpoint: string, parameters: Record<string, any> = {}, message?: string): Promise<T> {
    if (message !== undefined) {
        console.info("[API] " + message);
    }

    const urlParameters = Object.entries(parameters)
        .filter(([_, v]) => v !== undefined)
        .map(([k, v]) =>
            Array.isArray(v)
                ? v.map(i => `${k}[]=${encodeURIComponent(i)}`).join("&")
                : v instanceof Date
                    ? `${k}=${encodeURIComponent(v.toISOString())}`
                    : v === null
                        ? `${k}=`
                        : `${k}=${encodeURIComponent(v)}`
        ).join("&");

    const options: RequestInit = { method };
    if (method === "GET") {
        endpoint += "?" + urlParameters;
    } else {
        options.body = urlParameters;
        options.headers = { "Content-Type": "application/x-www-form-urlencoded" };
    }

    const response = await fetch(baseUrl + "/api/" + endpoint, options);
    const responseData = await response.json();

    if (!responseData.success) {
        console.error("[API] " + responseData.error);
        throw new Error(responseData.error);
    }

    return responseData.data;
}

export default Api;