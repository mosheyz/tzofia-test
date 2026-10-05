export const success = (data) => {
    return { success: true, data: data };
};
export const fail = (msg) => {
    return { success: false, message: msg };
};
