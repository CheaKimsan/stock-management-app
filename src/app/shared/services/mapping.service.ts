import { format, parse, differenceInSeconds } from 'date-fns';


export class MappingService {
  constructor() { }

  static dateKey() {
    return Number(format(new Date(), 'yyyyMMdd'));
  }

  static pageKey() {
    return Number(format(new Date(), 'yyyyMMddHHmmss'));
  }

  

  static yearKey(formatStr: string) {
    const converted = formatStr.replace(/YYYY/g, 'yyyy').replace(/DD/g, 'dd');
    return Number(format(new Date(), converted));
  }

  static currentTime(): string {
    return new Date().toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
  }

  static currentDate(): string {
    return new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }

}

