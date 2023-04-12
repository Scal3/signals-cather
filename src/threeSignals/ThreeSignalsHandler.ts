import { HandlerInterface, HandlerParams } from "../types/Handler.interface";
import { HandlerCaseForThreeSignals } from "../types/HandlerCaseForThreeSignals.enum";

export default class ThreeSignalsHandler implements HandlerInterface {
  public handleCases(handlerParams: HandlerParams): void {
    const {
      handleCase,
      array, 
      eventTime,
      cb,
      updateArrCb
    } = handlerParams;

    switch (handleCase) {
      case HandlerCaseForThreeSignals.SUCCESS:
        this.handleSuccessCase(updateArrCb, cb);
        break;
      case HandlerCaseForThreeSignals.DONT_EXIST_TWO_ELEMENTS:
        this.handleDontExistTwoElementsCase(eventTime, array);
        break;
      case HandlerCaseForThreeSignals.DOESNT_HAVE_ENOUGH_MS:
        this.handleDoesntHaveEnoughMsCase(eventTime, array);
        break;
      case HandlerCaseForThreeSignals.NOT_CORRECT_THIRD_EVENT_TIME:
        this.handleNotCorrectThirdEventTimeCase(eventTime, updateArrCb);
        break;
      default:
        return;
    }
  }

  private handleDontExistTwoElementsCase(evtTime: number, evtArr: number[]): void {
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

  private handleNotCorrectThirdEventTimeCase(evtTime: number, updateArrCb: Function): void {
    updateArrCb(evtTime);
  }
}