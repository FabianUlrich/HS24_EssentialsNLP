import { LinkIcon, UserIcon } from "@heroicons/react/20/solid";

export function ProjectInfo() {

    const githubUrl = "https://github.com/FabianUlrich/HS24_EssentialsNLP";
    const contributors = [
        {name: "Dominic Häfliger", linkedin: "https://linkedin.com/in/sample-contributor1"},
        {name: "Shirley Lau", linkedin: "https://linkedin.com/in/sample-contributor2"},
        {name: "Fabian Ulrich", linkedin: "https://linkedin.com/in/sample-contributor3"},
    ];

    return (
        <div className="flex-grow flex flex-col">
            <h3 className="text-lg mb-2">Project</h3>
            <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
            >
                <LinkIcon className="h-6 w-6"/>
                <span>View GitHub Repository</span>
            </a>
            <div className="mt-4">
                <h3 className="text-lg mb-2">Contributors</h3>
                <ul className="flex flex-col gap-2">
                    {contributors.map((contributor, index) => (
                        <li key={index}>
                            <a
                                href={contributor.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
                            >
                                <UserIcon className="h-5 w-5"/>
                                <span>{contributor.name}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
