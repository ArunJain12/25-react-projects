import './App.css';
import PaginationTestApp from './components/1.pagination/test';
import DigitalClock from './components/2.digital-clock';
import CountDownTimerTest from './components/3.countdown-timer/test';
import StepProgressBarTest from './components/4.step-progress-bar/test';
import RandomQuoteGenerator from './components/5.random-quote-generator';
import TooltipTest from './components/6.tooltip/test';

function App() {
  return (
    <div className="App">
      <h1 className='title'>25 React JS Interview Projects</h1>
      <PaginationTestApp />
      <DigitalClock />
      <CountDownTimerTest />
      <StepProgressBarTest />
      <RandomQuoteGenerator />
      <TooltipTest />
    </div>
  );
}

export default App;
