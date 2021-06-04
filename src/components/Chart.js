import React, { Component } from 'react'
import {Line,Bar} from 'react-chartjs-2'
import { defaults } from 'react-chartjs-2';

export default class Chart extends Component {

    render() {
      console.log(this.props.labels,'label')

        let data={
            labels:this.props.velocity,
            datasets:[{
                label:'Variation of drag force with velocity',
                data:this.props.drag,
                backgroundColor:'rgba(162, 211, 235, 0.4)',
                borderWidth:4,
                fill:true,
                borderColor:'blue',
                pointBackgroundColor:'red',
                pointBorderColor:'red',
                pointRadius:2,
                radius:4,
                lineTension:0.5,
              },
            ],
            // fontColor:'red'

      }

      let options=  {
        scales: {
            y: {
                beginAtZero: true
            }
        },
        legends:{
          fontSize:24,
          fontColor:'red'
        }
    }
       
        
        return (

         <div className="chart" style={{padding:' 0 0 100px 0',margin:'0 auto', width:'830px',height:'400px'}} >
         <Line data={data}  
         options={
            {    
                responsive: true,    
                title: {      
                  display: true,      
                  position: "top",      
                  text: "Line Chart",      
                  fontSize: 16,      
                  fontColor: "#444"    
                },    
                legend: {      
                  display: true,      
                  position: "bottom",      
                  labels: {        
                   fontColor: "#555",        
                    fontSize: 14     
                  }    
                }  
              } 
         }
          />
         
         </div>
     )


    }
}
