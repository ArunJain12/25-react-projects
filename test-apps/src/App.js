import './App.css';
import PaginationTestApp from './components/1.pagination/test';
import DigitalClock from './components/2.digital-clock';
import CountDownTimerTest from './components/3.countdown-timer/test';
import StepProgressBarTest from './components/4.step-progress-bar/test';
import RandomQuoteGenerator from './components/5.random-quote-generator';
import TooltipTest from './components/6.tooltip/test';
import CurrencyConverter from './components/7.currency-converter';
import FilterProductsByCategory from './components/8.filter-products';
import TipCalculator from './components/9.tip-calculator';
import ProgessBar from './components/10.progress-bar';
import MusicPlayer from './components/11.music-player';
import BMICalculator from './components/12.bmi-calculator';
import ButtonRippleEffect from './components/13.button-ripple-effect';
import DragAndDropFeature from './components/14.drag-and-drop';
import FormValidation from './components/15.simple-form-validation';

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
      <CurrencyConverter />
      <FilterProductsByCategory />
      <TipCalculator />
      <ProgessBar />
      <MusicPlayer />
      <BMICalculator />
      <ButtonRippleEffect />
      <DragAndDropFeature />
    </div>
  );
}

export default App;
