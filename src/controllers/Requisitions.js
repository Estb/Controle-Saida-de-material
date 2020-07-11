const Models = require("../models/Requisitions");
const Status = require("http-status");
const controller = require("./index");

exports.findone = (req, res, next) => {
  const id = req.params.id;

  Models.findById(id)
    .then(requisition => {
      if (requisition) {
        res.send(requisition);
      } else {
        res.status(404).send();
      }
    })
    .catch(error => next(error));
};

exports.findAll = (req, res, next) => {
  let limite = parseInt(req.query.limite || 0);
  let pagina = parseInt(req.query.pagina || 0);

  if (!Number.isInteger(limite) || !Number.isInteger(pagina)) {
    res.status(Status.BAD_REQUEST).send();
  }

  const ITENS_BY_PAGE = 10;

  limite = limite > ITENS_BY_PAGE || limite <= 0 ? ITENS_BY_PAGE : limite;
  pagina = pagina <= 0 ? 0 : pagina * limite;

  Models.findAll({ limit: limite, offset: pagina })
    .then(requisition => {
      if (requisition && requisition.length) {
        res.send(requisition);
      } else {
        res.status(Status.NOT_FOUND).send();
      }
    })
    .catch(error => next(error));
};

exports.create = (req, res, next) => {
  const title = req.body.title;
  const author = req.body.author;
  const description = req.body.description;
  const reason = req.body.reason;
  const mreturn = req.body.mreturn;
  const date_return = req.body.date_return;
  const authorized = 0;
  const id = req.userId;

  Models.create({
    title: title,
    author: author,
    description: description,
    reason: reason,
    mreturn: mreturn,
    authorized: authorized,
    date_return: date_return,
    user_id: id
  })
    .then(() => {
      res.status(201).send();
    })
    .catch(error => next(error));
};

exports.requisition_in = (req, res, next) => {
  const id = req.params.id;
  const date_in = 1311;
  const security_in = req.userId;

  controller.FindRequisition(req, res, () => {
    const requisition = req.requisition;
    const reqid = requisition.id;
    const already_in = 1;
    const already_out = requisition.already_out

    if (id == reqid) {
      if (already_out == 1) {
        Models.update(
          {
            already_in: already_in,
            date_in: date_in,
            security_in: security_in
          },
          { where: { id: id } }
        )
          .then(() => {
            res.json({
              sucess: true,
              menssage: "Successful return of material",
              statusCode: 200
            });
          })
          .catch(error => next(error));
      } else {
        res.json({
          sucess: false,
          message: "Material not yet removed",
          statusCode: 400
        });
      }
    } else {
      res.json({
        sucess: false,
        message: "Something is not well",
        statusCode: 400
      });
    }
  });
};

exports.requisition_out = (req, res, next) => {
  const id = req.params.id;
  const date_out = 1311;
  const security_out = req.userId;

  controller.FindRequisition(req, res, () => {
    const requisition = req.requisition;
    const reqid = requisition.id;
    const already_out = 1;
    const authorized = requisition.authorized;

    if (id == reqid) {
      if (authorized == 1) {
        Models.update(
          {
            already_out: already_out,
            date_out: date_out,
            security_out: security_out
          },
          { where: { id: id } }
        )
          .then(() => {
            res.json({
              sucess: true,
              menssage: "Requisition released",
              statusCode: 200
            });
          })
          .catch(error => next(error));
      } else {
        res.json({
          sucess: false,
          message: "Requisition not authorized yet",
          statusCode: 400
        });
      }
    } else {
      res.json({
        sucess: false,
        message: "Something is not well",
        statusCode: 400
      });
    }
  });
};

exports.update = (req, res, next) => {
  const id = req.params.id;
  const title = req.body.title;
  const author = req.body.author;
  const description = req.body.description;
  const reason = req.body.reason;
  const mreturn = req.body.mreturn;
  const date_return = today();
  const date_out = today();
  const auditor_out = req.body.auditor_out;
  const auditor_return = req.body.auditor_return;
  const autorize1_by = req.body.autorize1_by;
  const autorize2_by = req.body.autorize2_by;
  const autorize3_by = req.body.autorize3_by;

  controller.FindRequisition(req, res, () => {
    const requisition = req.requisition;
    const userId = req.userId;
    const user_id = requisition.user_id;

    if (userId == user_id) {
      Models.update(
        {
          date_return: date_return,
          auditor_return: auditor_return,
          date_out: date_out, // precisa implementar
          auditor_out: auditor_out,
          autorize1_by: autorize1_by,
          autorize2_by: autorize2_by,
          autorize3_by: autorize3_by
        },
        { where: { id: id } }
      )
        .then(() => {
          res.send();
        })
        .catch(error => next(error));
    }
  });
};

exports.authorize = (req, res, next) => {
  const whoAuthorize = req.level;
  const id = req.params.id;

  controller.FindRequisition(req, res, () => {
    const requisition = req.requisition;
    const AlredyAuthorized = requisition.authorized;
    const mreturn = requisition.mreturn;

    if (AlredyAuthorized == 0) {
      if (whoAuthorize == 1) {
        if (requisition.autorize1_by == null) {
          controller.authorize1(req, res, next);
        } else {
          res.json({
            sucess: false,
            message: "Requisition already authorized by you",
            statusCode: 400
          });
        }
        return;
      }
      if (whoAuthorize == 2) {
        if (requisition.autorize2_by == null) {
          if (mreturn == 1) {
            controller.authorize2(req, res, next);
            controller.Authorize(req, res, next);
          } else {
            controller.authorize2(req, res, next);
          }
          return;
        } else {
          res.json({
            sucess: false,
            message: "Requisition already authorized by you, or by directors ",
            statusCode: 400
          });
        }
        return;
      }
      if (whoAuthorize == 3) {
        if (requisition.autorize3_by == null) {
          controller.authorize3(req, res, next);
          controller.Authorize(req, res, next);
        } else {
          res.json({
            sucess: false,
            message: "Requisition already authorized by you",
            statusCode: 400
          });
        }
      } else {
        res.status(Status.BAD_REQUEST);
        res.json({
          sucess: false,
          message: "You don't have rights for authorized this requisitions",
          statusCode: 400
        });
      }
    } else {
      res.json({
        sucess: false,
        message: "Requisition already authorized ",
        statusCode: 400
      });
    }
  });
};

exports.delete = (req, res, next) => {
  const id = req.params.id;

  Models.findById(id)
    .then(requisition => {
      if (requisition) {
        Models.destroy({ where: { id: id } })
          .then(() => {
            res.send();
          })
          .catch(error => next(error));
      } else {
        res.status(Status.NOT_FOUND).send();
      }
    })
    .catch(error => next(error));
};
