
function levenshtein(s1, s2) {
  let i; let j; let l1; let l2; let flip; let ch; let chl; let ii; let ii2; let cost; let
    cutHalf;
  l1 = s1.length;
  l2 = s2.length;

  const cr = 1;
  const cri = 1;
  const ci = 1;
  const cd = 1;

  cutHalf = flip = Math.max(l1, l2);

  const minCost = Math.min(cd, ci, cr);
  const minD = Math.max(minCost, (l1 - l2) * cd);
  const minI = Math.max(minCost, (l2 - l1) * ci);
  const buf = new Array((cutHalf * 2) - 1);

  for (i = 0; i <= l2; ++i) {
    buf[i] = i * minD;
  }

  for (i = 0; i < l1; ++i, flip = cutHalf - flip) {
    ch = s1[i];
    chl = ch.toLowerCase();

    buf[flip] = (i + 1) * minI;

    ii = flip;
    ii2 = cutHalf - flip;

    for (j = 0; j < l2; ++j, ++ii, ++ii2) {
      cost = (ch === s2[j] ? 0 : (chl === s2[j].toLowerCase()) ? cri : cr);
      buf[ii + 1] = Math.min(buf[ii2 + 1] + cd, buf[ii] + ci, buf[ii2] + cost);
    }
  }
  return buf[l2 + cutHalf - flip];
}


function getTasks(taskFile) {
  const taskSheet = taskFile.Sheets[taskFile.SheetNames[0]];
  const taskMap = {
    name: 'A',
    link: 'B',
    status: 'C',
  };
  const tasks = {};
  let i = 2;
  console.log('\x1b[36mTask\'s list parsing...\x1b[0m');
  while (taskSheet[taskMap.name + i]) {
    tasks[taskSheet[taskMap.name + i].v.replace(/^\s+|\s+$/g, '')] = {
      link: taskSheet[taskMap.link + i] ? taskSheet[taskMap.link + i].v : '',
      status: taskSheet[taskMap.status + i] ? taskSheet[taskMap.status + i].v.replace(/\s+/g, '').toLowerCase() : '',
      orderIndex: i,
    };
    i++;
  }
  console.log('\x1b[32mTask\'s list parsing complited\x1b[0m');
  return tasks;
}

function isGitHubUrl(url) {
  const re = new RegExp('(?:https?\\:\\/\\/)github.com\\/');
  return re.test(url);
}

function getGitHubNickName(sheet, cellAddress) {
  let nickName = sheet[cellAddress[0] + cellAddress[1]];
  const error = new Error(`\x1b[31mError: Incorrect mentor's GitHub link, check following cell: ${cellAddress[0]}${cellAddress[1]}\x1b[0m`);
  if (nickName) {
    nickName = nickName.v.toLowerCase();
    nickName = nickName.charAt(nickName.length - 1) === '/' ? nickName.substr(0, nickName.length - 1) : nickName;
    if (!isGitHubUrl(nickName)) {
      const substr = nickName.match('(?:https?\\:\\/\\/)\\S+\\/') ? nickName.match('(?:https?\\:\\/\\/)\\S+\\/')[0] : '';
      if (levenshtein('https://github.com/', substr) < 2) {
        console.log(`\x1b[33mWarning: GitHub link has automatically corrected, check following cell: ${cellAddress[0]}${cellAddress[1]}\x1b[0m`);
      } else throw error;
    }
    nickName = nickName.substr(nickName.lastIndexOf('/') + 1).toLowerCase();
    return nickName;
  }
  throw error;
}

function getMentor(mentorSheet, row) {
  const mentorMap = {
    firstName: 'A',
    secondName: 'B',
    city: 'C',
    studentsCount: 'D',
    gitHubLink: 'E',
  };
  let mentor = {};
  mentor.gitHubNickName = getGitHubNickName(mentorSheet, [mentorMap.gitHubLink, row]);
  try {
    mentor = Object.assign(mentor, {
      name: `${mentorSheet[mentorMap.firstName + row].v.toLowerCase()
      } ${mentorSheet[mentorMap.secondName + row].v.toLowerCase()}`,
    });
  } catch (error) {
    throw new Error(`\x1b[31mError: Incorrect mentor name, check following row: ${row}\x1b[0m`);
  }
  try {
    const optProps = {
      city: mentorSheet[mentorMap.city + row].v.toLowerCase(),
      studentsCount: mentorSheet[mentorMap.studentsCount + row].v,
    };
    return Object.assign(mentor, optProps);
  } catch (error) {
    console.log(`\x1b[33mWarning: Incorrect some optional mentor's data, check following row: ${row}\x1b[0m`);
    return mentor;
  }
}

