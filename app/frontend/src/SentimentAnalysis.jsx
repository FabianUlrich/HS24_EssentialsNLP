import {TextEditor} from "./TextEditor.jsx";
import {Title} from "./Title.jsx";
import {Card} from "./Card.jsx";
import {ModelSelector} from "./ModelSelector.jsx";
import {useState} from "react";
import {TextSentiments} from "./TextSentiments.jsx";

/**
 * Main app container
 * @returns {JSX.Element}
 * @constructor
 */
export function SentimentAnalysis() {
    const [editorText, setEditorText] = useState("");
    const [selectedModel, setSelectedModel] = useState(null);

    return (
        <div className="min-h-screen p-2 flex flex-col items-center justify-center bg-gradient-to-r from-emerald-500 via-blue-400 to-red-400">
            <Title/>
            <div className="flex flex-col w-full md:flex-row xl:w-2/3 gap-2 mt-10 xl:h-[700px]">
                <Card className="self-stretch min-h-[300px] md:w-2/3 flex flex-col" animationIndex={0}>
                    <TextEditor onChangeCallback={(text) => setEditorText(text)} />
                </Card>
                <div className="flex flex-col gap-2 md:w-1/3">
                    <Card animationIndex={1}>
                        <ModelSelector onChangedCallback={(model) => setSelectedModel(model)} />
                    </Card>
                    <Card className="flex-grow overflow-auto" animationIndex={1}>
                        <TextSentiments model={selectedModel} text={editorText} />
                    </Card>
                </div>
            </div>
        </div>
    );
}