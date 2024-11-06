import {useEffect, useState, useRef} from "react";
import {useQuery} from "react-query";

const fetchHighlightData = async () => {
    return [
        {start: 10, end: 15, color: "yellow"},
        {start: 20, end: 25, color: "lightgreen"},
    ];
};

export function TextEditor() {
    const {data: highlights} = useQuery("highlightData", fetchHighlightData);
    const editorRef = useRef(null);

    useEffect(() => {
        //editorRef.current.focus();
        editorRef.current.innerHTML = "We have decided not to make any reps about these plans, since any buyer would not be taking them.  However, we have a data room list that specifies what was made available, and the other side is welcome to review most of what is in that room.  We remain cautious about releasing employment compensation data and contract information about individuals, but are happy to provide totals of current and future costs under those agreements in the aggregate.  Let me know if you have questions.\n" +
            "\n" +
            "Which deal are you actively working on?  Fire or Wind?  Do I need to be working on the draft agreement?\n" +
            "\n" +
            "Thanks.\n" +
            "\n" +
            "Michelle\n" +
            "\n"


    }, [])

    return <div className="flex flex-col h-full">
        <label className="text-sm text-gray-600 flex-grow-0 mb-1">E-Mail</label>
        <div
            ref={editorRef}
            contentEditable
            className="p-2 rounded-lg border border-gray-500 font-mono overflow-scroll flex-grow"
            style={{
                whiteSpace: "pre-wrap", // Preserve spaces and newlines
            }}
        >
        </div>
    </div>
}
