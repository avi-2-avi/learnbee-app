import {
  TouchableOpacity,
  Text,
  TouchableOpacityProps,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";

interface ButtonProps extends TouchableOpacityProps {
  title?: string;
  onPress: () => void | void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  type?: "primary" | "secondary";
  children?: React.ReactNode;
}

export const CustomButton: React.FC<ButtonProps> = ({
  title,
  onPress,
  style,
  textStyle,
  type = "primary", // Default color
  children,
  ...props
}) => {
  let colorClass = "";
  let textColor = "";

  if (type === "primary") {
    colorClass = "bg-yellow text-black";
    textColor = "text-black";
  } else if (type === "secondary") {
    colorClass = "bg-white border-[1rem] border-yellow";
    textColor = "text-black";
  }

  return (
    <TouchableOpacity
      className={`py-3 px-4 rounded-md items-center w-full justify-center ${colorClass}`}
      onPress={onPress}
      style={style}
      {...props}
    >
      {title ? (
        <Text className={`text-sm text-white ${textColor}`}>{title}</Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
};
