import { HandlerInterface, HandlerParams } from "../types/Handler.interface";
import { HandlerCaseForFiveSignals } from "../types/HandlerCaseForFiveSignals.enum";

export default class FiveSignalsHandler implements HandlerInterface {
  public handleCases(handlerParams: HandlerParams): void {
    const {
      handleCase,
      array, 
      eventTime,
      cb,
      updateArrCb
    } = handlerParams;

    switch (handleCase) {
      case HandlerCaseForFiveSignals.SUCCESS:
        this.handleSuccessCase(updateArrCb, cb);
        break;
      case HandlerCaseForFiveSignals.DONT_EXIST_FOUR_ELEMENTS:
        this.handleDontExistFourthElementCase(eventTime, array);
        break;
      case HandlerCaseForFiveSignals.DOESNT_HAVE_ENOUGH_MS:
        this.handleDoesntHaveEnoughMsCase(eventTime, array);
        break;
      case HandlerCaseForFiveSignals.NOT_CORRECT_FIFTH_EVENT_TIME:
        this.handleNotCorrectFifthEventTimeCase(eventTime, updateArrCb);
        break;
      default:
        return;
    }
  }

  private handleDontExistFourthElementCase(evtTime: number, evtArr: number[]): void {
    evtArr.push(evtTime);
  }

  private handleDoesntHaveEnoughMsCase(evtTime: number, evtArr: number[]): void {
    evtArr.shift();
    evtArr.push(evtTime);
  }

  private handleSuccessCase(updateArrCb: Function, cb: Function): void {
    cb();
    updateArrCb();
  }

  private handleNotCorrectFifthEventTimeCase(evtTime: number, updateArrCb: Function): void {
    updateArrCb(evtTime);
  }
}