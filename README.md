# Myanmar Exchange Rate (CB Bank)

- for More Detail https://forex.cbm.gov.mm/index.php/api


## Usage

### Require axios

```npm install axios --save```
```npm install xchg --save```

```const xchg = require('xchg');```

```
xchg.allInKyat((res)=>{
    console.log(res);
}, $DATE )
```

```
xchg.get( $CURRENCY_CODE ,(res)=>{
    console.log(res);
}, $DATE )
```

```
xchg.get( $CURRENCY_CODE ,(res)=>{
    console.log(res);
}) //latest rate
```

- allInKyats function will give all results in Kyats 
- get function will give base on 1 $CURRENCY_CODE

- $DATE can be empty or (DD-MM-YYYY) 
- $DATE empty || null  value will get today Exchange Rate
- $CURRENCY_CODE , Example - 'USD' , 'MMK' , 'SGD' ( it will give results base on 1 )
