import React, { Component } from 'react';
import Select from 'react-select';
import Table from './components/table'
import './App.css';

class App extends Component {
  state = {
    selectedOption: null,
    table: {
      header:[],
      data:[]
    },
  }
  
  constructor(props) {
    super(props);
    this.init(props);
  }

  init(props){
    if (props.data) {
      this.mentors = props.data.mentors;
      this.tasks = props.data.tasks;
      this.options = Object.keys(this.mentors).map((mentor)=>{
        return { value: mentor, label: mentor }
      })
    }
  }

  createTable (mentor) {
    const headerRow = [{value:'Tasks/Students'}];
    const dataRows = [];
    const students = Object.keys(this.mentors[mentor]);
    students.forEach((stud)=>headerRow.push({value:stud,link:`https://github.com/${stud}`}));
    Object.keys(this.tasks)
    .sort((a,b)=>this.tasks[a].orderIndex-this.tasks[b].orderIndex)
    .forEach((task)=>{
      const arr = [];
      arr.push({value:task, link:this.tasks[task].link});
      students.forEach((stud)=>{
        let mark = this.mentors[mentor][stud][task];
        let status = this.tasks[task].status;
        if (status === 'checked' && mark === undefined) {
          status = 'checkASAP';
        }
        if (!status) {
          status = 'todo';
        }
        arr.push({value:mark,className:status});
      })
      dataRows.push(arr);
    })
    return {
      header:headerRow,
      data:dataRows,
    }
  }

  componentDidMount() {
    const prevMentor = localStorage.getItem('mentor');
    if (prevMentor) {
      const selectedOption = JSON.parse(prevMentor);
      this.setState({ selectedOption, table: this.createTable(selectedOption.value) });
    }
  }

  handleChange = (selectedOption) => {
    this.setState({ selectedOption, table: this.createTable(selectedOption.value) });
    localStorage.setItem('mentor', JSON.stringify(selectedOption));
  }
  
  render() {
    const { selectedOption } = this.state;
    return (
      <div className="App">
          <Select
          value={selectedOption}
          onChange={this.handleChange}
          options={this.options}
        />
        <Table data = {this.state.table} />
      </div>
    );
  }
}

export default App;
