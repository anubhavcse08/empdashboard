import React, { Component } from 'react';
import Json from './component/json';
import './FileChoice.css';
import icon from './images/managericon1.png';

const Papa = require('papaparse')

class App extends Component 
{ 
  constructor()
  {
    super();
    this.fileReader=new FileReader();
    this.state={
      jsonData:[]
    }
      
}
renderHeader()
{

}
filter(ele)
{
  

}
csvJSON(csvf)
{
  var reader = new FileReader();
  let filecontent;
  reader.onload = (evt)=>
 {
      if(evt.target.readyState !== 2) return;
      if(evt.target.error) {
          alert('Error while reading file');
          return;
      }
      filecontent = evt.target.result;
      //console.log(filecontent)
        const { data } = Papa.parse(filecontent, {header: true})
        //const varr=data.filter(e=>e['Formatted ID']==='US26152');
        //console.log("gsdf",varr)
        this.setState({
          jsonData: data
        })
   
    //  this.jsonData = ;
  //  console.log(Papa.parse(filecontent, {header: true}))

      //renderHeader(jsonData)
  };
  reader.readAsText(csvf.target.files[0]);

}
  render()
   {
    //  console.log('rendering ', this.state.jsonData)
    return (
      <div id="in">

        <div className="companyName">
            <div className="logo1">
                <img src={icon} className="logo-spinning" alt="managerIcon"/>
            </div>
            <div className="EmpDash">
                <h1 className="heading">Employee Dashboard Management System</h1>
            </div>
        </div>

          {/* <input type="file" accept=".csv" onChange={(e)=> this.csvJSON(e)}></input> */}
      <div className="mainbody">                        
      <input type="file"
          id="file"
          className="input-file1"
          accept=".csv"
          onChange={(e)=> this.csvJSON(e)}
      />
      
      <Json gridData={this.state.jsonData}/>
    {/* <input type="text"  onChange={(e)=>this.filter(e)}></input> */}
    {/* <table>
      <tr>
      
        <th>Formatted ID</th>
        <th>Name</th>
        <th>Schedule State</th>
        <th>Plan Estimate</th>
        <th>Task Estimate Total</th>
        <th>Task Actual Total</th>
        <th>Task Remaining Total</th>
        <th>Owner</th>
        <th>Tags</th>
        <th>Ready</th>
      </tr>
        {
          this.state.jsonData.map(function(data,index)
        {
          return(<tr key={index}>
            <td>{data['Formatted ID']}</td>
            <td>{data['Name']}</td>
            <td>{data['Schedule State']}</td>
            <td>{data['Plan Estimate']}</td>
            <td>{data['Task Estimate Total']}</td>
            <td>{data['Task Actual Total']}</td>
            <td>{data['Task Remaining Total']}</td>
            <td>{data['Owner']}</td>
            <td>{data['Tags']}</td>
            <td>{data['Ready']}</td>
            </tr>
          )
        }
        )
        }
    </table>
   */}
    </div>
    
  </div>
    );
  }
  }
   export default App;
