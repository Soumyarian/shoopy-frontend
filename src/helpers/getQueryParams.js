const extractQueryString = (query) => {
    const queryObj = {}
    if (query) {
        const queryString = query.slice(1);
        const queryParts = queryString.split('&');
        queryParts.forEach(query => {
            const keyValue = query.split('=');
            queryObj[keyValue[0]] = keyValue[1]
        })
    }
    return queryObj;
}

export default extractQueryString;