import React, { Component } from 'react';
import { Animated, Image, Platform, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import BackButton from '../../../../components/BackHeaderButton'
import { Colors, Fonts, Metrics } from '../../../../themes';
import { withNavigation } from 'react-navigation'
import ProperType from 'prop-types'
const NAVBAR_HEIGHT = 44;

class CollapsibleNavbar extends Component {
  constructor(props) {
    super(props);

    const scrollAnim = new Animated.Value(0);
    const offsetAnim = new Animated.Value(0);

    this.state = {
      scrollAnim,
      offsetAnim,
      clampedScroll: Animated.diffClamp(
        Animated.add(
          scrollAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
            extrapolateLeft: 'clamp',
          }),
          offsetAnim,
        ),
        0,
        NAVBAR_HEIGHT,
      ),
    };
  }
  static propTypes = {
    isLoading:ProperType.bool,
    loadingElement:ProperType.element
  }
  static defaultProps = {
    isLoading:false
    
  }
  _clampedScrollValue = 0;
  _offsetValue = 0;
  _scrollValue = 0;

  componentDidMount() {
    this.state.scrollAnim.addListener(({ value }) => {
      const diff = value - this._scrollValue;
      this._scrollValue = value;
      this._clampedScrollValue = Math.min(
        Math.max(this._clampedScrollValue + diff, 0),
        NAVBAR_HEIGHT,
      );
    });
    this.state.offsetAnim.addListener(({ value }) => {
      this._offsetValue = value;
    });
  }

  componentWillUnmount() {
    this.state.scrollAnim.removeAllListeners();
    this.state.offsetAnim.removeAllListeners();
  }

  _onScrollEndDrag = () => {
    this._scrollEndTimer = setTimeout(this._onMomentumScrollEnd, 250);
  };

  _onMomentumScrollBegin = () => {
    clearTimeout(this._scrollEndTimer);
  };

  _onMomentumScrollEnd = () => {
    const toValue = this._scrollValue > NAVBAR_HEIGHT &&
      this._clampedScrollValue > (NAVBAR_HEIGHT) / 2
      ? this._offsetValue + NAVBAR_HEIGHT
      : this._offsetValue - NAVBAR_HEIGHT;

    Animated.timing(this.state.offsetAnim, {
      toValue,
      duration: 350,
      useNativeDriver: true,
    }).start();
  };

  _onBackButton = () => {
    this.props.navigation.goBack();
  }
  renderBody = () => {
    const { isLoading, children, loadingElement } = this.props
    if (isLoading) {
      return loadingElement
    }
    return (
      <Animated.ScrollView
        bounces={false}
        contentContainerStyle={styles.contentContainer}
        scrollEventThrottle={1}
        onMomentumScrollBegin={this._onMomentumScrollBegin}
        onMomentumScrollEnd={this._onMomentumScrollEnd}
        onScrollEndDrag={this._onScrollEndDrag}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: this.state.scrollAnim } } }],
          { useNativeDriver: true },
        )}
      >
        <View style={{ backgroundColor: Colors.backgroundApp }}>
          {children}
        </View>
      </Animated.ScrollView>
    )
  }
  render() {
    const { clampedScroll } = this.state;

    const navbarTranslate = clampedScroll.interpolate({
      inputRange: [0, NAVBAR_HEIGHT],
      outputRange: [0, -(NAVBAR_HEIGHT)],
      extrapolate: 'clamp',
    });
    const navbarOpacity = clampedScroll.interpolate({
      inputRange: [0, NAVBAR_HEIGHT],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    return (
      <View style={styles.fill}>
        {this.renderBody()}
        <Animated.View style={[styles.navbar, { transform: [{ translateY: navbarTranslate }] }]}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={this._onBackButton}
            style={styles.backButtonContainer} >
            <Animated.View style={{ opacity: navbarOpacity }}>
              <BackButton />
            </Animated.View>
          </TouchableOpacity>
          <Animated.Text style={[styles.title, { opacity: navbarOpacity }, Fonts.style.headerTitle]}>
            {this.props.headerName}
          </Animated.Text>
        </Animated.View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
    backgroundColor: Colors.silver
  },
  navbar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    backgroundColor: Colors.silver,
    borderBottomColor: '#dedede',
    borderBottomWidth: 2,
    height: NAVBAR_HEIGHT,
    justifyContent: 'center',
  },
  contentContainer: {
    paddingTop: 0,
  },
  title: {
    color: 'black',
  },
  backButtonContainer: { position: 'absolute', left: 0, bottom: 0 }
});
export default withNavigation(CollapsibleNavbar)