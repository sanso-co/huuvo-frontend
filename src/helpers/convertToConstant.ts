export const convertToConstant = (param: string): string => {
    return param.replace(/-/g, "_").toUpperCase();
};
