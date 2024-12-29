import { useState } from "react";
import "./tip-calculator.css";

function TipCalculator() {
    const [ billAmount, setBillAmount ] = useState();
    const [ tipPercentage, setTipPercentage ] = useState(10);
    const [ splitCount, setSplitCount ] = useState(1);
    const [ totalBillAndTip, setTotalBillAndTip ] = useState(null);
    const [ errorMsg, setErrorMsg ] = useState('');

    function calculateTip() {
        if (
            !billAmount ||
            billAmount <= 0 ||
            !tipPercentage ||
            tipPercentage <= 0 ||
            !splitCount ||
            splitCount <= 0
        ) {
            setErrorMsg('Please enter valid values for Bill Amount, Tip Percentage & No. of Persons');
            setTotalBillAndTip(null);
            return;
        }
        const bill = parseFloat(billAmount);
        const tip = (bill * tipPercentage) / 100;
        const totalAmount = bill + tip;
        const tipAmountPerPerson = tip / splitCount;
        const totalAmountPerPerson = totalAmount / splitCount;
        setTotalBillAndTip({
            totalAmount: totalAmount.toFixed(2),
            tipPerPerson: tipAmountPerPerson.toFixed(2),
            totalAmountPerPerson: totalAmountPerPerson.toFixed(2)
        })
        setErrorMsg('');
    }

    return (
        <div className="tip-calculator">
            <h1>Tip Calculator</h1>
            <div className="input-container">
                <label>Bill Amount</label>
                <input
                    type="number"
                    value={billAmount}
                    onChange={e => setBillAmount(e.target.value)}
                />
            </div>
            <div className="input-container">
                <label>Tip Percentage</label>
                <input
                    type="number"
                    value={tipPercentage}
                    onChange={e => setTipPercentage(e.target.value)}
                />
            </div>
            <div className="input-container">
                <label>Number Of Persons</label>
                <input
                    type="number"
                    value={splitCount}
                    onChange={e => setSplitCount(e.target.value)}
                />
            </div>
            <button onClick={calculateTip}>Calculate Tip</button>
            {errorMsg ? <p className="error-msg">{errorMsg}</p> : null}
            {totalBillAndTip ? (
                <div className="tip-result-container">
                    <p>Total Amount: {totalBillAndTip.totalAmount}</p>
                    <p>Tip Per Person: {totalBillAndTip.tipPerPerson}</p>
                    <p>Total Amount Per Person: {totalBillAndTip.totalAmountPerPerson}</p>
                </div>
            ) : null}
        </div>
    );
}

export default TipCalculator;