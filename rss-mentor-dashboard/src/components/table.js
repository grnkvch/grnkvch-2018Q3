import React from 'react';
import uniqid from 'uniqid';
// props:{
//   header:[{value:'value', className:'className',link:'url'},...],
//   data:[[{value:'value', className:'className',link:'url'},{value:'value', className:'className'},...],
//        [{value:'value', className:'className'},{value:'value', className:'className'},...]],
// }
 const Table = ({ data }) => (
  <table>
    <thead>
      <tr>
    {data.header.map((th)=>{
      let value;
      if (th.link) value = (<a href={th.link} target="_blank" rel="noopener noreferrer">{th.value}</a>)
      else value = th.value;
      return (
        <th key={uniqid()} className={th.className}>
        {value}
        </th>)})}
   </tr>
    </thead>
    
   <tbody>
     {data.data.map((row)=>{
     return (
      <tr key={uniqid()}>
      {row.map((td)=>{
        let value;
        if (td.link) value = (<a href={td.link} target="_blank" rel="noopener noreferrer">{td.value}</a>)
        else value = td.value;
        return (
          <td key={uniqid()} className={td.className}>
          {value}
          </td>)})}
     </tr>
     )
   })}
   </tbody>
   
  </table>
)

export default Table;