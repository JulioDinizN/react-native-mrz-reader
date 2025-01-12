import { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useFrameProcessor,
} from 'react-native-vision-camera';
import { scanMrz } from './frameProcessorPlugin';

export default function App() {
  const [isCameraEnabled, setIsCameraEnabled] = useState(false);
  const { requestPermission, hasPermission } = useCameraPermission();
  const device = useCameraDevice('back');

  useEffect(() => {
    requestPermission();
  }, []);

  const frameProcessor = useFrameProcessor((frame) => {
    'worklet';
    const faces = scanMrz(frame);
    console.log(`Faces in Frame: ${faces}`);
  }, []);

  return (
    <View style={styles.container}>
      <Text>Result</Text>
      <Button title="CAMERA" onPress={() => setIsCameraEnabled(true)} />
      {isCameraEnabled && hasPermission && device && (
        <Camera
          device={device}
          isActive
          frameProcessor={frameProcessor}
          style={{
            flex: 1,
            width: '100%',
            height: '100%',
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
