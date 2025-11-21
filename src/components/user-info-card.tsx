import { Avatar, AvatarImage } from "./ui/avatar";
import Button from "./ui/button-custom";

const url =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAc9tM-qfv7txc_bcnWYmLfGtjJcKf3KlHysfDenMABHXIXq77ecAJOM0lrrHK6Yt_7LsCyUoRzvmrQKyM1cYYYSqH3qUjoIifRywNhqMo4JWtwl719Xt4axNFfEUkgYZSO4Q0KzMxPomsYzvzrYnFGpxZ7KKIUooJTyJN889WHul6jmV7QDXVo2W9tPdOrYOe-H70_Woh8Jgt-Ah6-2pcLPvxFmqDzpW-n01pODGVzLGjpgx2zNw7JhquKTds1VYDwS3vF5Wuuezha";

const UserInfoCard = () => {
  return (
    <div className="w-full flex flex-col items-center p-4 bg-white rounded-lg shadow-md">
      <Avatar size="xl">
        <AvatarImage src={url} alt="avatar-user" />
      </Avatar>
      <p className="text-md font-medium">Amelia Grant</p>
      <p className="text-sm text-gray-600 text-center">
        Lead Product Designer at Acme Corp. Lorem ipsum dolor sit amet
        consectetur, adipisicing elit. Dignissimos sequi corporis itaque! Culpa
        molestias voluptate facilis. Beatae quibusdam architecto veniam? Et
        voluptatem quasi veniam numquam obcaecati reiciendis cum id laboriosam?
      </p>
      <Button variant="outline" colorScheme="primary" size="sm" className="mt-3">View Profile</Button>
    </div>
  );
};
export default UserInfoCard;
