import { NavigationContainerRef } from '@react-navigation/native';
import * as React from 'react';

export const navigationRef = React.createRef<NavigationContainerRef<any>>();

export function navigate(name: string, params?: object) {
    if (navigationRef.current) {
        navigationRef.current.navigate(name, params);
    }
}