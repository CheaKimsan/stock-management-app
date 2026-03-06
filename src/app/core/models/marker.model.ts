export type MarkerStatus = 'active' | 'idle' | 'offline';

export interface MapMarker {
  id: string;
  title: string;
  description: string;
  status: MarkerStatus;
  position: {
    lat: number;
    lng: number;
  };
  lastSeen?: Date;
  speed?: number;
  battery?: number;
}

export interface StatusCounts {
  active: number;
  idle: number;
  offline: number;
  total: number;
}
