import { ServerRespond } from './DataStreamer';

export interface Row {
  //updated the structure of object returned by generateRow to match the schema of table in graph
  price_abc:number,
  price_def:number,
  ratio:number,
  timestamp: Date,
  upper_bound:number,
  lower_bound:number,
  trigger_alert:number|undefined,
}


export class DataManipulator {
  //updated the generateRow to return necessary data points.
  static generateRow(serverRespond: ServerRespond[]):Row {
    const price_ABC = (serverRespond[0].top_ask.price + serverRespond[0].top_bid.price)/2;
    const price_DEF = (serverRespond[1].top_ask.price + serverRespond[1].top_bid.price)/2;
    const ratio = price_ABC/price_DEF;
    const upperBound = 1+0.07;
    const lowerBound = 1-0.06;
    return{
      price_abc:price_ABC,
      price_def:price_DEF,
      ratio,
      timestamp:serverRespond[0].timestamp>serverRespond[1].timestamp? serverRespond[0].timestamp:serverRespond[1].timestamp,
      upper_bound:upperBound,
      lower_bound:lowerBound,
      trigger_alert:(ratio>upperBound||ratio<lowerBound)?ratio:undefined,
    }
  }
}