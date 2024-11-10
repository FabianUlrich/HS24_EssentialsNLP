import {useQuery} from "react-query";
import {motion} from "framer-motion";

const fetchSentiments = async (model, text) => {
    return text.split(/[.?!]/)
        .map(sentence => sentence.trim())
        .filter(sentence => sentence.length > 0)
        .map(sentence => {
            return {text: sentence, sentiment: ["Positive", "Neutral", "Negative"][Math.floor(Math.random() * 3)]}
        });
};

export function TextSentiments({model, text}) {
    const {data: textSentiments} = useQuery(`highlightData_${model}_${text}`, () => fetchSentiments(model, text));

    const sentimentClass = (sentiment) => {
        switch (sentiment) {
            case "Positive":
                return "border-green-300 bg-green-50";
            case "Neutral":
                return "border-blue-300 bg-blue-50";
            case "Negative":
                return "border-red-300 bg-red-50";
        }
    }

    return <>
        <label className="text-sm text-gray-600">Sentiments</label>
        {textSentiments?.map((textSentiment, index) => (
            <motion.div key={index}
                        initial={{opacity: 0, scale: 0}}
                        animate={{opacity: 1, scale: 1}}
                        transition={{delay: index / 7}}
                        className={`mb-2 text-sm p-4 my-4 border-s-4 ${sentimentClass(textSentiment.sentiment)}`}>
                <div className="font-semibold text-gray-600">{textSentiment.sentiment}</div>
                <blockquote>{textSentiment.text}</blockquote>
            </motion.div>)) ?? <></>}
    </>
}