function getMentors(MentorStudentsPairsFile) {
  const mentorsSheet = MentorStudentsPairsFile.Sheets[MentorStudentsPairsFile.SheetNames[1]];
  const mentors = {};
  if (!mentorsSheet) return mentors;
  let i = 2;
  let currMentor;
  let errCount = 0;
  console.log('\x1b[36mMentors list parsing...\x1b[0m');
  while (mentorsSheet[`A${i}`] || mentorsSheet[`B${i}`]) {
    try {
      currMentor = getMentor(mentorsSheet, i);
      mentors[currMentor.name] = currMentor;
    } catch (error) {
      console.log(error.message);
      errCount++;
    }
    i++;
  }
  console.log('\x1b[32mMentors list parsing complited\x1b[0m');
  if (errCount) console.log(`\x1b[31mErrors: ${errCount}\x1b[0m`);
  return mentors;
}

function getStudents(MentorStudentsPairsFile) {
  const studentsSheet = MentorStudentsPairsFile.Sheets[MentorStudentsPairsFile.SheetNames[0]]; 
  const mentorStudentPairs = new Map();
  if (!studentsSheet) return mentorStudentPairs;
  let i = 2;
  let errCount = 0;
  console.log('\x1b[36mStudents list parsing...\x1b[0m');
  while (studentsSheet[`A${i}`] || studentsSheet[`B${i}`]) {
    try {
      if (!mentorStudentPairs.has(studentsSheet[`B${i}`].w.toLowerCase())) {
        mentorStudentPairs.set(studentsSheet[`B${i}`].w.toLowerCase(), studentsSheet[`A${i}`].w.toLowerCase());
      } else {
        duplicatedEntry = studentsSet[(studentsSheet[`B${i}`].w.toLowerCase())];
        console.log(`\x1b[33mWarning: Student isn't unique, check following cells: B${i}\x1b[0m`);
      }
    } catch (error) {
      console.log(`\x1b[31mError: Something went wrong, check following row: \x1b[33m${i}\x1b[0m`);
      errCount++;
    }
    i++;
  }
  console.log('\x1b[32mStudents list parsing complited\x1b[0m');
  if (errCount) console.log(`\x1b[31mErrors: ${errCount}`);
  return mentorStudentPairs;
}


function getScoreRow(sheet, row, mentorScoreObj) {
  const mentorsScoreMap = {
    mentorGitHub: 'B',
    studentGitHub: 'C',
    taskName: 'D',
    PRlink: 'E',
    mark: 'F',
  };
  let currMentor;
  let currStudent;
  let currTask;
  currStudent = getGitHubNickName(sheet, [mentorsScoreMap.studentGitHub, row]);
  try {
    currMentor = getGitHubNickName(sheet, [mentorsScoreMap.mentorGitHub, row]);
  } catch (error) {
    if (mentorScoreObj.studentsMap.has(currStudent)) {
      if (mentorScoreObj.studentsMap.get(currStudent).size === 1) {
        currMentor = mentorScoreObj.studentsMap.get(currStudent);
        console.log(`\x1b[33mWarning: GitHub link has automatically corrected, check following cell: B${row}\x1b[0m`);
      }
    } else throw error;
  }
  if (!mentorScoreObj.studentsMap.has(currStudent)) {
    mentorScoreObj.studentsMap.set(currStudent, new Set([currMentor]));
  } else mentorScoreObj.studentsMap.get(currStudent).add(currMentor);
  if (!mentorScoreObj[currStudent]) mentorScoreObj[currStudent] = {};
  try {
    currTask = sheet[mentorsScoreMap.taskName + row].v;
    mentorScoreObj.taskSet.add(currTask);
  } catch (error) {
    throw new Error(`\x1b[31mError: Incorrect task name, check following cell: D${row}\x1b[0m`);
  }
  if (sheet[mentorsScoreMap.mark + row]) {
    mentorScoreObj[currStudent][currTask] = sheet[mentorsScoreMap.mark + row].v;
  } else {
    mentorScoreObj[currStudent][currTask] = null;
  }
}

