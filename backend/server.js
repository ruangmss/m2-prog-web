import express from 'express';

const app = express();
const port = 3000;

app.use(express.json());

const posts = [
  {
    userId: 1,
    id: 1,
    title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
    body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
  },
  {
    userId: 1,
    id: 2,
    title: 'qui est esse',
    body: 'est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla',
  },
  {
    userId: 1,
    id: 3,
    title: 'ea molestias quasi exercitationem repellat qui ipsa sit aut',
    body: 'et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut',
  },
];

app.get('/', (request, response) => {
  response.json({ message: 'Mensagem', status: 201, posts: posts });
});

app.get('/:id', (request, response) => {
  const id = Number(request.params.id);

  if (typeof id !== 'number') {
    response.status(400).send('Parâmetro inválido');
  }

  const post = posts.find((post) => post.id === Number(id));

  if (!post) {
    response.status(201).send('Post não encontrado');
  }

  response.json(post);
});

app.post('/', (request, response) => {});
app.patch('/:id', (request, response) => {});
app.delete('/:id', (request, response) => {});

app.use((request, response) => response.status(404).send('Rota não encontrada'));

app.listen(port, () => console.log(`Servidor online na porta: ${port}`));
