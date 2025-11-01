import { Area } from "react-easy-crop";
import countries from "country-list";
import { Database } from "@/types/database";

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

export const createImage = (url: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.addEventListener("load", () => resolve(image));
        image.addEventListener("error", (error) => reject(error));
        image.setAttribute("crossOrigin", "anonymous"); // prevents CORS issues
        image.src = url;
    });
};

export async function getCroppedImg(
    imageSrc: string,
    imageName: string,
    imageFormat: string,
    pixelCrop: Area
): Promise<File | null> {
    const image = await createImage(imageSrc);

    const croppedCanvas = document.createElement("canvas");
    const croppedCtx = croppedCanvas.getContext("2d");

    if (!croppedCtx) {
        console.error("Could not get 2D context");
        return null;
    }

    // Set cropped canvas size
    croppedCanvas.width = pixelCrop.width;
    croppedCanvas.height = pixelCrop.height;

    // Draw cropped image
    croppedCtx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
    );

    // Return as blob URL
    return new Promise((resolve, reject) => {
        croppedCanvas.toBlob(
            (blob) => {
                if (!blob) {
                    reject(new Error("Canvas is empty"));
                    return;
                }
                const file = new File([blob], `${imageName}`, {
                    type: imageFormat,
                });
                resolve(file);
            },
            "image/jpeg",
            0.6
        );
    });
}

export function capitalize(sentence: string) {
    const words = sentence.split(" ");

    const capitalizedSentence = words
        .map((word) => {
            return word[0].toUpperCase() + word.substring(1);
        })
        .join(" ");
    return capitalizedSentence;
}

type CountryOption = {
    name: string;
    code: string;
    icon: string;
};

export const getCountryList = (): CountryOption[] => {
    return countries
        .getData()
        .map(({ name, code }) => ({
            name,
            code,
            icon: `circle-flags:${code.toLowerCase()}`,
        }))
        .sort((a, b) => a.name.localeCompare(b.name));
};

export const getCountryIcon = (country: string) => {
    const code = countries.getCode(country);
    if (!code) return;
    return `circle-flags:${code.toLowerCase()}`;
};
export const getCountryCode = (country: string) => {
    return countries.getCode(country);
};

type Match = Database["public"]["Tables"]["matches"]["Row"];
export function getMatchStatus(match: Match) {
    if (!match) return;
    const { status, match_date, match_time } = match;

    if (status !== "confirmed") return status;

    const matchStart = new Date(`${match_date.split("T")[0]}T${match_time}Z`);
    const now = new Date();

    if (now >= matchStart) {
        return "live";
    }
}
