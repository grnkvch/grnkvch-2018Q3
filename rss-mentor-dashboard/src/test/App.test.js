import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import * as paser from '../xlsxParser'
import emptyWB from './testDataEmptyWB.json'
import xlsx from 'xlsx';

const tasks = xlsx.readFile('./src/test/test-xlsx/Tasks.xlsx');
const MentorStudentsPairs = xlsx.readFile('./src/test/test-xlsx/Mentor-students pairs.xlsx');
const mentorScore = xlsx.readFile('./src/test/test-xlsx/Mentor score.xlsx');

test('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('levenshtein', () => {
  expect(paser.levenshtein('github','github')).toBe(0);
  expect(paser.levenshtein('githib','githab')).toBe(1);
  expect(paser.levenshtein('github','giThub')).toBe(1);
  expect(paser.levenshtein('one','two')).toBe(3);
});

it('isGitHubUrl', () => {
  expect(paser.isGitHubUrl('https://github.com/rolling-scopes-school/tasks/blob/2018-Q3/tasks/rss-mentor-dashboard.md')).toBe(true);
  expect(paser.isGitHubUrl('https://gitHub.com/')).toBe(false);
  expect(paser.isGitHubUrl('https://gitHub.com')).toBe(false);
});

test('getGitHubNickName', () => {
  expect(paser.getGitHubNickName({aa:{v:'https://github.com/rolling'}} , ['a','a'])).toBe('rolling');
  expect(paser.getGitHubNickName({aa:{v:'https://githb.com/rolling'}} , ['a','a'])).toBe('rolling');
  expect(paser.getGitHubNickName({aa:{v:'https://githib.com/rolling'}} , ['a','a'])).toBe('rolling');
});

test('getGitHubNickName Exceptions', () => {
  expect(()=>paser.getGitHubNickName({aa:{v:'https://gitb.com/rolling'}} , ['a','a'])).toThrow();
});

test('getTasks from empty file', () => {
  expect(typeof paser.getTasks(emptyWB) === 'object').toBeTruthy();
});

test('getMentors from empty file', () => {
  expect(typeof paser.getMentors(emptyWB) === 'object').toBeTruthy();
});

test('getStudents from empty file', () => {
  expect(typeof paser.getStudents(emptyWB) === 'object').toBeTruthy();
});

test('getMentorScore from empty file', () => {
  expect(typeof paser.getMentorScore(emptyWB) === 'object').toBeTruthy();
});

test('merge test data and check JSON', () => {
  const data = paser.merge(paser.getMentors(MentorStudentsPairs),
  paser.getStudents(MentorStudentsPairs),
  paser.getMentorScore(mentorScore),
  paser.getTasks(tasks));
  expect(data).toBeTruthy();
  expect(data.tasks).toBeTruthy();
  expect(data.mentors).toBeTruthy();
  const dataJSON = JSON.stringify(data);
  expect(JSON.parse(dataJSON)).toBeTruthy();
});

test('merge from empty file', () => {
  const data = paser.merge(paser.getMentors(emptyWB),
  paser.getStudents(emptyWB),
  paser.getMentorScore(emptyWB),
  paser.getTasks(emptyWB));
  expect(data).toBeTruthy();
  expect(data.tasks).toBeTruthy();
  expect(data.mentors).toBeTruthy();
});

