export interface HandlerParams {
  handleCase: string; 
  array: number[]; 
  eventTime: number;
  cb: Function;
  updateArrCb: Function;
}

export interface HandlerInterface {
  handleCases(handlerParams: HandlerParams): void;
}