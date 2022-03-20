const jwt = require('jsonwebtoken');

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const errors = [];

    if (!username) {
      errors.push('Username');
    }

    if (!password) {
      errors.push('Password');
    }

    if (errors.length > 0) {
      res.status(400);
      throw new Error(`Missing fields: ${errors}`);
    }

    if (username !== process.env.ADMIN_USERNAME || password !== process.env.ADMIN_PASSWORD) {
      res.status(403);
      throw new Error('Invalid username or password');
    }

    const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return res.json({
      ok: true,
      data: {
        token,
      },
    });
  } catch (err) {
    return next(err);
  }
};

exports.isAuthenticated = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(401);
    throw new Error('No token provided');
  }

  const [, token] = authorization.split(' ');

  if (!token) {
    res.status(401);
    throw new Error('Invalid token provided');
  }

  const isValid = jwt.verify(token, process.env.JWT_SECRET);

  if (!isValid) {
    res.status(401);
    throw new Error('Invalid token provided');
  }

  return next();
};
