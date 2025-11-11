const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// ✅ List key hợp lệ
const validKeys = [
    'hayminhyeunhaunhe',
    'lamnytuidi',
    'uwu',
    'ctezudaytroi'
];

// Dummy dự đoán MD5
function predictMD5(md5, algo) {
    // Logic thật bạn sẽ tự thêm
    // Hiện tại chỉ demo trả ngẫu nhiên
    return {
        prediction: Math.random() > 0.5 ? 'Tài' : 'Xỉu',
        confidence: Math.floor(Math.random() * 21) + 80 // 80-100%
    };
}

// Route predict
app.post('/predict', (req, res) => {
    const { md5, algo, key } = req.body;

    if (!key || !validKeys.includes(key)) {
        return res.status(403).json({ error: 'Key invalid hoặc hết hạn' });
    }

    const result = predictMD5(md5, algo);
    res.json(result);
});

// Route test server
app.get('/', (req, res) => {
    res.send('Server đang chạy. Chọn POST /predict để dự đoán.');
});

// Route validate key
app.post('/validate', (req, res) => {
    const { key } = req.body;
    if (validKeys.includes(key)) return res.json({ valid: true });
    return res.json({ valid: false });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server chạy trên port ${PORT}`));
