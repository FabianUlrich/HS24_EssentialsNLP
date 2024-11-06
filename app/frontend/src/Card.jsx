import {motion} from "framer-motion";

// eslint-disable-next-line react/prop-types
export function Card({children, animationIndex, className}) {
    return (
        <motion.div
            initial={{opacity: 0, scale: 0}}
            animate={{opacity: 1, scale: 1}}
            transition={{ delay: (animationIndex ? animationIndex / 7 : 0) }}
            className={`bg-white p-8 rounded-lg shadow-lg ${className}`}
        >
            {children}
        </motion.div>
    );
}