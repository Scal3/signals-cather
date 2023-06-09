import { Condition } from "../types/Condion.interface";
import { HandlerCaseForFiveSignals } from "../types/HandlerCaseForFiveSignals.enum";

export default class FiveSignalsCondition implements Condition {
  constructor (
    private START_INTERVAL_MS: number, 
    private FINISH_INTERVAL_MS: number, 
  ) {}

  checkCondition(array: number[], eventTime: number): string {
    const arrayLength = array.length;
    const isEventTimesArrayHasFourElements = 
      this.isEventTimesArrayHasFourElements(arrayLength);

    if(!isEventTimesArrayHasFourElements) {
      return HandlerCaseForFiveSignals.DONT_EXIST_FOUR_ELEMENTS;
    }

    const firstArrayElement = arrayLength - 4;
    const secArrayElement = arrayLength - 3;
    const thirdArrayElement = arrayLength - 2;
    const fourthArrayElement = arrayLength - 1;

    const firstEventTime = array[firstArrayElement];
    const secEventTime = array[secArrayElement];
    const thirdEventTime = array[thirdArrayElement];
    const fourthEventTime = array[fourthArrayElement];

    const isEnoughMsBetweenElements = 
      this.isEnoughMsBetweenElements(firstEventTime, secEventTime, thirdEventTime, fourthEventTime);

    if(!isEnoughMsBetweenElements) {
      return HandlerCaseForFiveSignals.DOESNT_HAVE_ENOUGH_MS;
    }

    const isFifthDifferenceCorrect = this.isDifferenceCorrect(eventTime - fourthEventTime);

    if (isFifthDifferenceCorrect) {
      return HandlerCaseForFiveSignals.SUCCESS;
    } else {
      return HandlerCaseForFiveSignals.NOT_CORRECT_FIFTH_EVENT_TIME;
    }
  }

  private isEventTimesArrayHasFourElements(
    eventsTimesListLength: number
  ): boolean {
    return eventsTimesListLength >= 4;
  }

  private isEnoughMsBetweenElements(
    firstEventTime: number, secEventTime: number, 
    thirdEventTime: number, fourthEventTime: number
  ): boolean {
    let isCorrect = false;
    const differenceFourthThird = this.isDifferenceCorrect(fourthEventTime - thirdEventTime);
    const differenceThirdSec = this.isDifferenceCorrect(thirdEventTime - secEventTime);
    const differenceSecFirst = this.isDifferenceCorrect(secEventTime - firstEventTime);

    if (differenceFourthThird && differenceThirdSec && differenceSecFirst) {
      isCorrect = true;
    }

    return isCorrect;
  }

  private isDifferenceCorrect(time: number): boolean {
    return time > this.START_INTERVAL_MS && time < this.FINISH_INTERVAL_MS; 
  }
}

