const express = require('express');
const cors = require('cors');
const app = express();

// Cho phép HTML gọi API từ domain khác
app.use(cors());

// Danh sách key mẫu
const keys = ['cocut','concac','daubuoi'];

// Endpoint validate
app.get('/api/validate', (req, res) => {
  const key = req.query.key;
  if(!key) return res.json({ok:false, message:'Missing key'});
  if(keys.includes(key)) return res.json({ok:true});
  return res.json({ok:false});
});

// Lắng nghe port từ Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
