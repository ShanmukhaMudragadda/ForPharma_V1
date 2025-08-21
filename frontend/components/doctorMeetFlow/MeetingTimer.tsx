import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Animated } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);

interface MeetingTimerProps {
    startTime: Date;
}

export default function MeetingTimer({ startTime }: MeetingTimerProps) {
    const [elapsedTime, setElapsedTime] = useState(0);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const pulseAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        // Start timer
        timerRef.current = setInterval(() => {
            setElapsedTime(Date.now() - startTime.getTime());
        }, 1000);

        // Start pulse animation
        const startPulse = () => {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(pulseAnim, {
                        toValue: 0.3,
                        duration: 1000,
                        useNativeDriver: true,
                    }),
                    Animated.timing(pulseAnim, {
                        toValue: 1,
                        duration: 1000,
                        useNativeDriver: true,
                    }),
                ])
            ).start();
        };

        startPulse();

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
            pulseAnim.stopAnimation();
        };
    }, [startTime, pulseAnim]);

    const formatTime = (milliseconds: number) => {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <StyledView
            className="px-5 py-3 flex-row justify-between items-center"
            style={{ backgroundColor: '#10B981' }} // Green-500 equivalent
        >
            <StyledView className="flex-row items-center">
                <Animated.View
                    style={{
                        width: 8,
                        height: 8,
                        backgroundColor: 'white',
                        borderRadius: 4,
                        marginRight: 8,
                        opacity: pulseAnim,
                    }}
                />
                <StyledText className="text-white text-sm font-medium">
                    Meeting in progress
                </StyledText>
            </StyledView>
            <StyledText className="text-white text-base font-bold">
                {formatTime(elapsedTime)}
            </StyledText>
        </StyledView>
    );
}