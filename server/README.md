# BD Calculator Server

## Getting Started

### Development

1. `npm install`
2. `npm start`

### Production

1. Same as Development
2. 

## Routes

### GET /

Home route

### GET /:id

Results route

### POST /api/results

Post body format:

```javascript
{
  "external": [
    {"id": 1, "name": "P. simple", "references": "", "unitCost": 5, "quantities": 5},
    {"id": 2, "name": "P. simple avec site d'injection", "references": "", "unitCost": 5, "quantities": 5},
    {"id": 3, "name": "P. 3 voies", "references": "", "unitCost": 5, "quantities": 5},
    {"id": 4, "name": "P. 3 voies avec site d'injection", "references": "", "unitCost": 5, "quantities": 5},
    {"id": 5, "name": "P. de sécurité simple", "references": "", "unitCost": 5, "quantities": 5},
    {"id": 6, "name": "P. de sécurité 3 voies", "references": "", "unitCost": 5, "quantities": 5},
    {"id": 7, "name": "P. de sécurité avec site d'injection", "references": "", "unitCost": 5, "quantities": 5},
    {"id": 8, "name": "P. de sécurité 3 voies avec site d'injection", "references": "", "unitCost": 5, "quantities": 5},
    {"id": 9, "name": "P. de sécurité simple avec valve anti retour", "references": "", "unitCost": 5, "quantities": 5},
    {"id": 10, "name": "P. de sécurité 3 voies avec valve anti retour", "references": "", "unitCost": 5, "quantities": 5},
    {"id": 11, "name": "P. de sécurité avec valve bidirectionnelle", "references": "", "unitCost": 5, "quantities": 5}
  ],
  "internal": [
    {"id": 1, "name": "P. simple", "references": "", "unitCost": 2.5, "quantities": 5},
    {"id": 2, "name": "P. simple avec site d'injection", "references": "", "unitCost": 2.5, "quantities": 5},
    {"id": 3, "name": "P. 3 voies", "references": "", "unitCost": 2.5, "quantities": 5},
    {"id": 4, "name": "P. 3 voies avec site d'injection", "references": "", "unitCost": 2.5, "quantities": 5},
    {"id": 5, "name": "P. de sécurité simple", "references": "", "unitCost": 2.5, "quantities": 5},
    {"id": 6, "name": "P. de sécurité 3 voies", "references": "", "unitCost": 2.5, "quantities": 5},
    {"id": 7, "name": "P. de sécurité avec site d'injection", "references": "", "unitCost": 2.5, "quantities": 5},
    {"id": 8, "name": "P. de sécurité 3 voies avec site d'injection", "references": "", "unitCost": 2.5, "quantities": 5},
    {"id": 9, "name": "P. de sécurité simple avec valve anti retour", "references": "", "unitCost": 2.5, "quantities": 5},
    {"id": 10, "name": "P. de sécurité 3 voies avec valve anti retour", "references": "", "unitCost": 2.5, "quantities": 5},
    {"id": 11, "name": "P. de sécurité avec valve bidirectionnelle", "references": "", "unitCost": 2.5, "quantities": 5}
  ],
  "totals": {
    "internalCost": 137.5,
    "externalCost": 275,
    "savings": 137.5,
    "savingsPercentage": 50
  },
  "hospital": 0123456789,
  "email": "adam@createmarketing.co.uk"
}
```
