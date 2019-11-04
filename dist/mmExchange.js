const axios = require('axios');

const app = {};

app.rates = {};
app.currencies = {};
app.results = {};

app.allInKyat = async (callback , date = 'today')=>{
    if(date == 'today'){
        var res =  await axios.get('http://forex.cbm.gov.mm/api/latest');
        app.rates = res.data.rates;
    }
    else{
        var res =  await axios.get(' http://forex.cbm.gov.mm/api/history/'+date);
        app.rates = res.data.rates;
    }
    if(app.rates.length == 0 ) {
        callback([]); 
    }
    else{
        var res2 =  await axios.get('http://forex.cbm.gov.mm/api/currencies');
        app.currencies = res2.data.currencies;
        Object.keys(app.rates).forEach(function(key) {
            app.results[key] = {
                rate : app.str2number(app.rates[key])
            }
        });
        Object.keys(app.currencies).forEach(function(key) {
            app.results[key]['country'] =app.currencies[key]
        }); 
        
        callback(app.results);
    }
}

app.get = (curr = 'USD' , callback , date )=>{
    if(curr == null || curr == ''){
        curr = 'USD';
    }
    var currency = curr.toUpperCase();
    let output = {};
    app.allInKyat(res=>{
        if(res.length == 0 ) {
            callback({}); 
        }
        else{

            res['MMK'] = {
                rate: 1 ,
                country: 'Myanmar Kyat'
            }
            output[currency] = {
                rate: 1 ,
                country : res[currency].country
            }
            var temp = {};
            Object.keys(res).forEach( (key)=>{
                temp[key] = {
                    rate    : 1/ res[key].rate,
                    country : res[key].country
                } 
            })
            var rate = temp[currency].rate;
            Object.keys(temp).forEach( (key)=>{
                if(key != currency ){
                    output[key] = {
                        rate : app.round( temp[key].rate / rate , 6),
                        name : temp[key].country
                    } 
                }
            })
            
        callback(output);
        }
    } , date)
}

app.round = (val,decimals) =>{ 
	var y = app.str2number(val);
		y = (Math.abs(y) > 0.000000001)?y:0;
		if( decimals === 0 ){
			decimals = 0;
		}else{
			decimals = (decimals)?decimals:2;
		}
	var d = decimals*1+8;
		d = (d > 12)?12:d;
		y = Number(Math.round((y).toFixed(d)+'e'+d)+'e-'+d).toFixed(d);
		res = Number(Math.round((y+"").replace(/[^0-9.-]/g,'')+'e'+decimals)+'e-'+decimals).toFixed(decimals); 
	return app.str2number(res);
};

app.str2number = (val)=> {
	val  = val+'';
	return parseFloat(val.replace( /[^\d\.\-]/g, ""));
}

module.exports = app;