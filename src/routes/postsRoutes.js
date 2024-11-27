// Importa o framework Express para construir a aplicação web
import express from "express";

// Importa a biblioteca Multer para lidar com uploads de arquivos
import multer from "multer";

// Importa as funções controladoras do arquivo postsController.js
// (assumindo que elas lidam com lógica relacionada a posts)
import { listarPosts, postarNovoPost, uploadImagem,  atualizarNovoPost} from "../controllers/postsController.js";
import cors from "cors";

const corsOptions = {
  origin: "http://localhost:8000",
  optionsSuccessStatus: 200
}
// Configura o armazenamento em disco para arquivos enviados
const storage = multer.diskStorage({
  // Define o diretório de destino para arquivos enviados (por exemplo, 'uploads/')
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  // Mantém o nome original do arquivo enviado
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

// Cria uma instância do Multer configurada com o armazenamento em disco
const upload = multer({ storage });

// (Opcional) Ajuste o caminho de destino com base no sistema operacional
// (considere usar o módulo path para compatibilidade entre plataformas)
// const upload = multer({ dest: process.env.NODE_ENV === 'production' ? '/var/www/html/uploads' : './uploads' }); // Exemplo com variável de ambiente

// Define as rotas da API
const routes = (app) => {
  // Middleware essencial para analisar corpos de requisição JSON
  app.use(express.json());
  app.use(cors(corsOptions))

  // Rota GET para recuperar todos os posts (tratada pela função listarPosts)
  app.get("/posts", listarPosts);

  // Rota POST para criar um novo post (tratada pela função postarNovoPost)
  app.post("/posts", postarNovoPost);

  // Rota para upload de imagem (upload único com o campo de nome "imagem")
  // (tratada pela função uploadImagem)
  app.post("/upload", upload.single("imagem"), uploadImagem);

    app.put("/upload/:id", atualizarNovoPost)
};

// Exporta a função routes para uso em outros módulos
export default routes;