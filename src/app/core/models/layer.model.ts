
export type MapLayerId =
    | 'roadmap'
    | 'satellite'
    | 'hybrid'
    | 'terrain'
    | 'traffic'
    | 'transit'
    | 'bicycling';

export interface MapLayer {
    id: MapLayerId;
    label: string;
    icon: string;
    isBase: boolean;
}

export const MAP_LAYERS: MapLayer[] = [
    {
        id: 'roadmap',
        label: 'Default',
        icon: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10',
        isBase: true,
    },
    {
        id: 'satellite',
        label: 'Satellite',
        icon: 'M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z M2 12h20 M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z',
        isBase: true,
    },
    {
        id: 'hybrid',
        label: 'Hybrid',
        icon: 'M3 3h7v7H3z M14 3h7v7h-7z M14 14h7v7h-7z M3 14h7v7H3z',
        isBase: true,
    },
    {
        id: 'terrain',
        label: 'Terrain',
        icon: 'M8 3L2 21h20L16 3l-4 11z',
        isBase: true,
    },
    {
        id: 'traffic',
        label: 'Traffic',
        icon: 'M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z M12 8v4 M12 14h.01',
        isBase: false,
    },
    {
        id: 'transit',
        label: 'Transit',
        icon: 'M4 11l8-8 8 8v10a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z M9 22v-7h6v7',
        isBase: false,
    },
    {
        id: 'bicycling',
        label: 'Cycling',
        icon: 'M12 2a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM5 20a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm14 0a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm-9-4l2-6 3 4h4',
        isBase: false,
    },
];
