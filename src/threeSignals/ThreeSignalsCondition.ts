import { Condition } from "../types/Condion.interface";
import { HandlerCaseForThreeSignals } from "../types/HandlerCaseForThreeSignals.enum";

export default class ThreeSignalsCondition implements Condition {
  constructor (
    private START_INTERVAL_MS: number, 
    private FINISH_INTERVAL_MS: number, 
  ) {}

  checkCondition(array: number[], eventTime: number): string {
    const arrayLength = array.length;
    const isEventTimesArrayHasTwoElements = 
      this.isEventTimesArrayHasTwoElements(arrayLength);

    if(!isEventTimesArrayHasTwoElements) {
      return HandlerCaseForThreeSignals.DONT_EXIST_TWO_ELEMENTS;
    }

    const firstEventTime = array[arrayLength - 2];
    const secEventTime = array[arrayLength - 1];

    const isEnoughMsBetweenFirstAndSecEvt = 
      this.isEnoughMsBetweenFirstAndSecEvt(firstEventTime, secEventTime);

    if(!isEnoughMsBetweenFirstAndSecEvt) {
      return HandlerCaseForThreeSignals.DOESNT_HAVE_ENOUGH_MS;
    }

    const isThirdDifferenceCorrect = this.isDifferenceCorrect(eventTime - secEventTime);

    if (isThirdDifferenceCorrect) {
      return HandlerCaseForThreeSignals.SUCCESS;
    } else {
      return HandlerCaseForThreeSignals.NOT_CORRECT_THIRD_EVENT_TIME;
    }
  }

  private isEventTimesArrayHasTwoElements(
    eventsTimesListLength: number
  ): boolean {
    return eventsTimesListLength < 2 ? false : true;
  }

  private isEnoughMsBetweenFirstAndSecEvt(
    firstEventTime: number, secEventTime: number
  ): boolean {
    const difference = secEventTime - firstEventTime;
    return difference > this.START_INTERVAL_MS && difference < this.FINISH_INTERVAL_MS ? true : false;
  }

  private isDifferenceCorrect(time: number): boolean {
    return time > this.START_INTERVAL_MS && time < this.FINISH_INTERVAL_MS; 
  }
}

