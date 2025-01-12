import { VisionCameraProxy } from 'react-native-vision-camera';
import type { Frame } from 'react-native-vision-camera';

const plugin = VisionCameraProxy.initFrameProcessorPlugin('scanMrz');

/**
 * Scans faces.
 */
export function scanMrz(frame: Frame): object {
  'worklet';
  if (plugin == null)
    throw new Error('Failed to load Frame Processor Plugin "scanMrz"!');

  return plugin.call(frame);
}
