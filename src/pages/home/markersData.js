let academicIcon = {
  'url': 'www/assets/imgs/academic-building.png',
  //'anchor': [10, 30],
  'size': {
    width: 20,
    height: 30
  }
};

let dormIcon = {
  'url': 'www/assets/imgs/Bed-image.png',
  //'anchor': [10, 30],
  'size': {
    width: 20,
    height: 30
  }
};

let libraryIcon = {
  'url': 'www/assets/imgs/library.png',
  //'anchor': [10, 30],
  'size': {
    width: 20,
    height: 30
  }
};

let foodIcon = {
  'url': 'www/assets/imgs/Food.png',
  //'anchor': [10, 30],
  'size': {
    width: 20,
    height: 30
  }
};
let landmarkIcon = {
  'url': 'www/assets/imgs/landmark.png',
  //'anchor': [10, 30],
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
  LANDMARK: 'Landmark',
  OTHER: 'Other'
};

const tags = {
  ART: 'Art',
  ATHLETIC: 'Athletic',
  FOOD: 'Food',
  HISTORIC: 'Historic',
  LOUD: 'Loud',
  NAP: 'Nap',
  OTHER: 'Other',
  SOCIAL: 'Social',
  STUDY: 'Study'
}

export const markersDataArray = [
  { name: 'Old Main',
    position: {
      lat: 44.93857831674198,
      lng: -93.16869206587944
    },
    description: 'Most humanities classes are in this building. Some students come here to study.',
    icon: academicIcon,
    type: types.ACADEMIC,
    tags: [tags.NAP,tags.STUDY]
  },
  { name: 'Leonard Center',
    position: {
      lat: 44.937286,
      lng: -93.16766843260166
    },
    description: 'Referred to as the \'LC.\' Students come here to work out, socialize, nap, and eat at Scotty\'s, a dining option that serves burritos. Health and Wellness is also located here.',
    icon: 'red',
    type: types.ATHLETIC,
    tags: [tags.ATHLETIC, tags.FOOD, tags.LOUD, tags.NAP,tags.SOCIAL,tags.STUDY]
  },
  { name: 'Neill Hall',
    position: {
      lat: 44.93728079704348,
      lng: -93.16928891829826
    },
    description: 'Language and humanities classes are taught in this building. Students come here to study.',
    icon: academicIcon,
    type: types.ACADEMIC,
    tags: [tags.STUDY]
  },
  { name: 'Olin-Rice Science Center ',
    position: {
      lat: 44.93666646373501,
      lng: -93.16894868324005
    },
    description: 'Macalester\'s math and science building. Students use this space for studying and there are also a few good spots for napping.',
    icon: academicIcon,
    type: types.ACADEMIC,
    tags: [tags.NAP,tags.STUDY]
  },
  { name: 'Janet Wallace Fine Arts Center',
    position: {
      lat: 44.93762524179597,
      lng: -93.17018330097198
    },
    description: 'Student\'s call this building \'JWall.\' Fine arts classes are taught here, and art exhibitions are shown in this building. Students mostly come here to study.',
    icon: academicIcon,
    type: types.ACADEMIC,
    tags: [tags.ART]
  },
  { name: 'DeWitt Wallace Library',
    position: {
      lat: 44.9385143672714,
      lng: -93.16810112420893
    },
    description: 'Macalester\'s Library. Students come here to study and they occasionally nap here too. The second floor has the Idea Lab, which is a spot for students to do arts and crafts. Each floor you go up, the quieter it gets.',
    icon: libraryIcon,
    type: types.LIBRARY,
    tags: [tags.FOOD,tags.STUDY]
  },
  { name: 'Ruth Stricker Dayton Campus Center',
    position: {
      lat: 44.93948135311272,
      lng: -93.16755022037967
    },
    description: 'Cafe Mac, the Atrium, and the Loch are all dining options in the CC. Students mostly eat here, but they also come here to study and socialize.',
    icon: foodIcon,
    type: types.FOOD,
    tags: [tags.FOOD,tags.SOCIAL,tags.STUDY]
  },
  { name: 'Carnegie Hall',
    position: {
      lat: 44.93872445794575,
      lng: -93.16922327482047
    },
    description: 'Home of social sciences.',
    icon: academicIcon,
    type: types.ACADEMIC,
    tags: [tags.STUDY]
  },
  { name: 'Dupre Residence Hall',
    position: {
      lat: 44.941032890778374 ,
      lng: -93.16787123680115
    },
    description: 'On campus housing and summer housing for students on campus.',
    icon: dormIcon,
    type: types.DORM,
    tags: [tags.NAP,tags.SOCIAL,tags.STUDY]
  },
  { name: 'Doty Residence Hall',
    position: {
      lat: 44.94080886036619  ,
      lng: -93.1686007976532
    },
    description: 'On campus housing option for first years.',
    icon: dormIcon,
    type: types.DORM,
    tags: [tags.NAP,tags.SOCIAL,tags.STUDY]
  },
  { name: 'Bigelow Residence Hall',
    position: {
      lat: 44.940447    ,
      lng: -93.169131
    },
    description: 'On campus housing option for underclassmen.',
    icon: dormIcon,
    type: types.DORM,
    tags: [tags.NAP,tags.SOCIAL,tags.STUDY]
  },
  { name: 'Turk Residence Hall',
    position: {
      lat: 44.94042    ,
      lng: -93.168612
    },
    description: 'On campus housing option for first years.',
    icon: dormIcon,
    type: types.DORM,
    tags: [tags.NAP,tags.SOCIAL,tags.STUDY]
  }
  ,
  { name: '30 Mac Residence Hall',
    position: {
      lat: 44.940757     ,
      lng: -93.169085
    },
    description: 'On campus housing option where residents agree to a healthy living and substance free lifestyle.',
    icon: dormIcon,
    type: types.DORM,
    tags: [tags.NAP,tags.SOCIAL,tags.STUDY]
  }
  ,
  { name: 'Wallace Residence Hall',
    position: {
      lat: 44.94111      ,
      lng: -93.169027
    },
    description: 'On campus housing option, reserved for sophomores.',
    icon: dormIcon,
    type: types.DORM,
    tags: [tags.NAP,tags.SOCIAL,tags.STUDY]
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
    type: types.DORM,
    tags: [tags.NAP,tags.SOCIAL,tags.STUDY]
  }
  ,
  { name: 'Cultural House',
    position: {
      lat: 44.94046471607637       ,
      lng: -93.16992284514379
    },
    description: 'On campus housing option that serves as a safe space for students of color and allies who are interested in learning from and contributing to a multicultural environment.',
    icon: dormIcon,
    type: types.DORM,
    tags: [tags.NAP,tags.SOCIAL,tags.STUDY]
  } ,
  { name: 'Kirk Residence Hall',
    position: {
      lat: 44.938519505327264,
      lng: -93.16746534208858
    },
    description: 'On campus housing option for upperclassmen.',
    icon: dormIcon,
    type: types.DORM,
    tags: [tags.NAP,tags.SOCIAL,tags.STUDY]
  } ,
  { name: 'The Rock',
    position: {
      lat: 44.938996         ,
      lng: -93.168381
    },
    description: 'The Rock',
    icon: landmarkIcon,
    type: types.LANDMARK,
    tags: [tags.HISTORIC]
  } ,
  { name: 'The Bell',
    position: {
      lat: 44.939273         ,
      lng: -93.168958
    },
    description: 'The Bell',
    icon: landmarkIcon,
    type: types.LANDMARK,
    tags: [tags.HISTORIC]
  } ,
  { name: 'Shaw Field',
    position: {
      lat: 44.937247         ,
      lng: -93.168537
    },
    description: 'Shaw Field',
    icon: landmarkIcon,
    type: types.LANDMARK,
    tags: [tags.SOCIAL]
  } ,
  { name: 'Windmill',
    position: {
      lat: 44.936143         ,
      lng: -93.168256
    },
    description: 'This wind turbine was built in 2003. It provides and alternate source of electricity for Olin Rice.',
    icon: landmarkIcon,
    type: types.LANDMARK,
    tags: [tags.HISTORIC]
  },
  { name: 'Weyerhaeuser',
    position: {
      lat: 44.939401646627275         ,
      lng: -93.1691980491122
    },
    description: 'Admissions building at Macalester.',
    icon: 'red',
    type: types.OTHER,
    tags: [tags.OTHER]
  }
];
