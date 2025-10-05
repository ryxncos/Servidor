
const express = require('express');
const app = express();

app.use(express.json()); // Isso permite ler JSON no corpo da requisição


let bd = [
    {
        "id": 1,
        "marca": "Samsumg",
        "modelo": "A25",
        "armazenamento": 256,
        "ano": 2023,
        "tela": 6.5,
        "preco":2.199
    },
    {
        "id": 2,
        "marca": "Iphone",
        "modelo": "17",
        "armazenamento": 512,
        "ano": 2025,
        "tela": 6.3,
        "preco":2.199
    },
    {
        "id": 3,
        "marca": "Xiaomi",
        "modelo": "Redmi Note 14",
        "armazenamento": 128,
        "ano": 2023,
        "tela": 6.67,
        "preco":7.199   
    },
]



app.get('/', (req,res) => {
    return res.json('message: lá ele mil vezes')
})
app.get('/celulares', (req,res)=> {
    return res.json( bd )
})
app.get('/celulares/:ano', (req,res)=>{
    let ano = req.params.ano;
    let anoEncontrado = []
    for( let prod of bd ){
        if (prod.ano == ano){
            anoEncontrado.push( prod )
        }
    }
    res.json(anoEncontrado)
})
app.get('/celulares/armazenamento/:min/:max', (req,res)=>{
    let min = req.params.min
    let max = req.params.max
    let minMaxEncontrados = []

    for (let prod of bd){
        if (prod.armazenamento >= min && prod.armazenamento<= max) {
            minMaxEncontrados.push(prod)
        }
    }
    return res.json(minMaxEncontrados)
})
app.get('/celulares/busca/:termo', (req,res)=>{
    let marca = req.params.termo
    let buscaMarca = []
    for(let prod of bd){
        if (prod.marca == marca){
            buscaMarca.push(prod)
        }
    }
    return res.json(buscaMarca)
})
app.post('/celulares', (req,res)=>{
    let {id,marca,modelo,armazenamento,ano,tela,preco} = req.body

    let novo_celular ={
        id:id,
        marca:marca,
        modelo:modelo,
        armazenamento:armazenamento,
        ano:ano,
        tela:tela,
        preco:preco
    }
    bd.push(novo_celular)
    return res.json(novo_celular)
})
app.put('/celulares/:id', (req, res) => {
    let { id, marca, modelo, armazenamento, ano, tela, preco } = req.body;
    let idReq = req.params.id
    

    
    
    // Procura o produto pelo ID
    let produto = bd.find(prod => prod.id == idReq);

    if (!produto) {
        return res.status(404).json({ erro: "Produto não encontrado." });
    }

    // Atualiza os campos se eles forem enviados no corpo da requisição
    if (id !== undefined) produto.id = id;
    if (marca !== undefined) produto.marca = marca;
    if (modelo !== undefined) produto.modelo = modelo;
    if (armazenamento !== undefined) produto.armazenamento = armazenamento;
    if (ano !== undefined) produto.ano = ano;
    if (tela !== undefined) produto.tela = tela;
    if (preco !== undefined) produto.preco = preco;

    // Retorna o produto atualizado
    res.json(produto);
});
app.delete('/celulares/:id', (req,res)=> {
    const id = parseInt(req.params.id) //(parseInt)=> Parametros de rota vêm como String, é necessário fazer a conversão para inteiro
    const index = bd.findIndex(item => item.id ===id) //Procura o índice do item dentro do objeto/array BD cujo ID seja igual ao ID fornecido na URL
    
    //Verifica se os dados existem para o ID
    if (index === -1){
        return res.status(404).json({mensagem: "Celular não encontrado"})
    }
    //Remover os dados do objeto usando splice
    bd.splice(index,1) //Remove 1 elemtno do BD a partir da posição index
    res.json({message: "Celular deletado com sucesso"})

})
app.listen(3000, ()=>{
    console.log(`Servidor rodando na porta 3000...`)
})