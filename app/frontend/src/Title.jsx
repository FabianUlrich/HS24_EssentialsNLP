import {motion} from "framer-motion";

export function Title() {
    const githubUrl = "https://github.com/FabianUlrich/HS24_EssentialsNLP";
    const contributors = [
        {name: "Dominic Häfliger", url: "https://github.com/dhaefli"},
        {name: "Shirley Lau", url: "https://github.com/shirleyl1220"},
        {name: "Fabian Ulrich", url: "https://linkedin.com/in/fabian-ulrich"},
    ];

    return (
        <>
            <div className="text-5xl font-bold text-white">
                {"E-Mail Sentiment Analysis".split(" ").map((el, i) => (
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
            <div className="flex gap-3">
                <motion.a className="text-white border-r border-white pr-3"
                          href={githubUrl}
                          target="_blank"
                          initial={{opacity: 0}}
                          animate={{opacity: 1}}
                          transition={{
                              duration: 0.25,
                              delay: 0.2 + (3 / 10),
                          }}>GitHub
                </motion.a>
                {contributors.map((contributor, index) => (
                    <motion.a key={index}
                              className="text-white"
                              href={contributor.url}
                              target="_blank"
                              initial={{opacity: 0}}
                              animate={{opacity: 1}}
                              transition={{
                                  duration: 0.25,
                                  delay: 0.2 + ((index + 4) / 10),
                              }}>
                    {contributor.name}
                </motion.a>))}
            </div>
        </>
    );
}
