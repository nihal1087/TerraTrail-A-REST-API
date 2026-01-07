export const getDataByPathParams = (data, locationType, locationName) => {
    return data.filter(destination => {
        const value = destination[locationType]

        if (!value) return false

        return value.toLowerCase() === locationName.toLowerCase()
    })
}
