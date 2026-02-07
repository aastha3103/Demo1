import React from 'react';
import { View, Text, Image, StyleSheet, ViewStyle } from 'react-native';
import { DesignColors, DesignRadius } from '../../constants/design-system';

export type WBLAvatarSize = 'small' | 'medium' | 'large' | 'xlarge' | number;

export interface WBLAvatarProps {
    source?: any;
    name?: string;
    size?: WBLAvatarSize;
    style?: ViewStyle;
}

export const WBLAvatar: React.FC<WBLAvatarProps> = ({
    source,
    name,
    size = 'medium',
    style
}) => {
    const getSize = () => {
        if (typeof size === 'number') return size;
        switch (size) {
            case 'small': return 32;
            case 'large': return 64;
            case 'xlarge': return 80;
            case 'medium':
            default: return 48;
        }
    };

    const dim = getSize();
    const initials = name ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : '?';

    return (
        <View style={[styles.container, { width: dim, height: dim, borderRadius: dim / 2 }, style]}>
            {source ? (
                <Image source={source} style={[styles.image, { borderRadius: dim / 2 }]} />
            ) : (
                <View style={[styles.placeholder, { backgroundColor: DesignColors.primary[100], borderRadius: dim / 2 }]}>
                    <Text style={[styles.initials, { fontSize: dim * 0.4 }]}>{initials}</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    placeholder: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    initials: {
        fontWeight: '700',
        color: DesignColors.primary[700],
    }
});

export default WBLAvatar;
