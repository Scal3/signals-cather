import Analyzer from "./Analyzer";
import ThreeSignalsCondition from "./threeSignals/ThreeSignalsCondition";
import ThreeSignalsHandler from "./threeSignals/ThreeSignalsHandler";

import FiveSignalsCondition from "./fiveSignals/FiveSignalsCondition";
import FiveSignalsHandler from "./fiveSignals/FiveSignalsHandler";


const START_INTERVAL_MS = 400;
const FINISH_INTERVAL_MS = 700;
const cb = () => console.log('Alert!');
const analyserTwoSignals = 
  new Analyzer(new ThreeSignalsCondition(START_INTERVAL_MS, FINISH_INTERVAL_MS), new ThreeSignalsHandler(), cb);

const analyserFiveSignals = 
  new Analyzer(new FiveSignalsCondition(START_INTERVAL_MS, FINISH_INTERVAL_MS), new FiveSignalsHandler(), cb);

setInterval(() => {
  const eventTime = Date.now();
  analyserTwoSignals.analyze(eventTime);
}, 500);

console.log('Started!!!');
