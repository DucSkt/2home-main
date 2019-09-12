import { createStackNavigator } from 'react-navigation';
import RootNavigator from './RootNavigator';
import OverlayScreen from '../containers/overlay/OverlayScreen';
import HUDScreen from '../containers/overlay/HUDScreen';

function forVertical(props) {
  const { layout, position, scene } = props;

  const index = scene.index;
  const height = layout.initHeight;

  const translateX = 0;
  const translateY = position.interpolate({
    inputRange: ([index - 1, index, index + 1]: Array<number>),
    outputRange: ([height, 0, 0]: Array<number>)
  });

  return {
    transform: [{ translateX }, { translateY }]
  };
}

const OverlayNavigator = createStackNavigator(
  {
    root: RootNavigator,
    overlay: OverlayScreen,
    spinnerOverlay: HUDScreen,
  },
  {
    initialRouteName: 'root',
    cardStyle: {
      backgroundColor: 'transparent'
    },
    headerMode: 'none',
    transitionConfig: () => ({
      transitionSpec: {
        duration: 0
      },
      screenInterpolator: forVertical,
      containerStyle: {
        backgroundColor: 'transparent',
      }
    })
  }
)

export default OverlayNavigator;
