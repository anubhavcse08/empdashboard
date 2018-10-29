import React from 'react'

export default class json extends React.Component {
    constructor() {
        super();
            this.state= {
            filtering: '',
            filteringByID: '',
            filteringByScheduleState: '',
            filteringByOwner: '',
            addInProgress:'',
            addDefined:'',
            addAccepted:'',
            addComleted:'',
            gridData: [],
            inpro: [],
            diff: [],
            acc: [],
            comp: []
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.gridData !== this.props.gridData) {
            this.setState({
                gridData: this.check(nextProps)
            })
        }
    }
    
    onChangeHandler(e) {
        const filterStr = e.target.value
        const gridData = this.check(this.props).filter((el) => {
            return (el['Formatted ID']+el['Schedule State']+el['Owner']+el['Tags']+el['Ready'])
            .toLowerCase().match(filterStr.toLowerCase());
        });
        //console.log('gridData', gridData)
        const inpro=this.OnAddInProgress();
        const diff=this.OnAddDefined();
        const acc=this.OnAddAccepted();
        const comp=this.OnAddComleted();
        //console.log('Hello add ',inpro[inpro.length-1])
        this.setState({
            filtering: filterStr,
            gridData,
            inpro,
            diff,
            acc,
            comp
        })
    }

    onChangeHandlerByID(e) {
        const filterStr = e.target.value
        const gridData = this.check(this.props).filter((el) => {
             return el['Formatted ID'] && (el['Formatted ID']).toLowerCase().match(filterStr.toLowerCase())
        });
        //console.log('gridData', gridData)
        const inpro=this.OnAddInProgress();
        const diff=this.OnAddDefined();
        const acc=this.OnAddAccepted();
        const comp=this.OnAddComleted();
        this.setState({
            filteringByID: filterStr,
            gridData,inpro,
            diff,
            acc,
            comp
        })
    }
    onChangeHandlerByState(e) {
        const filterStr = e.target.value
        const gridData = this.check(this.props).filter((el) => {
            return el['Schedule State'] && (el['Schedule State']).toLowerCase().match(filterStr.toLowerCase())
        });
        //console.log('gridData', gridData)
        const inpro=this.OnAddInProgress();
        const diff=this.OnAddDefined();
        const acc=this.OnAddAccepted();
        const comp=this.OnAddComleted();
        this.setState({
            filteringByScheduleState: filterStr,
            gridData,
            inpro,
            diff,
            acc,
            comp
        })
    }
    onChangeHandlerByOwner(e) {
        const filterStr = e.target.value
        const gridData = this.check(this.props).filter((el) => {
            return el['Owner'] && (el['Owner']).toLowerCase().match(filterStr.toLowerCase())
        });
        //console.log('gridData', gridData)
        const inpro=this.OnAddInProgress();
        const diff=this.OnAddDefined();
        const acc=this.OnAddAccepted();
        const comp=this.OnAddComleted();
        this.setState({
            filteringByOwner: filterStr,
            gridData,
            inpro,
            diff,
            acc,
            comp
        })
    }




    OnAddInProgress() {
        let p=0;
        const inpro = this.state.gridData.map(e=>{
            if(isNaN(parseFloat(e['Plan Estimate']))) {
                e['Plan Estimate']=0;
            }
            if(e['Schedule State'] === 'In-Progress') {
                p=parseFloat(e['Plan Estimate']) +p;
            }
            return p;
        })
        return inpro[inpro.length-1]
    }
    OnAddDefined() {
        let q=0;
        const diff = this.state.gridData.map(e=>{
            if(isNaN(parseFloat(e['Plan Estimate']))) {
                e['Plan Estimate']=0;
            }
            if(e['Schedule State'] === 'Defined') {
                q=parseFloat(e['Plan Estimate']) +q;
            }
            return q;
        })
        return diff[diff.length-1]
    }
    OnAddAccepted() {
        let r=0;
        const acc = this.state.gridData.map(e=>{
            if(isNaN(parseFloat(e['Plan Estimate']))) {
                e['Plan Estimate']=0;
            }
            if(e['Schedule State'] === 'Accepted') {
                r=parseFloat(e['Plan Estimate']) +r;
            }
            return r;
        })
        return acc[acc.length-1]
    }
    OnAddComleted() {
        let s=0;
        const comp = this.state.gridData.map(e=>{
            if(isNaN(parseFloat(e['Plan Estimate']))) {
                e['Plan Estimate']=0;
            }
            if(e['Schedule State'] === 'Completed') {
                s=parseFloat(e['Plan Estimate']) +s;
            }
            return s;
        })
        return comp[comp.length-1]
    }
    

    check(props) {
        const {gridData} = props;
        
        return gridData;
    }


    renderHeader(){
        // console.log('hello',this.state.gridData)
        
        return(
            <thead className="theadClass">
                <tr>
                    <th>Formatted ID</th>
                    <th>Name</th>
                    <th>Schedule State</th>
                    <th>Plan Estimate</th>
                    <th>Task Estimate Total</th>
                    <th>Task Actual Total</th>
                    <th>Task Remaining Total</th>
                    <th>Owner</th>
                    <th>Tag</th>
                    <th>Ready</th>
                </tr>
                                        
            </thead>
        )
    }
    renderRow(){
        const {gridData} = this.state;
        //console.log('renderrow',gridData)
            const pp= gridData.map(function(data,index)
              {
                return( <tbody>
                    <tr key={index}>
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
                </tbody>
                )
              }
        )
        return pp;
    }


    render(){
        // console.log(this.state.gridData)
        // console.log('Hello add ',this.state.inpro[this.state.inpro.length-1])
        const header = this.renderHeader();
        const grid = this.renderRow();
        return(
            <div>
                <div>
                    <input type="text"
                            id={this.id}
                            value={this.state.filtering}
                            className="input-file2"
                            placeholder="Search..."
                            onChange={this.onChangeHandler.bind(this)}
                    />
                    <input type="text"
                            id={this.id}
                            list="filterByID"
                            value={this.state.filteringByID}
                            className="input-file2"
                            placeholder="Search by ID..."
                            onChange={this.onChangeHandlerByID.bind(this)}
                    />
                    <input type="text"
                            id={this.id}
                            value={this.state.filteringByScheduleState}
                            className="input-file2"
                            placeholder="Search by schedule state..."
                            onChange={this.onChangeHandlerByState.bind(this)}
                    />
                    <input type="text"
                            id={this.id}
                            value={this.state.filteringByOwner}
                            className="input-file2"
                            placeholder="Search by owner..."
                            onChange={this.onChangeHandlerByOwner.bind(this)}
                    />
                </div>
                    <div className="hrLine">
                        <hr></hr>
                    </div>
                    <div className="totalDetals">
                        <h2 className="shortTableDetails">Total PlanEstimate according to schedulestates :</h2>
                        <table id="details">
                            <tr>
                                <th>InProgress</th>
                                <th>Defined</th>
                                <th>Accepted</th>
                                <th>Completed</th>
                                <th>Total</th>
                            </tr>
                            <tr>
                                <td>{this.state.inpro}</td>
                                <td>{this.state.diff}</td>
                                <td>{this.state.acc}</td>
                                <td>{this.state.comp}</td>
                                <td>{this.state.inpro+this.state.diff+this.state.acc+this.state.comp}</td>
                            </tr>
                        </table>
                    </div>
                    <hr></hr>
                    <table id="customers">
                        {header}
                        {grid}
                    </table> 
            </div>
            
        )
    }
}