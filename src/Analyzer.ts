import { AnalyzerInterface } from "./types/Anylizer.interface";
import { Condition } from "./types/Condion.interface";
import { HandlerInterface } from "./types/Handler.interface";

export default class Analyzer implements AnalyzerInterface {
  private eventsTimesArray: number[] = [];

  constructor (
    private condition: Condition,
    private handler: HandlerInterface,
    private cb: Function
  ) {}

  public analyze(eventTime: number): void {    
    const handleCase = 
      this.condition.checkCondition(this.eventsTimesArray, eventTime);
    const handlerParams = {
      handleCase, 
      array: this.eventsTimesArray, 
      eventTime, 
      cb: this.cb,
      updateArrCb: this.updateArr
    }

    this.handler.handleCases(handlerParams);
  }

  private updateArr = (item: number): void => {
    item === undefined 
    ? this.eventsTimesArray = [] 
    : this.eventsTimesArray = [item];
  }
}
