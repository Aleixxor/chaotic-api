import express from "express";

const router = express.Router();

router.get("/ygo-api-prod", async (req, res) => {
  const { url } = req.query;

  const baseUrl = "https://ygo-api-prod.fly.dev";

  if (!url || typeof url !== "string") {
    return res.status(400).json({
      error: "Parâmetro 'url' é obrigatório."
    });
  }

  try {
    const response = await fetch(`${baseUrl}/${url}`, {
      headers: {
        "User-Agent": "Proxy/1.0",
        "Accept": "application/json"
      }
    });

    const contentType = response.headers.get("content-type");

    if (contentType) {
      res.setHeader("Content-Type", contentType);
    }

    const body = await response.text();

    return res.status(response.status).send(body);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Erro ao consultar a API."
    });
  }
});

export const ProxyRoutes = router;