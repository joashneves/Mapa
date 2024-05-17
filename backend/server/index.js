// server/index.js
const fs = require('fs');
const express = require("express");
var cors = require('cors')

const ip = '172.31.254.120';

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());

app.use(cors())

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.post('/salvar-configuracoes', (req, res) => {
  const configuracoes = req.body; // Dados recebidos do cliente
  const jsonString = JSON.stringify(configuracoes, null, 2); // Formatação legível com 2 espaços

  fs.writeFile('configuracoes.json', jsonString, (err) => {
      if (err) {
          console.error('Erro ao salvar arquivo:', err);
          res.status(500).send('Erro ao salvar arquivo');
      } else {
          console.log('Arquivo salvo com sucesso!');
          res.status(200).send('Arquivo salvo com sucesso!');
      }
  });
});

app.get('/carregar-configuracoes', (req, res) => {
  fs.readFile('configuracoes.json', (err, data) => {
      if (err) {
          console.error('Erro ao carregar arquivo:', err);
          res.status(500).send('Erro ao carregar arquivo');
      } else {
          console.log('Arquivo carregado com sucesso!');
          const configuracoes = JSON.parse(data);
          res.status(200).json(configuracoes);
      }
  });
});

app.put('/atualizar-configuracoes', (req, res) => {
  const novasConfiguracoes = req.body;

  fs.readFile('configuracoes.json', (err, data) => {
    if (err) {
      console.error('Erro ao carregar arquivo:', err);
      return res.status(500).send('Erro ao carregar arquivo');
    }

    const configuracoesExistentes = JSON.parse(data);
    const configuracoesAtualizadas = { ...configuracoesExistentes, ...novasConfiguracoes };
    const jsonString = JSON.stringify(configuracoesAtualizadas);

    fs.writeFile('configuracoes.json', jsonString, (err) => {
      if (err) {
        console.error('Erro ao salvar arquivo:', err);
        return res.status(500).send('Erro ao salvar arquivo');
      }
      console.log('Arquivo atualizado com sucesso!');
      res.status(200).send('Arquivo atualizado com sucesso!');
    });
  });
});

app.listen(PORT, ip, () => {
  console.log(`Server listening on http://${ip}:${PORT}`);
});

app.listen(80, function () {
  console.log('CORS-enabled web server listening on port 80')
})