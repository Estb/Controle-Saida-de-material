const Models = require('../models/Requisitions')
const Status = require('http-status')

exports.findone = (request, response, next) => {
  const id = request.params.id

  Models.findById(id)
  .then(requisition => {
    if(requisition){
      response.send(requisition)
    } else {
      response.status(404).send()
    }
  })
  .catch(error => next(error))
}

exports.findAll = (request, response, next) =>{
  let limite = parseInt(request.query.limite || 0)
  let pagina = parseInt(request.query.pagina || 0)

  if(!Number.isInteger(limite) || !Number.isInteger(pagina)){
    response.status(Status.BAD_REQUEST).send()
  }

  const ITENS_BY_PAGE = 10

  limite = limite > ITENS_BY_PAGE || limite <= 0 ? ITENS_BY_PAGE : limite
  pagina = pagina <= 0 ? 0 : pagina * limite

  Models.findAll({ limit:limite, offset:pagina})
        .then((requisition) => {
          if(requisition && requisition.length) {
            response.send(requisition)
          } else {
            response.status(Status.NOT_FOUND).send()
          }
        })
        .catch((error) => next(error))
}

exports.create = (request, response, next ) => {

  const today = () => {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
  
      if (dd < 10) {
        dd = '0' + dd;
      }
  
      if (mm < 10) {
        mm = '0' + mm;
      }

      today = mm + '/' + dd + '/' + yyyy;
      document.write(today);

      var utc = new Date().toJSON().slice(0,10).replace(/-/g,'/');
      document.write(utc);
  }

  const title = request.body.title
  const author = request.body.author
  const description =  request.body.description
  const reason =  request.body.reason
  const mreturn =  request.body.mreturn
  const date_return =  request.body.date_return
  const authorized = 0

  Models.create({
      title : title,
      author: author,
      description: description,
      reason:reason,
      mreturn:mreturn,
      authorized:authorized,
      date_return:date_return,
    })
    .then( () => {
          response.status(201).send();
    })
    .catch((error) => next(error))

}

exports.update = (request, response, next ) => {
  const id = request.params.id
  const title = request.body.title
  const author = request.body.author
  const description =  request.body.description
  const reason =  request.body.reason
  const mreturn =  request.body.mreturn
  const date_return =  request.body.date_return
  const auditor_out = request.body.auditor_out
  const auditor_return = request.body.auditor_return
  const autorize1_by = request.body.autorize1_by
  const autorize2_by = request.body.autorize2_by
  const autorize3_by = request.body.autorize3_by

  Models.findById(id)
  .then(requisition => {
    if(requisition){
      Models.update(
        {
          date_return:date_return,
          auditor_out:auditor_out,
          auditor_return:auditor_return,
          autorize1_by:autorize1_by,
          autorize2_by:autorize2_by,
          autorize3_by:autorize3_by
        },
        {where: {id:id}}
      )
      .then( () => { response.send()})
      .catch (error => next (error));
    } else {
      response.status(Status.NOT_FOUND).send();
    }
  })
  .catch((error) => next(error))
}

exports.delete = (request, response, next ) => {
  const id = request.params.id

  Models.findById(id)
  .then(requisition => {
    if(requisition){
      Models.destroy(
        {where: {id:id}}
      )
      .then(()=> { response.send() })
      .catch((error) => next(error))
    } else {
      response.status(Status.NOT_FOUND).send()
    }
  })
  .catch((error) => next(error))
}