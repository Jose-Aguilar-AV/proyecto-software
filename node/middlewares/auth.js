import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  try {
    // Espera: Authorization: Bearer <token>
    const header = req.headers.authorization || "";
    const [type, token] = header.split(" ");

    if (type !== "Bearer" || !token) {
      return res.status(401).json({ mensaje: "Token no enviado" });
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // payload tendrá { id, correo, iat, exp }
    req.user = payload;
    next();
  } catch (e) {
    return res.status(401).json({ mensaje: "Token inválido o expirado" });
  }
};
