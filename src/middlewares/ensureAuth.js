import jwt from 'jsonwebtoken';

const ensureAuth = (req, res, next) => {
  const authToken = req.headers.authorization || "";

  if (!authToken) {
    return res.sendStatus(401);
  }

  try {
    const [, token] = authToken?.split(' ');
    const sub = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      id: sub.id
    };

    return next();
  } catch (err) {
    return res.sendStatus(401);
  }
}

export default ensureAuth;