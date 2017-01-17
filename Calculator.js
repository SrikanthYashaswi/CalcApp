import React, {Component} from 'react'
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
} from 'react-native'

class Key extends Component{
  render(){
    return (
        <TouchableOpacity
          style={[styles.button,{backgroundColor:this.props.backgroundColor}]}
          onPress = {this.props.onTrigger}>
          <Text style = {[styles.text,{color:this.props.textColor}]}>{this.props.value}</Text>
        </TouchableOpacity>
    )
  }
}
export default class Calculator extends Component{
  state = {
    calculatedValue:'',
    history:'',
    num:'',
    onTopStackOp:'',
  }
  modifyNum(ip){
    let {num,onTopStackOp,calculatedValue} = this.state;
    num = (num === '' && ip === 0) ? num='' : num = `${num}${ip}`
    if(onTopStackOp === ''){
      calculatedValue = '';
      this.setState({calculatedValue:calculatedValue});
    }
    this.setState({num: num,history: `${this.state.history}${ip}`});
  }
  op(operator){
    let {calculatedValue,num,onTopStackOp,history} = this.state;
    if(calculatedValue == ''){
      calculatedValue = Number(num);
      num='';
      onTopStackOp = operator;
    }
    else{
      if(num===''){
        onTopStackOp = operator;
      }
      else{
        calculatedValue = this.compute(calculatedValue,onTopStackOp,Number(num));
        num='';
        onTopStackOp = operator;
      }
    }
    history = `${history}${operator}`;
    this.setState({calculatedValue:calculatedValue,onTopStackOp:onTopStackOp,num:num,history:history});
  }
  calcAns(){
    let {calculatedValue,num,onTopStackOp,history} = this.state;
    if(calculatedValue !== '' && num !== '')
    {
      calculatedValue = this.compute(calculatedValue,onTopStackOp,Number(num));
      num='';
      onTopStackOp='';
    }
    history = ``
    this.setState({calculatedValue:calculatedValue,onTopStackOp:onTopStackOp,num:num});
  }
  compute(n1,op,n2){
    switch(op){
      case '+':{
        return n1+n2;
      }
      case '*':{
        return n1*n2;
      }
      case '/':{
        return n1/n2;
      }
      case '-':{
        return n1-n2;
      }
      default:{
        return n2;
      }
    }
  }
  render(){
    var nums = [1,2,3,4,5,6,7,8,9,0,'.'];
    var scrollview;
    let {calculatedValue,onTopStackOp,num} = this.state;
    return (
        <View>
          <View >
              <ScrollView horizontal
                  ref={(dat) => {scrollview = dat}}
                >
                <Text style={styles.bold} >{`${calculatedValue}${onTopStackOp}${(num === '') ? ``: num} `}  </Text>
              </ScrollView>
          </View>
          <View >
            <View style= {styles.actionPanel}>
              {
                nums.map( (n,i) =>{
                return ( <Key value={n}
                          key={i}
                          backgroundColor={'whitesmoke'}
                          textColor={'#4A90E2'}
                           onTrigger = {this.modifyNum.bind(this,n)}
                           /> );
              } ) }
            </View>

            <View style={[styles.actionPanel,{marginTop:5}]} >
              <Key value={'+'}
              onTrigger = {this.op.bind(this,'+')} />
              <Key value={'-'}
              onTrigger = {this.op.bind(this,'-')} />

              <Key value={'*'}
              onTrigger = {this.op.bind(this,'*')} />
              <Key value={'/'}
              onTrigger = {this.op.bind(this,'/')} />
              <Key
                value={'Ans'}
                backgroundColor={'#4A90E2'}
                textColor={'whitesmoke'}
              onTrigger  = {this.calcAns.bind(this)} />
            
            </View>
          <View>

          </View>
        </View>
        </View>
    )
  }
}
const styles = StyleSheet.create({
  bold:{
    fontSize:28,
    padding:4,
    color:'blue',
  },
  panel:{
    flex:1,
    flexDirection:'column',
  },
  actionPanel:{

    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    flexWrap:'wrap',
  },
  button:{
    backgroundColor:'whitesmoke',

    justifyContent:'center',
    alignItems:'center',
    width:105,
    height:85,
  },
  text: {
    fontSize:35,
    padding:20,
    color: '#4A90E2',
  },
})
