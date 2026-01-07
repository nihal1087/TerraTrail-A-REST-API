import http from 'node:http'
import { getDataFromDB } from './database/db.js'
import { sendJSONResponse } from './utils/sendJSONResponse.js'
import { getDataByPathParams } from './utils/getDataByPathParams.js'
import { getDataByQueryParams } from './utils/getDataByQueryParams.js'

const PORT = process.env.PORT || 8001

const server = http.createServer(async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Methods", "GET")
    res.setHeader("Access-Control-Allow-Headers", "Content-Type")

    if (req.method === 'OPTIONS') {
        res.writeHead(204)
        return res.end()
    }

    if (req.method !== 'GET') {
        return sendJSONResponse(res, 405, {
            message: "Method Not Allowed"
        })
    }

    const destinations = await getDataFromDB()
    const urlObj = new URL(req.url, `http://${req.headers.host}`)
    const queryObj = Object.fromEntries(urlObj.searchParams)

    if (urlObj.pathname === "/api") {
        const filteredData = getDataByQueryParams(destinations, queryObj)
        if (!filteredData.length) {
            return sendJSONResponse(res, 404, { message: "No destinations found" })
        }
        return sendJSONResponse(res, 200, filteredData)
    }

    if (urlObj.pathname.startsWith('/api/continent')) {
        const continent = urlObj.pathname.split('/').pop()
        const filteredData = getDataByPathParams(destinations, 'continent', continent)
        if (!filteredData.length) {
            return sendJSONResponse(res, 404, { message: "No destinations found" })
        }
        return sendJSONResponse(res, 200, filteredData)
    }

    if (urlObj.pathname.startsWith('/api/country')) {
        const country = urlObj.pathname.split('/').pop()
        const filteredData = getDataByPathParams(destinations, 'country', country)
        if (!filteredData.length) {
            return sendJSONResponse(res, 404, { message: "No destinations found" })
        }
        return sendJSONResponse(res, 200, filteredData)
    }

    return sendJSONResponse(res, 404, {
        error: "not found",
        message: "The requested route does not exist"
    })
})


server.listen(PORT, () => console.log(`Connected on PORT: ${PORT}`));
