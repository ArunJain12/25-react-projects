import { useEffect, useState } from "react";
import "./currency.css";

function CurrencyConverter() {
    const [ amount, setAmount ] = useState(1);
    const [ fromCurrency, setFromCurrency ] = useState('INR');
    const [ toCurrency, setToCurrency ] = useState('USD');
    const [ convertedAmount, setConvertedAmount ] = useState();
    const [ exchangeRate, setExchangeRate ] = useState();

    async function fetchExchangeRate() {
        const exchangeRateRequest = await fetch(`https://open.er-api.com/v6/latest/${fromCurrency}`, {
            method: 'GET'
        });
        const result = await exchangeRateRequest.json();
        // console.log('Response for Exchange Rate request: ', result);
        const currentExchangeRate = result?.rates[toCurrency];
        setExchangeRate(currentExchangeRate);
        setConvertedAmount((amount * currentExchangeRate).toFixed(2));
    }

    useEffect(() => {
        fetchExchangeRate();
    }, [amount, fromCurrency, toCurrency]);

    return (
        <div className="currency-converter">
            <h1>Currency Converter</h1>
            <div className="input-container">
                <input 
                    type="number"
                    placeholder="Enter Amount"
                    name="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
                <select name="fromCurrency" value={fromCurrency} onChange={e => setFromCurrency(e.target.value)} >
                    <option value={'AED'}>AED</option>
                    <option value={'AUD'}>AUD</option>
                    <option value={'EUR'}>EUR</option>
                    <option value={'INR'}>INR</option>
                    <option value={'USD'}>USD</option>
                </select>
            </div>
            <p>To</p>
            <div className="input-container">
                <input type="text" name="convertedAmount" value={convertedAmount} readOnly />
                <select name="toCurrency" value={toCurrency} onChange={e => setToCurrency(e.target.value)}  >
                    <option value={'AED'}>AED</option>
                    <option value={'AUD'}>AUD</option>
                    <option value={'EUR'}>EUR</option>
                    <option value={'INR'}>INR</option>
                    <option value={'USD'}>USD</option>
                </select>
            </div>
            <p className="exchange-rate">Exchange Rate: 1 {fromCurrency} = {exchangeRate} {toCurrency}</p>
        </div>
    )
}

export default CurrencyConverter;