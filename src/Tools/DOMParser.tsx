import DOMPurify from "dompurify";
import { marked } from "marked";
import { mangle } from "marked-mangle";
import turndown from "turndown"

/**
 * Parse a text that use 'mark' by converting it into HTML readable tags
 * @param text The text to parse
 * @param callback The function where the text will be
 */
export async function parseText(text: string | undefined | null, callback: Function) {
    if (text) {
        // Initialise the parser
        marked.use(mangle(), { breaks: true })


        // Parse the description to convert the HTML tags
        const convertedDescription = await marked(text);
        const DOMDescription = DOMPurify.sanitize(convertedDescription)
        callback(DOMDescription);
    }
}


/**
 * unParse a text and convert all the html tags into marked format
 * @param text The text to parse
 */
export function unParseText(text: string) {
    const turndownService = new turndown();
    return turndownService.turndown(text);
}