export const getDataByQueryParams = (data, queryObj) => {

    const { continent, country, is_open_to_public } = queryObj

    if (continent) {
        data = data.filter(destination =>
            destination.continent.toLowerCase() === continent.toLowerCase()
        )
    }
    if (country) {
        data = data.filter(destination =>
            destination.country.toLowerCase() === country.toLowerCase()
        )
    }
    if (is_open_to_public !== undefined) {
        // Query parameters always come as strings ("true" / "false").
        // Convert the string value to an actual boolean so it can be
        // safely compared with the boolean `is_open_to_public` field in data.
        const isOpen = is_open_to_public.toLowerCase() === 'true'

        // Filter destinations based on public accessibility
        data = data.filter(d => d.is_open_to_public === isOpen)
    }

    return data
}