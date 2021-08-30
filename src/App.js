    /*global chrome*/

import { useState, Text, useEffect } from "react";
import "./App.css"
import ReactDOM from "react-dom";
import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import PlayPause from "./components/PlayPause";
import { MdModeEdit } from "react-icons/md";
import { IconContext } from "react-icons";


import styled from 'styled-components';

const ws = new WebSocket("ws://localhost:8082")
const StyledContainer = styled.div`
  max-width: 450px;
  width: 60%;
  // height: 230px;
  margin: auto;
  border: none;
  background-color: white;
  box-shadow: rgb(0 0 0 / 20%) 0px 0px 2px 2px;
  border-radius: 4px;

`


const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const ControlledOpenSelect = ({Dictionary,SelectedUIControl, Setter, options}) => {
  const classes = useStyles();
  const [age, setAge] = React.useState('');
  const [open, setOpen] = React.useState(false);
  
  const handleChange = (event) => {

    Setter(prevState => ({
          ...prevState,
          [SelectedUIControl]:event.target.value 
      }));


    setAge(event.target.value);


  };

  const handleClose = () => {
    setOpen(false);

  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div style= {{
      padding: "18px"
    }}>
      <FormControl className={classes.formControl}>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={Dictionary[SelectedUIControl]? Dictionary[SelectedUIControl] : age}
          onChange={handleChange}
        >
          
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {Object.values(options).map((item,index) => (

          <MenuItem key={ index } value={item}>{item}</MenuItem>

          ))}
        </Select>
      </FormControl>
    </div>
  );
};
  
