import { TimePicker } from 'antd';
import React from 'react'
import moment from 'moment';

class RangeTimePicker extends React.Component{
	constructor(props){
		super(props)
		this.state={startValue:'00:00',endValue:'00:00',defaultStart:'00:00',defaultEnd:'00:00'}
		// this.setState()
	}
	componentDidMount(){
        console.log(this.props.startValue)
		this.setState({startValue:this.props.startValue,endValue:this.props.endValue})
	}

	// componentWillReceiveProps(){
        
	// }

	render(){
    const onStartChange=(time, timeString)=> {
        // console.log(time,timeString)
        let min = timeString.split(',')[1]
        let hour = timeString.split(',')[0]
        let endMin,endHour;
        if(min==59){
           endHour = parseInt(hour)+1;
           if(endHour<10){
           endHour='0'+endHour
           }
           endMin='00'
           this.setState({startValue:timeString,defaultEnd:endHour+':'+endMin})
        }else{
            endHour = hour
            endMin = parseInt(min)+1
            if(endMin<10){
                endMin='0'+endMin
            }
           this.setState({startValue:timeString,defaultEnd:endHour+':'+endMin})
        }
        
    }
    const onEndChange=(time, timeString)=> {
        let min = timeString.split(',')[1]
        let hour = timeString.split(',')[0]
        let startMin,startHour;
        if(min==59){
           startHour = parseInt(hour)+1;
           if(startHour<10){
           startHour='0'+startHour
           }
           startMin='00'
           this.setState({startValue:timeString,defaultEnd:startHour+':'+startMin})
        }else{
            startHour = hour
            startMin = parseInt(min)-1
            if(startMin<10){
                startMin='0'+startMin
            }
           this.setState({startValue:timeString,defaultEnd:startHour+':'+startMin})
        }
        // console.log(time,timeString)
        this.setState({endValue:timeString})
    }
    const disabledStartHours=()=>{
    	// console.log('dissh')
        let min = []
    	let hour = []
    	for(let i=0;i<60;i++)
    	{
    		min.push(i)
    	}
    	for(let i=0;i<24;i++)
    	{
    		hour.push(i)
    	}
        let endHour = this.state.endValue.split(':')[0]
        let endMin  = this.state.endValue.split(':')[1]
        // console.log('eh',endHour,'em',endMin)
        if(endMin==59){
        	console.log('return',hour.slice(parseInt(endHour)+1,23))
        	return hour.slice(parseInt(endHour)+1,24)
        }else if(!endMin){
        	return []
        }
        else{
        	console.log('return',hour.slice(parseInt(endHour),23))
        	return hour.slice(parseInt(endHour)+1,24)
        }
     // return [20,21,22,23]
    }
    const disabledStartMinutes=(selectedHour)=>{
            let min = []
    	let hour = []
    	for(let i=0;i<60;i++)
    	{
    		min.push(i)
    	}
    	for(let i=0;i<24;i++)
    	{
    		hour.push(i)
    	}
        let endHour = this.state.endValue.split(':')[0]
        let endMin = this.state.endValue.split(':')[1]
        let startHour = this.state.startValue.split(':')[0]
        console.log('sh',startHour,'sm',endMin,'eh',endHour)
        if(endMin==59){
        	return [59]
        }else if(endMin==undefined){
        	console.log('come this')
        	return []
        }else if(startHour==endHour){
        	return min.slice(parseInt(endMin),60)
        }
        else{
        	return []
        }
    }
    const disabledEndtHours=()=>{
    	let min = []
    	let hour = []
    	for(let i=0;i<60;i++)
    	{
    		min.push(i)
    	}
    	for(let i=0;i<24;i++)
    	{
    		hour.push(i)
    	}
        let startHour = this.state.startValue.split(':')[0]
        let startMin = this.state.startValue.split(':')[1]
        if(startMin==59){
        	return hour.slice(0,parseInt(startHour)+1)
        }else{
        	return hour.slice(0,parseInt(startHour))
        }
    }
    const disabledEndMinutes=()=>{
        let min = []
    	let hour = []
    	for(let i=0;i<60;i++)
    	{
    		min.push(i)
    	}
    	for(let i=0;i<24;i++)
    	{
    		hour.push(i)
    	}
        let startHour = this.state.startValue.split(':')[0]
        let startMin = this.state.startValue.split(':')[1]
        let endHour = this.state.endValue.split(':')[0]
        // console.log('sh',startHour,'sm',startMin,'eh',endHour)
        if(startMin==59){
        	return min
        }else if(parseInt(endHour)==parseInt(startHour)){
            return min.slice(0,parseInt(startMin)+1)
        }
        else{
        	return []
        }
    }
    // console.log('render',this.state.startValue)

const format = 'HH:mm'
		return(
			<div>
				<TimePicker 
				name="startValue"
				onChange={onStartChange} 
				defaultOpenValue={moment(this.state.defaultStart, 'HH:mm')}
				defaultValue={moment(this.props.startValue, format)} 
				format={format}
				hideDisabledOptions={true}
				disabledHours={disabledStartHours}
				disabledMinutes={disabledStartMinutes}
				 />
				 <TimePicker 
				name="endValue"
				onChange={onEndChange} 
				defaultOpenValue={moment(this.state.defaultEnd, 'HH:mm')}
				defaultValue={moment(this.props.endValue, format)} 
				format={format}
				hideDisabledOptions={true}
				disabledHours={disabledEndtHours}
				disabledMinutes={disabledEndMinutes}
				 />
			</div>
			)
	}
}

export default RangeTimePicker

