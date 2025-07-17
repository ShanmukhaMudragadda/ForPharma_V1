import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);

export default function HomeScreen() {
  return (
    <StyledView className="flex-1 justify-center items-center bg-background p-4">
      <StyledText className="text-2xl font-heading text-text-primary mb-4">
        Welcome to Your App
      </StyledText>
      <Button mode="contained" onPress={() => console.log('Pressed')}>
        Get Started
      </Button>
    </StyledView>
  );
}