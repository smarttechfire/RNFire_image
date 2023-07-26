import { AppRegistry } from 'react-native';
import Menu from './screens/Menu';
import { Appbar, Provider as PaperProvider } from 'react-native-paper';
import {name as appName} from './app.json';
import UploadScreen from './screens/UploadScreen';

export default function App() {
  const _goBack = () => console.log("Went back");

  return (
    <PaperProvider>
       <Appbar.Header style={{backgroundColor: "#ffffff"}}>
      <Appbar.BackAction onPress={_goBack} color='black' />
      <Appbar.Content title="Upload" color='black' />
    </Appbar.Header>
      <UploadScreen />
    </PaperProvider>
  );
}
AppRegistry.registerComponent(appName, () => App);