function App() {

  const [SupportedDataTypes,setSupportedDataTypes] = useState({})

  const [clickStream, setClickStream] = useState([
    "Type - INPUT"+"\n"+
   "lightning-input_input -"+"\n"+
    "type - text"+"\n"+
    "id - input-233"+"\n"+
   "aria-invalid - false"+"\n"+
    "maxlength - 40"+"\n"+
   "placeholder - First Name"+"\n"+
    "name - firstName"+"\n"+
    "class - slds-input"+"\n",

    "class - slds-input"+"\n",

    "class - slds-input"+"\n",

    "class - slds-input"+"\n",

    "class - slds-input"+"\n",

    "class - slds-input"+"\n",

    "class - slds-input"+"\n",

"Tagname - INPUT"+"\n"+
"lightning-input_input -"+"\n"+
"type - text"+"\n"+
"id - input-236"+"\n"+
"aria-invalid - false"+"\n"+
"maxlength - 40"+"\n"+
"placeholder - Suffix"+"\n"+
"name - suffix"+"\n"+
"class - slds-input"+"\n"



  ]);
  const allowedAttributes = ["Type","id","name","title","class", "cols", "rows", "role","focusable"]


  const [pauseResume, setPauseResume] = useState("Pause");
  const [showSaveButton, setShowSaveButton] = useState(false);
  const [SequenceAndMapping, setSequenceAndMapping] = useState({});
  const [showPlayButton, setShowPlayButton] = useState(false)
  const [blueButton, setBlueButton] = useState(false)

  useEffect(()=>{

    ws.addEventListener("open", e=>{

      ws.send(JSON.stringify("DataTypes"))
  
     });
  
     ws.addEventListener("message", message => {
      setSupportedDataTypes(JSON.parse(message.data))


  
  

})
    },[])

  // chrome.runtime.onMessage.addListener((request, sender,sendResponse)=>{
    
  //   console.log(request)
  //   setClickStream([...clickStream, request.elementDetected])
  //   sendResponse("I have received your message");
  // }) 
  var SiteTabId;    
  const sendMessageToContentScript = (ToDO) => {
          if (ToDO=="Pause"){
            setPauseResume("Resume")
          }
          else if (ToDO == "Resume") {
            setPauseResume("Pause")
          }
          else if (ToDO == "Stop"){
            setShowSaveButton(true)
          }


        //   chrome.tabs.query({active: true}, function(tabs){
        //     SiteTabId = tabs[0].id
        //     chrome.tabs.sendMessage(SiteTabId, {Recording: ToDO}, function(response){
            
        //       console.log(response)
        //     });
        //  });
    
       

   
    
  }

  const SaveTheSequenceAndMapping = () => {

    var keys = [];
    for(var k in SequenceAndMapping) keys.push(k);
    var mask = clickStream.map(item => keys.includes(item));
    var NotMapped = clickStream.filter((item, i) => !mask[i]);
    NotMapped.forEach(element => {
      SequenceAndMapping[element]=""
      
  });

  console.log(SequenceAndMapping)


    ws.send(JSON.stringify(SequenceAndMapping))

  }

  function RenderItem(props) {
    const text = props.text;
    var eachLine = text.split("\n")
    var FINAL_TEXT =""
    eachLine.forEach(element => {

      var attribute = element.split("-")[0]
      if(allowedAttributes.includes(attribute.replace(/ /g, ""))){
        FINAL_TEXT = FINAL_TEXT+element+"\n"
      }
      
    });


    return <p id = "item">
      {FINAL_TEXT}
      
      </p>;
}

function handleSave(){
  setBlueButton(true)
  setShowPlayButton(false)
}
  return (


<>


  <div>
  {/* <button id = "Start" onClick = {() => sendMessageToContentScript('Start')}>Start</button>
  <br></br>
  <button id = "Pause"  onClick = {() => sendMessageToContentScript(pauseResume)}>{pauseResume}</button>
  <br></br>
  <button id = "Resume" onClick = {() => sendMessageToContentScript('Stop')}>Stop</button>
  <br></br>
  <br></br> */}

<div id = "Buttons">
  <button
          onClick={() => setShowPlayButton(!showPlayButton) }
          style={{
            border: "none",
            backgroundColor:"White" ,
            boxShadow: "0 0 2px 2px rgba(0,0,0,.2)",
            cursor: "pointer",
            height: 42,
            outline: "none",
            borderRadius: "4px",
            width: 60,
            marginBottom: 2
          }}
        >
          <PlayPause buttonToShow={showPlayButton ? "play" : "pause"} />
        </button>

  <button
  
  onClick = {handleSave}
  className = "Button2"
  style={{
    border: "none",
    
    backgroundColor: "White",
    padding: 0,

    boxShadow: "0 0 2px 2px rgba(0,0,0,.2)" ,
    cursor: "pointer",
    height: 43,
    outline: "none",
    borderRadius: "4px",
    width: 60,
    marginLeft: 20,
    marginTop: 20,
  
    
  }}
        >
          {
            !blueButton?
            <p

                  style = {{
                    fontFamily: "sans-serif",
                    fontSize: 15,
                    color: "red",
                    opacity: 1,
                    fontWeight: "Bold",
                    
                  }}

            >STOP</p>
            :
            <p

style = {{
  fontFamily: "sans-serif",
  fontSize: 15,
  color: "Green",
  opacity: 1,
  fontWeight: "Bold",
  
}}

>SAVED</p>
          }
      
        </button>
       
  </div>
<br/>
<br/>
<br/>
<div id= "Directions">
  <p

  id = "para">Press play to start recording. Then click on UI controls. <br/>  
  Then select data types to be enetred in those fields. You <br/>
  can also record any types of buttons or link clicks. 




  </p>
</div>

<div id= "SequenceNamediv">
  <input
  id = "SequenceNameInput"
  type= "text"
  placeholder= "Untitled Sequence 001"
  ></input> 


  <IconContext.Provider value={{ 
    color: "Light grey",
    size : "20px",
    style : {
      marginLeft: 15,
      marginBottom: -6
    }


    
  }}>
  <MdModeEdit
  onClick= {()=> document.getElementById("SequenceNameInput").focus()}/>
  </IconContext.Provider>
  </div>
<br/>
<ul >

              {
              clickStream.map(function(name, index){
                  return <div>
                  
                  <StyledContainer key={ index }>
                    <RenderItem text = {name}/>

                  <ControlledOpenSelect Dictionary = {SequenceAndMapping} SelectedUIControl = {name} Setter = {setSequenceAndMapping} options = {SupportedDataTypes}/>

                  </StyledContainer>
                  <br />


                  </div>
                })}
                
</ul>



{/* {
showSaveButton?
  <button id = "Save" onClick={SaveTheSequenceAndMapping}>Save</button>  
:
<div></div>
} */}

  </div>
</>

      );
}

export default App;

