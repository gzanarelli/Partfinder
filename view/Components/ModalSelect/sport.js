import React, { PureComponent } from 'react';
import { Text, View, ScrollView, Picker, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('screen');


export class sport extends PureComponent {
    // constructor(props) {
    //     super(props);
    //     this.state = ({
    //         sport: '',
    //     })
    // }

    renderList() {
        var list = [];
        let sport = [
            'Tennis',
            'Football',
            'Badminton',
            'Sqaush',
            'Table-tennis',
            'Basket',
            'Rugby',
            'Handball',
            'Taekwondo',
            'Judo',
            'Danse',
            'Calisthenics',
            'Cross-fit',
            'Fitness'
        ].sort();
    
        for (var i=0;i<sport.length;i++) {
          list.push(<Picker.Item label={sport[i]} value={sport[i]} color={'#fff'} key={i} />);
        }
    
        return list;
    }

    render() {
        return (
            // <ScrollView>
                <Picker style={{width: width * 0.35, paddingLeft: 10}} selectedValue={this.props.sport} onValueChange={(itemValue, itemIndex) => this.setState({sport: itemValue})} >
                    {this.renderList()}
                </Picker>
            // </ScrollView>
        )
    }
}

export default sport
