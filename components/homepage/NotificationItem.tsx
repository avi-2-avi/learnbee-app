import { Text, View, Image } from "react-native";
import { formatDistanceToNow, parseISO } from "date-fns";
import { es } from "date-fns/locale";

interface NotificationItemProps {
  name: string;
  photo: string;
  datetime: string;
  type: string;
  projectName: string;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({
  name,
  photo,
  datetime,
  type,
  projectName,
}) => {
  let message = name;
  if (type === "comment") {
    message += 'ha comentado tu proyecto "' + projectName + '"';
  } else if (type === "like") {
    message += 'ha dado like a tu proyecto "' + projectName + '"';
  } else if (type === "share") {
    message += 'ha compartido tu proyecto "' + projectName + '"';
  }

  const relativeTime = formatDistanceToNow(parseISO(datetime), {
    addSuffix: true,
    locale: es,
  });

  return (
    <View className="flex flex-row items-center space-x-4 mb-4">
      <Image className="w-12 h-12 rounded-full" source={{ uri: photo }} />
      <View className="w-[80%]">
        <Text>{message}</Text>
        <Text className="text-[10px] font-light mt-0.5">{relativeTime}</Text>
      </View>
    </View>
  );
};
