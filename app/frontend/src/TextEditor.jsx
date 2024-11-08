import {useEffect, useState, useRef, useCallback} from "react";
import {useQuery} from "react-query";

const fetchHighlightData = async () => {
    return [
        { text: "Which deal are you actively working on?", sentiment: "positive"},
        { text: "We have decided not to make any reps about these plans, since any buyer would not be taking them.",  sentiment: "negative"},
        { text: "Do I need to be working on the draft agreement?",  sentiment: "neutral"},
    ];
};

const sampleEmail = "We have decided not to make any reps about these plans, since any buyer would not be taking them.  However, we have a data room list that specifies what was made available, and the other side is welcome to review most of what is in that room.  We remain cautious about releasing employment compensation data and contract information about individuals, but are happy to provide totals of current and future costs under those agreements in the aggregate.  Let me know if you have questions.\n" +
    "\n" +
    "Which deal are you actively working on?  Fire or Wind?  Do I need to be working on the draft agreement?\n" +
    "\n" +
    "Thanks.\n" +
    "\n" +
    "Michelle\n" +
    "\n";

export function TextEditor() {
    const {data: highlights} = useQuery("highlightData", fetchHighlightData);
    const editorRef = useRef(null);

    const [textContent, setTextContent] = useState(sampleEmail);
    const onChange = useCallback((event) => {
        setTextContent(event.target.innerText);
    }, []);

    useEffect(() => {
        let newHtml = textContent;

        // TODO: fetch highlights here
        if (highlights && highlights.length > 0) {
            const formatSentiment = (sentiment, text) => {
                switch (sentiment) {
                    case "positive":
                        return `<mark style="background-color: #DFD">${text}</mark>`
                    case "neutral":
                        return `<mark style="background-color: #DDF">${text}</mark>`
                    case "negative":
                        return `<mark style="background-color: #FDD">${text}</mark>`
                }
            };

            highlights.forEach(({sentiment, text}) => {
                newHtml = newHtml.replace(text, formatSentiment(sentiment, text));
            })
        }

        if (newHtml !== editorRef.current.innerHTML) {
            editorRef.current.innerHTML = newHtml;
            editorRef.current.focus();
        }
    }, [textContent, highlights]);

    const onPaste = (e) => {

    }

    return <div className="flex flex-col h-full">
        <label className="text-sm text-gray-600 flex-grow-0 mb-1">E-Mail</label>
        <div
            ref={editorRef}
            contentEditable
            className="p-2 rounded-lg border border-gray-500 font-mono overflow-scroll flex-grow"
            style={{
                whiteSpace: "pre-wrap", // Preserve spaces and newlines
            }}
            onInput={onChange}
        >
        </div>
    </div>
}