function getMentorScore(mentorScoreFile) {
  const mentorScoreSheet = mentorScoreFile.Sheets[mentorScoreFile.SheetNames[0]];
  let i = 2;
  let errCount = 0;
  const mentorScoreList = {};
  mentorScoreList.studentsMap = new Map();
  mentorScoreList.taskSet = new Set();
  console.log('\x1b[36mMentors score list parsing...\x1b[0m');
  while (mentorScoreSheet[`A${i}`]) {
    try {
      getScoreRow(mentorScoreSheet, i, mentorScoreList);
    } catch (error) {
      console.log(error.message);
      errCount++;
    }
    i++;
  }
  console.log('\x1b[32mMentors score list parsing complited\x1b[0m');
  if (errCount) console.log(`\x1b[31mErrors: ${errCount}\x1b[0m`);
  return mentorScoreList;
}

function merge(mentorsObj, studentsMap, mentorScoreObj, tasksObj) {
  console.log('\x1b[36mData mergering...');
  const taskList = Object.keys(tasksObj);
  mentorScoreObj.taskSet.forEach((item) => {
    if (!taskList.includes(item)) {
      const probName = taskList.filter(taskname => levenshtein(taskname.toLowerCase().replace(/\s+/g, ''), item.toLowerCase().replace(/\s+/g, '')) < 2);
      if (probName.length === 1) {
        tasksObj[item] = tasksObj[probName[0]];
        delete tasksObj[probName[0]];
        console.log(`\x1b[33mWarning: task name has automatically corrected: \x1b[32m|${probName[0]}|\x1b[33m to \x1b[32m|${item}|\x1b[0m`);
      } else console.log(`\x1b[33mWarning: couldn't find following checked task in task's list file: \x1b[32m${item}\x1b[0m`);
    }
  });
  const studMentMerged = {};
  studentsMap.forEach((mentor, student) => {
    let currMentor;
    if (!mentorsObj[mentor]) {
      if (mentorScoreObj.studentsMap.has(student)) {
        if (mentorScoreObj.studentsMap.get(student).size === 1) {
          currMentor = [...mentorScoreObj.studentsMap.get(student)][0];
          if (!studMentMerged[currMentor]) studMentMerged[currMentor] = {};
          studMentMerged[currMentor][student] = mentorScoreObj[student];
          console.log(`\x1b[33mWarning: Student \x1b[32m${student}\x1b[33m automatically set to mentor \x1b[32m${currMentor}\x1b[0m`);
        } else {
          currMentor = null;
          console.log(`\x1b[33mWarning: couldn't set \x1b[32m${student}\x1b[33m to any mentor\x1b[0m`);
        }
      }
    } else {
      currMentor = mentorsObj[mentor].gitHubNickName;
    }
    if (currMentor) {
      if (!studMentMerged[currMentor]) studMentMerged[currMentor] = {};
      studMentMerged[currMentor][student] = mentorScoreObj[student];
    }
  });
  const mergedData = {
    mentors: studMentMerged,
    tasks: tasksObj,
  }
  console.log('\x1b[32mData has merged\x1b[0m');
  return mergedData;
}

module.exports.levenshtein = levenshtein;
module.exports.getTasks = getTasks;
module.exports.isGitHubUrl = isGitHubUrl;
module.exports.getGitHubNickName = getGitHubNickName;
module.exports.getMentor = getMentor;
module.exports.getMentors = getMentors;
module.exports.getStudents = getStudents;
module.exports.getScoreRow = getScoreRow;
module.exports.getMentorScore = getMentorScore;
module.exports.merge = merge;

if (!(process.env.NODE_ENV === 'test')) {
  xlsx = require('xlsx');
  fs = require('fs');
  const tasks = xlsx.readFile('./data/Tasks.xlsx');
  const MentorStudentsPairs = xlsx.readFile('./data/Mentor-students pairs.xlsx');
  const mentorScore = xlsx.readFile('./data/Mentor score.xlsx');
  const data = merge(getMentors(MentorStudentsPairs),
    getStudents(MentorStudentsPairs),
    getMentorScore(mentorScore),
    getTasks(tasks));
  const dataJson = JSON.stringify(data, 0, 2);
  fs.writeFile('./public/data.json', dataJson, "utf8", ()=>console.log("Writing is done!"));
}


