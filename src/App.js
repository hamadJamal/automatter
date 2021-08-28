    /*global chrome*/

import { useState, Text, useEffect, } from "react";
import "./App.css"
import ReactDOM from "react-dom";
import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import PlayPause from "./components/PlayPause";

const ws = new WebSocket("ws://localhost:8082")




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
    <div>
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
    "Tagname - INPUT"+"\n"+
   "lightning-input_input -"+"\n"+
    "type - text"+"\n"+
    "id - input-233"+"\n"+
   "aria-invalid - false"+"\n"+
    "maxlength - 40"+"\n"+
   "placeholder - First Name"+"\n"+
    "name - firstName"+"\n"+
    "class - slds-input"+"\n",

// "Tagname - INPUT"+"\n"+
// "lightning-input_input -"+"\n"+
// "type - text"+"\n"+
// "id - input-236"+"\n"+
// "aria-invalid - false"+"\n"+
// "maxlength - 40"+"\n"+
// "placeholder - Suffix"+"\n"+
// "name - suffix"+"\n"+
// "class - slds-input"+"\n"



  ]);
  const allowedAttributes = ["Tagname","type","id","name","class","title","placeholder", "cols", "rows", "role", "maxlength", "href", "data-aura-rendered-by", "focusable"]


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
      // console.log(attribute)
      if(allowedAttributes.includes(attribute.replace(/ /g, ""))){
        FINAL_TEXT = FINAL_TEXT+element+"\n"

      }
      
    });

    return <div id = "item">{FINAL_TEXT}</div>;
}

let btn_class = blueButton ? "BlueButton" : "WhiteButton";
function handleSave(){
  setBlueButton(true)

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

<div id = "Button1">
  <button
          onClick={() => setShowPlayButton(!showPlayButton) }
          style={{
            border: "none",
            backgroundColor:"White" ,
            boxShadow: "0 0 2px 2px rgba(0,0,0,.2)",
            cursor: "pointer",
            height: 40,
            outline: "none",
            borderRadius: "10px",
            width: 90,
            marginTop: 20
          }}
        >
          <PlayPause buttonToShow={showPlayButton ? "play" : "pause"} />
        </button>

  <button
  
  onClick = {handleSave}
  className = "Button2"
  style={{
    border: "none",
    
    backgroundColor: blueButton? "Green": "White",
    padding: 0,

    boxShadow: "0 0 2px 2px rgba(0,0,0,.2)" ,
    cursor: "pointer",
    height: 40,
    outline: "none",
    borderRadius: "10px",
    width: 90,
    marginLeft: 20,
    marginTop: 20,
  
    
  }}
        >
          {
            !blueButton?
<svg height="20" width="30">
  <circle cx="15" cy="10" r="8" fill="red" />
</svg>
:
<p

style = {{
  fontFamily: "sans-serif",
  fontSize: 15,
  color: "White",
  opacity: 0.99,
  fontWeight: "Bold",
  
}}

>SAVED</p>
}
      
        </button>
       
  </div>


  
  <ul>
                {
                clickStream.map(function(name, index){
                    return <div key={ index }>
                      <RenderItem text = {name}/>
                    <br></br>

                    <ControlledOpenSelect Dictionary = {SequenceAndMapping} SelectedUIControl = {name} Setter = {setSequenceAndMapping} options = {SupportedDataTypes}/>
                    <hr></hr>
                    <br></br>

                    </div>;
                  })}
  </ul>


{
showSaveButton?
  <button id = "Save" onClick={SaveTheSequenceAndMapping}>Save</button>  
:
<div></div>
}

  </div>
</>

      );
}

export default App;
