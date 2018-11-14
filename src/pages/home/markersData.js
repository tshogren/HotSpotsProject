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
  'anchor': [10, 10],
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
    description: 'Most humanities classes are in this building. Some students come here to study.',
    icon: academicIcon,
    type: types.ACADEMIC
  },
  { name: 'Leonard Center',
    position: {
      lat: 44.937286,
      lng: -93.16766843260166
    },
    description: 'Students call this the \'LC.\' Students come here to work out, socialize, nap, and eat at Scotty\'s, a dining option that serves burritos. Health and Wellness is also located here.',
    icon: 'red',
    type: types.ATHLETIC
  },
  { name: 'Neill Hall',
    position: {
      lat: 44.93725802043779,
      lng: -93.1692529845086
    },
    description: 'Language and humanities classes are taught in this building. Students come here to study.',
    icon: academicIcon,
    type: types.ACADEMIC
  },
  { name: 'Olin-Rice Science Center ',
    position: {
      lat: 44.93666646373501,
      lng: -93.16894868324005
    },
    description: 'Macalester\'s math and science building. Students use this space for studying and there are also a few good spots for napping.',
    icon: academicIcon,
    type: types.ACADEMIC
  },
  { name: 'Janet Wallace Fine Arts Center',
    position: {
      lat: 44.937578182963996,
      lng: -93.16967579323779
    },
    description: 'Student\'s call this building \'JWall.\' Fine arts classes are taught here, and art exhibitions are shown in this building. Students mostly come here to study.',
    icon: academicIcon,
    type: types.ACADEMIC
  },
  { name: 'DeWitt Wallace Library',
    position: {
      lat: 44.93845519992089,
      lng: -93.16818770313091
    },
    description: 'Macalester\'s Library. Students come here to study and they occasionally nap here too. The second floor has the Idea Lab, which is a spot for students to do arts and crafts. Each floor you go up, the quieter it gets.',
    icon: libraryIcon,
    type: types.LIBRARY
  },
  { name: 'Ruth Stricker Dayton Campus Center',
    position: {
      lat: 44.93947081646128,
      lng: -93.16763728766716
    },
    description: 'Cafe Mac, the Atrium, and the Loch are all dining options in the CC. Students mostly eat here, but they also come here to study and socialize.',
    icon: foodIcon,
    type: types.FOOD
  },
  { name: 'Carnegie Hall',
    position: {
      lat: 44.93863853335998,
      lng: -93.16919008825039
    },
    description: 'Home of social sciences.',
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
    description: 'This wind turbine was built in 2003. It provides and alternate source of electricity for Olin Rice.',
    icon: landmarkIcon,
    type: types.LANDMARK
  },
  { name: 'Weyerhaeuser',
    position: {
      lat: 44.939459         ,
      lng: -93.169202
    },
    description: 'Admissions building at Macalester.',
    icon: 'red',
    type: types.LANDMARK
  }
];
