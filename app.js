require("express-async-errors")
const express = require("express")
const notFoundMiddleware = require("./middleware/not-found")
const errorHandlerMiddleware = require("./middleware/error-handler")

const mainRouter = require("./routes/main")
require("dotenv").config()

const app = express()
app.use(express.json())

app.use("/api/v1", mainRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000
const start = async () => {
    try {
        app.listen(port, () => {
            console.log(`Server started on port ${port}...`)
        })
    } catch (error) {
        console.log(error)
    }
}
start()
