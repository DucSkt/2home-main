import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {connect} from "react-redux";

class Child extends Component {
    render() {
        return (
            <View>
                <Text style={styles.text}>{this.props.count}</Text>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        count: state.counterReducer.counter
    }
};

const mapDispatchToProps = (dispatch) => {
    return {

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Child);

const styles = StyleSheet.create({
    text: {
        fontSize: 100,
        color: '#000',
    }
});