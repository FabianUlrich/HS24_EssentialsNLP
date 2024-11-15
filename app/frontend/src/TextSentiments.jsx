import {useQuery} from "react-query";
import {motion} from "framer-motion";
import axios from "axios";

/**
 * Gets the sentiments of all sentences in the given text using the given model
 * @param model
 * @param text
 * @returns {Promise<*>}
 */
const fetchSentiments = async (model, text) => {
    try {
        const response = await axios.post("api/classify", { // Update the URL if necessary
            model,
            text
        });

        const {results} = response.data;

        return results.map(({sentence, predicted_label}) => ({
            text: sentence,
            sentiment: ["Neutral", "Negative", "Positive"][predicted_label] // Map label numbers to sentiment strings
        }));
    } catch (error) {
        console.error("Error fetching sentiments:", error);
        throw new Error("Failed to fetch sentiments from the backend.");
    }
};

/**
 * Loads and displays the sentiments in a text
 * @param model
 * @param text
 * @returns {JSX.Element}
 * @constructor
 */
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