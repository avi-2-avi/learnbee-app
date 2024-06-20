import { View, Image } from "react-native";

interface RatingIconsProps {
  rating: number;
}

export const RatingIcons: React.FC<RatingIconsProps> = ({ rating }) => {
  const totalIcons = 5;
  const filledIcons = Array(rating).fill(require("@/assets/icons/hexagon.png"));
  const outlineIcons = Array(totalIcons - rating).fill(
    require("@/assets/icons/hexagon-outline.png"),
  );
  const icons = [...filledIcons, ...outlineIcons];

  return (
    <View className="flex flex-row items-center">
      {icons.map((icon, index) => (
        <Image key={index} source={icon} className="w-4 h-4" />
      ))}
    </View>
  );
};
