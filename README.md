# Myanmar Exchange Rate (CB Bank)

- for More Detail [https://forex.cbm.gov.mm/index.php/api]


## Usage

```const exchange = require('./dist/mmExchange');```

```
exchange.allInKyat((res)=>{
    console.log(res);
}, $DATE )
```

```
xchange.get( $CURRENCY_CODE ,(res)=>{
    console.log(res);
}, $DATE )
```

- allInKyats function will give all output in Kyats 
- get function will give base on 1 $CURRENCY_CODE

- $DATE can be empty or (DD-MM-YYYY) 
- $DATE empty value will get today Exchange Rate
- $CURRENCY_CODE , Example - 'USD' , 'MMK' , 'SGD' ( it will give output base on 1 )
