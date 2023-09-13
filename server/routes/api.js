const express = require('express');
const router = express.Router();

const Result = require('../models/results');

const api_key = 'key-905f66499ac6e46f539835aee2290d1c';
const domain = 'mg.createdev.co.uk';
const mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

const url = 'https://bd.createdev.co.uk/';

// router.get('/results', function(req, res, next) {
//   Result.findOne({}, function (err, result) {
//     if (err) {
//       console.error(err);
//       res.sendStatus(200);
//     } else {
//       console.log(result);
//       res.sendStatus(200);
//     }
//   })
// });

// Data structure:
// {
//   "external": [
//     {"id": 1, "name": "P. simple", "references": "", "unitCost": 5, "quantities": 5},
//     {"id": 2, "name": "P. simple avec site d'injection", "references": "", "unitCost": 5, "quantities": 5},
//     {"id": 3, "name": "P. 3 voies", "references": "", "unitCost": 5, "quantities": 5},
//     {"id": 4, "name": "P. 3 voies avec site d'injection", "references": "", "unitCost": 5, "quantities": 5},
//     {"id": 5, "name": "P. de sécurité simple", "references": "", "unitCost": 5, "quantities": 5},
//     {"id": 6, "name": "P. de sécurité 3 voies", "references": "", "unitCost": 5, "quantities": 5},
//     {"id": 7, "name": "P. de sécurité avec site d'injection", "references": "", "unitCost": 5, "quantities": 5},
//     {"id": 8, "name": "P. de sécurité 3 voies avec site d'injection", "references": "", "unitCost": 5, "quantities": 5},
//     {"id": 9, "name": "P. de sécurité simple avec valve anti retour", "references": "", "unitCost": 5, "quantities": 5},
//     {"id": 10, "name": "P. de sécurité 3 voies avec valve anti retour", "references": "", "unitCost": 5, "quantities": 5},
//     {"id": 11, "name": "P. de sécurité avec valve bidirectionnelle", "references": "", "unitCost": 5, "quantities": 5}
//   ],
//   "internal": [
//     {"id": 1, "name": "P. simple", "references": "", "unitCost": 2.5, "quantities": 5},
//     {"id": 2, "name": "P. simple avec site d'injection", "references": "", "unitCost": 2.5, "quantities": 5},
//     {"id": 3, "name": "P. 3 voies", "references": "", "unitCost": 2.5, "quantities": 5},
//     {"id": 4, "name": "P. 3 voies avec site d'injection", "references": "", "unitCost": 2.5, "quantities": 5},
//     {"id": 5, "name": "P. de sécurité simple", "references": "", "unitCost": 2.5, "quantities": 5},
//     {"id": 6, "name": "P. de sécurité 3 voies", "references": "", "unitCost": 2.5, "quantities": 5},
//     {"id": 7, "name": "P. de sécurité avec site d'injection", "references": "", "unitCost": 2.5, "quantities": 5},
//     {"id": 8, "name": "P. de sécurité 3 voies avec site d'injection", "references": "", "unitCost": 2.5, "quantities": 5},
//     {"id": 9, "name": "P. de sécurité simple avec valve anti retour", "references": "", "unitCost": 2.5, "quantities": 5},
//     {"id": 10, "name": "P. de sécurité 3 voies avec valve anti retour", "references": "", "unitCost": 2.5, "quantities": 5},
//     {"id": 11, "name": "P. de sécurité avec valve bidirectionnelle", "references": "", "unitCost": 2.5, "quantities": 5}
//   ],
//   "totals": {
//     "internalCost": 137.5,
//     "externalCost": 275,
//     "savings": 137.5,
//     "savingsPercentage": 50
//   },
//   "hospital": 0123456789,
//   "email": "adam@createmarketing.co.uk"
// }

router.post('/results', function(req, res, next) {
  var result = new Result(req.body);

  result.save(function (err, result) {
    if (err) console.error(err);
    if (result) console.log(result);
    var data = {
      from: 'BD Calculator <noreply@createdev.co.uk>',
      to: req.body.email,
      subject: 'BD Calculator Report',
      text: 'Click here for your results: ' + url + result._id
    };
     
    mailgun.messages().send(data, function (error, body) {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        console.log(body);
        res.sendStatus(200);
      }
    });
  });
});

module.exports = router;
