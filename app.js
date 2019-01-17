const express = require("express")
const app = express()
const port = 3003
const data = require("./data.json")
const cors = require("cors")

app.use(cors())

app.get("/data", (req, res, next) =>{
  res.status(200).send({
    "message": "Success!",
    "data": data
  })
})

app.get("/:tag", (req, res, next) => {
  const tag = req.params.tag
  if(!data.tags.includes(tag)){
    res.status(404).send("No data matching your search term.")
  } else {
    const matching = data.songs.filter(songs => songs.tags.includes(tag))
    res.status(200).send(matching)
  }
})

app.use((req, res, next) => {
  res.status(404).send("Path not found.")
})

app.listen(port, () => console.log(`Porty on port ${port}!`))
