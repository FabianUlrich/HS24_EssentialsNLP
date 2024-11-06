import {motion} from "framer-motion";

// eslint-disable-next-line react/prop-types
export function Title({ text }) {
    text = text.split(" ");
    return (
        <div className="text-5xl font-bold text-white">
            {text.map((el, i) => (
                <motion.span
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{
                        duration: 0.25,
                        delay: 0.2 + (i / 10),
                    }}
                    key={i}
                >
                    {el}{" "}
                </motion.span>
            ))}
        </div>
    );
}
