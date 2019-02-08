if (typeof require !== 'undefined') {
  xlsx = require('xlsx');
  fs = require('fs');
  uniqid = require('uniqid');
}

const data = {};
const tasks = xlsx.readFile('./data/Tasks.xlsx');
const MentorStudentsPairs = xlsx.readFile('./data/Mentor-students pairs.xlsx');
const mentorScore = xlsx.readFile('./data/Mentor score.xlsx');

function getArrayDifference(arr1, arr2) {
  set1 = new Set(arr1), set2 = new Set(arr2);
  return [...set1].filter(v => !set2.has(v)).concat([...set2].filter(v => !set1.has(v)));
}

function levenshtein(s1, s2) {
  let i, j, l1, l2, flip, ch, chl, ii, ii2, cost, cutHalf;
  l1 = s1.length;
  l2 = s2.length;

  let cr = 1;
  let cri = 1;
  let ci = 1;
  let cd = 1;

  cutHalf = flip = Math.max(l1, l2);

  let minCost = Math.min(cd, ci, cr);
  let minD = Math.max(minCost, (l1 - l2) * cd);
  let minI = Math.max(minCost, (l2 - l1) * ci);
  let buf = new Array((cutHalf * 2) - 1);

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
  const tasks = [];
  let value = true;
  let i = 2;
  console.log('\x1b[36mTask\'s list parsing...');
  while (value) {
    value = taskSheet[taskMap.name + i];
    if (value) {
      tasks.push({
        name: value.v,
        link: taskSheet[taskMap.link + i] ? taskSheet[taskMap.link + i].v : '',
        status: taskSheet[taskMap.status + i] ? taskSheet[taskMap.status + i].v : '',
      });
    }
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
    nickName = nickName.v;
    nickName = nickName.charAt(nickName.length - 1) === '/' ? nickName.substr(0, nickName.length - 1) : nickName;
    if (!isGitHubUrl(nickName)) {
      let substr = nickName.match('(?:https?\\:\\/\\/)\\S+\\/') ? nickName.match('(?:https?\\:\\/\\/)\\S+\\/')[0] : '';
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
  let i = 2;
  let currMentor;
  let errCount = 0;
  console.log('\x1b[36mMentor\'s list parsing...\x1b[0m');
  while (true) {
    if (mentorsSheet[`A${i}`] || mentorsSheet[`B${i}`]) {
      try {
        currMentor = getMentor(mentorsSheet, i);
        mentors[currMentor.gitHubNickName] = currMentor;
      } catch (error) {
        console.log(error.message);
        errCount++;
      }
    } else break;
    i++;
  }
  console.log('\x1b[32mMentor\'s list parsing complited\x1b[0m');
  if (errCount) console.log(`\x1b[31mErrors: ${errCount}\x1b[0m`);
  return mentors;
}

function getStudents(MentorStudentsPairsFile) {
  const studentsSheet = MentorStudentsPairsFile.Sheets[MentorStudentsPairsFile.SheetNames[0]];
  const mentorStudentPairs = {};
  const studentsSet = {};
  let i = 2;
  let currMentor;
  let errCount = 0;
  console.log('\x1b[36mStudent\'s list parsing...\x1b[0m');
  while (true) {
    if (studentsSheet[`A${i}`] || studentsSheet[`B${i}`]) {
      try {
        currMentor = studentsSheet[`A${i}`].w.toLowerCase();
        if (!mentorStudentPairs[currMentor]) mentorStudentPairs[currMentor] = new Set();
        mentorStudentPairs[currMentor].add(studentsSheet[`B${i}`].w.toLowerCase());
        if (!studentsSet[(studentsSheet[`B${i}`].w.toLowerCase())]) {
          studentsSet[(studentsSheet[`B${i}`].w.toLowerCase())] = `B${i}`;
        } else {
          duplicatedEntry = studentsSet[(studentsSheet[`B${i}`].w.toLowerCase())];
          console.log(`\x1b[33mWarning: Student isn't unique, check following cells: B${i}, ${duplicatedEntry}\x1b[0m`);
        }
      } catch (error) {
        console.log(`\x1b[31mError: Something went wrong, check following row: \x1b[33m${i}\x1b[0m`);
        errCount++;
      }
    } else break;
    i++;
  }
  console.log('\x1b[32mStudent\'s list parsing complited\x1b[0m');
  if (errCount) console.log(`\x1b[31mErrors: ${errCount}`);
  return mentorStudentPairs;
}


function mergeStudentMentorGithubs(mentors, mentorsstudentspairs) {
  const studentMentorGithubs = {};
  const mentorsNickNames = Object.keys(mentors);
  const mentorsNames = Object.keys(mentorsstudentspairs);
  console.log('\x1b[36mMentor\'s list and Student\'s list mergering...');
  const arr = mentorsNickNames.map((nick) => {
    if (!studentMentorGithubs[nick]) studentMentorGithubs[nick] = {};
    [...mentorsstudentspairs[mentors[nick].name]].forEach(
      (student) => { studentMentorGithubs[nick][student] = {}; },
    );
    return mentors[nick].name;
  });
  const diff = getArrayDifference(mentorsNames, arr);
  if (diff.length > 0) console.log(`\x1b[33mWarning: check following mentors data: ${diff} \x1b[0m`);
  console.log('\x1b[32mMentor\'s and Student\'s lists have merged');
  return studentMentorGithubs;
}

function getMentorScore(mentorScoreFile) {
  const mentorScoreSheet = mentorScoreFile.Sheets[mentorScoreFile.SheetNames[0]];
  const mentorsScoreMap = {
    mentorGitHub: 'B',
    studentGitHub: 'C',
    taskName: 'D',
    PRlink: 'E',
    mark: 'F',
  };
  let i = 2;
  let errCount = 0;
  let currMentor;
  let currStudent;
  let currTask;
  const mentorScoreList = {};
  const taskList = new Set();
  console.log('\x1b[36mMentor\'s score list parsing...\x1b[0m');
  while (true) {
    if (mentorScoreSheet[`A${i}`]) {
      try {
        currMentor = getGitHubNickName(mentorScoreSheet, [mentorsScoreMap.mentorGitHub, i]);
        currStudent = getGitHubNickName(mentorScoreSheet, [mentorsScoreMap.studentGitHub, i]);
        if (!mentorScoreList[currMentor]) mentorScoreList[currMentor] = {};
        if (!mentorScoreList[currMentor][currStudent]) mentorScoreList[currMentor][currStudent] = {};
        currTask = mentorScoreSheet[mentorsScoreMap.taskName + i].v;
        taskList.add(currTask);
        mentorScoreList[currMentor][currStudent][currTask] = mentorScoreSheet[mentorsScoreMap.mark + i].v;
      } catch (error) {
        console.log(error.message);
        errCount++;
      }
    } else break;
    i++;
  }
  console.log('\x1b[32mMentor\'s score list parsing complited\x1b[0m');
  if (errCount) console.log(`\x1b[31mErrors: ${errCount}\x1b[0m`);
  return mentorScoreList;
}

mergeStudentMentorGithubs(getMentors(MentorStudentsPairs), getStudents(MentorStudentsPairs));
getMentorScore(mentorScore);
