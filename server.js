const express = require('express');
const cors = require('cors');
const youtubedl = require('yt-dlp-exec');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/search', async (req, res) => {
  const query = req.query.q;
  if (!query) return res.status(400).json({ error: 'Falta el término de búsqueda' });

  try {
    const output = await youtubedl(ytsearch10:${query}, {
      dumpSingleJson: true,
      noWarnings: true,
      flatPlaylist: true,
    });

    const results = (output.entries || []).map((item) => ({
      id: item.id,
      title: item.title,
      artist: item.uploader || 'YouTube Audio',
      duration: item.duration,
      thumbnail: https://i.ytimg.com/vi/${item.id}/hqdefault.jpg,
    }));

    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al buscar en YouTube' });
  }
});

app.get('/stream/:videoId', async (req, res) => {
  const { videoId } = req.params;
  const quality = req.query.quality === 'low' ? 'worstaudio' : 'bestaudio';

  try {
    const output = await youtubedl(https://www.youtube.com/watch?v=${videoId}, {
      dumpSingleJson: true,
      format: ${quality}[ext=m4a]/${quality},
      noWarnings: true,
    });

    res.json({
      url: output.url,
      title: output.title,
      ext: output.ext,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al extraer el audio' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(Servidor corriendo en http://localhost:${PORT}));
