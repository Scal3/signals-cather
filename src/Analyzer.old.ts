// enum HandleCaseOld {
//   SUCCESS = 'success',
//   DONT_EXIST_TWO_ELEMENTS = 'do not exist two elements',
//   DOESNT_HAVE_ENOUGH_MS = 'does not have enough ms',
//   DOESNT_CORRECT_THIRD_EVENT_TIME = 'does not correct third event time',
// }

// class AnalyzerOld {
//   constructor (
//     private eventsTimesArray: number[],
//     private START_INTERVAL_MS: number, 
//     private FINISH_INTERVAL_MS: number, 
//     private cb: Function
//   ) {}

//   public analyze(eventTime: number): void {    
//     const eventsTimesArrayLength = this.eventsTimesArray.length;
//     const isEventTimesArrayHasTwoElements = 
//       this.isEventTimesArrayHasTwoElements(eventsTimesArrayLength);

//     if(!isEventTimesArrayHasTwoElements) {
//       return this.handleCases(HandleCaseOld.DONT_EXIST_TWO_ELEMENTS, eventTime);
//     }

//     const firstEventTime = this.eventsTimesArray[eventsTimesArrayLength - 2];
//     const secEventTime = this.eventsTimesArray[eventsTimesArrayLength - 1];

//     const isEnoughMsBetweenFirstAndSecEvt = 
//       this.isEnoughMsBetweenFirstAndSecEvt(firstEventTime, secEventTime);

//     if(!isEnoughMsBetweenFirstAndSecEvt) {
//       return this.handleCases(HandleCaseOld.DOESNT_HAVE_ENOUGH_MS, eventTime);
//     }

//     const { isSecTimeMinusFirstDifferenceCorrect, isThirdTimeMinusSecDifferenceCorrect } = 
//       this.getDifferences(firstEventTime, secEventTime, eventTime);

//     if (isSecTimeMinusFirstDifferenceCorrect && isThirdTimeMinusSecDifferenceCorrect) {
//       return this.handleCases(HandleCaseOld.SUCCESS, eventTime);
//     } else {
//       return this.handleCases(HandleCaseOld.DOESNT_CORRECT_THIRD_EVENT_TIME, eventTime);
//     }
//   }

//   private isEventTimesArrayHasTwoElements(
//     eventsTimesListLength: number
//   ): boolean {
//     const TWO = 2;
//     return eventsTimesListLength < TWO ? false : true;
//   }

//   private isEnoughMsBetweenFirstAndSecEvt(
//     firstEventTime: number, secEventTime: number
//   ): boolean {
//     const difference = secEventTime - firstEventTime;
//     return difference > this.START_INTERVAL_MS && difference < this.FINISH_INTERVAL_MS ? true : false;
//   }

//   private isDifferenceCorrect(time: number): boolean {
//     return time > this.START_INTERVAL_MS && time < this.FINISH_INTERVAL_MS; 
//   }

//   private getDifferences(
//     firstEventTime: number, secEventTime: number, thirdEventTime: number
//   ) {
//     const thirdTimeSecTimeDifference = thirdEventTime - secEventTime; 
//     const secTimeFirstTimeDifference = secEventTime - firstEventTime; 
//     const isThirdTimeMinusSecDifferenceCorrect = 
//       this.isDifferenceCorrect(thirdTimeSecTimeDifference);
//     const isSecTimeMinusFirstDifferenceCorrect = 
//       this.isDifferenceCorrect(secTimeFirstTimeDifference);

//     return {
//       isThirdTimeMinusSecDifferenceCorrect, isSecTimeMinusFirstDifferenceCorrect
//     }
//   }

//   private handleDontExistTwoElementsCase(eventTime: number): void {
//     this.eventsTimesArray.push(eventTime);
//   }

//   private handleDoesntHaveEnoughMsCase(eventTime: number): void {
//     this.eventsTimesArray.shift();
//     this.eventsTimesArray.push(eventTime);
//   }

//   private handleSuccessCase(): void {
//     this.cb();
//     this.eventsTimesArray = [];
//   }

//   private handleDoesntCorrectThirdEventTimeCase(eventTime: number): void {
//     this.eventsTimesArray = [eventTime];
//   }

//   private handleCases(handleCase: string, eventTime: number): void {
//     switch (handleCase) {
//       case HandleCaseOld.SUCCESS:
//         this.handleSuccessCase();
//         break;
//       case HandleCaseOld.DONT_EXIST_TWO_ELEMENTS:
//         this.handleDontExistTwoElementsCase(eventTime);
//         break;
//       case HandleCaseOld.DOESNT_HAVE_ENOUGH_MS:
//         this.handleDoesntHaveEnoughMsCase(eventTime);
//         break;
//       case HandleCaseOld.DOESNT_CORRECT_THIRD_EVENT_TIME:
//         this.handleDoesntCorrectThirdEventTimeCase(eventTime);
//         break;
//       default:
//         return;
//     }
//   }
// }


// const dataArrOld: number[] = [];
// const START_INTERVAL_MS_OLD = 400;
// const FINISH_INTERVAL_MS_OLD = 700;
// const cbOld = () => console.log('ШУХЕР, ПАЦАНЫЫЫ');
// const analyserOld = new AnalyzerOld(dataArrOld, START_INTERVAL_MS_OLD, FINISH_INTERVAL_MS_OLD, cbOld);

// setInterval(() => {
//   const eventTime = Date.now();
//   analyser.analyze(eventTime);
// }, 300);

