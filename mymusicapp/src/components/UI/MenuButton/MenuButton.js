import React,{Component} from 'react';
import Styles from './MenuButton.module.css'

class menuButton extends Component{
    
    render(){
        let style = [Styles.MenuButton];
        if(this.props.show){
            style.push(Styles.change);
        }
        return (
            <div className={style.join(' ')} onClick={this.props.clicked}>
                <div className={Styles.bar1}></div>
                <div className={Styles.bar2}></div>
                <div className={Styles.bar3}></div>
            </div>
        );
    }
  
}

export default menuButton;