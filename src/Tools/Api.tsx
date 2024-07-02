import bcrypt from "bcryptjs";
import { AssosData, EventData } from "./Interfaces/EventAndAssoInterface";

const baseUrl = "https://tekiens.net";

interface SessionCreationResponse {
    challenge: string;
    salt: string;
}

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
        getOne(id: number): Promise<EventData> {
            return sendApiRequest<EventData>("GET", "events/" + encodeURIComponent(id), {}, "Getting event " + id)
        },
        update(id: number, event: any, session = localStorage.getItem('session')) {
            return sendApiRequest("PUT", "events/" + encodeURIComponent(id), { ...event, session }, "Updating event " + id);
        },
        create(event: any, session = localStorage.getItem('session')) {
            return sendApiRequest("POST", "events", { ...event, session }, "Adding event");
        },
        delete(id: number, session = localStorage.getItem('session')) {
            return sendApiRequest("DELETE", "events/" + encodeURIComponent(id), { session }, "Deleting event " + id);
        }
    },
    sessions: {
        //authentificate the user and return a session id if success
        async create(assoId: string, password: string) {
            //the user call the api to get a challenge
            let { challenge, salt } = await sendApiRequest<SessionCreationResponse>("POST", "sessions", { asso: assoId }, "Challenge session");

            let hash_password = await bcrypt.hash(password, salt);

            let hash_challenge = await hash(challenge + hash_password);

            //the user send the hash of the challenge and the password
            return await sendApiRequest("POST", "sessions", { asso: assoId, hash: hash_challenge }, "Creating session");


        },
        delete(id: string) {
            return sendApiRequest("DELETE", "sessions/" + encodeURIComponent(id), {}, "Deleting session");
        }
    }
}

async function sendApiRequest<T>(method: string, endpoint: string, parameters: Record<string, any>, message?: string): Promise<T> {
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
    }
    else {
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

/**
 * Function to to hash a string with sha256 and return the hash in hex
 * @param string the string we want to hash
 * @returns the hash in hex
 */
async function hash(string: string) {
    const sourceBytes = new TextEncoder().encode(string);
    const disgest = await crypto.subtle.digest("SHA-256", sourceBytes);
    const hash = Array.from(new Uint8Array(disgest)).map(b => b.toString(16).padStart(2, "0")).join("");
    return hash;
}

export default Api;