const express = require("express")
const server = express()

//configurar a pasta publica
server.use(express.static("public"))

//utilisando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

//configurar caminhos da aplicação
//pagina inicial
//req = requisição(pedido)
//res = resposta
server.get("/", (req,res) => {
    return res.render("index.html", {title:"Seu marketplace de resíduos"})
})
server.get("/create-point", (req,res) => {
    return res.render("create-point.html")
})

server.get("/search-results", (req,res) => {
    return res.render("search-results.html")
})




//ligar o servidor
server.listen(3000)

