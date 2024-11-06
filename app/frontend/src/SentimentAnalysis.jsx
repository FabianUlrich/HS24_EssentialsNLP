import {TextEditor} from "./TextEditor.jsx";
import {Title} from "./Title.jsx";
import {Card} from "./Card.jsx";
import {Dropdown} from "./Dropdown.jsx";
import {ProjectInfo} from "./ProjectInfo.jsx";

export function SentimentAnalysis() {

    return (
        <div
            className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-emerald-500 via-blue-400 to-red-400">
            <Title text="E-Mail Sentiment Analysis"/>
            <div className="flex w-2/3 gap-2 mt-10 h-[700px]">
                <Card className="w-2/3 h-full" animationIndex={0}>
                    <TextEditor/>
                </Card>
                <div className="flex flex-col gap-2 w-1/3">
                    <Card animationIndex={1}>
                        <Dropdown/>
                    </Card>

                    <Card className="flex-grow" animationIndex={1}>
                        <ProjectInfo />
                    </Card>
                </div>
            </div>
        </div>
    );
}