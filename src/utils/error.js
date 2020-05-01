export const getSimplifiedError = error => {
    const errorResponse = error.response && error.response.data;
    if (!errorResponse) {
        return 'Something went wrong, please try again later';
    }
    const errorKeys = Object.keys(errorResponse);
    if (errorKeys.includes('non_field_errors')) {
        return errorResponse.non_field_errors && errorResponse.non_field_errors[0];
    }
    const firstKey = errorKeys[0];
    return errorResponse[firstKey][0];
};
