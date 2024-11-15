import {useEffect, useCallback} from "react";
import {useDebouncedCallback} from "use-debounce";
import {Textarea} from "@headlessui/react";

const sampleEmail = "We have decided not to make any reps about these plans, since any buyer would not be taking them.  However, we have a data room list that specifies what was made available, and the other side is welcome to review most of what is in that room.  We remain cautious about releasing employment compensation data and contract information about individuals, but are happy to provide totals of current and future costs under those agreements in the aggregate.  Let me know if you have questions.\n" +
    "\n" +
    "Which deal are you actively working on?  Fire or Wind?  Do I need to be working on the draft agreement?\n" +
    "\n" +
    "Thanks.\n" +
    "\n" +
    "Michelle\n" +
    "\n";

/**
 * Editor for text that should be analyzed. The changed text is emitted using the onChangeCallback with a debounce of 1s.
 * @param onChangeCallback
 * @returns {JSX.Element}
 * @constructor
 */
export function TextEditor({onChangeCallback}) {
    const emitText = useDebouncedCallback((textValue) => {
        onChangeCallback(textValue);
    }, 1000)

    const onChange = useCallback((event) => {
        emitText(event.target.value);
    }, []);

    useEffect(() => {
        emitText(sampleEmail);
    }, []);

    return <>
        <label className="text-sm text-gray-600 flex-grow-0 mb-1">E-Mail (or any other text)</label>
        <Textarea
            className="p-2 rounded-lg border font-mono max-sm:text-sm border-gray-500 overflow-auto flex-grow resize-none"
            onChange={onChange}
            defaultValue={sampleEmail}
        />
    </>

}
