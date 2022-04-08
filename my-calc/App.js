import { StatusBar } from 'expo-status-bar';
import  React, {useState} from 'react';
import { StyleSheet, Text, SafeAreaView, View, TouchableOpacity } from 'react-native';

import MyButton from './components/myButton';
import MyDisplay from './components/myDisplay';


const labels=[
    ["sin","cos","tan", "√"],
    ["AC","+/-","%","/"],
    ["7", "8", "9", "x"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "+"],
    ["lg", "0", ".", "=",]
]


export default function App() {
    const [operation, setOperation] = useState(null);
    const [symbol, setSymbol] = useState('');
    const [firstOperand, setFirstOperand] = useState("");
    const [history, setHistory] = useState([]);
    const [display, setDisplay] = useState("");
    const [isResult, setIsResult] = useState(false);
    let str = '';

    const easeFunc = (func, symbol) => {
        setOperation(func);
        setSymbol(symbol);
        setFirstOperand(display);
        setDisplay("")
    }

    const addedHistory = (newStr)=> {
        setHistory([...history, newStr]);
        str = '';
    }

    const functionMapping = {
        "+": ()=> {
            easeFunc(()=>(a,b)=>{return a+b}, '+');
        },

        "-": ()=> {
            easeFunc(()=>(a,b)=>{return a-b}, '-');
        },

        "x": ()=> {
            easeFunc(()=>(a,b)=>{return a*b}, '*');
        },

        "/": ()=> {
            easeFunc(()=>(a,b)=> {
                if (b === 0) {
                    return 'на ноль делить нельзя';
                }
                let result = a / b;
                if (!Number.isInteger(result)) {
                    result = result.toFixed(8);
                }
                
                return result;
            }, '/');
        },

        "lg": ()=> {
            if (firstOperand) {
                let result = Math.log(+display).toFixed(9);
                addedHistory(`log(${+display}) = ${result}`);
                setDisplay(result);
            } else {
                let result = Math.log(+display).toFixed(9);
                addedHistory(`log(${+display}) = ${result}`);
                setFirstOperand("");
                setSymbol('');
                setDisplay(result);
            }
        },

        "AC": ()=> {
            if (firstOperand || display) {
                setFirstOperand("");
                setDisplay("");
                setSymbol('');
                setIsResult(false);
            } else {
                setFirstOperand("");
                setOperation(null);
                setDisplay("");
                setSymbol('');
                setHistory([]);
                str = '';
                setIsResult(false);
            }
        },

        "+/-": ()=> {
            setDisplay((+display)*(-1)+"");
        },

        ".": ()=> {
            if (display.indexOf(".")===-1)
                setDisplay(display+".")
        },

        "=": ()=> {
            if (firstOperand && display) {
                let result = operation(+firstOperand, +display);
                str = `${+firstOperand} ${symbol} ${+display} = ${result}`;
                setFirstOperand("");
                setSymbol('');
                setDisplay(result);
                setHistory([...history, str]);
                str = '';
                setIsResult(true);
            }
        },

        "%": ()=> {
            if (firstOperand) {
                let result = +firstOperand / 100 * +display;
                addedHistory(`${+display}%  = ${result}`);
                setDisplay(result);
            } else {
                let result = +display / 100 ;
                addedHistory(`${+display}% = ${result}`);
                setFirstOperand("");
                setSymbol('');
                setDisplay(result);
                
            }
            
        },

        "sin": ()=> {
            if (firstOperand) {
                let result = Math.sin(+display * Math.PI/180).toFixed(10);
                addedHistory(`sin(${+display}) = ${result}`);
                setDisplay(result);
            } else {
                let result = Math.sin(+display * Math.PI/180).toFixed(10);
                addedHistory(`sin(${+display}) = ${result}`);
                setFirstOperand("");
                setSymbol('');
                setDisplay(result);
            }
        },

        "cos": ()=> {
            if (firstOperand) {
                let result = Math.cos(+display * Math.PI/180).toFixed(9);
                addedHistory(`cos(${+display}) = ${result}`);
                setDisplay(result);
            } else {
                let result = Math.cos(+display * Math.PI/180).toFixed(9);
                addedHistory(`cos(${+display}) = ${result}`);
                setFirstOperand("");
                setSymbol('');
                setDisplay(result);
            }
        },

        "tan": ()=> {
            if (firstOperand) {
                let result = Math.tan(+display * Math.PI/180).toFixed(10);
                addedHistory(`tan(${+display}) = ${result}`);
                setDisplay(result);
            } else {
                let result = Math.tan(+display * Math.PI/180).toFixed(10);
                addedHistory(`tan(${+display}) = ${result}`);
                setFirstOperand("");
                setSymbol('');
                setDisplay(result);
            }
        },

        "√": ()=> {
            if (firstOperand) {
                let result = Math.sqrt(+display);
                if (!Number.isInteger(result)) {
                    result = result.toFixed(8);
                }
                addedHistory(`√${+display} = ${result}`);
                setDisplay(result);
            } else {
                let result = Math.sqrt(+display);
                if (!Number.isInteger(result)) {
                    result = result.toFixed(8);
                }
                addedHistory(`√${+display} = ${result}`);
                setFirstOperand("");
                setSymbol('');
                setDisplay(result);
            }
        },
    }

    for (let i = 0; i < 10; i++) {
        functionMapping[i+""]= () => {if (isResult) {setDisplay(String(i)); setIsResult(false);} else {setDisplay(display+i);}};
    }

    return (
    <SafeAreaView style={styles.root}>
        <MyDisplay firstOperand={firstOperand} symbol={symbol} display={display} history={history} />
        <View style={styles.keyboard}>
        { 
        labels.map((value, index, array)=>
          <View style={styles.row} key={index}>
              { 
              value.map((item, ind)=> 
                <MyButton key={ind} item={item} functionMapping={()=> functionMapping[item]()} firstOperand={firstOperand} display={display} />
              )}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
      flex: 1,
      backgroundColor: '#c6a700',
      fontSize: 5,
      paddingTop: 30,
      
  },
  keyboard:{
      flex: 1.5,
      width: "100%",
      backgroundColor:"#a4a4a4",
      paddingTop: 10,
      justifyContent:"space-around",
      alignItems:"center"

  },
  row:{
      flexDirection:"row",
      justifyContent:"space-around",
      alignItems:"center",
      width:"100%",
  },
});
