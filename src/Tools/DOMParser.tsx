import DOMPurify from "dompurify";
import { marked } from "marked";
import { mangle } from "marked-mangle";

/**
 * Parse a text that use 'mark' by converting it into HTML readable tags
 * @param text The text to parse
 * @param callback The function where the text will be
 */
export async function parseText(text: string, callback: Function){

    // Initialise the parser
    marked.use(mangle(), {breaks: true})


    // Parse the description to convert the HTML tags
    const convertedDescription = await marked(text);
    const DOMDescription = DOMPurify.sanitize(convertedDescription)
    callback(DOMDescription);
}