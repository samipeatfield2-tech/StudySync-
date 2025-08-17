// server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const client_id = '99a1019d30c04e339ac32c72eb44f3ff';
const client_secret = '4e167e226d2149bcbbf478ef952f9715';
const redirect_uri = 'https://github.com/samipeatfield2-tech/StudySync-/callback';

app.post('/get-token', async (req, res) => {
  const code = req.body.code;
  try {
    const response = await axios.post('https://accounts.spotify.com/api/token', null, {
      params: {
        grant_type: 'authorization_code',
        code,
        redirect_uri,
        client_id,
        client_secret
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Token exchange failed', details: error.response.data });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
