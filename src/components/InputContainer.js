
import React, { useState,useEffect } from 'react'
import { Paper, Typography, TextField, Container, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import InputUnit from './InputUnit';
import '../App.css'
import { Specs,Environment,Diameter,Pitch } from '../data/data';


const InputContainer=()=> {

    const[specs,setSpecs]=useState(Specs)
    const[environment,setEnvironment]=useState(Environment)
    const[diameter,setDiameter]=useState(Diameter)
    const[pitch,setPitch]=useState(Pitch)

    // useEffect(()=>{

    //     specsChangeHandler(specs,data)
    //     environmentChangeHandler()
    //     diameterChangeHandler()
    // },[])

   const specsChangeHandler = (e, data) => {
        // console.log(e.target.value, data.id);

        //copy the input object from the state
        const updatedInput = { ...specs.input }

        //copy the specific field like density, maxPower using data.id from updatedInput
        let item = updatedInput[data.id];

        //update the value using the value from onChange to the related field
        item = { ...item, value: e.target.value };

        //update the field item with updated value to updatedInput
        updatedInput[data.id] = item;

         //The data is calculated for certain required fields 

         updatedInput.nominalVoltage.value=updatedInput.cellsInSeries.value*3.7

         updatedInput.maxRPM.value=(updatedInput.kvRating.value*updatedInput.nominalVoltage.value)
         updatedInput.maxWorkingRPM.value=(updatedInput.estimatedMaxPercent.value)/100*updatedInput.maxRPM.value

 
         console.log(updatedInput.kvRating.value,"kvcheck")
    
        //set the new state
        setSpecs({ input: updatedInput });



    }
  
    const environmentChangeHandler = (e, data) => {
        // console.log(e.target.value, data.id);

        //copy the input object from the state
        const updatedInput = { ...environment.input }

        //copy the specific field like density, maxPower using data.id from updatedInput
        let item = updatedInput[data.id];

        //update the value using the value from onChange to the related field
        item = { ...item, value: e.target.value };

        //update the field item with updated value to updatedInput
        updatedInput[data.id] = item;



        //set the new state
        setEnvironment({ input: updatedInput });

        console.log(updatedInput.density.value,"envirocheck")
    }

    const diameterChangeHandler = (e, data) => {
        // console.log(e.target.value, data.id);

        //copy the input object from the state
        const updatedInput = { ...diameter.input }

        //copy the specific field like density, maxPower using data.id from updatedInput
        let item = updatedInput[data.id];

        //update the value using the value from onChange to the related field
        item = { ...item, value: e.target.value };

        updatedInput[data.id] = item;

           //Diameter1 value calculation start
         // let powerData=(updatedInput.cp1.value*updatedInput.density.value*Math.pow(updatedInput.maxWorkingRPM.value/60,3))
         let diameter1Result=Math.pow((specs.input.maxPower.value/(updatedInput.cp1.value*environment.input.density.value* Math.pow((specs.input.maxWorkingRPM.value/60),3))),1/5)*1000/25.4
         let diameter2Result=Math.pow((specs.input.maxPower.value/(updatedInput.cp2.value*environment.input.density.value* Math.pow((specs.input.maxWorkingRPM.value/60),3))),1/5)*1000/25.4
      

        //Update is happening one step slow

         updatedInput.diameter1.value=diameter1Result
         updatedInput.diameter2.value=diameter2Result
 

        //update the field item with updated value to updatedInput
        
        //set the new state

        setDiameter({ input: updatedInput });
        console.log(updatedInput.cp1.value,"cp1check")
        console.log(updatedInput.cp2.value,"cp2check")

    }
    const pitchChangeHandler=(e,data)=>{
         // console.log(e.target.value, data.id);

        //copy the input object from the state
        const updatedInput = { ...pitch.input }

        //copy the specific field like density, maxPower using data.id from updatedInput
        let item = updatedInput[data.id];

        //update the value using the value from onChange to the related field
        item = { ...item, value: e.target.value };

        //update the field item with updated value to updatedInput
        updatedInput[data.id] = item;

updatedInput.pitch1.value=(updatedInput.airspeed1.value*1.8)/(specs.input.maxWorkingRPM.value/60)*1000/25.4
updatedInput.pitch2.value=(updatedInput.airspeed2.value*1.8)/(specs.input.maxWorkingRPM.value/60)*1000/25.4

console.log(updatedInput.airspeed1.value,"pitch")
        setPitch({input:updatedInput})
    }


    
        let specsInputData = []
        for (let key in specs.input) {
            specsInputData.push({ id: key, data: specs.input[key] })
        }
        let environmentInputData = []
        for (let key in environment.input) {
            environmentInputData.push({ id: key, data: environment.input[key] })
        }
        let diameterInputData = []
        for (let key in diameter.input) {
            diameterInputData.push({ id: key, data: diameter.input[key] })
        }
        let pitchInputData=[]
        for(let key in pitch.input){
            pitchInputData.push({id:key,data:pitch.input[key]})
        }
        console.log(pitchInputData,"pitchInputData")
        useEffect(
            ()=>{
                
                const updatedDiameterInput = { ...diameter.input }
                const updatedEnvironmentInput={...environment.input}
                const updatedSpecsInput={...specs.input}

                let diameter1Result=Math.pow((updatedSpecsInput.maxPower.value/(updatedDiameterInput.cp1.value*updatedEnvironmentInput.density.value* Math.pow((updatedSpecsInput.maxWorkingRPM.value/60),3))),1/5)*1000/25.4
console.log(updatedEnvironmentInput.density.value,"densitycheckeffect")
console.log(updatedSpecsInput.maxPower.value,"specscheckeffect")
console.log(updatedDiameterInput.cp1.value,"diametercheckeffect")
                let diameter2Result=Math.pow((updatedSpecsInput.maxPower.value/(updatedDiameterInput.cp2.value*updatedEnvironmentInput.density.value* Math.pow((updatedSpecsInput.maxWorkingRPM.value/60),3))),1/5)*1000/25.4
                    updatedDiameterInput.diameter1.value=diameter1Result
                    updatedDiameterInput.diameter2.value=diameter2Result
                    // copy the specific field like density, maxPower using data.id from updatedInput
                    setDiameter({ input: updatedDiameterInput });
                    console.log("updated diameter")
            
                    },[specs,environment])

useEffect(()=>{
    const updatedSpecsInput={...specs.input}
    const updatedPitchInput={...pitch.input}
    updatedPitchInput.pitch1.value=(updatedPitchInput.airspeed1.value*1.8)/(updatedSpecsInput.maxWorkingRPM.value/60)*1000/25.4
    updatedPitchInput.pitch2.value=(updatedPitchInput.airspeed2.value*1.8)/(updatedSpecsInput.maxWorkingRPM.value/60)*1000/25.4


    
},[specs,pitch])

        console.log('specsData',specsInputData,'environmentData:',environmentInputData,'diameterData', diameterInputData)
        // const classes = useStyles();
        console.log(specs,"state")
        return (
            <div style={{ margin: '0px 20px' }}>
 <Paper elevation={6} className="paper" style={{ padding: '20px 30px',margin:'20px 0px' }}>
                <div style={{marginTop: '20px'}}>
                    <Typography variant='h5' style={{ margin: '12px', textAlign: 'center' }} >Specs</Typography>
                    <div style={{ flexGrow: 1 }}>
                       
                            <Grid container spacing={0}>


                                {specsInputData.map(eachInputData => {
                                    return (
                                        <Grid item xs={6}>
                                            <InputUnit key={eachInputData.id} id={eachInputData.id} data={eachInputData.data} onChange={(e) => specsChangeHandler(e, eachInputData)} />
                                        </Grid>
                                    )
                                })}

                            </Grid>
                        
                    </div>         
                </div>
                </Paper>
                <Paper elevation={6} className="paper" style={{ padding: '20px 30px',margin:'20px 0px' }}>
                <div style={{margin: '20px 0px'}}>

                    
                    <Typography variant='h5' style={{ margin: '12px', textAlign: 'center' }} >Environment</Typography>

                        <Grid container>
                            {environmentInputData.map(eachInputData => {
                                return (
                                    <Grid item xs={6} md={6} lg={6}>
                                        <InputUnit key={eachInputData.id} id={eachInputData.id} data={eachInputData.data} onChange={(e) => environmentChangeHandler(e, eachInputData)} />
                                    </Grid>
                                )
                            })}
                        </Grid>
                </div>
                    </Paper>

                    <Paper elevation={6} className="paper" style={{ padding: '20px 30px',margin:'20px 0px' }}>
                <div style={{margin: '20px 0px'}}>
                    <Typography variant='h5' style={{ margin: '12px', textAlign: 'center' }} >Propeller and Diameter Selection</Typography>

                        <Grid container>
                            {diameterInputData.map(eachInputData => {
                                return (
                                    <Grid item xs={6} md={6} lg={6}>
                                        <InputUnit key={eachInputData.id} id={eachInputData.id} data={eachInputData.data} onChange={(e) => diameterChangeHandler(e, eachInputData)} />
                                    </Grid>
                                )
                            })}
                        </Grid>
                </div>
                    </Paper>


                    <Paper elevation={6} className="paper" style={{ padding: '20px 30px',margin:'20px 0px' }}>
                <div style={{margin: '20px 0px'}}>
                    <Typography variant='h5' style={{ margin: '12px', textAlign: 'center' }} >Propeller and Diameter Selection</Typography>

                        <Grid container>
                            {pitchInputData.map(eachInputData => {
                                return (
                                    <Grid item xs={6} md={6} lg={6}>
                                        <InputUnit key={eachInputData.id} id={eachInputData.id} data={eachInputData.data} onChange={(e) => pitchChangeHandler(e, eachInputData)} />
                                    </Grid>
                                )
                            })}
                        </Grid>
                </div>
                    </Paper>
            </div>
        )
    }

export default InputContainer;