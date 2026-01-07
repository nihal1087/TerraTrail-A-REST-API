import http from 'node:http'
import { getDataFromDB } from './database/db.js'
import { sendJSONResponse } from './utils/sendJSONResponse.js'
import { getDataByPathParams } from './utils/getDataByPathParams.js'
import { getDataByQueryParams } from './utils/getDataByQueryParams.js'
import { marked } from 'marked'


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

    if (urlObj.pathname === '/' && req.method === 'GET') {
        const readmePath = path.join(process.cwd(), 'README.md')
        const markdown = await fs.readFile(readmePath, 'utf-8')
        const html = marked(markdown)

        res.writeHead(200, { 'Content-Type': 'text/html' })
        return res.end(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>TerraTrail API</title>
            <meta charset="utf-8" />
            <style>
                body {
                    font-family: system-ui, -apple-system, BlinkMacSystemFont;
                    max-width: 900px;
                    margin: 40px auto;
                    line-height: 1.6;
                    padding: 0 20px;
                }
                pre {
                    background: #f4f4f4;
                    padding: 12px;
                    overflow-x: auto;
                }
                code {
                    background: #eee;
                    padding: 2px 4px;
                }
            </style>
        </head>
        <body>
            ${html}
        </body>
        </html>
    `)
    }



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
