import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function formatDate(dateString?: string | null) {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString();
};