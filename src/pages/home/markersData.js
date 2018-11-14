let academicIcon = {
  'url': 'www/assets/imgs/academic-building.png',
  'anchor': [10, 20],
  'size': {
    width: 20,
    height: 19
  }
};

let dormIcon = {
  'url': 'www/assets/imgs/Bed-image.jpg',
  'anchor': [10, 20],
  'size': {
    width: 20,
    height: 19
  }
};

let libraryIcon = {
  'url': 'www/assets/imgs/library.png',
  'anchor': [10, 20],
  'size': {
    width: 20,
    height: 19
  }
};

let foodIcon = {
  'url': 'www/assets/imgs/Food.png',
  'anchor': [10, 20],
  'size': {
    width: 20,
    height: 19
  }
};
let landmarkIcon = {
  'url': 'www/assets/imgs/landmark.png',
  'anchor': [30, 10],
  'size': {
    width: 20,
    height: 30
  }
};

const types = {
  ACADEMIC: 'Academic',
  LIBRARY: 'Library',
  FOOD: 'Food',
  DORM: 'Dorm',
  ATHLETIC: 'Athletic',
  LANDMARK: 'Landmark'
};

export const markersDataArray = [
  { name: 'Old Main',
    position: {
      lat: 44.93858,
      lng: -93.16854
    },
    description: 'Home of Humanities',
    icon: academicIcon,
    type: types.ACADEMIC
  },
  { name: 'Leonard Center',
    position: {
      lat: 44.937286,
      lng: -93.16766843260166
    },
    description: 'Athletics and Health and Wellness located here. Also has another dining option called Scotty\'s. Students mainly use this spot for exercise. There is also good spot to nap on the second floor',
    icon: 'red',
    type: types.ATHLETIC
  },
  { name: 'Neill Hall',
    position: {
      lat: 44.93725802043779,
      lng: -93.1692529845086
    },
    description: 'Home of most language programs at Macalester.',
    icon: academicIcon,
    type: types.ACADEMIC
  },
  { name: 'Olin-Rice Science Center ',
    position: {
      lat: 44.93666646373501,
      lng: -93.16894868324005
    },
    description: 'Math and Science building.',
    icon: academicIcon,
    type: types.ACADEMIC
  },
  { name: 'Janet Wallace Fine Arts Center',
    position: {
      lat: 44.937578182963996,
      lng: -93.16967579323779
    },
    description: 'Macalester\'s fine arts building.',
    icon: academicIcon,
    type: types.ACADEMIC
  },
  { name: 'DeWitt Wallace Library',
    position: {
      lat: 44.93845519992089,
      lng: -93.16818770313091
    },
    description: 'Macalester\'s Library. Students come here to study and they occasionally nap here too.',
    icon: libraryIcon,
    type: types.LIBRARY
  },
  { name: 'Ruth Stricker Dayton Campus Center',
    position: {
      lat: 44.93947081646128,
      lng: -93.16763728766716
    },
    description: 'Home of a majority of Macalester\'s dining options, as well as mailing services',
    icon: foodIcon,
    type: types.FOOD
  },
  { name: 'Carnegie Hall',
    position: {
      lat: 44.93863853335998,
      lng: -93.16919008825039
    },
    description: 'Home of Economics',
    icon: academicIcon,
    type: types.ACADEMIC
  },
  { name: 'Dupre Residence Hall',
    position: {
      lat: 44.941034 ,
      lng: -93.167871
    },
    description: 'On campus housing and summer housing for students on campus.',
    icon: dormIcon,
    type: types.DORM
  },
  { name: 'Doty Residence Hall',
    position: {
      lat: 44.940814  ,
      lng: -93.168601
    },
    description: 'On campus housing option for first years.',
    icon: dormIcon,
    type: types.DORM
  },
  { name: 'Bigelow Residence Hall',
    position: {
      lat: 44.940447    ,
      lng: -93.169131
    },
    description: 'On campus housing option for underclassmen.',
    icon: dormIcon,
    type: types.DORM
  },
  { name: 'Turk Residence Hall',
    position: {
      lat: 44.94042    ,
      lng: -93.168612
    },
    description: 'On campus housing option for first years.',
    icon: dormIcon,
    type: types.DORM
  }
  ,
  { name: '30 Mac Residence Hall',
    position: {
      lat: 44.940757     ,
      lng: -93.169085
    },
    description: 'On campus housing option where residents agree to a healthy living and substance free lifestyle.',
    icon: dormIcon,
    type: types.DORM
  }
  ,
  { name: 'Wallace Residence Hall',
    position: {
      lat: 44.94111      ,
      lng: -93.169027
    },
    description: 'On campus housing option, reserved for sophomores.',
    icon: dormIcon,
    type: types.DORM
  }
  ,
  {
    name: 'George Draper Dayton Residence Hall',
    position: {
      lat: 44.940916,
      lng: -93.170423
    },
    description: 'On campus housing option for upperclassmen. Rooms are suite style.',
    icon: dormIcon,
    type: types.DORM
  }
  ,
  { name: 'Cultural House',
    position: {
      lat: 44.940367        ,
      lng: -93.169895
    },
    description: 'On campus housing option that serves as a safe space for students of color and allies who are interested in learning from and contributing to a multicultural environment.',
    icon: dormIcon,
    type: types.DORM
  } ,
  { name: 'Kirk Residence Hall',
    position: {
      lat: 44.938531         ,
      lng: -93.16734
    },
    description: 'On campus housing option for upperclassmen.',
    icon: dormIcon,
    type: types.DORM
  } ,
  { name: 'The Rock',
    position: {
      lat: 44.938996         ,
      lng: -93.168381
    },
    description: 'The Rock',
    icon: landmarkIcon,
    type: types.LANDMARK
  } ,
  { name: 'The Bell',
    position: {
      lat: 44.939273         ,
      lng: -93.168958
    },
    description: 'The Bell',
    icon: landmarkIcon,
    type: types.LANDMARK
  } ,
  { name: 'Shaw Field',
    position: {
      lat: 44.937247         ,
      lng: -93.168537
    },
    description: 'Shaw Field',
    icon: landmarkIcon,
    type: types.LANDMARK
  } ,
  { name: 'Windmill',
    position: {
      lat: 44.936143         ,
      lng: -93.168256
    },
    description: 'Windmill',
    icon: landmarkIcon,
    type: types.LANDMARK
  }
];
