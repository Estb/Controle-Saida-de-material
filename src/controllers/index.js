const jwtConfig = require("../config/jwt");
const jwt = require("jsonwebtoken");

const Models = require("../models/Requisitions");
const Status = require("http-status");
const controller = require("./index");

exports.verifyJWT = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token)
    return res.status(401).send({ auth: false, message: "No token provided." });

  jwt.verify(token, jwtConfig.secret, function(err, decoded) {
    if (err)
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });

    // se tudo estiver ok, salva no request para uso posterior
    req.userId = decoded.id;
    req.level = decoded.level;
    req.security = decoded.security;

    next();
  });
};

exports.verifySec = (req, res, next) => {
  const security = req.security;

  if (security == 1) {
    next();
  } else {
    return res
      .status(500)
      .send({ auth: false, message: "You do not have permission." });
  }
};

exports.authorize1 = (req, res, next) => {
  const id = req.params.id; // requisitions id
  const userId = req.userId;

  Models.update(
    {
      autorize1_by: userId
    },
    { where: { id: id } }
  )
    .then(() => {
      res.send();
    })
    .catch(error => next(error));
};

exports.authorize2 = (req, res, next) => {
  const id = req.params.id; // requisitions id
  const userId = req.userId;

  Models.update(
    {
      autorize2_by: userId
    },
    { where: { id: id } }
  )
    .then(() => {
      res.send();
    })
    .catch(error => next(error));
};

exports.authorize3 = (req, res, next) => {
  const id = req.params.id; // requisitions id
  const userId = req.userId;

  Models.update(
    {
      autorize3_by: userId
    },
    { where: { id: id } }
  )
    .then(() => {
      res.send();
    })
    .catch(error => next(error));
};

exports.Authorize = (req, res, next) => {
  console.log("teste");
  const id = req.params.id; // requisitions id
  const authorize = 1;

  Models.update(
    {
      authorized: authorize
    },
    { where: { id: id } }
  )
    .then(() => {
      res.send();
    })
    .catch(error => next(error));
};

exports.FindRequisition = (req, res, next) => {
  const id = req.params.id;

  Models.findOne({ id, where: { id: id } })
    .then(requisition => {
      if (!requisition) {
        res.json({ sucess: false, message: "This requisition no exist" });
      } else {
        req.requisition = requisition;
        next();
      }
    })
    .catch(error => next(error));
};

const today = () => {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0!
  var yyyy = today.getFullYear();

  if (dd < 10) {
    dd = "0" + dd;
  }

  if (mm < 10) {
    mm = "0" + mm;
  }

  today = mm + "/" + dd + "/" + yyyy;
  document.write(today);

  var utc = new Date()
    .toJSON()
    .slice(0, 10)
    .replace(/-/g, "/");
  document.write(utc);
};
