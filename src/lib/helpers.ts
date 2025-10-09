export const getInitials = (name: string) => {
    return (
        name
            ?.match(/(^\S\S?|\b\S)?/g)
            ?.join("")
            ?.match(/(^\S|\S$)?/g)
            ?.join("")
            ?.toUpperCase() ?? ""
    );
};

export const positionInitials = (position: string | null) => {
    switch (position) {
        case "forware":
            return "FWD";
            break;
        case "defender":
            return "DEF";
            break;
        case "midfielder":
            return "MD";
            break;
        case "goalkeeper":
            return "GK";
            break;

        default:
            return "PL";
            break;
    }
};
