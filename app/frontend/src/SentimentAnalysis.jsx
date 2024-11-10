import {TextEditor} from "./TextEditor.jsx";
import {Title} from "./Title.jsx";
import {Card} from "./Card.jsx";
import {ModelSelector} from "./ModelSelector.jsx";
import {useState} from "react";
import {TextSentiments} from "./TextSentiments.jsx";

export function SentimentAnalysis() {
    const [editorText, setEditorText] = useState("");
    const [selectedModel, setSelectedModel] = useState(null);

    return (
        <div
            className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-emerald-500 via-blue-400 to-red-400">
            <Title/>
            <div className="flex w-2/3 gap-2 mt-10 h-[700px]">
                <Card className="w-2/3 h-full" animationIndex={0}>
                    <TextEditor onChangeCallback={(text) => setEditorText(text)} />
                </Card>
                <div className="flex flex-col gap-2 w-1/3">
                    <Card animationIndex={1}>
                        <ModelSelector onChangedCallback={(model) => setSelectedModel(model)} />
                    </Card>
                    <Card className="flex-grow overflow-scroll" animationIndex={1}>
                        <div className="h-full"><TextSentiments model={selectedModel} text={editorText} /></div>
                    </Card>
                </div>
            </div>
        </div>
    );
}