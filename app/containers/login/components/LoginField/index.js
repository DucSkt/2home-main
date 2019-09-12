import React, { Component } from 'react';
import { View } from 'react-native';
import { CreateFieldName, EnterField } from './CreateField';
import styles from './styles';

class LoginField extends Component {
  static defaultProps = {
    title: '',
    hasPasswordField: false
  };

  constructor(props) {
    super(props);
    this.state = { showingNameField: false };
  }

  onBlur = () => {
    this.setState({
      showingNameField: false
    });
  };

  showField = () => {
    this.setState({ showingNameField: true });
  };

  render() {
    const {
      showingNameField
    }= this.state;

    const {
      hasPasswordField,
      create,
      onSubmitEditing,
      title,
      style
    }=this.props;

    const contents = showingNameField ? (
      <EnterField
        hasPasswordField={hasPasswordField}
        create={create}
        onBlur={this.onBlur}
        onSubmitEditing={onSubmitEditing}
        title={title}
      />
    ) : (
      <CreateFieldName
        title={title}
        style={styles.buttonStyles}
        onPress={this.showField}
        onBlur={this.onBlur}
      />
    );
    return <View style={style}>{contents}</View>;
  }
}

export default LoginField;
