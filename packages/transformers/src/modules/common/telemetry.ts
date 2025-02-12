import { XMessage } from "@samagra-x/xmessage";
import { Events } from "@samagra-x/uci-side-effects";


export class TelemetryLogger {

  constructor(readonly config: Record<string, any>) {}

  public async sendErrorTelemetry(xmsg: XMessage, error: string) {
    const xmgCopy = { ...xmsg };
    xmgCopy.transformer!.metaData!.errorString = error;
    this.config.eventBus.pushEvent({
      eventName: Events.CUSTOM_TELEMETRY_EVENT_ERROR,
      transformerId: this.config.transformerId,
      eventData: xmgCopy,
      timestamp: Math.floor((performance.timeOrigin + performance.now()) * 1000),
    })
  }

  public async sendLogTelemetry(xmsg: XMessage, log: string, startTime: number, eventId?: string) {
    const xmgCopy = { ...xmsg };
    xmgCopy.transformer!.metaData!.telemetryLog = log;
    xmgCopy.transformer!.metaData!.stateExecutionTime = Math.floor((performance.timeOrigin + performance.now()) * 1000) - startTime;
    xmgCopy.transformer!.metaData!.eventId = eventId;
    this.config.eventBus.pushEvent({
      eventName: Events.CUSTOM_TELEMETRY_EVENT_LOG,
      transformerId: this.config.transformerId,
      eventData: xmgCopy,
      timestamp: Math.floor((performance.timeOrigin + performance.now()) * 1000),
    })
  }
}
