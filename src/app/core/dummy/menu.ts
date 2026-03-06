export const droneConfigMenu = {
  overview: [
    { key: 1, isIonIcon: false, isImg: false, text: 'Overview Maps', toolTip: 'Overview Maps', route: '/drones/config-drone/overview', icon: 'add_location_alt', activeIcon: 'add_location_alt' },
  ],
  mediafile: [
    { key: 1, isIonIcon: true, isImg: false, text: 'Photo', toolTip: 'Photo Files', route: '/drones/config-drone/media-photo', icon: 'image-outline', activeIcon: 'image' },
    { key: 2, isIonIcon: true, isImg: false, text: 'Video', toolTip: 'Video Files', route: '/drones/config-drone/media-video', icon: 'videocam-outline', activeIcon: 'videocam' },
    { key: 3, isIonIcon: true, isImg: false, text: 'Compressed File', toolTip: 'Compressed Files', route: '/drones/config-drone/media-compress', icon: 'archive-outline', activeIcon: 'archive' },
  ],
  configuration: [
    { key: 1, isIonIcon: true, isImg: false, text: 'Stations', toolTip: 'Stations', route: '/drones/config-drone/stations', icon: 'location-outline', activeIcon: 'location' },
    { key: 2, isIonIcon: true, isImg: false, text: 'Drones', toolTip: 'Drones', route: '/drones/config-drone/drone', icon: 'airplane', activeIcon: 'airplane' },
    { key: 3, isIonIcon: true, isImg: false, text: 'Payload Config', toolTip: 'Payload Config', route: '/drones/config-drone/payload-config', icon: 'briefcase-outline', activeIcon: 'briefcase' },
    { key: 4, isIonIcon: true, isImg: false, text: 'Users', toolTip: 'Users', route: '/drones/config-drone/users', icon: 'people-outline', activeIcon: 'people' },
  ],
};