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
import FileUpload from './components/16.file-upload';
import Quiz from './components/17.quiz-app';
import NestedComments from './components/18.nested-comments';
import PdfViewer from './components/19.pdf-viewer';
import DebounceApiCall from './components/20.debounce-api-call';
import SortData from './components/21.sort-data';
import MovieApp from './components/22.movie-app';
import GoogleOAuthLogin from './components/23.google-oauth-login';
import StarRating from './components/24.star-rating';

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
      <FormValidation />
      <FileUpload />
      <Quiz />
      <NestedComments />
      <PdfViewer />
      <DebounceApiCall />
      <SortData />
      <MovieApp />
      <GoogleOAuthLogin />
      <StarRating />
    </div>
  );
}

export default App;
