import React, { useEffect, useRef } from 'react';
import Quill from 'quill';
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";

const RichTextComponent: React.FC<{ value: string, callback: Function }> = ({ value, callback }) => {
    const editorRef = useRef<HTMLDivElement>(null);
    const quillRef = useRef<Quill | null>(null); // Ref to store the Quill instance

    useEffect(() => {
        // We assure that quills only render once
        if (editorRef.current && !quillRef.current) {
            const options = {
                modules: {
                    toolbar: true,
                },
                theme: 'snow'
            };
            quillRef.current = new Quill(editorRef.current, options);

            // Optionally set initial content and handle callback
            quillRef.current.root.innerHTML = value;
            quillRef.current.on('text-change', () => {
                const content = quillRef.current!.root.innerHTML;
                callback(content);
            });
        }
    }, []);

    return (
        <div>
            <div ref={editorRef} className="rts"></div>
        </div>
    );
}

export default RichTextComponent;
