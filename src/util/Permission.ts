import {PermissionsAndroid} from 'react-native';

const PermissionsRequest = [
  PermissionsAndroid.PERMISSIONS.ACTIVITY_RECOGNITION,
];

const PermissionRequest = async () => {
  for (let i = 0; i < PermissionsRequest.length; i++) {
    const isRequested = await PermissionsAndroid.check(PermissionsRequest[i]);
    if (!isRequested) {
      await PermissionsAndroid.request(PermissionsRequest[i]);
    }
  }
};

export default PermissionRequest;
