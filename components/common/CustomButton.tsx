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
  type?: "primary" | "secondary" | "dull";
  children?: React.ReactNode;
  flatten?: boolean;
}

export const CustomButton: React.FC<ButtonProps> = ({
  title,
  onPress,
  style,
  textStyle,
  type = "primary", // Default color
  children,
  flatten,
  ...props
}) => {
  let colorClass = "";
  let textColor = "";
  let buttonStyle = "";

  if (type === "primary") {
    colorClass = "bg-yellow text-black";
    textColor = "text-black";
  } else if (type === "secondary") {
    colorClass = "bg-white border-[1rem] border-yellow";
    textColor = "text-black";
  } else if (type === "dull") {
    colorClass = "bg-white border-[1rem] border-black";
    textColor = "text-black";
  }

  if (flatten) {
    buttonStyle = "rounded-full py-1";
  } else {
    buttonStyle = "rounded-md py-3";
  }

  return (
    <TouchableOpacity
      className={`px-4 items-center w-full justify-center ${colorClass} ${buttonStyle}`}
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
