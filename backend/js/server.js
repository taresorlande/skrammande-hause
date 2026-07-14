import express from "express";
import multer from "multer";

const PORT = 3000;
const app = express();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "tmp");
    },
    filename: (req, file, cb) => {
        const data = new Date().toISOString().replace(/\D/g, "");
        const ext = file.originalname.split(".").pop();

        cb(null, `${data}.${ext}`);
    }
});

const upload = multer({ storage });

app.use(express.static("tmp"));

app.get("/test", (req, res) => {
    return res.status(200).json ({
        status: "Ok"
    })
});

app.post("/upload", upload.single("image"), (req, res) =>{
    if (!req.file) {
        return res.status(400).json({
            success: false,
            message: "Arquivo não enviado."
        });
    }
    else {
        const uri = `${req.protocol}://${req.get("host")}`;
        res.status(201).json({
            success: true,
            message: "Imagem enviada com sucesso.",
            file: req.file.filename,
            url: `${uri}/${req.file.filename}`
        });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
