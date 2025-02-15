export const getLetterMapping = (shelfNumber: number) => {
    return String.fromCharCode("A".charCodeAt(0) + (shelfNumber - 1));
};